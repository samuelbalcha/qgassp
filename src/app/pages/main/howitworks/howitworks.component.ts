import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'howitworks',
	templateUrl: './howitworks.component.html',
	styleUrls: ['./howitworks.component.scss'],
})
export class HowitworksComponent implements OnInit {
	public safeURL;

	constructor(private _sanitizer: DomSanitizer) {
		this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
			'https://www.youtube.com/embed/BcMUDxOC5Tg'
		);
	}

	ngOnInit(): void {}
}
