import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'app/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../user/user.types';
import { CurrentUser } from '../user/CurrentUser';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    user: User;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('access_token', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('access_token') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post( `${environment.apiUrl}/api/v1/auth/authenticate`, credentials).pipe(
            switchMap((response: any) => {
                if(response.access_token== null){
                    return of(response)
                }
                // Store the access token in the local storage
                this.accessToken = response.access_token;

                // Set the authenticated flag to true
                this._authenticated = true;
                this.user = response.user;
                // Store the user on the user service
                this._userService.user = response.user;
                localStorage.setItem('currentUser', JSON.stringify(response.user));

                User.currentUser = response.user;
                CurrentUser.setCurrentUser(response.user);  
                
                // Return a new observable with the response
                return of(response);
            })
        );
    }

    // login(email: string, password: string): Observable<any> {
    //     console.log(email, password)
    //     // Send POST request to authenticate endpoint with email and hashed password
    //     return this._httpClient.post<any>(
    //       `${environment.apiUrl}/api/v1/auth/authenticate`,
    //       { email: email, password: password }
    //     ).pipe(
    //       map(user => {
    //         console.log(user)
    //         // Check if the response contains a valid access token
    //         if (user && user.access_token) {
    //           // Store user details and access token in local storage
    //           localStorage.setItem('currentUser', JSON.stringify(user));
    //           this.accessToken = user.access_token;
    //           this._authenticated = true;
    //           this._userService.user =user;
    //         }
    //         return user;
    //       })
    //     );
    //   }
    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Sign in using the token
        return this._httpClient.post(`${environment.apiUrl}/api/v1/auth/authenticateWithToken`, {
            token: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( response.access_token )
                {
                    this.accessToken = response.access_token;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        const access_token = localStorage.getItem('access_token');

        // Remove the access token from the local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('currentUser');
        console.log('signOut',  access_token)
        // Set the authenticated flag to false
        this._authenticated = false;
        if (access_token!=null) {
            // Create HttpHeaders with the access token
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${access_token}`
            });
    
            // Make a POST request to the logout endpoint with the access token in the headers
            return this._httpClient.post(`${environment.apiUrl}/api/v1/auth/logout`, {}, { headers });
        } else {
            // Return an observable of false if the access token is not found
            return of(false);
        }
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(nom: string, prenom: string, email: string, password: string, image: File): Observable<any> {
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('photo', image);
      
        return this._httpClient.post(`${environment.apiUrl}/api/v1/auth/register`, formData);
      }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
