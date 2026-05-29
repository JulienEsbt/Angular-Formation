import { Component, inject, OnInit } from '@angular/core';
import { UserForm } from "../user-form/user-form";
import { UserList } from '../user-list/user-list';
import { User } from '../models/user';
import { UserListService } from '../../core/services/user-list-service';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-user-management',
  imports: [UserForm, UserList, MatSlideToggleModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement implements OnInit {

  protected listUsersManager: Array<User> = [];
  private readonly _userList = inject(UserListService);
  private readonly _auth = inject(Auth);
  protected isEditionAuthorized = this._auth.isEditionAuthorized();
  
  protected onUserCreated(userFormValid: User) {
    this._userList.saveUser(userFormValid);
    this.listUsersManager = this._userList.getAllUsers();

    console.log("Utilisateur {} ajouté.", userFormValid);
    console.log("Liste des utilisateurs : ", this.listUsersManager);
  }

  protected onUserCreatedObservable(userFormValid: User) {
    this._userList.saveUserObservable(userFormValid);
    console.log("Utilisateur {} ajouté.", userFormValid);
    console.log("Liste des utilisateurs : ", this.listUsersManager);
  }

  isAdmin(): boolean {
    return this._auth.isEditionAuthorized();
  }


  ngOnInit(): void {
    this.listUsersManager = this._userList.getAllUsers();
    console.log("Utilisateurs récupérés au démarrage : ", this.listUsersManager);
    // this._userList.getAllUsersObservable().subscribe(users => {
    //   this.listUsersManager = users;
    //   console.log("Utilisateurs récupérés au démarrage : ", this.listUsersManager);
    // });
  }
  
}
