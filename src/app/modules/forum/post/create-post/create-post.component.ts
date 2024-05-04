import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../shared/post.service';
import { throwError } from 'rxjs';
import { CreatePost } from './create-post.model';
import { Subforum } from '../../subforum/subforum.model';
import { SubforumService } from '../../subforum/subforum.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePost;
  subforums: Array<Subforum>;

  constructor(private formBuilder: FormBuilder,private router: Router, private postService: PostService, private subforumService: SubforumService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      imageUrl: '',
      email: '',
      subforumName:''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      subforumName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      // Add form control for image file upload
      image: new FormControl(null)
    });
    this.subforumService.getAllSubforums().subscribe((data) => {
      this.subforums = data;
    }, error => {
      throwError(error);
    });
  }
  createForm(): void {
    this.createPostForm = this.formBuilder.group({
      postName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      url: ['', Validators.required],
      subforumName: ['', Validators.required],
      description: ['']
      // Add form control for image upload if needed
    });
  }
 
  createPost(): void {
    if (this.createPostForm.valid) {
      const formData = new FormData();
      formData.append('postName', this.createPostForm.get('postName').value);
      formData.append('email', this.createPostForm.get('email').value);
      formData.append('url', this.createPostForm.get('url').value);
      formData.append('subforumName', this.createPostForm.get('subforumName').value);
      formData.append('description', this.createPostForm.get('description').value);
      // Add image file to formData if needed
      
      // Call the post service to create the post
      this.postService.createPost(formData).subscribe(
        (response) => {
          console.log('Post created successfully:', response);
          // Optionally, reset the form after successful submission
          this.createPostForm.reset();
        },
        (error) => {
          console.error('Error creating post:', error);
          // Handle error
        }
      );
    }
  }

  
  // Function to handle image selection
  onImageSelected(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createPostForm.patchValue({ image: file });
    this.createPostForm.get('image').updateValueAndValidity();
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
  onSubforumSelected(event) {
    this.postPayload.subforumName = event.target.value;
    console.log(this.postPayload.subforumName);
  }

}
