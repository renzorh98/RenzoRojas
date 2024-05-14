import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SlicePipe} from "@angular/common";
import {CustomeDropdownComponent} from "../custome-dropdown/custome-dropdown.component";
import {Product} from "../../../app/core/interfaces/products/products.interface";
import {FilterPipe} from "../../../app/core/pipes/filter.pipe";
import {SkeletonComponent} from "../skeleton/skeleton.component";

@Component({
  selector: 'app-custome-data-table',
  standalone: true,
  imports: [
    SlicePipe,
    CustomeDropdownComponent,
    FilterPipe,
    SkeletonComponent,
  ],
  templateUrl: './custome-data-table.component.html',
  styleUrl: './custome-data-table.component.scss'
})
export class CustomeDataTableComponent {
  @Input() data: Product[] = []
  @Input() search: string = ''
  @Input() isLoading: boolean = false
  @Input() pageSizeOptions: number[] = [5, 10, 15, 20]
  @Input() pageSize: number = 5
  @Input() currentPage: number = 1

  @Output() delete = new EventEmitter<Product>()
  @Output() edit = new EventEmitter<Product>()

  get totalPages(): number[] {
    const totalItems = this.data.length
    const totalPages = Math.ceil(totalItems / this.pageSize)
    return Array.from({length: totalPages}, (_, i) => i + 1)
  }


  onPageChange(page: number) {
    this.currentPage = page
  }


  onPageSizeChange(event: any) {
    this.pageSize = event.target.value
    this.currentPage = 1
  }

  onDelete(p: Product){
    this.delete.emit(p)
  }

  onEdit(p: Product){
    this.edit.emit(p)
  }
}
