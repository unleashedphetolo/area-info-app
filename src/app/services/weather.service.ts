// Import core Angular decorators and HTTP modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) // Makes this service available app-wide via dependency injection
export class WeatherService {
  // OpenWeatherMap API key 
  private apiKey = 'f01325cf86822165168a704076fdf5ca'; // actual API key

  // Base URL for weather data API
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  // Inject Angular's HttpClient to handle HTTP requests
  constructor(private http: HttpClient) {}

  /**
   * Fetches weather data for a given city from the OpenWeatherMap API.
   * @param city - The name of the city to look up.
   * @returns Observable containing the weather data response.
   */
  getWeather(city: string): Observable<any> {
    // Construct the full API URL with city, API key, and units (metric for °C)
    return this.http.get(
      `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }
}
