import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  selectedOption: string = '';
  profileSelected: boolean = false;

  updateSelectedOption(option: string): void {
    this.selectedOption = option;
  }

  getSelectedOption(): string {
    return this.selectedOption;
  }

  toggleProfileSelected() {
    this.profileSelected = this.profileSelected ? false : true;
  }

  isProfileSelected(): boolean {
    return this.profileSelected;
  }
}
