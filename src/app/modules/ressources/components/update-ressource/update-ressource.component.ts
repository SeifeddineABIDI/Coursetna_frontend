import { Component, OnInit } from '@angular/core';
import { Ressource } from '../../models/ressource';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-update-ressource',
  templateUrl: './update-ressource.component.html',
  styleUrls: ['./update-ressource.component.css']
})
export class UpdateRessourceComponent implements OnInit {

  ressourceToUpdate: Ressource = new Ressource();
  errorMessage: string | undefined;
  successMessage: string | undefined;
  ressourceId: number | null = null; 
  

  constructor(private route: ActivatedRoute, private ressourceService: ResourceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ressourceId = Number(id);
        this.loadRessourceToUpdate(this.ressourceId);
      }
    });
  }

  loadRessourceToUpdate(ressourceId: number): void {
    this.ressourceService.getRessourceById(ressourceId)
      .subscribe(
        (ressource: Ressource) => {
          this.ressourceToUpdate = ressource;
        },
        (error: any) => {
          console.error('Error loading ressource to update:', error);
          this.errorMessage = 'Failed to load ressource to update.';
        }
      );
  }

  updateRessource(): void {
    this.ressourceService.updateRessource(this.ressourceToUpdate)
      .subscribe(
        (updatedRessource: Ressource) => {
          this.successMessage = 'Ressource updated successfully.';
        },
        (error: any) => {
          console.error('Error updating ressource:', error);
          this.errorMessage = 'Failed to update ressource.';
        }
      );
  }
}