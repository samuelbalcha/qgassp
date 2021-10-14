/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'area-and-population',
	templateUrl: './area-and-population.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class AreaPopulationComponent implements OnInit {
	@Input() areaTypeDefinition = 'What is the type of urban environment?';
	@Input() populationDefinition = 'What is the population of the area?';
	@Input() householdDefinition = 'What is the average household size';
	@Input() incomeDefinition =
		'What is the relative income level of the households?';
	@Input() populationSize = 500;
	@Input() householdSize = 4;

	public selectedAreaType: any;
	public selectedIncomeLevel: any;
	public selectedTargetArea: any;

	public showPolicyQuestions = false;
	public yearOfIntroduction = 2021;

	public targetAreas = [
		{ aID: 1, aName: 'New area' },
		{ aID: 2, aName: 'Partially new area' },
		{ aID: 3, aName: 'Existing area' },
	];

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

	public globalDecarbonization = 10;

	ngOnInit(): void {
		this.selectedAreaType = this.areaTypes[0];
		this.selectedIncomeLevel = this.incomeLevels[0];
		this.selectedTargetArea = this.targetAreas[0];
		this.onTargetAreaSelected();
	}

	onTargetAreaSelected(): void {
		if (this.selectedTargetArea.aID === 1) {
			this.showPolicyQuestions = true;
		} else {
			this.showPolicyQuestions = false;
		}
	}
}
