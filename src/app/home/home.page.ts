// Import Angular and Ionic modules and services
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home', // Component selector used in HTML
  standalone: true, // Enables standalone component usage without NgModule
  imports: [CommonModule, IonicModule, FormsModule], // Import required modules
  templateUrl: './home.page.html', // Template file for this component
  styleUrls: ['./home.page.scss'] // Styling for this component
})
export class HomePage implements OnInit {
  city: string = ''; // Holds the city name entered by the user
  weatherData: any; // Stores weather data fetched from API
  favoriteWeather: any[] = []; // Stores user's favorite weather data

  // Inject WeatherService to fetch weather data
  constructor(private weatherService: WeatherService) {}

  // Lifecycle hook that runs when component initializes
  ngOnInit(): void {
    // Load favorite cities from local storage, if available
    const storedFavorites = localStorage.getItem('favoriteCities');
    if (storedFavorites) {
      this.favoriteWeather = JSON.parse(storedFavorites);
    }
  }

  /**
   * Fetch weather data for the entered city
   * Validates input and handles API response or error
   */
  searchWeather(): void {
    if (!this.city.trim()) return; // Prevent empty searches
    this.weatherService.getWeather(this.city.trim()).subscribe(
      (data) => {
        this.weatherData = data; // Assign response to weatherData
      },
      (error) => {
        alert('City not found or API error.'); // Notify user on error
      }
    );
  }

  /**
   * Saves the currently displayed weather data to favorites
   * Ensures duplicates are not added
   */
  saveToFavorites(): void {
    // Check if the city already exists in the favorites list
    const exists = this.favoriteWeather.find(
      (item) => item.name.toLowerCase() === this.weatherData.name.toLowerCase()
    );

    if (!exists) {
      // Add to favorites and update local storage
      this.favoriteWeather.push(this.weatherData);
      localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteWeather));
    } else {
      alert('City is already in favorites.'); // Notify user if city is already added
    }
  }
}
