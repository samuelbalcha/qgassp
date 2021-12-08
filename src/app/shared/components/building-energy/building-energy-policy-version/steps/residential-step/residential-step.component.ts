import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'residential-step',
	templateUrl: './residential-step.component.html',
	styleUrls: ['./../../../building-energy.component.scss'],
})
export class ResidentialStepComponent implements OnInit {
	@Input() residentialBuildingTypes: any;

	ngOnInit(): void {}

	onNewConstructionChange(_event: any): void {
		console.log('updated new construction', _event);
	}

	onRetrofitChange(_event: any): void {
		console.log('updated retrofit', _event);
	}
}
