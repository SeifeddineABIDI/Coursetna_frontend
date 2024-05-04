import { User } from "./user.types";
import { BehaviorSubject, Observable } from 'rxjs';

export class CurrentUser {
    private static currentUser: User | null = null;
    private static currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    static setCurrentUser(user: User): void {
      CurrentUser.currentUser = user;
    }
  
    static getCurrentUser(): User | null {
      return CurrentUser.currentUser;
    }
  
    static getCurrentUser$(): Observable<User | null> {
        return CurrentUser.currentUserSubject.asObservable();
      }
  
    static clearCurrentUser(): void {
      CurrentUser.currentUser = null;
    }
  }