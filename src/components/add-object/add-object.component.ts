import { Component } from '@angular/core';
import { ApiMethod, SingleApiCall } from '../../app/class/single-api-call';
import { HttpClient } from '@angular/common/http';

export interface AddObjParam {
  name: string;
  data: Data;
}

export interface AddObjRes {
  id:        string;
  name:      string;
  data:      Data;
  createdAt: Date;
}

export interface Data {
  year:             number;
  price:            number;
  "CPU model":      string;
  "Hard disk size": string;
}


@Component({
  selector: 'app-add-object',
  imports: [],
  templateUrl: './add-object.component.html',
  styleUrl: './add-object.component.scss'
})
export class AddObjectComponent extends SingleApiCall<AddObjRes> {
  override apiEndpoint = 'https://api.restful-api.dev/objects';
  override apiMethod = ApiMethod.POST;

  constructor(http: HttpClient) {
    super(http);
    this.fetchData<AddObjParam>({
      "name": "Apple MacBook Pro 16",
      "data": {
         "year": 2019,
         "price": 1849.99,
         "CPU model": "Intel Core i9",
         "Hard disk size": "1 TB"
      }
   });
  }

}
