import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ItemsListComponent],
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
})
export class ItemsListModule {}
