/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'area-and-population',
	templateUrl: './area-and-population.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class AreaPopulationComponent implements OnInit {
	@Input() areaTypeDefinition = 'Define existing area type';
	@Input() populationDefinition = 'Existing number of population';
	@Input() householdDefinition = 'Existing average size of the household';
	@Input() incomeDefinition = 'Existing average income level';
	@Input() populationSize = 500;
	@Input() householdSize = 4;

	public selectedAreaType: any;
	public selectedIncomeLevel: any;

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

	ngOnInit(): void {
		this.selectedAreaType = this.areaTypes[0];
		this.selectedIncomeLevel = this.incomeLevels[0];
	}
}
