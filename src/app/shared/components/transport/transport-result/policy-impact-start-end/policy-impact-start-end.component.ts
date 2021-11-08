/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { IYear } from '../../../../../../../commons/types/IYear';

@Component({
	selector: 'policy-impact-start-end',
	templateUrl: './policy-impact-start-end.component.html',
	styleUrls: ['../../transport.component.scss'],
})
export class PolicyImpactStartEndComponent implements OnInit {
	@Input() startYear: any;
	@Input() endYear: any;

	public years: IYear[] = [];

	ngOnInit(): void {
		for (let i = 2021; i <= 2050; i++) {
			this.years.push({ id: i, value: i });
		}
	}

	onModelChange(): void {
		console.log('changes', this.startYear, this.endYear);
		//this.startYearChange.emit(this.startYear);
		//this.endYearChange.emit(this.endYear);
	}
}
