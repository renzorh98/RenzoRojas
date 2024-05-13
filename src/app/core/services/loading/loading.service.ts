import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loaderSource = new Subject<boolean>()
  loader$ = this.loaderSource.asObservable()

  constructor() { }

  show(){
    this.loaderSource.next(true)
  }

  hide(){
    this.loaderSource.next(false)
  }
}
