import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UsersModule } from '../users.module';

@Component({
  // selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input() users: any[];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    console.log('User List component destroyed');
  }
}
