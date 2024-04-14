import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { environment } from 'app/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService
{   
    public _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
              console.log('Setting user:', value);

        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(userId: number, token: string): Observable<User> {
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzz",User.currentUser.id);

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    
        // Modify the endpoint URL as per your backend API
        return this._httpClient.get<User>(`localhost:9000/pidev/api/v1/auth/current`, { headers }).pipe(
          tap((user: User) => {
            this._user.next(user);
          })
        );
      }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            tap((response) => {
                this._user.next(response);
            })
        );
    }
}
