// Import Angular and Ionic modules and services
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  city: string = '';
  weatherData: any;
  favoriteWeather: any[] = [];
  recentSearches: string[] = [];

  constructor(
    private weatherService: WeatherService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    const storedFavorites = localStorage.getItem('favoriteCities');
    const storedRecent = localStorage.getItem('recentSearches');

    if (storedFavorites) {
      this.favoriteWeather = JSON.parse(storedFavorites);
    }

    if (storedRecent) {
      this.recentSearches = JSON.parse(storedRecent);
    }
  }

  searchWeather(): void {
    const trimmedCity = this.city.trim();
    if (!trimmedCity) return;

    this.weatherService.getWeather(trimmedCity).subscribe(
      (data) => {
        this.weatherData = data;
        this.addRecentSearch(trimmedCity);
      },
      () => this.presentToast('City not found or API error.')
    );
  }

  saveToFavorites(): void {
    const exists = this.favoriteWeather.find(
      (item) => item.name.toLowerCase() === this.weatherData.name.toLowerCase()
    );

    if (!exists) {
      this.favoriteWeather.push(this.weatherData);
      localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteWeather));
      this.presentToast('City added to favorites.');
    } else {
      this.presentToast('City is already in favorites.');
    }
  }

  deleteFavorite(cityName: string): void {
    this.favoriteWeather = this.favoriteWeather.filter(
      (item) => item.name.toLowerCase() !== cityName.toLowerCase()
    );
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteWeather));
    this.presentToast('City removed from favorites.');
  }

  addRecentSearch(city: string): void {
    const existingIndex = this.recentSearches.findIndex(
      (c) => c.toLowerCase() === city.toLowerCase()
    );

    if (existingIndex !== -1) {
      this.recentSearches.splice(existingIndex, 1);
    }

    this.recentSearches.unshift(city);
    if (this.recentSearches.length > 5) {
      this.recentSearches.pop();
    }

    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  selectRecent(city: string): void {
    this.city = city;
    this.searchWeather();
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'medium'
    });
    toast.present();
  }
}
