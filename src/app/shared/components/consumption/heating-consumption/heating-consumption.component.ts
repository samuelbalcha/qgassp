import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'heating-consumption',
	templateUrl: './heating-consumption.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class HeatingConsumptionComponent implements OnInit {
	@Input() heatingTypeTitle = 'Existing heating types of the area';
	@Input() electricVehicleShareTitle = 'Existing share of electric vehicles';
	@Input() fuelTypeTitle = 'Existing average fuel type';
	@Input() order = 3;

	public electricity = 10;
	public heatPumps = 30;
	public oil = 2;
	public selectedFuelType: any;
	public fuelType1 = 20;
	public fuelType2 = 30;
	public fuelType3 = 50;
	public fuelTypeTotal = _.sum([
		this.fuelType1,
		this.fuelType2,
		this.fuelType3,
	]);

	public fuelTypes = [
		{ id: 1, name: 'Gasoline' },
		{ id: 2, name: 'Diesel' },
		{ id: 3, name: 'Bio-diesel' },
		{ id: 4, name: 'Ethanol' },
	];

	ngOnInit(): void {
		this.selectedFuelType = this.fuelTypes[0];
	}
}
