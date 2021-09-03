import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'area-and-population',
	templateUrl: './area-and-population.component.html',
	styleUrls: ['./../consumption.component.scss'],
})
export class AreaPopulationComponent implements OnInit {
	ngOnInit(): void {
		console.log('area and population component');
	}
}
