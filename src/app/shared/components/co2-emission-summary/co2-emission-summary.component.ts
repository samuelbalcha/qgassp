/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'co2-emission-summary',
	templateUrl: './co2-emission-summary.component.html',
	styleUrls: ['./co2-emission-summary.component.scss'],
})
export class Co2EmissionSummaryComponent implements OnInit {
	@Input() isBaseLine = false;
	@Input() tableTitle = '';
	@Input() showHeader = false;
	@Input() tableData: any;
	@Input() tableDataTotal = 0;

	columns: any[] = [];
	displayedColumns: any[] = [];
	dataSource: any;
	showFooter = true;

	ngOnInit() {
		const columns = this.tableData
			.reduce((columns: any, row: {}) => {
				return [...columns, ...Object.keys(row)];
			}, [])
			.reduce((columns: string | any[], column: any) => {
				return columns.includes(column)
					? columns
					: [...columns, column];
			}, []);

		this.columns = columns.map((column: string | number) => {
			return {
				columnDef: column,
				header: column,
				cell: (element: any) =>
					`${element[column] ? element[column] : ``}`,
			};
		});

		this.displayedColumns = this.columns.map((c) => c.columnDef);
		this.dataSource = this.tableData;
	}
}
