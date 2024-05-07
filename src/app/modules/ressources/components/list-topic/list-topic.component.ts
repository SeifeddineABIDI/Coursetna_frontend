import { Component } from '@angular/core';
import { Options } from '../../models/options';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { Observable, forkJoin } from 'rxjs';
import { Topic } from '../../models/topic';


@Component({
  selector: 'app-list-topic',
  templateUrl: './list-topic.component.html',
  styleUrls: ['./list-topic.component.css']
})
export class ListTopicComponent {

  option: Options | undefined; 
  topics:  any[] = [];
  resourceCount: number|undefined;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService,private router:Router) { }
  
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const optionString = params.get('option'); 
      if (optionString) {
        const option: Options = Options[optionString as keyof typeof Options]; 
        if (option !== undefined) {
          this.option = option;
          this.loadRessourcesByOptionByTopic(this.option);
        } else {
          console.error('Option invalide:', optionString);
        }
      }
      
    });
   

  }

  loadRessourcesByOptionByTopic(option: string): void {
    this.resourceService.getTopicsByOption(option)
      .subscribe(
        (data: any[]) => {
          console.log('Ressources loaded successfully for option:', option, data);
          const observables = data.map(topic => this.fetchResourceCount(topic.id));
          forkJoin(observables).subscribe(counts => {
            this.topics = data.map((topic, index) => ({
              ...topic,
              resourceCount: counts[index]
            }));
          });
        },
        (error: any) => {
          console.error('Error occurred while loading ressources for option:', option, error);
        }
      );
  }
  
  fetchResourceCount(topicId: number): Observable<number> {
    return this.resourceService.getResourcesCountByTopicId(topicId);
  }
  viewResources(topicId: number): void {
    window.location.href = `/ressources-by-topic/${topicId}`;
  }

}
