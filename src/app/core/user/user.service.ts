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
  
      return this._httpClient.get<User>(`localhost:9000/pidev/user/update`).pipe(
        tap((response) => {
                this._user.next(response);
            })
        );
    }
    updateUser(user: User, accessToken: string): Observable<User> {
      // Set the request headers including the access token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' // Assuming you're sending JSON data
      });
  
      // Send an HTTP PUT request to update the user
      return this._httpClient.put<User>('http://localhost:9000/pidev/user/update', user, { headers });
    }
    getAll(token: string): Observable<User> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
  
      // Modify the endpoint URL as per your backend API
      return this._httpClient.get<User>(`localhost:9000/pidev/user/all`, { headers }).pipe(
        tap((user: User) => {
          this._user.next(user);
        })
      );
    }
}
