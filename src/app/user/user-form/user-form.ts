import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserListService } from '../../core/services/user-list-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, FormsModule, MatCardModule, RouterModule, MatIconModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {

  @Output() userFormValid = new EventEmitter<User>();
  userCreationForm: FormGroup; 
  private readonly _userList = inject(UserListService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  protected isEditMode: boolean = false;

  constructor() {
    this.userCreationForm = new FormGroup({
      id: new FormControl(Date.now().toString(), {nonNullable: true}),
      nom: new FormControl("", [Validators.required, Validators.minLength(3), this.forbiddenNameValidator("Hitler")]),
      prenom: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email])
    }, /* e.g. {validators: this.equalIdentityValidator} */); 

    const activeUserId = this._activatedRoute.snapshot.params['id'];
    if (activeUserId) {
      this.isEditMode = true;
      console.log('Active user id from route : ', activeUserId);
      const userToEdit = this._userList.getUserById(activeUserId);
      if (userToEdit) {
        console.log('User to edit found : ', userToEdit);
        this.userCreationForm.setValue(userToEdit);
      }
    }
  }

  protected saveUser() {
    if (this.userCreationForm.valid) {
      if (this._activatedRoute.snapshot.params['id']) {
        const updatedUser: User = this.userCreationForm.value;
        this._userList.updateUser(updatedUser);
        console.log("User updated successfully", updatedUser);
        return;
      } else {
        console.log("Validation User", this.userCreationForm.value);
        this.userFormValid.emit(this.userCreationForm.value); 
        this.userCreationForm.reset(); 
        this.userCreationForm.patchValue({id: Date.now().toString()});
        console.log("User created successfully", this.userCreationForm.value);
      }
    }
  }

  forbiddenNameValidator(name: string = ""): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>{
      const forbidden = control.value?.includes(name);
      return forbidden ? { forbiddenName: {value: control.value}} : null; 
    };
  }

  returnToUserList(): void {
      this._router.navigate(['home/user-edition']);
  }  
}
