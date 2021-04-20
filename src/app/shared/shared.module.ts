import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';

const shared = [HeaderComponent, SideNavComponent, FooterComponent];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...shared],
  exports: [...shared],
  providers: [],
  schemas: [],
})
export class SharedModule {}
