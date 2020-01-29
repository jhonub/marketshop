import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto.component';
import { CreateProductoComponent } from './create-producto/create-producto.component';
import { DeleteProductoComponent } from './delete-producto/delete-producto.component';
import { ListProductoComponent } from './list-producto/list-producto.component';
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductoComponent, 
    CreateProductoComponent, 
    DeleteProductoComponent, 
    ListProductoComponent,
    
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgbTypeaheadModule
  ],
  exports:[
    ProductoComponent, 
    CreateProductoComponent, 
    DeleteProductoComponent, 
    ListProductoComponent
  ]
})
export class ProductoModule { }
