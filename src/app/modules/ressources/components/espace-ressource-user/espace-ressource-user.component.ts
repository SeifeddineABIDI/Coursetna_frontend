import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-espace-ressource-user',
  templateUrl: './espace-ressource-user.component.html',
  styleUrls: ['./espace-ressource-user.component.css']
})
export class EspaceRessourceUserComponent implements OnInit {
  resources: any[] = [];
  today: Date = new Date();

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadResourcesByUserId(1); 
  }

  loadResourcesByUserId(userId: number): void {
    this.resourceService.getResourcesByUserId(userId)
      .subscribe(
        (data) => {
          // Trier les ressources par date de publication décroissante
          this.resources = data.sort((a, b) => {
            return new Date(b.dateTlg).getTime() - new Date(a.dateTlg).getTime();
          });
        },
        (error) => {
          console.log(error); 
        }
      );
  }
  
  calculateDaysSince(date: Date): number {
    const millisecondsPerDay = 1000 * 60 * 60 * 24; 
    const publicationDate = new Date(date);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - publicationDate.getTime();
    return Math.floor(differenceInMilliseconds / millisecondsPerDay);
  }
  viewResource(id: number): void {
    window.location.href = `/detailRs/${id}`;
  }
  viewVersion(id: number): void {
    window.location.href = `/delete/${id}/versions/`;
  }
}