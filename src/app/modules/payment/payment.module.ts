import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PaymentDetailComponent],
})
export class PaymentModule {}
