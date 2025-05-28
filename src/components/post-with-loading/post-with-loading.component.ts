import { Component } from '@angular/core';
import { LoadContainerComponent } from '../load-container/load-container.component';
import { API_METHOD, SingleApiCall } from '../../app/class/single-api-call';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-with-loading',
  imports: [LoadContainerComponent],
  templateUrl: './post-with-loading.component.html',
  styleUrl: './post-with-loading.component.scss'
})
export class PostWithLoadingComponent extends SingleApiCall<{
  "userId": number,
  "id": number,
  "title": string,
  "body": string
}[]> {
  override apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';
  override apiMethod = API_METHOD.GET;

  constructor(http: HttpClient) {
    super(http);
    this.fetchData();
  }

}
