import { Component, OnInit } from '@angular/core';
import { PostModel } from './shared/post-model.model';
import { PostService } from './shared/post.service';
import { HelpCenterMockApi } from 'app/mock-api/apps/help-center/api';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})

export class ForumComponent implements OnInit {
  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
      console.log('log')
    });
  }
  ngOnInit(): void {
  }
}
