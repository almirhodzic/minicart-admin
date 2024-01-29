import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends RestService{
  endpoint = `${environment.api}/category`;
}
