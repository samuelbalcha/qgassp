/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
	selector: 'building-energy-policy-version',
	templateUrl: './building-energy-policy-version.component.html',
	styleUrls: ['./../building-energy.component.scss'],
})
export class BuildingEnergyPolicyVersionComponent implements OnInit {
	@Input() version: any;

	constructor() {}

	ngOnInit(): void {}
}
