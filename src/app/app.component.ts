import { Component } from '@angular/core';

import { ComponentLoaderService } from './core/component-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lazy Loading Elements';

  constructor(private componentLoader: ComponentLoaderService) {}

  onLoadUsers() {
    this.componentLoader.loadComponent('app-user-list').then(componentEl => {
      componentEl['users'] = [
        {
          name: 'Juri'
        },
        {
          name: 'Steffi'
        }
      ];

      document.getElementById('user-container').appendChild(componentEl);
    });
  }

}
