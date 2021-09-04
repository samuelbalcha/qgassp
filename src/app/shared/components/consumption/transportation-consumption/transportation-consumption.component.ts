import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'transportation-consumption',
	templateUrl: './transportation-consumption.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class TransportationConsumptionComponent implements OnInit {
	@Input() modeOfTransportationTitle = 'Existing modes of transport';
	@Input() electricVehicleShareTitle = 'Existing share of electric vehicles';
	@Input() order = 2;

	public publicTransportation = 10;
	public privateCars = 30;
	public electricTransportation = 2;

	ngOnInit(): void {
		console.log('transportation -consumption');
	}
}
