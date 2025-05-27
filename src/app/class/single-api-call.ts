import { HttpClient } from '@angular/common/http';
import { finalize, take } from 'rxjs';
import { Observable } from 'rxjs';

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export abstract class SingleApiCall<T> {
  abstract apiEndpoint: string;
  apiMethod: ApiMethod = ApiMethod.GET;

  public data?: T;
  public loading = false;

  constructor(public http: HttpClient) {
    // if (!this.apiEndpoint) {
    //   throw new Error('Child class must define "apiEndpoint".');
    // }
  }

  fetchData<P = unknown>(paramObj?: P) {
    console.log(paramObj)
    this.loading = true;

    const requestMap: Record<ApiMethod, () => Observable<T>> = {
      [ApiMethod.GET]: () => this.http.get<T>(this.apiEndpoint),
      [ApiMethod.POST]: () => this.http.post<T>(this.apiEndpoint, {...paramObj}),
      [ApiMethod.PUT]: () => this.http.put<T>(this.apiEndpoint, {...paramObj}),
      [ApiMethod.DELETE]: () => this.http.delete<T>(this.apiEndpoint),
      [ApiMethod.PATCH]: () => this.http.patch<T>(this.apiEndpoint, {...paramObj}),
    };

    const requestFn = requestMap[this.apiMethod];

    if (!requestFn) {
      throw new Error(`Unsupported API method: ${this.apiMethod}`);
    }

    requestFn()
      .pipe(
        take(1),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (response) => (this.data = response),
        error: (err) => console.error('API Error:', err),
      });
  }
}
