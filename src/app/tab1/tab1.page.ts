import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
      private geolocation: Geolocation,
      private nativeGeocoder: NativeGeocoder
  ) {}
  latitude: any = 0; // latitude
  longitude: any = 0; // longitude
  address: string;

  // geolocation options
  // eslint-disable-next-line @typescript-eslint/member-ordering
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  // geocoder options
  // eslint-disable-next-line @typescript-eslint/member-ordering
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddress(this.latitude, this.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  // get address using coordinates
  getAddress(lat, long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
        .then((res: NativeGeocoderResult[]) => {
          this.address = this.pretifyAddress(res[0]);
        })
        .catch((error: any) => {
          alert('Error getting location' + JSON.stringify(error));
        });
  }

  // address
  pretifyAddress(address){
    const obj = [];
    let data = '';
    // eslint-disable-next-line guard-for-in
    // tslint:disable-next-line:forin
    for (const key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (const val in obj) {
      if (obj[val].length)
      {data += obj[val] + ', '; }
    }
    return address.slice(0, -2);
  }
}
