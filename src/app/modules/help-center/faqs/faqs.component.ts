import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HelpCenterService } from 'app/modules/help-center/help-center.service';
import { PostModel } from 'app/modules/forum/shared/post-model.model';
import { Router } from '@angular/router';
import { Comment } from 'app/modules/forum/comment/comment.model';
import { CommentService } from 'app/modules/forum/comment/comment.service';

@Component({
    selector: 'help-center-faqs',
    templateUrl: './faqs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HelpCenterFaqsComponent implements OnInit, OnDestroy {
    posts: PostModel[] = [];
    private unsubscribeAll: Subject<any> = new Subject();
    comments: { [postId: number]: Comment[] } = {}; // Object to store comments for each post
    postId: number;
    post: PostModel;
    expandedComments: { [postId: number]: boolean } = {}; // Object to track expanded comments
    token: string;

    constructor(
        private helpCenterService: HelpCenterService,
        private commentService: CommentService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const token = localStorage.getItem('access_token');
        this.helpCenterService.getAllPosts(token)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(posts => {
                this.posts = posts;
            });
    }

    getPostImageUrl(postId: number): string | null {
        const post = this.posts.find(post => post.id === postId);
        return post && post.imageUrl ? 'http://localhost:9000/pidev/posts/' + postId + '/image' : null;
    }

    toggleComments(postId: number): void {
        this.postId = postId; // Set the postId
        if (!this.comments[postId]) {
            this.getCommentsForPost(postId);
        }
        this.expandedComments[postId] = !this.expandedComments[postId];
    }
    


    isCommentsExpanded(postId: number): boolean {
        return !!this.expandedComments[postId];
    }

    postComment(commentText: string): void {
        const email = 'achref@esprit.tn'; // You may want to prompt the user for their email address
        const commentPayload: Comment = {
            text: commentText,
            postId: this.postId,
            email: email,
            
        };
        this.commentService.postComment(commentPayload).subscribe(() => {
            // Reload comments for the post after posting a comment
            this.getCommentsForPost(this.postId);
        }, error => {
            // Handle error
            console.error('Error posting comment:', error);
        });
    }
    
    

    private getCommentsForPost(postId: number): void {
        this.commentService.getAllCommentsForPost(postId).subscribe(data => {
            this.comments[postId] = data;
        }, error => {
            throwError(error);
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
    }
}
