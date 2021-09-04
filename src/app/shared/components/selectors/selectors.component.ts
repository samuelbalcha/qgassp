/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '../../../../../commons/types/IProject';

@Component({
	selector: 'selectors',
	templateUrl: './selectors.component.html',
	styleUrls: ['./selectors.component.scss'],
})
export class SelectorsComponent {
	@Input() myProject: any;
	@Output() selectedValue: any;

	selected(): void {
		this.selectedValue.emit(this.myProject);
	}

	constructor() {
		this.selectedValue = new EventEmitter<IProject>();
	}
}
