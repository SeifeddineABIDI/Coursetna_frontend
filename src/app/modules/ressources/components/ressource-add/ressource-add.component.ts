import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ressource } from '../../models/ressource';
import { ResourceService } from '../../services/resource.service';
import { Categorie } from '../../models/categorie';
import { NgForm } from '@angular/forms';
import { Options } from '../../models/options';
import { Topic } from '../../models/topic';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-ressource-add',
  templateUrl: './ressource-add.component.html',
  styleUrls: ['./ressource-add.component.css']
})
export class RessourceAddComponent implements OnInit {
  @ViewChild('myForm') form!: NgForm;
  @ViewChild('fileInput') fileInput!: ElementRef;
  file: File | undefined;
  description: string | undefined;
  categorie: string | undefined;
  options: string | undefined;
  userId: number = 1; 
  rating: number = 0;
  errorMessage: string | undefined = undefined;
  successMessage: string | undefined;
  categories = Object.values(Categorie).filter(value => typeof value === 'string');
  optionss = Object.values(Options).filter(value => typeof value === 'string');
  ajoutEnCours: boolean = false;
  showConfirmationDialog = false;
  fileContent: string |undefined;
  topicNames: string[] = [];
  selectedTopicName: string = '';
  resource: Ressource | undefined;

  constructor(private ressourceService: ResourceService, private router: Router,private route: ActivatedRoute) { }

  navigateToAddTopic() {
    this.router.navigate(['/addTopic']); 
  }
  confirmAddResource() {
    this.ajoutEnCours = true;
    this.ajouterRessourceConfirm();
 
   
}

cancelAddResource() {
    this.showConfirmationDialog = false;
    this.resetForm();
}
// loadResourceDetails(id: number): void {
//   this.ressourceService.getRessourceById(id).subscribe(
//     (resource: Ressource) => {
//       this.resource= resource; 
//     },
//     (error: any) => {
//       console.error('Erreur lors du chargement des détails de la ressource :', error);
//     }
//   );
// }
  ngOnInit() {
    this.ressourceService.getTopicNames().subscribe(names => {
      this.topicNames = names;
    });
    // this.route.params.subscribe(params => {
    //   const resourceId = +params['id']; 
    //   if (!isNaN(resourceId)) {
    //     this.loadResourceDetails(resourceId);
    //   }
    // });
  }

  deleteFile() {
    this.file = undefined; 
  }

  onFileContenu(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileContent = reader.result as string;
      };
      reader.readAsText(this.file);
    } else {
      this.fileContent = 'No file content available';
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  resetForm() {
    this.file = undefined;
    this.description = undefined;
    this.categorie = undefined;
    this.selectedTopicName = '';
    this.options = undefined;
    this.rating = 0;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  
  
  
  closeError() {
    this.errorMessage = undefined;
  }

  closeSuccess() {
    this.successMessage = undefined;
  }

  ajouterRessource() {
    if (this.file  && this.description && this.categorie && this.options && this.selectedTopicName) {
        this.showConfirmationDialog = true;
    } else {
        this.successMessage = undefined;
	 this.errorMessage = 'Veuillez remplir tous les champs du formulaire.';
    }
}


async ajouterRessourceConfirm() {
  try {
    const newResource = await this.ressourceService.uploadFile(this.file!,this.description!, this.categorie!, this.options!, this.userId, this.rating, this.selectedTopicName!).toPromise();
    this.navigateToRessourceDetail(newResource.id);
    this.resetForm();
    this.successMessage = 'Ressource ajoutée avec succès !';
    this.errorMessage = undefined;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la ressource:', error);
    this.errorMessage = 'Erreur lors de l\'ajout de la ressource. Veuillez réessayer.';
    this.successMessage = undefined;
  } finally {
    this.ajoutEnCours = false;
    this.showConfirmationDialog = false;
  }
}

 navigateToRessourceDetail(newResource: number): void {
    window.location.href = `/detailRs/${newResource}`
  }

}