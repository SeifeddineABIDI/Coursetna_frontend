import { Component } from '@angular/core';
import { Options } from '../../models/options';
import { ResourceService } from '../../services/resource.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Ressource } from '../../models/ressource';

@Component({
  selector: 'app-home-ressource',
  templateUrl: './home-ressource.component.html',
  styleUrls: ['./home-ressource.component.css']
})
export class HomeRessourceComponent {
  options: Options[] = Object.values(Options);
  topRatedResources: Ressource[] = [];

  
  optionImages: { [key in Options]: { name: string; imagePath: string } } = {
    [Options.ARCTIC]: { name: 'ARCTIC', imagePath: 'https://cdn-icons-png.flaticon.com/512/291/291553.png' },
    [Options.DS]: { name: 'DS', imagePath: 'https://media.istockphoto.com/id/1354826805/vector/data-science.jpg?s=612x612&w=0&k=20&c=FKYxpsaWX7H5_DEX4t0dV2o837_aqgoavlIRdIz1jwE=' },
    [Options.SAE]: { name: 'SAE', imagePath: 'https://cdn-icons-png.flaticon.com/512/4191/4191148.png' },
    [Options.INFINI]: { name: 'INFINI', imagePath: 'https://cdn-icons-png.freepik.com/512/8054/8054288.png' },
    [Options.NIDS]: { name: 'NIDS', imagePath: 'https://cdn-icons-png.flaticon.com/512/4260/4260120.png' },
    [Options.TWIN]: { name: 'TWIN', imagePath: 'https://cdn-icons-png.flaticon.com/512/2210/2210153.png' }
  };

  constructor(private router: Router,private ressourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadResources();
   
  }
  

  navigateToOption(option: string): void {
    window.location.href = `/topic/${option}`;
  }
  navigateToRessourceDetail(id: number): void {
    window.location.href = `/ressource/${id}`
  }
  loadResources(): void {
    this.ressourceService.getAllRessources().subscribe(resources => {
      this.topRatedResources = resources.filter(resource => resource.rating === 5);
    });
  }

  getOptionKeys(): Options[] {
    return Object.values(Options);
  }

  getOptionName(option: Options): string {
    return this.optionImages[option].name;
  }

  getOptionImagePath(option: Options): string {
    return this.optionImages[option].imagePath;
  }
}
  

