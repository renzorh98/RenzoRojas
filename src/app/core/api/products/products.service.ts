import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../interfaces/products/products.interface";
import {catchError, Observable} from "rxjs";
import {NotificationService} from "../../services/notification/notification.service";
import {NotificationType} from "../../interfaces/notification/notification.interface";
import {ROUTE_PRODUCTS} from "../../../../shared/http/routes";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private notificationS: NotificationService
  ) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ROUTE_PRODUCTS}`).pipe(
      catchError((err) => {
        this.notificationS.show({
          message: `Ocurrió un error al consultar por los productos: \n${err.error}`,
          type: NotificationType.ERROR
        })

        return []
      })
    )
  }

  postNewProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${ROUTE_PRODUCTS}`,
      {...product}
    ).pipe(
      catchError((err) => {
        this.notificationS.show({
          message: `Ocurrió un error al crear el producto: \n${err.error}`,
          type: NotificationType.ERROR
        })

        return []
      })
    )
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${ROUTE_PRODUCTS}`,
      {...product}
    ).pipe(
      catchError((err) => {
        this.notificationS.show({
          message: `Ocurrió un error al actualizar el producto: \n${err.error}`,
          type: NotificationType.ERROR
        })

        return []
      })
    )
  }

  deleteProduct(id: string){
    const queryParams = {
      id
    }

    return this.http.delete(`${ROUTE_PRODUCTS}`, {params: queryParams,  responseType: 'text'}).pipe(
      catchError((err) => {
        this.notificationS.show({
          message: `Ocurrió un error al borrar el producto: \n${err.error.text || err.error}`,
          type: NotificationType.ERROR
        })

        return ''
      })
    )
  }

  validateId(id: string){
    const queryParams = {
      id
    }

    return this.http.get<boolean>(`${ROUTE_PRODUCTS}/verification`, {params: queryParams})
  }
}
