import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})


export class HeaderComponent {
	isAuthenticated = false;
	constructor(private authService: AuthService) { }

	ngOnInit(): void {

		this.isAuthenticated = !!this.authService.getCurrentUser();

		console.log(this.authService.getCurrentUser())
	}
}

