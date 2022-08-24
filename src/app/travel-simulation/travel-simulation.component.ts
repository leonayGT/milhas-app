import { Component, OnInit } from '@angular/core';
import { CountriesService, ICity, ICountry } from '../countries.service';

@Component({
  selector: 'app-travel-simulation',
  templateUrl: './travel-simulation.component.html',
  styleUrls: ['./travel-simulation.component.css']
})
export class TravelSimulationComponent implements OnInit {
  countries: ICountry[] = [];
  originCountry: ICountry | null = null;
  originCity: ICity | null = null;
  destinationCountry: ICountry | null = null;
  destinationCity: ICity | null = null;
  adults: number = 0;
  children: number = 0;
  firstClass: boolean = false;
  miles: number = 0;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  get distance() {
    if (this.originCity && this.destinationCity) {
      return this.countriesService.computeDistance(this.originCity, this.destinationCity);
    }
    return 0;
  }

  get sameCountry() {
    return this.originCountry === this.destinationCountry;
  }

  get pricePerAdult() {
    let factor = this.sameCountry ? 0.3 : 0.5;
    if (this.firstClass) {
      factor *= 1.8;
    }
    return factor * this.distance;
  }

  get milesPrice() {
    return this.miles * 0.02;
  }

  get pricePerChild() {
    let factor = this.sameCountry ? 0.15 : 0.25;
    if (this.firstClass) {
      factor *= 1.4;
    }
    return factor * this.distance;
  }

  get totalPrice() {
    return this.adults * this.pricePerAdult + this.children * this.pricePerChild;
  }

  get maxMiles() {
    return Math.floor(this.totalPrice / 0.02);
  }

  get errorMessage() {
    if (!this.originCity || !this.destinationCity) {
      return "Escolha uma origem e um destino.";
    } else if (this.originCity === this.destinationCity) {
      return "Escolha um destino diferente da origem.";
    } else if (this.adults <= 0) {
      return "Adicione ao menos um adulto.";
    }
    return "";
  }
}
