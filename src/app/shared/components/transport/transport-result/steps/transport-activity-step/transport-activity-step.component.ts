import { Component, OnInit } from '@angular/core';
import { IYear } from '../../../../../../../../commons/types/IYear';

@Component({
	selector: 'transport-activity-step',
	templateUrl: './transport-activity-step.component.html',
	styleUrls: ['./../../../transport.component.scss'],
})
export class TransportActivityStepComponent implements OnInit {
	public passengerStartYear: IYear = { id: 0, value: 2021 };
	public passengerEndYear: IYear = { id: 0, value: 2021 };

	public freightStartYear: IYear = { id: 0, value: 2021 };
	public freightEndYear: IYear = { id: 0, value: 2021 };
	public modalShareStartYear: IYear = { id: 0, value: 2021 };
	public modalShareEndYear: IYear = { id: 0, value: 2021 };

	public years: IYear[] = [];

	ngOnInit(): void {
		for (let i = 2021; i <= 2050; i++) {
			this.years.push({ id: i, value: i });
		}
	}

	onModelChange(): void {
		console.log(
			'model changed',
			this.passengerStartYear,
			this.passengerEndYear
		);
	}

	onPassangerChange(val: any): void {
		console.log(val);
	}
}
