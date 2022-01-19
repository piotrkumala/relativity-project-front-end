import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MsalModule } from '@azure/msal-angular';
import { HeaderModule } from './header/header.module';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../environments/environment';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  const initialState = { basket: { items: [] } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HeaderModule,
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
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
