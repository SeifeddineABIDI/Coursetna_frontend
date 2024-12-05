import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HelpCenterService } from 'app/modules/help-center/help-center.service';
import { FaqCategory, GuideCategory } from 'app/modules/help-center/help-center.type';
import { PostModel } from '../forum/shared/post-model.model';

@Injectable({
    providedIn: 'root'
})
export class HelpCenterMostAskedFaqsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _helpCenterService: HelpCenterService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<PostModel>>
    {
        return this._helpCenterService.getAllPostsInteractive();
    }
    
}

@Injectable({
    providedIn: 'root'
})
export class HelpCenterFaqsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _helpCenterService: HelpCenterService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<PostModel>>
    {
        return this._helpCenterService.getAllPosts();
    }
}

@Injectable({
    providedIn: 'root'
})
export class HelpCenterGuidesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _helpCenterService: HelpCenterService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuideCategory[]>
    {
        return this._helpCenterService.getAllGuides();
    }
}

@Injectable({
    providedIn: 'root'
})
export class HelpCenterGuidesCategoryResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _helpCenterService: HelpCenterService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuideCategory[]>
    {
        return this._helpCenterService.getGuidesByCategory(route.paramMap.get('categorySlug'));
    }
}

@Injectable({
    providedIn: 'root'
})
export class HelpCenterGuidesGuideResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _helpCenterService: HelpCenterService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuideCategory>
    {
        return this._helpCenterService.getGuide(route.parent.paramMap.get('categorySlug'), route.paramMap.get('guideSlug'));
    }
}
