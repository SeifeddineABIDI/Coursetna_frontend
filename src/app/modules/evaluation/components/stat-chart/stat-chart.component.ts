import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.scss']
})
export class StatChartComponent implements OnInit {
  @Input() totalCorrectAnswers: number = 0;
  @Input() TotalAnswers: number = 0;

  chart: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createChart(): void {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (context) {
      this.chart = new this.chart(context, {
        type: 'pie',
        data: {
          labels: ['Correct Answers', 'Total Answers'],
          datasets: [{
            data: [this.totalCorrectAnswers, this.TotalAnswers],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }
}