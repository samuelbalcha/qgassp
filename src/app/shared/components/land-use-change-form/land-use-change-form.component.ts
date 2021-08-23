/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'land-use-change-form',
	templateUrl: './land-use-change-form.component.html',
	styleUrls: ['./land-use-change-form.component.scss'],
})
export class LandUseChangeFormComponent implements OnInit {
	panelOpenState = false;

	constructor() {}

	ngOnInit(): void {}
}
