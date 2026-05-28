import { Component } from '@angular/core';
import { UserForm } from "../user-form/user-form";
import { UserList } from '../user-list/user-list';
import { User } from '../models/user';

@Component({
  selector: 'app-user-management',
  imports: [UserForm, UserList],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement {

  protected listUsersManager: Array<User> = [];
  
  protected onUserCreated(userFormValid: User) {
    this.listUsersManager.push(userFormValid); 
    console.log("Utilisateur {} ajouté.", userFormValid);
    console.log("Liste des utilisateurs : ", this.listUsersManager)
  }
}
