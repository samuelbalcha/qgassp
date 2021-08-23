import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '../../../../../commons/types/IProject';

@Component({
	selector: 'selectors',
	templateUrl: './selectors.component.html',
	styleUrls: ['./selectors.component.scss'],
})
export class SelectorsComponent {
	@Input() myProject: any;
	@Output() selectedValue = new EventEmitter<IProject>();

	selected() {
		this.selectedValue.emit(this.myProject);
	}

	constructor() {}
}
