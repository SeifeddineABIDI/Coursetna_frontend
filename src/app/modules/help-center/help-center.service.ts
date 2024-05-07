import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { FaqCategory, Guide, GuideCategory } from 'app/modules/help-center/help-center.type';
import { PostModel } from '../forum/shared/post-model.model';
import { Subforum } from '../forum/subforum/subforum.model';
import { SubforumService } from '../forum/subforum/subforum.service';

@Injectable({
    providedIn: 'root'
})
export class HelpCenterService
{
    private _faqs: ReplaySubject<FaqCategory[]> = new ReplaySubject<FaqCategory[]>(1);
    private _guides: ReplaySubject<GuideCategory[]> = new ReplaySubject<GuideCategory[]>(1);
    private _guide: ReplaySubject<Guide> = new ReplaySubject<Guide>(1);
    private baseUrl = 'http://localhost:9000/pidev/posts';
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }
    
    getAllPosts(token:string): Observable<Array<PostModel>> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });   
        return this._httpClient.get<Array<PostModel>>('http://localhost:9000/pidev/posts', { headers });
      }

    getAllPostsInteractive(token:string): Observable<Array<PostModel>> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
        return this._httpClient.get<Array<PostModel>>('http://localhost:9000/pidev/posts/most-interactive', { headers });
      }

    getAllSubforums(): Observable<Array<Subforum>> {
        return this._httpClient.get<Array<Subforum>>('http://localhost:9000/pidev/subforums');
      }
    
    getPostsBySubforum(subforumId: number): Observable<PostModel[]> {
        return this._httpClient.get<PostModel[]>(`${this.baseUrl}/by-subforum/${subforumId}`);
      }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for FAQs
     */
    get faqs$(): Observable<FaqCategory[]>
    {
        return this._faqs.asObservable();
    }

    /**
     * Getter for guides
     */
    get guides$(): Observable<GuideCategory[]>
    {
        return this._guides.asObservable();
    }

    /**
     * Getter for guide
     */
    get guide$(): Observable<GuideCategory>
    {
        return this._guide.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all FAQs
     */
    getAllFaqs(): Observable<FaqCategory[]>
    {
        return this._httpClient.get<FaqCategory[]>('api/apps/help-center/faqs').pipe(
            tap((response: any) => {
                this._faqs.next(response);
            })
        );
    }

    /**
     * Get FAQs by category using category slug
     *
     * @param slug
     */
    getFaqsByCategory(slug: string): Observable<FaqCategory[]>
    {
        return this._httpClient.get<FaqCategory[]>('api/apps/help-center/faqs', {
            params: {slug}
        }).pipe(
            tap((response: any) => {
                this._faqs.next(response);
            })
        );
    }

    /**
     * Get all guides limited per category by the given number
     *
     * @param limit
     */
    getAllGuides(limit = '4'): Observable<GuideCategory[]>
    {
        return this._httpClient.get<GuideCategory[]>('api/apps/help-center/guides', {
            params: {limit}
        }).pipe(
            tap((response: any) => {
                this._guides.next(response);
            })
        );
    }

    /**
     * Get guides by category using category slug
     *
     * @param slug
     */
    getGuidesByCategory(slug: string): Observable<GuideCategory[]>
    {
        return this._httpClient.get<GuideCategory[]>('api/apps/help-center/guides', {
            params: {slug}
        }).pipe(
            tap((response: any) => {
                this._guides.next(response);
            })
        );
    }

    /**
     * Get guide by category and guide slug
     *
     * @param categorySlug
     * @param guideSlug
     */
    getGuide(categorySlug: string, guideSlug: string): Observable<GuideCategory>
    {
        return this._httpClient.get<GuideCategory>('api/apps/help-center/guide', {
            params: {
                categorySlug,
                guideSlug
            }
        }).pipe(
            tap((response: any) => {
                this._guide.next(response);
            })
        );
    }
}
