import { Component } from '@angular/core';
import { IProject } from '../../../../../../commons/types/IProject';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
	selector: 'transport-baseline-v2',
	templateUrl: './transport-baseline-v2.component.html',
	styleUrls: ['./../transport.component.scss'],
})
export class TransportBaselineV2Component {
	public passengerRoadTransport = [
		{ type: 'Not available', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public freightRoadTransport = [
		{ type: 'Not available', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public freightRailsTransport = [
		{ type: 'Not available', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public freightInlandWaterwaysTransport = [
		{ type: 'Not available', factor: 0 },
		{ type: 'Very Low', factor: 0.25 },
		{ type: 'Low', factor: 0.5 },
		{ type: 'Equal to national average', factor: 1 },
		{ type: 'High', factor: 2 },
		{ type: 'Very Hight', factor: 4 },
	];

	public transportEnvironments = [
		{ name: 'City', value: 20 },
		{ name: 'Town', value: 10 },
		{ name: 'Sub-urban', value: 10 },
		{ name: 'Rural', value: 60 },
	];

	public northToSouthDiameter = 100;
	public eastToWestDiameter = 100;

	public selectedPassangerRoadTransport = {};
	public selectedFreightRoadTransport = {};
	public selectedFreightRailsTransport = {};
	public selectedFreightWaterwaysTransport = {};

	public project: IProject;

	constructor(private projectService: ProjectService) {
		this.project = this.projectService.getDraftProject() as IProject;
		console.log('Project-transport', this.project);
	}
}
