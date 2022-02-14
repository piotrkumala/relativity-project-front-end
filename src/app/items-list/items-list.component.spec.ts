import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListComponent } from './items-list.component';
import { MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../../environments/environment';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  const initialState = { basket: { items: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsListComponent],
      imports: [
        MsalModule.forRoot(
          new PublicClientApplication({
            auth: {
              clientId: environment.clientId,
              authority: environment.tenantId, // This is your tenant ID
              redirectUri: environment.redirectUrl, // This is your redirect URI
            },
            cache: {
              cacheLocation: 'localStorage',
              storeAuthStateInCookie: false, // Set to true for Internet Explorer 11
            },
          }),
          {
            interactionType: InteractionType.Redirect, // MSAL Guard Configuration
            authRequest: {
              scopes: ['user.read'],
            },
          },
          {
            interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
            protectedResourceMap: new Map([
              ['https://graph.microsoft.com/v1.0/me', ['user.read']],
            ]),
          },
        ),
        HttpClientTestingModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
