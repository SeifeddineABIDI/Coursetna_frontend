import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HelpCenterService } from 'app/modules/help-center/help-center.service';
import { PostModel } from '../forum/shared/post-model.model';

@Component({
    selector     : 'help-center',
    templateUrl  : './help-center.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HelpCenterComponent implements OnInit, OnDestroy
{
    posts : PostModel[] = [];
    private unsubscribeAll: Subject<any> = new Subject();
    searchQuery: string = '';

    /**
     * Constructor
     */
    constructor(private helpCenterService: HelpCenterService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        const token = localStorage.getItem('access_token');
        this.helpCenterService.getAllPostsInteractive(token)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(posts => {
                this.posts = posts;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
    search(): void {
        // Call API or perform local search based on this.searchQuery
        // For demonstration purposes, we'll filter the posts array locally
        if (this.searchQuery.trim() !== '') {
            this.posts = this.posts.filter(post =>
                post.postName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    }

    // Method to reset search
    resetSearch(): void {
        // Reset posts array to original state
        const token = localStorage.getItem('access_token');
        this.helpCenterService.getAllPostsInteractive(token)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(posts => {
                this.posts = posts;
            });

        // Reset search query
        this.searchQuery = '';
    }
}
