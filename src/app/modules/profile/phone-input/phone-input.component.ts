import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css'],
})
export class PhoneInputComponent implements OnInit {
  @Input() selectedCountry: string = '+57';
  countryOptions: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('/assets/data/countryCodes.json')
      .subscribe((data: any[]) => {
        this.countryOptions = data;
      });
  }
}
