/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import _ from 'lodash';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICountry, IRegion } from '../../../../types/ICountry';
import CountryRegionData from 'country-region-data/data.json';

import { ProjectService } from '../../../core/services/project.service';
import { IProject } from '../../../../../commons/types/IProject';
import { UtilService } from '../../../core/services/util.service';

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
	public region: IRegion | undefined;
	public population: 0 | undefined;
	public selectedCountry = '';

	public selectedYear = 2021;
	public isDataFound = false;
	public years: IYear[] = [];
	public euList = [
		{ country: 'Austria', code: 'AT', vat: 20 },
		{ country: 'Belgium', code: 'BE', vat: 21 },
		{ country: 'Bulgaria', code: 'BG', vat: 20 },
		{ country: 'Croatia', code: 'HR', vat: 25 },
		{ country: 'Cyprus', code: 'CY', vat: 19 },
		{ country: 'Czech Republic', code: 'CZ', vat: 21 },
		{ country: 'Denmark', code: 'DK', vat: 25 },
		{ country: 'Estonia', code: 'EE', vat: 20 },
		{ country: 'Finland', code: 'FI', vat: 24 },
		{ country: 'France', code: 'FR', vat: 20 },
		{ country: 'Germany', code: 'DE', vat: 19 },
		{ country: 'Greece', code: 'GR', vat: 24 },
		{ country: 'Hungary', code: 'HU', vat: 27 },
		{ country: 'Iceland', code: 'IS', vat: 27 },
		{ country: 'Ireland', code: 'IE', vat: 23 },
		{ country: 'Italy', code: 'IT', vat: 22 },
		{ country: 'Latvia', code: 'LV', vat: 21 },
		{ country: 'Liechtenstein', code: 'LI', vat: 21 },
		{ country: 'Lithuania', code: 'LT', vat: 21 },
		{ country: 'Luxembourg', code: 'LU', vat: 17 },
		{ country: 'Malta', code: 'MT', vat: 18 },
		{ country: 'Netherlands', code: 'NL', vat: 21 },
		{ country: 'Norway', code: 'NO', vat: 21 },
		{ country: 'Poland', code: 'PL', vat: 23 },
		{ country: 'Portugal', code: 'PT', vat: 23 },
		{ country: 'Romania', code: 'RO', vat: 19 },
		{ country: 'Slovakia', code: 'SK', vat: 20 },
		{ country: 'Slovenia', code: 'SI', vat: 22 },
		{ country: 'Spain', code: 'ES', vat: 21 },
		{ country: 'Sweden', code: 'SE', vat: 25 },
		{ country: 'Switzerland', code: 'CH', vat: 25 },
		{ country: 'UK', code: 'GB', vat: 25 },
	];
	dataSets = [
		{ aID: 0, aName: 'Dataset 1' },
		{ aID: 1, aName: 'Dataset 2' },
		{ aID: 2, aName: 'Dataset 3' },
		{ aID: 3, aName: 'Dataset 4' },
	];

	landuse = false;
	transport = false;
	buildings = false;
	consumption = false;
	territorial = true;
	selectAll = false;

	setupForm = new FormGroup({
		country: new FormControl(0),
		region: new FormControl(),
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
		private projectService: ProjectService,
		public utilService: UtilService
	) {
		this.countries = CountryRegionData as ICountry[];

		for (let i = 2021; i <= 2050; i++) {
			this.years.push({ id: i, value: i });
		}

		this.project = this.projectService.getDraftProject() as IProject;
	}

	init() {
		this.setupForm.patchValue(this.project);
		this.selectedCountry = this.project.location.country;
	}

	ngOnInit() {
		this.init();
	}

	checkAll(checked: boolean): void {
		this.selectAll = checked;
		this.landuse = checked;
		this.buildings = checked;
		this.consumption = checked;
		this.transport = checked;
	}

	onCountrySelected(): void {
		this.country = _.find(this.countries, {
			countryName: this.selectedCountry,
		});

		this.isDataFound = false;
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
		if (this.transport) {
			this.project.territorial = {
				...this.project.territorial,
				transport: {
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
					baseline: {
						residentialBuildings: {},
						commercialBuildings: {},
						endUseOfEnergy: [],
					},
					baselineResult: {
						residentialBuildings: {
							totalEnergyDemand: 0,
						},
						commercialBuildings: {
							totalEnergyDemand: 0,
						},
						endUseOfEnergy: [],
					},
					versions: [],
				},
			};
		}
	}

	setup(): void {
		if (!this.setupForm.value.name || !this.selectedCountry) {
			this.toastSvc.error(
				'Project error',
				'Fill in the required fields to continue'
			);
			return;
		}

		this.project.name = this.setupForm.value.name;
		this.project.startYear = this.setupForm.value.startYear;
		this.project.population = this.setupForm.value.population;
		this.project.localId = this.setupForm.value.localId;
		this.project.location = {
			country: this.selectedCountry,
			region: '',
		};

		this.getSelectedModule();

		this.projectService.initializeProject(this.project);
		this.router.navigateByUrl('module-loader');
	}

	onSubmit(): void {
		this.setup();
	}
}
