import { Component, Input } from '@angular/core';

@Component({
	selector: 'transportation-types',
	templateUrl: './transportation-types.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class TransportationTypesComponent {
	@Input() title = '';

	public publicTransportationDistribution = [
		{ name: 'Bus', value: 0.2 },
		{ name: 'Ferry', value: 0.2 },
		{ name: 'Rail', value: 0.2 },
		{ name: 'River', value: 0.4 },
	];
}
