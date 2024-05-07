import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ResourceService } from '../../services/resource.service';


@Component({
  selector: 'star-rating',
  template: `
    <div class="star-rating">
      <span *ngFor="let star of stars" 
            class="star" 
            [class.filled]="star <= rating" 
            (click)="addRating(star)">
        &#9733;
      </span>
    </div>
    <p>{{ message }}</p>
  `,
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  message: string | undefined;
  currentUser: any;


  @Input() rating: number = 0;
  @Input() id: number | null = null; 

  stars: number[] = [1, 2, 3, 4, 5];

  constructor(private resourceService: ResourceService,private changeDetectorRef: ChangeDetectorRef
    ) {}
    
  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));//recuperer l'utilisateur connecté
  }

    addRating(rating: number): void {
      if (this.id !== null) {
        this.resourceService.addRating( this.currentUser.id, this.id, rating).subscribe(
          () => {
            this.changeDetectorRef.detectChanges();
           this.rating = rating ?? 0;
          },
          (error: any) => {
            this.message = 'Failed to add rating.';
            console.error(error);
          }
        );
      } else {
        console.error('No resource selected');
      }
    }
    
}