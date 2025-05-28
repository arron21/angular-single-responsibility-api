import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-container',
  imports: [CommonModule],
  template: `
  @if(loading) {
    <div class="loading-container">
      <p>Loading...</p>
    </div>
  } @else {
    <div class="content-container">
      <ng-content />
    </div>
  }
  `,
  styles: `
  .loading-container {

    color: white;
    background-color: red;

    }`
})
export class LoadContainerComponent {
  @Input() loading = false;
}
