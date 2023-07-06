import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserPaymentsInfo } from 'src/app/models/userPaymentsInfo';
import { Payment } from 'src/app/models/payment';

interface SelectablePayment extends Payment {
  isSelected?: boolean;
}

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
})
export class PaymentDetailComponent implements OnInit {
  filteredPayments: SelectablePayment[] = [];
  selectedPayments: SelectablePayment[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  paymentsPerPage: number = 5;
  filterOption: string = 'Todos';
  maxDisplayedPages: number = 3;
  startPage: number = 1;
  paginationPages: number[] = [];
  sortOrder: string | undefined = undefined;

  justLoggedIn!: boolean;
  userId!: string;
  showNotification: boolean = true;
  userPaymentInfo: UserPaymentsInfo | undefined;
  selectedOption: string = 'Activas';

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  selectPayments(): void {
    // uses short circuits to ensure undefined is not returned
    this.selectedPayments =
      this.userPaymentInfo?.payments.filter(
        (payment: SelectablePayment) =>
          payment.isSelected && payment.status !== 'Rechazada'
      ) || [];
  }

  selectAllPayments(event: any): void {
    const isSelected = event.target.checked;
    if (this.userPaymentInfo) {
      this.userPaymentInfo.payments.forEach((payment: SelectablePayment) => {
        if (payment.status === 'Aprobada') payment.isSelected = isSelected;
      });
      this.selectPayments();
    }
  }

  getTotalValue(): number {
    return this.selectedPayments.reduce(
      (acc, payment) => acc + Number(payment.invoiceValue),
      0
    );
  }

  filterPayments(): void {
    if (this.userPaymentInfo) {
      this.filteredPayments = [...this.userPaymentInfo.payments];
      if (this.searchTerm.trim() !== '') {
        this.filteredPayments = this.filteredPayments.filter((payment) =>
          payment.providerName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      }
      if (this.filterOption !== 'Todos') {
        this.filteredPayments = this.filteredPayments.filter(
          (payment) => payment.status === this.filterOption
        );
      }
      if (this.sortOrder) {
        this.filteredPayments.sort((a, b) => b.invoiceValue - a.invoiceValue);
      }
      this.resetCurrentPage();
    }
  }

  toggleSortingOption() {
    this.sortOrder = this.sortOrder ? undefined : 'ascending';
  }

  getPaginationText() {
    let start = (this.currentPage - 1) * this.paymentsPerPage + 1;
    let end = Math.min(
      this.currentPage * this.paymentsPerPage,
      this.filteredPayments.length
    );
    let plural =
      this.filteredPayments.length > 1 || this.filteredPayments.length === 0
        ? 's'
        : '';

    return `${this.filteredPayments.length === 0 ? 0 : start}-${end} de ${
      this.filteredPayments.length
    } registro${plural}`;
  }

  getDisplayedPayments(): SelectablePayment[] {
    const startIndex = (this.currentPage - 1) * this.paymentsPerPage;
    const endIndex = this.currentPage * this.paymentsPerPage;
    return this.filteredPayments.slice(startIndex, endIndex);
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

  setPaginationPages(): void {
    const finishPage = this.startPage + this.maxDisplayedPages - 1;
    let length: number;
    if (finishPage >= this.totalPages) {
      length = this.totalPages - this.startPage + 1;
    } else {
      length = this.maxDisplayedPages;
    }
    this.paginationPages = Array.from({ length }, (_, i) => this.startPage + i);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPayments.length / this.paymentsPerPage);
  }

  resetCurrentPage(): void {
    this.currentPage = 1;
    this.startPage = 1;
    this.setPaginationPages();
  }

  prevPageBlock(): void {
    if (this.startPage > 1) {
      this.startPage -= this.maxDisplayedPages;
      this.currentPage = this.startPage;
      this.setPaginationPages();
    }
  }

  nextPageBlock(): void {
    if (this.startPage + this.maxDisplayedPages - 1 < this.totalPages) {
      this.startPage += this.maxDisplayedPages;
      this.currentPage = this.startPage;
      this.setPaginationPages();
    }
  }

  getUserPaymentInfo(id: string) {
    this.paymentService.getUserPaymentInfo(id).subscribe({
      next: (res) => {
        const { status, data } = res;
        if (status) {
          this.userPaymentInfo = {
            ...data,
            payments: data.payments.map((payment: Payment) => ({
              ...payment,
              isSelected: false,
            })),
          };
          if (this.userPaymentInfo) {
            this.filteredPayments = [...this.userPaymentInfo.payments];
            this.setPaginationPages();
          }
        }
      },
      error: (err) => {},
    });
  }

  ngOnInit() {
    this.justLoggedIn = this.authService.hasJustLoggedIn();
    this.userId = this.authService.getUserId();
    // FOR DEVELOPMENT ONLY
    // this.userId = '1';
    setTimeout(() => {
      this.showNotification = false;
    }, 5000);
    this.getUserPaymentInfo(this.userId);
  }
}
