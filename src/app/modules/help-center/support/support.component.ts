import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { HelpCenterService } from 'app/modules/help-center/help-center.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { CreatePost } from 'app/modules/forum/post/create-post/create-post.model';
import { Subforum } from 'app/modules/forum/subforum/subforum.model';
import { SubforumService } from 'app/modules/forum/subforum/subforum.service';
import { PostService } from 'app/modules/forum/shared/post.service';

@Component({
    selector     : 'help-center-support',
    templateUrl  : './support.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HelpCenterSupportComponent implements OnInit
{
    @ViewChild('supportNgForm') supportNgForm: NgForm;

    alert: any;
    supportForm: UntypedFormGroup;
    postPayload: CreatePost;
    subforums: Array<Subforum>;
    currentUserString = localStorage.getItem('currentUser');
    currentUser = JSON.parse(this.currentUserString);
    token: string;

    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private postService: PostService,
        private subforumService: SubforumService,
        private _formBuilder: UntypedFormBuilder,
        private _helpCenterService: HelpCenterService
    )
    {
        this.postPayload = {
            postName: '',
            description: '',
            imageUrl: '',
            email: '',
            subforumName:''
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the support form
        this.supportForm = this._formBuilder.group({
            postName: ['', Validators.required],
            subforumName: ['', Validators.required],
            description: ['', Validators.required],
            file: [null]
        });
        this.subforumService.getAllSubforums().subscribe((data) => {
            this.subforums = data;
        }, error => {
            throwError(error);
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Clear the form
     */
    clearForm(): void
    {
        // Reset the form
        this.supportNgForm.resetForm();
    }

    /**
     * Send the form
     */
    sendForm(): void {
        // Retrieve form values
        this.postPayload.postName = this.supportForm.get('postName').value;
        this.postPayload.subforumName = this.supportForm.get('subforumName').value;
        this.postPayload.description = this.supportForm.get('description').value;
        this.postPayload.email = this.currentUser.email;
        
        // Retrieve the image file
        const imageFile = this.supportForm.get('file').value;
    
        // Create a FormData object to send both the post payload and the image file
        const formData = new FormData();
        formData.append('postName', this.supportForm.get('postName').value);
        formData.append('email', this.currentUser.email);
        formData.append('subforumName', this.supportForm.get('subforumName').value);
        formData.append('description', this.supportForm.get('description').value);
        formData.append('file', imageFile);
    
        // Call the service to create post with the image
        this.postService.createPost(formData).subscribe((data) => {
            // Show success message
            this.alert = {
                type: 'success',
                message: 'Your Post has been created!'
            };
    
            // Clear the form after 5 seconds
            setTimeout(() => {
                this.alert = null;
                this.clearForm();
            }, 5000);
        }, error => {
            // Show error message
            this.alert = {
                type: 'error',
                message: 'An error occurred. Please try again later.'
            };
        });
    }
    

    // Function to handle image selection
   // Function to handle image selection
onImageSelected(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    
    // Check if a file is selected
    if (file) {
        // Create a FileReader object
        const reader = new FileReader();
        
        // Define a function to be executed when the file is read
        reader.onload = (e) => {
            // Get the data URL of the image
            const imageUrl = e.target.result as string;
            
            // Do whatever you need with the imageUrl
            console.log('Image URL:', imageUrl);
            
            // Update the form control with the selected file
            this.supportForm.patchValue({ file: file });
            this.supportForm.get('image').updateValueAndValidity();
        };
        
        // Read the file as a data URL
        reader.readAsDataURL(file);
    }
}


    discardPost() {
        this.router.navigateByUrl('/');
    }
    onSubforumSelected(event) {
        this.postPayload.subforumName = event.target.value;
        console.log(this.postPayload.subforumName);
    }
}