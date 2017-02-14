import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service'
import { Place } from '../place';
@Component({
  selector: 'app-context-bar',
  templateUrl: './context-bar.component.html',
  styleUrls: ['./context-bar.component.scss'],
  providers: [DataProviderService]
})
export class ContextBarComponent implements OnInit {
  show: boolean = true;
  data: Place[];
  error: any;
  constructor(private dataProvider: DataProviderService) { }

  ngOnInit() {
    this.dataProvider.getFacilities().subscribe(
      data => { this.data = data },
      error => { this.error = error }
    )
 }
   tempf = function(){
      for(let i = 0; i<this.data.length;i++){
        if(this.data[i].isOpen()){
        console.log(this.data[i].name + ' OPEN: '+ this.data[i].openFor())
      }
      }
   } 

}
