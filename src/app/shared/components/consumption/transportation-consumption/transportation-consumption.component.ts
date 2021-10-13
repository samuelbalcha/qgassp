import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'transportation-consumption',
	templateUrl: './transportation-consumption.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class TransportationConsumptionComponent implements OnInit {
	public publicTransportationDistribution = [
		{ name: 'Bus', value: 0.2 },
		{ name: 'Ferry', value: 0.2 },
		{ name: 'Rail', value: 0.2 },
		{ name: 'River', value: 0.4 },
	];

	ngOnInit(): void {
		console.log('transportation -consumption');
	}
}
