import { Component, inject, OnInit } from '@angular/core';
import { UserForm } from "../user-form/user-form";
import { UserList } from '../user-list/user-list';
import { User } from '../models/user';
import { UserListService } from '../../core/services/user-list-service';

@Component({
  selector: 'app-user-management',
  imports: [UserForm, UserList],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement implements OnInit {

  protected listUsersManager: Array<User> = [];
  private readonly _userList = inject(UserListService);
  
  protected onUserCreated(userFormValid: User) {
    this._userList.saveUser(userFormValid);
    this.listUsersManager = this._userList.getAllUsers();

    console.log("Utilisateur {} ajouté.", userFormValid);
    console.log("Liste des utilisateurs : ", this.listUsersManager);
  }

  ngOnInit(): void {
    this.listUsersManager = this._userList.getAllUsers();
    console.log("Utilisateurs récupérés au démarrage : ", this.listUsersManager);
  }
}
