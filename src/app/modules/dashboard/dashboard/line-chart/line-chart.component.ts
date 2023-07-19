import { Component, Input } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  public data = []
  @Input() set chartData(item:any){
    this.data = item;
    this.initChart();
  }

  initChart(){

    const container1 = document.getElementById('container1');
    if(container1){
      container1.innerHTML = ''; // Clear previous chart
    }

    const chart = new Chart({
      container: 'container1',
      autoFit: true,
      height: 500,
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
      // chart.area().position(‘year*value’);
      // chart.line().position('city*students');
      chart.line().position('students*city');
      chart.render();
   
   }
}
