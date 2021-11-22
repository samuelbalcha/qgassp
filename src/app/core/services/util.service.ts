/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
	getName(selectedModule: string): string {
		const tabNames: any = {
			landuse: 'Land use change',
			buildings: 'Building energy use',
			transport: 'Transport',
			consumption: 'Consumption based',
		};

		return tabNames[`${selectedModule}`] as string;
	}

	getColumns(tableData: any): any[] {
		const columns = tableData
			.reduce((columns: any, row: {}) => {
				return [...columns, ...Object.keys(row)];
			}, [])
			.reduce((columns: string | any[], column: any) => {
				return columns.includes(column)
					? columns
					: [...columns, column];
			}, []);

		return columns.map((column: string | number) => {
			return {
				columnDef: column,
				header: column,
				cell: (element: any): any =>
					`${element[column] ? element[column] : ``}`,
			};
		});
	}
}
