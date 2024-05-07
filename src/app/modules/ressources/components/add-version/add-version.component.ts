import { Component, OnInit } from '@angular/core';
import { VersionRessource } from '../../models/version-ressource';
import { VersionRessourceService } from '../../services/versionRessourceService.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-version',
  templateUrl: './add-version.component.html',
  styleUrls: ['./add-version.component.css']
})

export class AddVersionComponent implements OnInit {
  resourceId: number;
  selectedFile: File | null = null;
  newVersion: any = {}; 
  titreDeLaRessource: string = "";

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private versionService: VersionRessourceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.resourceId = +params.get('id');
    });
  }

  ajouterVersion(): void {
    if (!this.selectedFile || !this.resourceId || !this.newVersion.versionName) {
      console.error('Erreur: Veuillez remplir tous les champs.');
      Swal.fire({
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('ressourceId', this.resourceId.toString());
    formData.append('versionName', this.newVersion.versionName);
  
    this.http.post<any>('http://localhost:9000/pidev/version/create', formData)
      .subscribe(
        (response) => {
          const nouvelleVersion = response;
          this.versionService.getAllVersionsByRessourceId(this.resourceId).subscribe(
            (versions) => {
              versions.unshift(nouvelleVersion);
              Swal.fire({
                title: 'Succès',
                text: 'La version a été ajoutée avec succès !',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              setTimeout(() => {
                this.navigateToVersion(this.resourceId);
              }, 2000);
            },
            (error) => {
              console.error('Erreur lors de la récupération des versions :', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la version :', error);
        }
      );
  }
  
navigateToVersion(id:number) :void{
  window.location.href = `/ressources/${id}/versions`;

}
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
