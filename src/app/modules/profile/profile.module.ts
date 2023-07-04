import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProfileDetailComponent, ProfileSummaryComponent],
})
export class ProfileModule {}
