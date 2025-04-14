// Import route definitions and HTTP client provider
import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// Define application routes
export const routes: Routes = [
  {
    path: '', // Root path of the application
    // Lazy load the HomePage component when this route is accessed
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    
    // Provide the HTTP client for use within this standalone component
    providers: [provideHttpClient()] // Ensures HttpClient is available without using an NgModule
  }
];
