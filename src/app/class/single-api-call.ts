import { HttpClient } from '@angular/common/http';
import { finalize, take } from 'rxjs';
import { Observable } from 'rxjs';

export enum API_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export abstract class SingleApiCall<T> {
  abstract apiEndpoint: string;
  apiMethod: API_METHOD = API_METHOD.GET;

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
    console.log('Fetching data from:', this.apiEndpoint);

    const requestMap: Record<API_METHOD, () => Observable<T>> = {
      [API_METHOD.GET]: () => this.http.get<T>(this.apiEndpoint),
      [API_METHOD.POST]: () => this.http.post<T>(this.apiEndpoint, {...paramObj}),
      [API_METHOD.PUT]: () => this.http.put<T>(this.apiEndpoint, {...paramObj}),
      [API_METHOD.DELETE]: () => this.http.delete<T>(this.apiEndpoint),
      [API_METHOD.PATCH]: () => this.http.patch<T>(this.apiEndpoint, {...paramObj}),
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
