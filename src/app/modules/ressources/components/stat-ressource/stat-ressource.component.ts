import { Component, OnInit } from '@angular/core';
import { statService } from '../../services/stat.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stat-ressource',
  templateUrl: './stat-ressource.component.html',
  styleUrls: ['./stat-ressource.component.css']
})
export class StatRessourceComponent implements OnInit {
  
  constructor(private statService: statService) {} 

  ngOnInit(): void {
    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - today.getDay());

    const endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + (6 - today.getDay()));

    console.log('Début de la semaine :', startOfWeek);
    console.log('Fin de la semaine :', endOfWeek);

  
    this.statService.getResourcesAddedByWeek(startOfWeek, endOfWeek)
    .subscribe(count => {
      console.log('Nombre de ressources ajoutées cette semaine :', count);
  
      const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'], 
          datasets: [{
            label: 'Nombre de ressources ajoutées cette semaine',
            data: [0, 0, 0, 0, 0, count, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
       
      });
    });
  
      this.statService.getResourcesByOption().subscribe(stats => {
        const options = stats.map(stat => stat[0]);
        const counts = stats.map(stat => stat[1]); 
    
        const ctx = document.getElementById('barChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: options, 
                datasets: [{
                    label: 'Nombre de ressources par option',
                    data: counts, 
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
            }
        });
    });
  

  
}
}