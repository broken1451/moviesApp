import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NoPageFoundComponent,
    SidebarComponent,
    HeaderComponent,
    BreadcumbsComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NoPageFoundComponent,
    SidebarComponent,
    HeaderComponent,
    BreadcumbsComponent,
  ],
})
export class SharedModule {}
