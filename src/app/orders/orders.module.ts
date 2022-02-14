import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, MatListModule],
})
export class OrdersModule {}
