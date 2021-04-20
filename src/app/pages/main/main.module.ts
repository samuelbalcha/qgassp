import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
];

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPageModule {}
