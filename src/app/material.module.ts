import { NgModule } from '@angular/core';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [],
  exports:[
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
  ]
})
export class MaterialModule { }


