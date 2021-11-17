import { Component, Input } from '@angular/core';

@Component({
	selector: 'end-use-of-energy',
	templateUrl: './end-use-of-energy.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class EndUseOfEnergyComponent {
	@Input() endUseOfEnergy: any[] = [];

	public getTotal(): number {
		const sumall = this.endUseOfEnergy
			.map((item) => item.amount)
			.reduce((prev, curr) => prev + curr, 0);
		return sumall / 100;
	}
}
