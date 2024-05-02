import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit  {
  listreclamation: any;
  reclamationsTraitees: number = 0;
  reclamationsNonTraitees: number = 0;
  id : any ; 
  reclam:any ; 
  reponse : any ;
  constructor(
    private listrec: ReclamationService,
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute

    ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.getByid(this.id);
    this.getallreclmationbyUSER();
  
  }


  getallreclmationbyUSER() {
    const userid = 2;
    this.listrec.getallreclamationbyUSER(userid).subscribe((res: any) => {
      this.listreclamation = res;
      console.log('liste by user', this.listreclamation);
    });
  }

  getByid(id: any) {
    this.listrec.getonereclamation(id).subscribe(
        (res: any) => {
            this.reclam = res; // Assurez-vous d'avoir une variable "reclam" dans votre composant pour stocker les détails de la réclamation
            console.log('Reclamation details:', this.reclam);
        },
        (error: any) => {
            console.error('Failed to fetch reclamation details:', error);
            // Handle the error
        }
    );
}

  reloadPage() {
    window.location.reload();
  }

  
  
}
