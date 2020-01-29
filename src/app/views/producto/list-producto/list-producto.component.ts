import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/service/webservice.service';

@Component({
  selector: 'list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {
  public listProductos:any;
  public listCategorias:any;

  constructor(private webservice:WebService) { }

  ngOnInit() {
    this.inicializator();
  }

  inicializator(){
    this.listProductos=[];
    this.getListproductosQuery();
    this.listCategoriasQuery();
  }
  
  getListproductosQuery(){
    this.webservice.getListProductos().subscribe(
      response=>{
        this.listProductos=response;
        
      },
      error=>{
        console.log(error);
      }
    )
  }

  listCategoriasQuery(){
    this.listCategorias = [
      { id: 1, nombre: 'CARNES' },
      { id: 2, nombre: 'VERDURAS' },
      { id: 3, nombre: 'FRUTAS' },
      { id: 4, nombre: 'VEGETALES' },
      { id: 5, nombre: 'GOLOSINAS' },
      { id: 6, nombre: 'GALLETAS' },
      { id: 7, nombre: 'GASEOSAS' },
      { id: 2, nombre: 'JUGOS' }
    ]
  }

  validatorProducto(){
    this.inicializator();
  }
}
