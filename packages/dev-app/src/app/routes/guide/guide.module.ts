import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    GuideComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GuideRoutingModule
  ]
})
export class GuideModule { }
