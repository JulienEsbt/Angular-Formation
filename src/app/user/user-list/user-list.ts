import { Component, inject, Input } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UserListService } from '../../core/services/user-list-service';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-user-list',
  imports: [MatCardModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {

  @Input() listUsersList: User[] = [];
  private readonly _router = inject(Router);
  private readonly _userList = inject(UserListService);
  private readonly _auth = inject(Auth);

  protected isEditionAuthorized(): boolean {
    return this._auth.isEditionAuthorized();
  }

  goToUserId(id: string): void {
    console.log('User edition requested : ', id);
    this._router.navigate(['user', id])
  }

  removeUser(id: string): void {
    console.log('User removal requested : ', id);
    this._userList.removeUser(id);
    this.listUsersList = this._userList.getAllUsers();
    console.log('User removed, current users list : ', this.listUsersList);
  }
  
}

