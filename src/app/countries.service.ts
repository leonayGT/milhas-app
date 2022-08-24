import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ICity {
  city: string,
  latitude: number,
  longitude: number
}

export interface ICountry {
  country: string,
  cities: ICity[]
}

const baseUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<ICountry[]>(`${baseUrl}/countries`);
  }

  computeDistance(
    origin: ICity,
    destination: ICity
  ): number {
    const EARTH_RADIUS = 6_371.071; // Earth
    const diffLatitudeRadians = degreesToRadians(
      destination.latitude - origin.latitude
    );
    const diffLongitudeRadians = degreesToRadians(
      destination.longitude - origin.longitude
    );
    const originLatitudeRadians = degreesToRadians(origin.latitude);
    const destinationLatitudeRadians = degreesToRadians(destination.latitude);
    const kmDistance =
      2 *
      EARTH_RADIUS *
      Math.asin(
        Math.sqrt(
          Math.sin(diffLatitudeRadians / 2) * Math.sin(diffLatitudeRadians /
            2) +
          Math.cos(originLatitudeRadians) *
          Math.cos(destinationLatitudeRadians) *
          Math.sin(diffLongitudeRadians / 2) *
          Math.sin(diffLongitudeRadians / 2)
        )
      );
    return kmDistance;
  }

}

function degreesToRadians(degreeValue: number) {
  return degreeValue * (Math.PI / 180);
}

