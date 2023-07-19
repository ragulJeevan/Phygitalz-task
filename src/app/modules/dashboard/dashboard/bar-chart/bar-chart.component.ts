import { Component,OnInit,Input } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  public data = []
  @Input() set chartData(item:any){
    this.data = item;
    this.initChart();
  }
 

 ngOnInit(): void{
 
 }

 initChart(){
  
  const container = document.getElementById('container');
  if(container){
    container.innerHTML = ''; // Clear previous chart
  }
  const chart = new Chart({
    container: 'container',
    autoFit: true,
    height: 300,
    width:400
    });
    
    chart.data(this.data);
    chart.scale({
    value: {
    min: 10000,
    nice: true,
    },
    year: {
    range: [0, 1],
    },
    });
    chart.tooltip({
    showCrosshairs: true,
    shared: true,
    });
    chart.axis('value', {
    label: {
    formatter: (val) => {
    return (+val / 10000).toFixed(1) + 'k';
    },
    },
    });
    chart.interval().position('city*students').color('city');
    chart.coordinate().transpose();
    chart.render();
    
 
 }




}
