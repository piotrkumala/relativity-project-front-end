import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs';
import {
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { addItemToBasket } from '../store/basket/basket.actions';
import { Store } from '@ngrx/store';
import { State } from '../store/state';
import { BasketItem } from '../models/BasketItem';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ItemsList} from "../models/ItemsList";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  loginDisplay = false;
  itemsList: BasketItem[] = [];
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private store: Store<State>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS,
        ),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None,
        ),
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
    this.http.get(environment.itemsEndpoint)
      .subscribe((data)=> this.itemsList = (data as ItemsList[]).map(x=> ({...x, amount: 1 })))
  }

  setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  addItem(item: BasketItem): void {
    this.store.dispatch(addItemToBasket({ item: item }));
  }
}
