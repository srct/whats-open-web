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
			state('collapsed', style({
				transform: 'translateY(-400px)'
			})),
			transition('expanded => collapsed', animate('300ms cubic-bezier(.35,0,.61,1)')),
			transition('collapsed => expanded', animate('300ms ease-in-out'))
		]),
		trigger('toggle-small-bar', [
			state('expanded', style({
				backgroundColor: 'transparent',
				zIndex: '1'
			})),
			state('collapsed', style({
				backgroundColor: '#006633',
				zIndex: '0'
			})),
			transition('expanded => collapsed', animate('250ms 270ms ease-out')),
			transition('collapsed => expanded', animate('300ms ease-out'))
		]),
		trigger('toggle-links', [
			state('expanded', style({
				color: '#354052',
				transform: 'translate(-50%,-50%)'
			})),
			state('collapsed', style({
				color: '#ffffff',
				transform: 'translate(-50%,-50%) translateX(15%)'
			})),
			transition('expanded => collapsed', animate('150ms ease-out')),
			transition('collapsed => expanded', animate('150ms ease-out'))
		]),
		trigger('toggle-logo-and-text', [
			state('expanded', style({
				opacity: '0'
			})),
			state('collapsed', style({
				opacity: '1'
			})),
			transition('expanded => collapsed', animate('150ms ease-out')),
			transition('collapsed => expanded', animate('150ms ease-out'))
		])



	]
})
export class NavBarComponent implements OnInit {
	expanded: string = 'expanded';
	constructor() { }

	ngOnInit() {
	}
	toggleState(): void {
		if (this.expanded === 'expanded') {
			this.expanded = 'collapsed';
		} else {
			this.expanded = 'expanded';
		}
		console.log('something happened')
	}

}
