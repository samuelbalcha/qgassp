import { Component, Input } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'commercial-step',
	templateUrl: './commercial-step.component.html',
	styleUrls: ['./../../../building-energy.component.scss'],
})
export class CommercialStepComponent {
	@Input() commercialBuildingTypes: any;

	commercialTotalFloorArea = 0;

	addTotal(): void {
		this.commercialTotalFloorArea = _.sumBy(
			this.commercialBuildingTypes,
			'totalFloorArea'
		);
	}
}
