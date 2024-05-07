import { Component } from '@angular/core';
import { VersionRessource } from '../../models/version-ressource';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionRessourceService } from '../../services/versionRessourceService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-version-delete',
  templateUrl: './version-delete.component.html',
  styleUrls: ['./version-delete.component.css']
})
export class VersionDeleteComponent {
  versions: VersionRessource[] = [];
  ressourceId: number;

  constructor(
    private route: ActivatedRoute,
    private versionService: VersionRessourceService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ressourceId = +params.get('id');
      this.loadVersions();
    });
  }

  loadVersions(): void {
    this.versionService.getAllVersionsByRessourceId(this.ressourceId)
      .subscribe(
        versions => {
          this.versions = versions;
        },
        error => {
          console.log('Une erreur est survenue lors du chargement des versions :', error);
        }
      );
  }

 
  deleteVersion(versionId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.versionService.deleteVersion(versionId)
          .subscribe(
            () => {
              console.log('La version a été supprimée avec succès.');
              window.location.reload();
            },
            error => {
              console.log('Une erreur est survenue lors de la suppression de la version :', error);
            }
          );
      }
    });
  }
  afficherFichier(id: number) {
    this.versionService.telechargerFichier(id).subscribe(
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
  ajouterNouvelleVersion(ressourceId:number){
    window.location.href = `/ajouter-version/${ressourceId}`;
  }

}
