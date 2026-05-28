import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, FormsModule, MatCardModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm  {

  @Output() userFormValid = new EventEmitter<User>();
  userCreationForm: FormGroup; 
  // private readonly _router = inject(Router);

  constructor() {
    this.userCreationForm = new FormGroup({
      id: new FormControl(new Date().getTime().toString(), {nonNullable: true}),
      nom: new FormControl("", [Validators.required, Validators.minLength(5), this.forbiddenNameValidator("esterbet")]),
      prenom: new FormControl("", [Validators.required, Validators.minLength(5)]),
      email: new FormControl("", [Validators.required, Validators.email])
    }, /* {validators: this.equalIdentityValidator} */); 
  }

  protected createUser() {
    console.log("Validation User", this.userCreationForm.value);
    this.userFormValid.emit(this.userCreationForm.value); 
    this.userCreationForm.reset(); 
    this.userCreationForm.patchValue({
      id: new Date().getTime().toString()
    });
  }

  forbiddenNameValidator(name: string = ""): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null =>{
      const forbidden = control.value && control.value.includes(name);
      return forbidden ? { forbiddenName: {value: control.value}} : null; 
    };
  }

  // goToHome(): void {
  //   console.log('GoToHome appelé : ');
  //   this._router.navigate(['home'])
  // }
}
