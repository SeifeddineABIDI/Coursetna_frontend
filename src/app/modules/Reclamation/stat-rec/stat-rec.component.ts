// stat-rec.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-stat-rec',
  templateUrl: './stat-rec.component.html',
  styleUrls: ['./stat-rec.component.css']
})
export class StatRecComponent implements OnInit, OnDestroy {
  reclamationsTraitees: number = 0;
  reclamationsNonTraitees: number = 0;
  private statsSubscription: Subscription;

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.fetchStatistics(); // Fetch statistics initially
    // Fetch statistics every 5 seconds
    this.statsSubscription = interval(5000).subscribe(() => {
      this.fetchStatistics();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the interval timer to prevent memory leaks
    if (this.statsSubscription) {
      this.statsSubscription.unsubscribe();
    }
  }

  fetchStatistics() {
    this.reclamationService.stats().subscribe(
      (response: any) => {
        console.log('Received response:', response);
        // Extract statistics from the response text
        const statsText = response;
        const statsArray = statsText.split(','); // Split by comma
        // Extract treated and untreated reclamations from the array
        const treatedStats = statsArray.find(stat => stat.includes('traitées'));
        const untreatedStats = statsArray.find(stat => stat.includes('non traitées'));
        // Extract numerical values from the strings
        this.reclamationsTraitees = parseInt(treatedStats.split(':')[1].trim(), 10);
        this.reclamationsNonTraitees = parseInt(untreatedStats.split(':')[1].trim(), 10);
      },
      (error) => {
        console.error('Failed to fetch statistics:', error);
      }
    );
  }
  
  
  
  
  
}
