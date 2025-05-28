import { Component } from '@angular/core';
import { CatFactComponent } from "../components/cat-fact/cat-fact.component";
import { AddObjectComponent } from "../components/add-object/add-object.component";
import { PostWithLoadingComponent } from "../components/post-with-loading/post-with-loading.component";

@Component({
  selector: 'app-root',
  imports: [CatFactComponent, AddObjectComponent, PostWithLoadingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'single-responsibility-api-component';
}
