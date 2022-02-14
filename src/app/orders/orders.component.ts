import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProfileType } from '../models/ProfileType';
import { Order } from '../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(environment.graphEndpoint)
      .subscribe((profile: ProfileType) => {
        const params = new HttpParams().set('userId', profile.id ?? '');
        this.http
          .get(environment.getOrders, { params: params })
          .subscribe((next) => (this.orders = next as Order[]));
      });
  }
}
