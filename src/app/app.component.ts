import { Component } from '@angular/core';
import { DataProviderService } from './data-provider.service';
import { Place } from './place';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	keyframes
} from '@angular/animations';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [DataProviderService],
	animations: [
		trigger('nav-bar-state', [
			state('expanded', style({
				transform: 'translateY(325px)',
			})),
			state('collapsed', style({
				transform: 'translateY(0px)',
			})),
			transition('expanded => collapsed', animate('250ms cubic-bezier(.35,0,.61,1)')),
			transition('collapsed => expanded', animate('250ms ease-in-out'))
		])
	]
})
export class AppComponent {
	navState='expanded';
	toggleNavState(event): void {
		if (event === 'expanded') {
			this.navState = 'expanded';

		} else {
			this.navState = 'collapsed';
		}
	}	
}
