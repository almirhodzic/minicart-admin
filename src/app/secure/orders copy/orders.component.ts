import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../secure.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  page: number = 1;
  lastPage!: number;
  selected: number = 0;
  totalOrders: number = 0;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.orderService.all(this.page).subscribe(
      res => {
        this.orders = res.data;
        this.lastPage = res.meta.last_page;
        this.totalOrders = res.meta.total;
      }
    );
  }

  next(): void {
    if(this.page === this.lastPage) { }
    this.page++;
    this.load();
  }
  
  previous(): void {
    if(this.page === 1) { }
    this.page--;
    this.load();
  }

  formatPrice(price: number) {
    return (Math.round(price * 100)/100).toFixed(2);
  }

  preSum(itemPrice: number, itemQuantyity: number): number {
    let sum = 0;
    sum = itemPrice * itemQuantyity;
    const formatedSum = this.formatPrice(sum);
    return Number(formatedSum);
  }

  select(id: number): void {
    this.selected = id;
  }
}
