import { Component,OnInit,Input } from '@angular/core';
import { Chart, registerInteraction } from '@antv/g2';

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
  @Input() set chartData1(item:any){
    this.data = item;
    this.initChart1();
  }

 ngOnInit(): void{
 
 }

 initChart(){

  const chart = new Chart({
    container: 'container',
    autoFit: true,
    height: 500,
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
    // chart.area().position(‘year*value’);
    chart.line().position('city*students');
    chart.render();
 
 }

 initChart1(){

  const chart1 = new Chart({
    container: 'container1',
    autoFit: true,
    height: 500,
    });
    
    chart1.data(this.data);
    chart1.scale({
    value: {
    min: 10000,
    nice: true,
    },
    year: {
    range: [0, 1],
    },
    });
    chart1.tooltip({
    showCrosshairs: true,
    shared: true,
    });
    chart1.axis('value', {
    label: {
    formatter: (val) => {
    return (+val / 10000).toFixed(1) + 'k';
    },
    },
    });
    // chart.area().position(‘year*value’);
    chart1.interval().position('city*students');
    chart1.render();
 
 }


}
