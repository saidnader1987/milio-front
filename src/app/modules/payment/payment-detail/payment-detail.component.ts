import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserPaymentsInfo } from 'src/app/models/userPaymentsInfo';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
})
export class PaymentDetailComponent implements OnInit {
  filteredPayments: Payment[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  paymentsPerPage: number = 20;
  maxDisplayedPages: number = 3;
  startPage: number = 1;
  paginationPages: number[] = [];

  justLoggedIn!: boolean;
  userId!: string;
  showNotification: boolean = true;
  userPaymentInfo: UserPaymentsInfo | undefined;
  selectedOption: string = 'Activas';

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      if (this.userPaymentInfo) {
        this.filteredPayments = this.userPaymentInfo.payments;
        // this.resetCurrentPage();
      }
    } else {
      if (this.userPaymentInfo) {
        this.filteredPayments = this.userPaymentInfo.payments.filter(
          (payment) =>
            payment.providerName
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase())
        );
        // this.resetCurrentPage();
      }
    }
  }

  changeOption(option: string) {
    this.selectedOption = option;
  }

  formatNumber(value: any): string {
    if (value === undefined) {
      return '';
    }
    return new Intl.NumberFormat('es').format(value);
  }

  formatDate(value: any): string {
    if (value === undefined) {
      return '';
    }
    const parsedDate = new Date(value);
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');
    const year = parsedDate.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  getUserPaymentInfo(id: string) {
    this.paymentService.getUserPaymentInfo(id).subscribe({
      next: (res) => {
        const { status, data } = res;
        if (status) {
          this.userPaymentInfo = data;
          if (this.userPaymentInfo) {
            this.filteredPayments = this.userPaymentInfo.payments;
          }
        }
      },
      error: (err) => {},
    });
  }

  ngOnInit() {
    this.justLoggedIn = this.authService.hasJustLoggedIn();
    // this.userId = this.authService.getUserId();
    this.userId = '1';
    setTimeout(() => {
      this.showNotification = false;
    }, 5000);
    this.getUserPaymentInfo(this.userId);
  }
}
