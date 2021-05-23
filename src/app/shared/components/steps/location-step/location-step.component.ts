import { Component, OnInit } from '@angular/core';
import CountryRegionData from 'country-region-data/data.json';
import _ from 'lodash';
import { ICountry, IRegion } from '../../../../../types/ICountry';

@Component({
	selector: 'location-step',
	templateUrl: './location-step.component.html',
	styleUrls: ['./../steps.scss'],
})
export class LocationStepComponent {
	public countries: ICountry[];
	public country: ICountry | undefined;
	public selectedCountry = '';
	public selectedRegion = '';
	public region: IRegion | undefined;

	public isDataFound = false;

	constructor() {
		this.countries = CountryRegionData as ICountry[];
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
