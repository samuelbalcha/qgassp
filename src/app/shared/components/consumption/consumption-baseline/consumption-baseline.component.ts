import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
	selector: 'consumption-baseline',
	templateUrl: './consumption-baseline.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class ConsumptionBaselineComponent {
	public isLinear = false;

	constructor(
		private router: Router,
		private projectService: ProjectService
	) {
		console.log(projectService.getDraftProject());
	}

	createBaseline(): void {
		console.log(this.projectService.project);
		this.router.navigateByUrl('result-version');
	}
}
