import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HelpCenterService } from 'app/modules/help-center/help-center.service';
import { GuideCategory } from 'app/modules/help-center/help-center.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subforum } from 'app/modules/forum/subforum/subforum.model';
import { Router } from '@angular/router';
import { SubforumService } from 'app/modules/forum/subforum/subforum.service';
import { throwError } from 'rxjs';

@Component({
    selector     : 'help-center-guides',
    templateUrl  : './guides.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HelpCenterGuidesComponent implements OnInit, OnDestroy
{
    guideCategories: GuideCategory[];
    private _unsubscribeAll: Subject<any> = new Subject();
    createSubforumForm: FormGroup;
    subforumModel: Subforum;
    alert: any;
    currentUserString = localStorage.getItem('currentUser');
    currentUser = JSON.parse(this.currentUserString);
    token: string;

    /**
     * Constructor
     */
    constructor(
        private _helpCenterService: HelpCenterService,
        private router: Router,
        private subforumService: SubforumService
    )
    {
        this.createSubforumForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            file: new FormControl(null) // Add file FormControl for image upload
        });
        this.subforumModel = {
            name: '',
            description: '',
            email: ''
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the Guide categories
        this._helpCenterService.guides$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((guideCategories) => {
                this.guideCategories = guideCategories;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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

    discard(): void {
        this.router.navigateByUrl('/');
    }

    createSubforum() {
        this.subforumModel.name = this.createSubforumForm.get('title')
        .value;
        this.subforumModel.description = this.createSubforumForm.get('description')
        .value;
        this.subforumModel.email = this.currentUser.email;
        this.subforumService.createSubforum(this.subforumModel).subscribe(data => {
          this.router.navigateByUrl('/help-center/faqs');
        }, error => {
          throwError(error);
        })
      }

    
}
