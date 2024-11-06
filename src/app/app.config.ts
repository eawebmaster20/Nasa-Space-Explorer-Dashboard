import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { boardReducer } from './shared/store/store.reducers';
import { BoardEffects } from './shared/store/store.effects';
import { apiKeyInterceptor } from './shared/services/interceptors/api-key.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(withFetch(), withInterceptors([apiKeyInterceptor])), 
    
    provideStore(),
    provideHttpClient(withFetch()),
    provideState({
      name: 'store',
      reducer: boardReducer,
    }),
    provideStoreDevtools({maxAge:25, logOnly: false}),
  ]
};
