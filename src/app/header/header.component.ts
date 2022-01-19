import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { environment } from '../../environments/environment';
import { State } from '../store/state';
import { Store } from '@ngrx/store';
import { BasketItem } from '../models/BasketItem';
import { removeItemFromBasket } from '../store/basket/basket.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Relativity Project';
  loginDisplay = false;
  basketItems: BasketItem[] = [];
  private readonly _destroying$ = new Subject<void>();
  private subscription: Subscription = new Subscription();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.broadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None,
        ),
        takeUntil(this._destroying$),
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });

    this.subscription = this.store.select('basket').subscribe((basket) => {
      if (!basket) return;
      this.basketItems = basket.items;
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
    this.subscription.unsubscribe();
  }

  login(): void {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }
  private setLoginDisplay(): void {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  logout(): void {
    // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.logoutRedirectUrl,
    });
  }

  removeItemFromBasket(item: BasketItem): void {
    this.store.dispatch(removeItemFromBasket({ item: item }));
  }
}
