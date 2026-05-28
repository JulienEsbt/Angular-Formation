import { Component, inject, Input } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-list',
  imports: [MatCardModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {

  @Input() listUsersList: User[] = [];
  private readonly _router = inject(Router);

  goToUserId(id: string): void {
    console.log('User edition requested : ', id);
    this._router.navigate(['user', id])
  }
  
}
