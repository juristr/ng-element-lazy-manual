import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { createCustomElement } from '@angular/elements';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, SharedModule],
  entryComponents: [UserListComponent]
})
export class UsersModule {
  constructor(injector: Injector) {
    const el = createCustomElement(UserListComponent, { injector });
    customElements.define('app-user-list', el);
  }
}
