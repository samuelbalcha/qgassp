/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	NgModule,
	SkipSelf,
	Optional,
	ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ProjectService } from './services/project.service';
import { UtilService } from './services/util.service';

@NgModule({
	imports: [BrowserModule, CommonModule],
	providers: [AuthService, StorageService, ProjectService, UtilService],
})
export class CoreModule {
	static forRoot(): ModuleWithProviders<any> {
		return {
			ngModule: CoreModule,
		};
	}

	constructor(
		@Optional()
		@SkipSelf()
		parentModule: CoreModule
	) {
		if (parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only'
			);
		}
	}
}
