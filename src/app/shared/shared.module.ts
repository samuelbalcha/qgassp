import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';

const shared = [
  HeaderComponent,
  SideNavComponent,
  FooterComponent,
  LocationSelectorComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [...shared],
  exports: [...shared, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [],
  schemas: [],
})
export class SharedModule {}
