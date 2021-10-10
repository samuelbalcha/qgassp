/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
	getName(selectedModule: string): string {
		const tabNames: any = {
			landuse: 'Land use change',
			buildings: 'Building energy use',
			traffic: 'Transport',
			consumption: 'Consumption based',
		};

		return tabNames[`${selectedModule}`] as string;
	}
}
