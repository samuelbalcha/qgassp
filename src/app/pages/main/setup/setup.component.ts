/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import _ from 'lodash';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICountry } from '../../../../types/ICountry';
import CountryRegionData from 'country-region-data/data.json';

import { ProjectService } from '../../../core/services/project.service';
import { IProject } from '../../../../../commons/types/IProject';

interface IYear {
	id: number;
	value: number;
}
@Component({
	selector: 'setup',
	templateUrl: './setup.component.html',
	styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
	public countries: ICountry[];
	public country: ICountry | undefined;
	//public region: IRegion | undefined;
	public population: 0 | undefined;
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
	traffic = false;
	buildings = false;
	consumption = false;
	territorial = true;
	selectAll = false;

	setupForm = new FormGroup({
		country: new FormControl(0),
		population: new FormControl(0),
		startYear: new FormControl(),
		name: new FormControl(),
		localId: new FormControl(),
		dataset: new FormControl(),
	});

	public project: IProject;

	constructor(
		private router: Router,
		private toastSvc: ToastrService,
		private projectService: ProjectService
	) {
		console.log(CountryRegionData)

		this.countries = CountryRegionData as ICountry[];

		for (let i = 2021; i <= 2050; i++) {
			this.years.push({ id: i, value: i });
		}

		this.project = this.projectService.getDraftProject() as IProject;
	}

	init() {
		this.setupForm.patchValue(this.project);
		this.selectedCountry = this.project.location.country;
		//this.selectedRegion = this.project.location.region;
	}

	ngOnInit() {
		this.init();
	}

	checkAll(checked: boolean): void {
		this.selectAll = checked;
		this.landuse = checked;
		this.buildings = checked;
		this.consumption = checked;
		this.traffic = checked;
	}

	onCountrySelected(): void {
		this.country = _.find(this.countries, {
			countryName: this.selectedCountry,
		});

		this.isDataFound = false;
	}

	onRegionSelected(): void {
		// this.region = _.find(this.country?.regions, {
		// 	name: this.selectedRegion,
		// });
		/*
		if (
			this.selectedCountry === 'Finland' &&
			this.selectedRegion === 'Lappi'
		) {
			this.isDataFound = true;
		}
		*/
	}

	getSelectedModule() {
		if (this.consumption) {
			this.project['consumption'] = {
				dataSet: {
					default: [],
					custom: [],
				},
				baseline: {},
				versions: [],
			};
		}

		this.project.territorial = {};

		if (this.landuse) {
			this.project.territorial = {
				...this.project.territorial,
				landuse: {
					dataSet: {
						default: [],
						custom: [],
					},
					baseline: {},
					versions: [],
				},
			};
		}
		if (this.traffic) {
			this.project.territorial = {
				...this.project.territorial,
				traffic: {
					dataSet: {
						default: [],
						custom: [],
					},
					baseline: {},
					versions: [],
				},
			};
		}
		if (this.buildings) {
			this.project.territorial = {
				...this.project.territorial,
				buildings: {
					dataSet: {
						default: [],
						custom: [],
					},
					baseline: {},
					versions: [],
				},
			};
		}
	}

	setup(): void {
		if (
			!this.setupForm.value.name ||
			!this.selectedCountry ||
			!this.selectedRegion
		) {
			this.toastSvc.error(
				'Project error',
				'Fill in the required fields to continue'
			);
			return;
		}

		this.project.name = this.setupForm.value.name;
		this.project.startYear = this.setupForm.value.startYear;
		this.project.localId = this.setupForm.value.localId;
		this.project.location = {
			country: this.selectedCountry,
			region: this.selectedRegion,
		};

		this.getSelectedModule();

		console.log('setup-project', this.project);
		this.projectService.initializeProject(this.project);
		this.router.navigateByUrl('module-loader');
	}

	onSubmit(): void {
		this.setup();
	}
}
