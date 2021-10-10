import { Component } from '@angular/core';

@Component({
	selector: 'transport-baseline',
	templateUrl: './transport-baseline.component.html',
	styleUrls: ['./../transport.component.scss'],
})
export class TransportBaselineComponent {
	public population = 1500;
	public publicTransportationIntensity = [
		{ type: 'Not available', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public privateCarsIntensity = [
		{ type: 'Not cars allowed', factor: 0 },
		{ type: 'Very Low', factor: 0.5 },
		{ type: 'Low', factor: 0.75 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public tramsAndMetroIntensity = [
		{ type: 'Not available', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public publicTransportOnRailsIntensity = [
		{ type: 'No freight traffic on rails', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public freightOnRailsIntensity = [
		{ type: 'No freight traffic on rails', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public freightOnWheelsIntensity = [
		{ type: 'No freight traffic on wheels', factor: 0 },
		{ type: 'Very Low', factor: 0.5 },
		{ type: 'Low', factor: 0.75 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public inlandWaterWaysIntensity = [
		{ type: 'No freight traffic on water', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public selectedTransportOnWheels = {};
	public selectedPrivateCars = {};
	public selectedTramsAndMetro = {};
	public selectedTransportOnRails = {};
	public selectedFreightOnRails = {};
	public selectedFreightOnWheels = {};
	public selectedInlandWaterWay = {};

	constructor() {
		console.log('hi');
	}
}
