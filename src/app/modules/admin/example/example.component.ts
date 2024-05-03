import { User } from './../../../core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent
{
    users: User[] = [];
    /**
     * Constructor
     */
    constructor(private userService: UserService)
    {
    }
    ngOnInit(): void {
        // Assuming you have a token obtained from somewhere
        const token = localStorage.getItem("access_token");
        console.log(token);
        // Call the getAll function from UserService
        this.userService.getAll(token).subscribe(
          (user: User) => {
            // Assuming the response is a single User object
            // You may need to modify this part based on the actual response structure
            this.users.push(user);
          },
          (error) => {
            console.error('Error fetching users:', error);
          }
        );
      }
}

