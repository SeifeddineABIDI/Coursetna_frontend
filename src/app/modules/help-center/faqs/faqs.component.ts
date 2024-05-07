import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HelpCenterService } from 'app/modules/help-center/help-center.service';
import { PostModel } from 'app/modules/forum/shared/post-model.model';
import { Router } from '@angular/router';
import { Comment } from 'app/modules/forum/comment/comment.model';
import { CommentService } from 'app/modules/forum/comment/comment.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Vote } from 'app/modules/forum/shared/vote-button/vote.model';
import { VoteType } from 'app/modules/forum/shared/vote-button/vote-type';
import { VoteService } from 'app/modules/forum/shared/vote.service';
import { PostService } from 'app/modules/forum/shared/post.service';
import { ToastrService } from 'ngx-toastr';
import { Subforum } from 'app/modules/forum/subforum/subforum.model';

@Component({
    selector: 'help-center-faqs',
    templateUrl: './faqs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HelpCenterFaqsComponent implements OnInit, OnDestroy {
    posts: PostModel[] = [];
    private unsubscribeAll: Subject<any> = new Subject();
    comments: { [postId: number]: Comment[] } = {};
    postId: number;
    post: PostModel;
    expandedComments: { [postId: number]: boolean } = {};
    token: string;
    currentUserString = localStorage.getItem('currentUser');
    currentUser = JSON.parse(this.currentUserString);
    alert: any;
    userImages: { [userId: number]: string } = {};
    votePayload: Vote;
    upvoteColor: string;
    downvoteColor: string;
    userVotes: { [postId: number]: VoteType } = {};
    subforums: Subforum[] = []; // Assuming you have a list of subforums
    selectedSubforum: number | null = null; // Property to store the selected subforum ID

    constructor(
        private helpCenterService: HelpCenterService,
        private commentService: CommentService,
        private router: Router,
        private userService: UserService,
        private voteService: VoteService,
        private postService: PostService,
        private toastr: ToastrService
    ) {
        this.votePayload = {
            voteType: undefined,
            postId: undefined,
            email: ''
        };
        const storedUserVotes = localStorage.getItem('userVotes');
        if (storedUserVotes) {
            this.userVotes = JSON.parse(storedUserVotes);
        }
    }

    ngOnInit(): void {
        const token = localStorage.getItem('access_token');
        this.fetchSubforums();
        // Fetch all posts by default when the component initializes
        this.fetchPosts();
    }
    fetchSubforums(): void {
        // Assuming you have a method in HelpCenterService to fetch subforums
        this.helpCenterService.getAllSubforums()
            .subscribe(subforums => {
                this.subforums = subforums;
            }, error => {
                console.error('Error fetching subforums:', error);
            });
    }

    fetchPosts(): void {
        console.log('Selected subforum in fetchPosts:', this.selectedSubforum);
        if (this.selectedSubforum) {
            // Fetch posts based on the selected subforum if it's not empty
            this.helpCenterService.getPostsBySubforum(this.selectedSubforum)
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe(posts => {
                    console.log('Fetched posts:', posts);
                    this.posts = posts;
                    this.fetchUserImagesForPosts();
                }, error => {
                    console.error('Error fetching posts:', error);
                });
        } else {
            // Fetch all posts if no subforum is selected
            this.helpCenterService.getAllPosts(this.token)
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe(posts => {
                    console.log('Fetched posts:', posts);
                    this.posts = posts;
                    this.fetchUserImagesForPosts();
                }, error => {
                    console.error('Error fetching posts:', error);
                });
        }
    }
    
    changeSubforum(subforumName: string): void {
        const subforum = this.subforums.find(subforum => subforum.name === subforumName);
        if (subforum) {
            this.selectedSubforum = subforum.id;
            this.fetchPosts(); // Fetch posts based on the selected subforum
        }
    }
    

    getPostImageUrl(postId: number): string | null {
        const post = this.posts.find(post => post.id === postId);
        return post && post.imageUrl ? 'http://localhost:9000/pidev/posts/' + postId + '/image' : null;
    }

    toggleComments(postId: number): void {
        this.postId = postId;
        if (!this.comments[postId]) {
            this.getCommentsForPost(postId);
        }
        this.expandedComments[postId] = !this.expandedComments[postId];
    }

    isCommentsExpanded(postId: number): boolean {
        return !!this.expandedComments[postId];
    }

    postComment(commentText: string): void {
        if (!commentText.trim()) {
            this.alert = {
                type: 'error',
                message: 'Please enter a comment before posting.'
            };
            setTimeout(() => {
                this.alert = null;
            }, 5000);
            return;
        }

        const email = this.currentUser.email;
        const commentPayload: Comment = {
            text: commentText,
            postId: this.postId,
            email: email,
        };
        this.commentService.postComment(commentPayload).subscribe(() => {
            this.getCommentsForPost(this.postId);
            this.alert = {
                type: 'success',
                message: 'Your comment has been posted successfully.'
            };
            setTimeout(() => {
                this.alert = null;
            }, 5000);
            commentText = '';
        }, error => {
            this.alert = {
                type: 'error',
                message: 'Your comment contains inappropriate words. Please try again later.'
            };
            setTimeout(() => {
                this.alert = null;
            }, 5000);
            console.error('Error posting comment:', error);
        });
    }

    private getCommentsForPost(postId: number): void {
        this.commentService.getAllCommentsForPost(postId).subscribe(data => {
            this.comments[postId] = data;
            this.fetchUserImagesForComments(postId);
        }, error => {
            throwError(error);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
    }

    fetchUserImagesForPosts(): void {
        for (const post of this.posts) {
            this.getImageUrl(post.userId);
        }
    }
    
    fetchUserImagesForComments(postId: number): void {
        const comments = this.comments[postId];
        if (comments) {
            for (const comment of comments) {
                this.getImageUrl(comment.userId); 
                console.log(this.getImageUrl(comment.userId));
            }
        }
    }
    
    getImageUrl(userId: number): void {
        this.userImages[userId] = `http://localhost:9000/pidev/api/v1/auth/${userId}/image`;
    }

    upvotePost(postId: number) {
        const email = this.currentUser.email;
        const currentUserVote = this.userVotes[postId];
    
        if (currentUserVote === VoteType.LIKE) {
            this.deleteVote(postId, email);
        } else {
            this.vote(postId, VoteType.LIKE, email);
        }
    }

    downvotePost(postId: number) {
        const email = this.currentUser.email;
        const currentUserVote = this.userVotes[postId];
    
        if (currentUserVote === VoteType.DISLIKE) {
            this.deleteVote(postId, email);
        } else {
            this.vote(postId, VoteType.DISLIKE, email);
        }
    }

    private vote(postId: number, voteType: VoteType, email: string) {
        this.votePayload.postId = postId;
        this.votePayload.voteType = voteType;
        this.votePayload.email = email;
        this.voteService.vote(this.votePayload).subscribe(() => {
            this.updateVoteDetails(postId);
            this.userVotes[postId] = voteType;
        }, error => {
            this.toastr.error(error.error.message);
            throwError(error);
        });
    }

    private updateVoteDetails(postId: number) {
        this.postService.getPost(postId).subscribe(post => {
            const index = this.posts.findIndex(post => post.id === postId);
            if (index !== -1) {
                this.posts[index] = post;
                localStorage.setItem('userVotes', JSON.stringify(this.userVotes));
            }
        });
    }

    getUserVoteColor(postId: number, voteType: string): string {
        const currentUserVote = this.userVotes[postId];
        if (currentUserVote === VoteType.LIKE && voteType === 'upvote') {
            return 'blue'; // Change this to the color you want for upvoted posts
        } else if (currentUserVote === VoteType.DISLIKE && voteType === 'downvote') {
            return 'red'; // Change this to the color you want for downvoted posts
        }
        return  ; // Default color for unvoted posts
    }
    
    toggleVote(postId: number): void {
        const email = this.currentUser.email;
        const currentUserVote = this.userVotes[postId];
    
        if (currentUserVote === VoteType.LIKE) {
            this.deleteVote(postId, email);
        } else {
            this.vote(postId, VoteType.LIKE, email);
        }
    }
    
    deleteVote(postId: number, email: string): void {
        this.voteService.deleteVote(postId, email).subscribe(() => {
            // Mise à jour de l'affichage après la suppression du vote
            this.updateVoteDetails(postId);
            // Supprimer le vote de l'utilisateur local
            delete this.userVotes[postId];
        }, error => {
            this.toastr.error(error.error.message);
            throwError(error);
        });
    }
    
    
}
