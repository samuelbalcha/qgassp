import { Component, OnInit } from '@angular/core';
import CountryRegionData from 'country-region-data/data.json';
import * as _ from 'lodash';
import { ICountry } from '../../../../types/ICountry';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent implements OnInit {
  public countries = CountryRegionData as ICountry[];
  public country: any;
  public selectedCountry = '';
  public selectedRegion = '';
  public region: any;

  public isDataFound = false;

  constructor() {}

  ngOnInit() {}

  onCountrySelected(_event: any) {
    this.country = _.find(this.countries, {
      countryName: this.selectedCountry,
    });

    this.isDataFound = false;
  }

  onRegionSelected(_event: any) {
    this.region = _.find(this.country.regions, {
      name: this.selectedRegion,
    });
    console.log('region', this.region);
    if (this.selectedCountry === 'Finland' && this.selectedRegion === 'Lappi') {
      this.isDataFound = true;
    }
  }
}
