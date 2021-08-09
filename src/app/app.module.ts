import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
//import { AuthButtonComponent } from './auth-button/auth-button.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModuleLoaderComponent } from './pages/main/module-loader/module-loader.component';
import { SelectorsComponent } from './shared/components/selectors/selectors.component';
import { ResultAndVersionComponent } from './pages/main/result-and-version/result-and-version.component';

@NgModule({
	declarations: [AppComponent, ModuleLoaderComponent, SelectorsComponent, ResultAndVersionComponent],
	imports: [
		FlexLayoutModule,
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		SharedModule,
		CoreModule.forRoot(),
		ToastrModule.forRoot({ positionClass: 'inline' }),
		ToastContainerModule,
		NgxLoadingModule.forRoot({}),
	],
	providers: [
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
