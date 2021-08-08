import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import _ from 'lodash';

import { ICountry, IRegion } from '../../../../types/ICountry';
import CountryRegionData from 'country-region-data/data.json';

interface IYear {
	id: number;
	value: number;
}
@Component({
	selector: 'setup',
	templateUrl: './setup.component.html',
	styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
	public countries: ICountry[];
	public country: ICountry | undefined;
	public region: IRegion | undefined;
	public selectedCountry = '';
	public selectedRegion = '';
	public selectedYear = 2021;
	public isDataFound = false;
	public years: IYear[] = [];

	dataSets = [
		{ aID: 0, aName: 'Dataset 1' },
		{ aID: 1, aName: 'Dataset 2' },
		{ aID: 2, aName: 'Dataset 3' },
		{ aID: 3, aName: 'Dataset 4' },
	];

	landuse = false;
	trafic = false;
	buildings = false;
	consumption = false;
	territorial = true;
	selectAll = false;
	setupForm = new FormGroup({
		country: new FormControl(0),
		area: new FormControl(),
		year: new FormControl(),
		name: new FormControl('test'),
		id: new FormControl('test'),
		dataset: new FormControl(),
	});

	constructor() {
		this.countries = CountryRegionData as ICountry[];
		for (let i = 2021; i <= 2050; i++) {
			this.years.push({ id: i, value: i });
		}
	}

	checkAll(checked: boolean): void {
		this.selectAll = checked;
		this.landuse = checked;
		this.buildings = checked;
		this.consumption = checked;
		this.trafic = checked;
	}

	onSubmit(): void {
		console.warn(this.setupForm.value);
	}

	onCountrySelected(): void {
		this.country = _.find(this.countries, {
			countryName: this.selectedCountry,
		});

		this.isDataFound = false;
	}

	onRegionSelected(): void {
		this.region = _.find(this.country?.regions, {
			name: this.selectedRegion,
		});

		if (
			this.selectedCountry === 'Finland' &&
			this.selectedRegion === 'Lappi'
		) {
			this.isDataFound = true;
		}
	}
}
