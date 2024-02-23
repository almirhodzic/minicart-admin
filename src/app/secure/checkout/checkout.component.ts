import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { Auth } from 'src/app/classes/auth';
import { UserdetailService } from 'src/app/services/userdetail.service';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basket',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', './../nav/nav.component.css', '../secure.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();

  form!: FormGroup;
  first_name: string = '';
  last_name: string = '';
  phone: any | string = '';
  address: string = '';
  country: string = '';
  city: string = '';
  zipcode: number | string = '';
  useremail: string = '';
  userid: number = 0;
  ShowComponent: boolean = false;
 
  constructor(
    public cartService: CartService,
    private router: Router,
    private loaderService: LoaderService,
    private userService: UserService,
    private userDetailService: UserdetailService,
    private formBuilder: FormBuilder,
  ) { }

  cartItems: any[] = [];
  totalInCart: number = 0;

  ngOnInit() {

    this.form = this.formBuilder.group({
      user_id: '',
      cart_value: '',
      agb: '',
    });

    this.reloadUserData();
    this.cartService.updateTotalInCart();
    this.loadCartItems();
    this.subscription.add(this.cartService.currentTotalInCart.subscribe(total => {
    this.totalInCart = total;
    }));

    Auth.userEmitter.subscribe(
      user => {
        if(user) {
          this.first_name = user.first_name,
          this.last_name = user.last_name,
          this.phone = user.phone,
          this.address = user.address,
          this.country = user.country ? user.country : 'CH',
          this.city = user.city,
          this.zipcode = user.zipcode,
          this.useremail = user.email;
          this.userid = user.id;
          
          if(this.address.length > 0) {
            this.ShowComponent = true
          }
        }
      }
    );
  }

  redirectToProfile() {
    localStorage.setItem('redirectUrl', '/checkout');
    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrentDate(): string {
    return this.cartService.getCurrentDate();
  }

  countrByName(country: string) {
    return this.userDetailService.countrByName(country);
  }
  
  formatPrice(totalPrice: number): string {
    return this.cartService.formatPrice(totalPrice);
  }

  loadCartItems() {
    this.cartService.loadCartItems();
  }

  clearCart() {
    this.loaderService.setLoading(true);
    setTimeout(() => {
      this.loaderService.setLoading(false);
      this.cartService.clearCart();
      location.reload();
    }, 1000);
  };

  reloadUserData() {
    const dataCompleted = localStorage.getItem('dataCompleted');
    if (dataCompleted === 'true') {
      localStorage.removeItem('dataCompleted');
      window.location.reload();
    }
  }

  deleteCartItem(productId: number) {
    this.cartService.deleteCartItem(productId);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  sumPriceEachProduct(productId: number, productPrice: number) {
    return this.cartService.sumPriceEachProduct(productId, productPrice);
  }
}
