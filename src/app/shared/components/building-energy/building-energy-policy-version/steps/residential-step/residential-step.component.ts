import { Component, Input } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'residential-step',
	templateUrl: './residential-step.component.html',
	styleUrls: ['./../../../building-energy.component.scss'],
})
export class ResidentialStepComponent {
	@Input() residentialBuildingTypes: any;

	resindetialTotalNumberOfHousingUnits = 0;

	addTotal(): void {
		this.resindetialTotalNumberOfHousingUnits = _.sumBy(
			this.residentialBuildingTypes,
			'numberOfUnits'
		);
	}
}
