import { Component } from '@angular/core';
import { CatFactComponent } from "../components/cat-fact/cat-fact.component";
import { AddObjectComponent } from "../components/add-object/add-object.component";

@Component({
  selector: 'app-root',
  imports: [CatFactComponent, AddObjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'single-responsibility-api-component';
}
