import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebService } from 'src/app/service/webservice.service';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators'
@Component({
  selector: 'create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {
  @Input() idProducto;
  @Input() TypeButton;
  @Input() nameButton;
  @Output() modifyProducto = new EventEmitter();

  public formProductos:FormGroup;
  public formValidatorStatus:boolean;
  public modalReference:NgbModalRef;
  public listProductos:any;
  public listCategorias:any;
  public search:any;
  public formatter:any;

  get formValidator(){
    return this.formProductos.controls
  }
  constructor(
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private webservice:WebService
  ) { }

  ngOnInit() {
  }
  inicializator(){
    this.listProductos=[];
    this.listCategorias=[];
    this.formValidatorStatus = false;
    this.listCategoriasQuery();
    this.searchCategorias();
    this.inicializatorFormValidator();
    if(this.idProducto != null){
      this.inicializatorEditProducto();
    }
  }
 
  inicializatorFormValidator(){
    this.formProductos = this.formBuilder.group({
      codBar:['',Validators.required],
      cantidad:['',Validators.required],
      nombre:['', Validators.required],
      imagenUrl:['', Validators.required],
      precio:['', Validators.required],
      categoria:['', Validators.required]
    })
  }

  inicializatorEditProducto(){
    this.webservice.getIdProducto(this.idProducto).subscribe(
      response=>{
        this.validatorEditProducto(response);
      },
      error=>{
        console.log(error);
        
      }
    )
  }
  //list
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

  //search
  searchCategorias(){
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.listCategorias.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  this.formatter = (x: {nombre: string}) => x.nombre;

  }

  //save
  saveSubmitProducto(){
    this.formValidatorStatus = true;
    if(this.formProductos.invalid){
      return;
    }
    if(this.idProducto != null){
      this.updateProducto();
    }
    else{
      this.saveProducto();
      this.validatorRestrucJson();
    }
  }
  saveProducto(){
    this.webservice.postProductos(this.formProductos.value).subscribe(
      response=>{
        this.modifyProducto.emit(this.formProductos.value);
        this.modalReference.close();
      },
      error=>{
        console.log(error);
      }
    )
  }
  updateProducto(){
    this.webservice.putProductos(this.idProducto,this.formProductos.value).subscribe(
      response=>{
        this.modifyProducto.emit(this.formProductos.value);
        this.modalReference.close();
      },
      error=>{
        console.log(error); 
      }
    )
  }

  //validator

  validatorEditProducto(producto){
    this.formProductos.get('codBar').setValue(producto.codBar);
    this.formProductos.get('cantidad').setValue(producto.cantidad);
    this.formProductos.get('nombre').setValue(producto.nombre);
    this.formProductos.get('imagenUrl').setValue(producto.imagenUrl);
    this.formProductos.get('precio').setValue(producto.precio);
  }

  validatorRestrucJson() {
    let data = {
      codBar: this.formProductos.value.codBar,
      cantidad:this.formProductos.value.cantidad,
      nombre:this.formProductos.value.nombre,
      imagenUrl: this.formProductos.value.imagenUrl,
      precio: this.formProductos.value.precio,
      idcategoria:this.formProductos.value.categoria.id
    }
    console.log(data);
    return data;
  }

  modalCallService(mdProducto) {
    this.inicializator();
   this.modalReference = this.modalService.open(mdProducto, { size: 'lg', backdrop:'static'});
  }
  
}
