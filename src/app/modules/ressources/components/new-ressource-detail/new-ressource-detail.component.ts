import { Component } from '@angular/core';
import { Ressource } from '../../models/ressource';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-ressource-detail',
  templateUrl: './new-ressource-detail.component.html',
  styleUrls: ['./new-ressource-detail.component.css']
})
export class NewRessourceDetailComponent {
  resource: Ressource | undefined;
  isArchived: boolean = false;


  constructor(
    private route: ActivatedRoute, private resourceService: ResourceService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const resourceId = +params['id'];
      if (!isNaN(resourceId)) {
        this.loadResourceDetails(resourceId);
      }
    });
  }

  loadResourceDetails(id: number): void {
    this.resourceService.getRessourceById(id).subscribe(
      (resource: Ressource) => {
        this.resource = resource;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des détails de la ressource :', error);
      }
    );
  }
  deleteResource(id: number | undefined): void {
    if (id !== undefined) {
        Swal.fire({
            title: 'Confirmation',
            text: 'Êtes-vous sûr de vouloir supprimer cette ressource ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                this.resourceService.removeRessourceById(id).subscribe(
                    response => {
                        console.log(response);
                        Swal.fire('Ressource supprimée', 'La ressource a été supprimée avec succès.', 'success').then(() => {
                            this.router.navigate(['/acceuil']);
                        });
                    },
                    error => {
                        console.error('Erreur lors de la suppression de la ressource:', error);
                    }
                );
            }
        });
    } else {
        console.error('ID de ressource non défini.');
    }
}
  afficherFichier(id: number) {
    this.resourceService.telechargerFichier(id).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Erreur lors du téléchargement du fichier :', error);
      }
    );
  }
  archiverRessource(id: number): void {
    this.resourceService.archiverRessource(id)
      .subscribe(
        (response: any) => {
          console.log(response);
          window.alert('La ressource a été archivée avec succès !'); 
          this.isArchived = true;
        },
        (error: any) => {
          console.error('Erreur lors de l\'archivage de la ressource :', error);
        }
      );
  }
  
  desarchiverRessource(id: number): void {
    this.resourceService.désarchiverRessource(id)
      .subscribe(
        (response: any) => {
          console.log(response);
          window.alert('La ressource a été désarchivée avec succès !'); 
          window.location.reload(); // Recharge la page
          this.isArchived = false; 
        
        },
        (error: any) => {
          console.error('Erreur lors de l\'archivage de la ressource :', error);
        }
      );
  }
  
  

}
