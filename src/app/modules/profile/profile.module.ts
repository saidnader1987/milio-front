import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { PhoneInputComponent } from './phone-input/phone-input.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ProfileDetailComponent, PhoneInputComponent],
})
export class ProfileModule {}
