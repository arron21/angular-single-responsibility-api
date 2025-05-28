import { Component } from '@angular/core';
import { API_METHOD, SingleApiCall } from '../../app/class/single-api-call';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cat-fact',
  imports: [],
  templateUrl: './cat-fact.component.html',
  styleUrl: './cat-fact.component.scss'
})
export class CatFactComponent extends SingleApiCall<{
  "fact": string,
  "length": number
}> {
  override apiEndpoint = 'https://catfact.ninja/fact';
  override apiMethod = API_METHOD.GET;

  constructor(http: HttpClient) {
    super(http);
    this.fetchData();
  }

}
