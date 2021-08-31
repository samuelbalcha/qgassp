import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';

@Component({
	selector: 'consumption',
	templateUrl: './consumption.component.html',
	styleUrls: ['./consumption.component.scss'],
})
export class ConsumptionComponent {
	public isLinear = false;

	public areaTypes = [
		{ aID: 1, aName: 'Rural' },
		{ aID: 2, aName: 'Town' },
		{ aID: 3, aName: 'City' },
		{ aID: 4, aName: 'Other / mixed type' },
	];

	public incomeLevels = [
		{ id: 1, name: 'Top 20%' },
		{ id: 2, name: '20% - 40%' },
		{ id: 3, name: '40% - 60%' },
		{ id: 4, name: '60% - 80%' },
		{ id: 5, name: 'Bottom 20%' },
	];

	public fuelTypes = [
		{ id: 1, name: 'Gasoline' },
		{ id: 2, name: 'Diesel' },
		{ id: 3, name: 'Bio-diesel' },
		{ id: 4, name: 'Ethanol' },
	];

	public selectedFuelType;
	public selectedAreaType;
	public existingPopulation = 50000;
	public existingHouseholdSize = 2.5;
	public selectedIncomeLevel;
	public publicTransportation = 45;
	public privateCars = 30;
	public electricVehicle = 10;
	public electricity = 10;
	public heatPumps = 20;
	public oil = 20;
	public totalFuelConsumption = 100;
	public fuelType1 = 20;
	public fuelType2 = 30;
	public fuelType3 = 50;

	public firstFormGroup: FormGroup = new FormGroup({
		firstCtrl: new FormControl('', Validators.required),
	});

	public secondFormGroup: FormGroup = new FormGroup({
		firstCtrl: new FormControl('', Validators.required),
	});

	constructor(
		private router: Router,
		private projectService: ProjectService
	) {
		this.selectedAreaType = this.areaTypes[0];
		this.selectedIncomeLevel = this.incomeLevels[0];
		this.selectedFuelType = this.fuelTypes[0];
	}

	createBaseline(): void {
		console.log(this.projectService.project);
		this.router.navigateByUrl('result-version');
	}
}
