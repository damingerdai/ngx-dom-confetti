import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedMaterialModule } from './shared.material.module';
import { ShellComponent } from './shell/shell.component';
import { HighlightCodeDirective } from './directives';

const DECLARATIONS = [NavBarComponent, ShellComponent, HighlightCodeDirective];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],
  exports: [...DECLARATIONS, ReactiveFormsModule, SharedMaterialModule],
})
export class SharedModule { }
