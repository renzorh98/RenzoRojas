import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../core/api/products/products.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CustomeDataTableComponent} from "../../../shared/components/custome-data-table/custome-data-table.component";
import {Product} from "../../core/interfaces/products/products.interface";
import {CustomeModalComponent} from "../../../shared/components/custome-modal/custome-modal.component";
import {NotificationType} from "../../core/interfaces/notification/notification.interface";
import {NotificationService} from "../../core/services/notification/notification.service";
import {LoadingService} from "../../core/services/loading/loading.service";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    FormsModule,
    CustomeDataTableComponent,
    CustomeModalComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  searchInput: string = ''
  products: Product[] = []
  isLoading: boolean = false
  openModal: boolean = false
  elemToDelete = {
    id: '',
    name: '',
  }

  constructor(
    private productsS: ProductsService,
    public router: Router,
    private notificationS: NotificationService,
    private loadingS: LoadingService,
  ) {

  }

  ngOnInit() {
    this.isLoading = true
    this.productsS.getProducts().subscribe(resp => {
      this.products = resp.map(elem => {
        return {
          ...elem,
          date_release: elem.date_release.split('T')[0],
          date_revision: elem.date_revision.split('T')[0],
        }
      })

      this.isLoading = false
    })
  }

  goToAddProduct() {
    this.router.navigate(['products/add']);
  }

  onEdit(p: Product) {
    this.router.navigate(['products/edit'], {state: {product: p}})
  }

  onDelete(p: Product) {
    this.openModal = true
    this.elemToDelete = {
      id: p.id,
      name: p.name
    }
    console.log(p)
  }

  callToDelete(elem: { id: string, name: string }) {
    this.loadingS.show()
    this.productsS.deleteProduct(elem.id).subscribe(
      {
        next: () => {
          this.notificationS.show({
            message: `Se borro el producto "${elem.name}"`,
            type: NotificationType.SUCCESS
          })
        },
        complete: () => {
          this.openModal = false
          this.loadingS.hide()
          this.ngOnInit()
        }
      }
    )
  }

}
