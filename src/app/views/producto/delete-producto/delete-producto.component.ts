import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebService } from 'src/app/service/webservice.service';


@Component({
  selector: 'delete-producto',
  templateUrl: './delete-producto.component.html',
  styleUrls: ['./delete-producto.component.css']
})
export class DeleteProductoComponent implements OnInit {
  public modalReference:NgbModalRef

  @Input() idProducto;
  @Input() TypeButton;
  @Input() nameButton;
  @Output() modifyProducto = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private webservice:WebService
  ) { }

  ngOnInit() {
  }
  
  deleteProducto(){
    this.webservice.deleteProducto(this.idProducto).subscribe(
      response =>{
        this.modifyProducto.emit(this.idProducto);
        this.modalReference.close();
      },
      error=>{
        console.log(error);
        
      }
    )
  }
  modalCallService(mdProducto) {
   this.modalReference = this.modalService.open(mdProducto, { size: 'lg', backdrop:'static' });
  }
}
