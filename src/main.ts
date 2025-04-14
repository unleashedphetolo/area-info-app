// Import core Angular functions for bootstrapping and provider setup
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// Import routing strategy and Ionic-specific route reuse strategy
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Import HTTP client provider and main application component
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

// Import application routes and router provider
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

// Bootstrap the Angular application using a standalone component structure
bootstrapApplication(AppComponent, {
  providers: [
    // Provide the application's route definitions
    provideRouter(routes),

    // Enable HttpClient for making API requests
    provideHttpClient(), 

    // Import IonicModule with global configuration
    importProvidersFrom(IonicModule.forRoot()),

    // Use Ionic's route reuse strategy for optimized navigation
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
});
