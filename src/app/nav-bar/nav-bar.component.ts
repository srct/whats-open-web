import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
				transform: 'translateY(0px)',
				zIndex: '1'
			})),
			state('collapsed', style({
				transform: 'translateY(-400px)',
				zIndex: '1000'
			})),
			transition('expanded => collapsed', animate('250ms cubic-bezier(.35,0,.61,1)')),
			transition('collapsed => expanded', animate('250ms ease-in-out'))
		]),
		trigger('toggle-small-bar', [
			state('expanded', style({
				backgroundColor: 'transparent'
			})),
			state('collapsed', style({
				backgroundColor: '#006633'
			})),
			transition('expanded => collapsed', animate('250ms 250ms ease-out')),
			transition('collapsed => expanded', animate('250ms ease-out'))
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
				opacity: '100'
			})),
			transition('expanded => collapsed', animate('150ms 100ms ease-out')),
			transition('collapsed => expanded', animate('150ms ease-out'))
		])



	]
})
export class NavBarComponent implements OnInit {
	state = 'collapsed';
	@Output() navState: EventEmitter<string> = new EventEmitter<string>();
	constructor() { }

	ngOnInit() {
		this.navState.emit(this.state);
	}
	toggleState(): void {
		if (this.state === 'expanded') {
			this.state = 'collapsed';
			this.navState.emit(this.state);

		} else {
			this.state = 'expanded';
			this.navState.emit(this.state);
		}
	}

}
