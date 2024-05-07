import { Component, OnInit } from '@angular/core';
import { Ressource } from '../../models/ressource';
import { Options } from '../../models/options';
import { ResourceService } from '../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../models/categorie';


@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css']
})



export class RessourceListComponent implements OnInit {

  ressources: any[] = [];
  option: Options | undefined; 
  categorie: Categorie | undefined; 
  topicId: number | undefined;
  ressourcesNonArchived: Ressource[] = [];
  ressourcesArchived: Ressource[] = [];
  filteredResources: Ressource[] = [];
  searchTitle: string = '';
  pageSize: number = 9;
  pageSizeOptions: number[] = [9];

constructor(private route: ActivatedRoute, private resourceService: ResourceService, private router: Router) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.topicId = Number(params.get('topicId'));
    if (this.topicId) {
      this.loadRessourcesByTopic(this.topicId);
    }
  });
}
navigateToRessourceDetail(id: number): void {
  window.location.href = `/ressource/${id}`
}
navigateToVersion(id: number): void {
  window.location.href = `/ressources/${id}/versions`
}
filterResourcesByCategory(category: string): void {
  if (this.topicId) {
    this.resourceService.getRessourcesByCategoryAndTopicId(category, this.topicId).subscribe((resources: any[]) => {
      this.filteredResources = resources;
    });
  } else {
    console.error('ID de sujet non défini.');
  }
}

onPageChange(event: any) {
  const selectedPage = event.pageIndex;
  const pageSize = event.pageSize;
  const startIndex = selectedPage * pageSize;
  const endIndex = startIndex + pageSize;
  this.filteredResources = this.ressourcesNonArchived.slice(startIndex, endIndex);
}

loadRessourcesByTopic(topicId: number): void {
  this.resourceService.getRessourcesByTopic(topicId).subscribe(
    (resources: Ressource[]) => {
      this.ressourcesNonArchived = resources.filter(resource => !resource.archived);
      this.ressourcesArchived = resources.filter(resource => resource.archived);
      
      this.filteredResources = this.ressourcesNonArchived.filter(resource => resource.categorie === 'COURS');
    },
    (error: any) => {
      console.error('Erreur lors du chargement des ressources par sujet :', error);
    }
  );
}

  archiveResource(id: number): void {
    this.resourceService.archiverRessource(id).subscribe(
      () => {
        if (this.topicId !== undefined) {
          this.loadRessourcesByTopic(this.topicId);
        }
      },
      (error: any) => {
        console.error('Erreur lors de l\'archivage de la ressource :', error);
      }
    );
  }

  
  searchResourcesByTitle(): void {
    const searchQuery = this.searchTitle.trim().toLowerCase();
    console.log("salamammmamam : ",searchQuery);
    if (searchQuery) {
      this.filteredResources = this.ressourcesNonArchived.filter(resource => {
      console.log("rererrer",resource.titre.toLowerCase().includes(searchQuery))
      return resource.titre.toLowerCase().includes(searchQuery);
      });
  
    } else {
      if (this.categorie) {
        this.filteredResources = this.ressourcesNonArchived.filter(resource => resource.categorie === this.categorie);
      } else {
        this.filteredResources = this.ressourcesNonArchived;
      }
    }
  }
  
  speakSearchText(): void {
    const searchText = this.searchTitle.trim();
    if (searchText) {
      const speech = new SpeechSynthesisUtterance(searchText);
      speechSynthesis.speak(speech);
    }
  }  
  

  // loadRessourcesByOptionCategory(categorie: Categorie): void {
  //   this.router.navigate(['list', categorie]); 
  // }


  
  
  }
  
  
  
  

  
  
 

