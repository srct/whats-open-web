import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('toggle-large-bar', [
      state('expanded', style({
		transform: 'translateY(0px)'
      })),
      state('collapsed',   style({
		transform: 'translateY(-400px)'
      })),
      transition('expanded => collapsed', animate('300ms cubic-bezier(.35,0,.61,1)')),
      transition('collapsed => expanded', animate('300ms ease-in-out'))
    ]),
    trigger('toggle-small-bar', [
      state('expanded', style({
      })),
      state('collapsed',   style({
      })),
      transition('expanded => collapsed', animate('300ms 270ms ease-out')),
      transition('collapsed => expanded', animate('300ms ease-out'))
   ])
  ]
})
  export class NavBarComponent implements OnInit {
	expanded:string = 'collapsed';
  constructor() { }

  ngOnInit() {
  }
  toggleState():void{
	  if(this.expanded === 'expanded'){
		  this.expanded = 'collapsed';
	  }else{
		  this.expanded = 'expanded';
	  }
	console.log('something happened')
  }

}
