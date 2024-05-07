import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionRessource } from '../../models/version-ressource';
import { VersionRessourceService } from '../../services/versionRessourceService.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-version-ressource',
  templateUrl: './version-ressource.component.html',
  styleUrls: ['./version-ressource.component.css']
})
export class VersionRessourceComponent implements OnInit{
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
    this.versionService.deleteVersion(versionId)
      .subscribe(
        () => {
          console.log('La version a été supprimée avec succès.');
          this.loadVersions();
        },
        error => {
          console.log('Une erreur est survenue lors de la suppression de la version :', error);
        }
      );
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
