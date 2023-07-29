import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedMaterialModule } from './shared.material.module';
import { ReactiveFormsModule } from '@angular/forms';

const DECLARATIONS = [
  NavBarComponent
]

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ],
  exports: [
    ...DECLARATIONS,
    ReactiveFormsModule,
    SharedMaterialModule
  ]
})
export class SharedModule { }
