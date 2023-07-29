import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedMaterialModule } from './shared.material.module';

const DECLARATIONS = [
  NavBarComponent
]

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    ...DECLARATIONS,
    SharedMaterialModule
  ]
})
export class SharedModule { }
