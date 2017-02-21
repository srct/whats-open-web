import { Component } from '@angular/core';
import { DataProviderService } from './data-provider.service';
import { Place } from './place';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [DataProviderService]
})
export class AppComponent {

}
