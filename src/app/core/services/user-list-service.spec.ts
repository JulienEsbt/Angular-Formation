import { TestBed } from '@angular/core/testing';

import { UserListService } from './user-list-service';

describe('UserList', () => {
  let service: UserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove only the selected user from the observable list', () => {
    service.saveUserObservable({id: '1', nom: 'Ada', prenom: 'Lovelace', email: 'ada@example.com'});
    service.saveUserObservable({id: '2', nom: 'Grace', prenom: 'Hopper', email: 'grace@example.com'});

    service.removeUserObservable('1');

    expect(service.getUserByIdObservable('1')).toBeUndefined();
    expect(service.getUserByIdObservable('2')?.email).toBe('grace@example.com');
  });
});
