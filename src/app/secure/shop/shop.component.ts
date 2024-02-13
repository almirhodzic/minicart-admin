import { Component, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css', '../secure.component.css']
})
export class ShopComponent implements OnInit{
  
    products: Product[] = [];
    page = 1;
    lastPage!: number;
    totalProducts!: number;
    productimage: string = '';
    count: number = 1;
    
    constructor(
      private productService: ProductService,
      private toastr: ToastrService,
    ) { }
  
    ngOnInit(): void {
      this.load();
    }
  
    load(): void {
      this.productService.all(this.page).subscribe(
        res => {
          this.products = res.data;
          this.lastPage = res.meta.last_page;
          this.totalProducts = res.meta.total;
        }
      );
    }

    /* getCatName(catid: number): any {
      this.categoryService.get(this.catid).subscribe(
        (res: any) => {
          return this.category.name;
        }
      );
    } */
  
    next(): void {
      if(this.page === this.lastPage) { return; }
      this.page++;
      this.load();
    }
    
    previous(): void {
      if(this.page === 1) { return; }
      this.page--;
      this.load();
    }
  
    delete(id: number): void {
      if(confirm(`Are you sure you want to delete this (${id}) product ?`)) {
        this.productService.delete(id).subscribe(
          {
            next: (d) =>  { 
              this.products = this.products.filter(p => p.id !== id);
              this.toastr.success('Product deleted!', '');
              this.load();
            },
            error: (err) => {},
          }
        );
      }
    }
}