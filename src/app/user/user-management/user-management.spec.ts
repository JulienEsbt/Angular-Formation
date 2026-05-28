import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManagement } from './user-management';
import { User } from '../models/user';

describe('UserManagement', () => {
  let component: UserManagement;
  let fixture: ComponentFixture<UserManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(UserManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create user list', () => {
    expect(component["listUsersManager"]).toEqual([]);
    const user1 :User = {id: "1", nom: "julien", prenom: "esterbet", email: "haha@gmail.com"};
    component["onUserCreated"](user1);
    expect(component["listUsersManager"][0].nom).toBe("julien");
    expect(component["listUsersManager"][0].email).toBe(user1.email);
    expect(component["listUsersManager"][0]).toEqual({nom: "julien", prenom: "esterbet", email: "haha@gmail.com"});
    expect(component["listUsersManager"][0]).toEqual(user1);
  });

});
