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
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DatasetComponent } from './pages/main/dataset/dataset.component';
import { HowitworksComponent } from './pages/main/howitworks/howitworks.component';


@NgModule({
	declarations: [AppComponent, DatasetComponent, HowitworksComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		MatInputModule,
		MatButtonModule,
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
