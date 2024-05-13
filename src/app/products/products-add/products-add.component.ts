import {Component, OnDestroy} from '@angular/core';
import {CustomeFormInputComponent} from "../../../shared/components/custome-form-input/custome-form-input.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ProductsService} from "../../core/api/products/products.service";
import {NotificationService} from "../../core/services/notification/notification.service";
import {LoadingService} from "../../core/services/loading/loading.service";
import {NotificationType} from "../../core/interfaces/notification/notification.interface";
import {actualDateValidator, futureDateValidator} from "../../core/validators/date.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-add',
  standalone: true,
  imports: [
    CustomeFormInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './products-add.component.html',
  styleUrl: './products-add.component.scss'
})
export class ProductsAddComponent implements OnDestroy {
  productForm: FormGroup;
  idControl: FormControl;
  nameControl: FormControl;
  descriptionControl: FormControl;
  logoControl: FormControl;
  dateReleaseControl: FormControl;
  dateRevisionControl: FormControl;
  releaseDateSub: Subscription;
  isEdit: boolean = false

  constructor(
    private fb: FormBuilder,
    private productsS: ProductsService,
    private notificationS: NotificationService,
    private loadingS: LoadingService,
    private router: Router,
  ) {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, actualDateValidator]],
      date_revision: ['', [Validators.required, futureDateValidator]],
    })

    this.idControl = this.productForm.get('id') as FormControl
    this.nameControl = this.productForm.get('name') as FormControl
    this.descriptionControl = this.productForm.get('description') as FormControl
    this.logoControl = this.productForm.get('logo') as FormControl
    this.dateReleaseControl = this.productForm.get('date_release') as FormControl
    this.dateRevisionControl = this.productForm.get('date_revision') as FormControl

    this.releaseDateSub = this.dateReleaseControl.valueChanges.subscribe((value) => {
      if(!value){
        this.dateRevisionControl.setValue('')
      }else{
        const splitValue = value.split('-');
        splitValue[0] = Number(splitValue[0]) + 1;

        this.dateRevisionControl.setValue(splitValue.join('-'))
      }
    })

    if(this.router.getCurrentNavigation()?.extras.state){
      const dataToEdit = this.router.getCurrentNavigation()?.extras?.state?.['product']
      this.productForm.patchValue(dataToEdit)
      this.isEdit = true
    }
  }

  ngOnDestroy() {
    this.releaseDateSub.unsubscribe()
  }

  onSubmit() {
    this.loadingS.show()
    if(this.isEdit){
      this.productsS.updateProduct(this.productForm.value).subscribe({
        next: (resp) => {
          this.notificationS.show({
            type: NotificationType.SUCCESS,
            message: `Se editó el producto "${resp.name}"`
          })

          this.productForm.reset()
          this.router.navigate(['/'])
        },
        complete: () => {
          this.loadingS.hide()
        }
      })
    }else{
      this.productsS.postNewProduct(this.productForm.value).subscribe({
        next: (resp) => {
          this.notificationS.show({
            type: NotificationType.SUCCESS,
            message: `Se creo el producto "${resp.name}"`
          })

          this.productForm.reset()
          this.router.navigate(['/'])
        },
        complete: () => {
          this.loadingS.hide()
        }
      })
    }
  }

  validateId() {
    if (this.idControl.valid && !this.isEdit) {
      this.productsS.validateId(this.idControl.value).subscribe((resp) => {
        console.log(resp)

        if (resp) {
          this.idControl.setErrors({'idExists': true})
        }
      })
    }
  }

  goToList(){
    this.router.navigate(['products'])
  }
}
