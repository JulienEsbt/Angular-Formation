import { Injectable } from '@angular/core';
import { User } from '../../user/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  
  saveUser(user: User): void {
    console.log("Saving user : ", user);
    const usersId = localStorage.getItem('userIds');
    if (usersId) {
      console.log("Existing users : ", JSON.parse(usersId));
      localStorage.setItem('userIds', JSON.stringify([...JSON.parse(usersId), user.id]));
    } else {
      console.log("No existing users, creating new list with user : ", user);
      localStorage.setItem('userIds', JSON.stringify([user.id]));
    }
    console.log("User saved, current userIds : ", JSON.parse(localStorage.getItem('userIds') || '[]'));
    localStorage.setItem(user.id, JSON.stringify(user));
    console.log("User details saved, current user details : ", JSON.parse(localStorage.getItem(user.id) || '{}'));
  }

  getAllUsers(): User[] {
    const userId = localStorage.getItem('userIds');
    const users: User[] = [];
    if (!userId) {
      console.log("No userIds found in localStorage.");
      return users;
    }
    for (const id of JSON.parse(userId)) {
      const user = localStorage.getItem(id);
      if (user) {
        users.push(JSON.parse(user));
      }
    }
    return users;
  }

  getUserById(id: string): User | null {
    const user = localStorage.getItem(id);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  updateUser(user: User): void {
    console.log("Updating user : ", user.id);
    localStorage.setItem(user.id, JSON.stringify(user));
  }

  removeUser(id: string): void {
    console.log("Removing user with id : ", id);
    localStorage.removeItem(id);
    const usersId = localStorage.getItem('userIds');
    if (usersId) {
      const updatedUserIds = JSON.parse(usersId).filter((userId: string) => userId !== id);
      localStorage.setItem('userIds', JSON.stringify(updatedUserIds));
      console.log("User removed, current userIds : ", JSON.parse(localStorage.getItem('userIds') || '[]'));
    }
  }

}
