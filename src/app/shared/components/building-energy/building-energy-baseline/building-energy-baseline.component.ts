import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'building-energy-baseline',
	templateUrl: './building-energy-baseline.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyBaselineComponent {
	constructor(private router: Router) {}

	createBaseline(): void {
		this.router.navigateByUrl('result-version');
	}
}
