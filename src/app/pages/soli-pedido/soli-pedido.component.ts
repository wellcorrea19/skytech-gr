import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-soli-pedido',
  templateUrl: './soli-pedido.component.html',
  styleUrls: ['./soli-pedido.component.scss']
})
export class SoliPedidoComponent implements OnInit {

  constructor(
    private router: Router,
    public modal: NgbActiveModal,
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  goNavigate(path: any){
    this.router.navigate([path]);
  }

  open(id: number){
    this.modalService.open(id, { size: 'lg' });
  }

  close(){
    this.modalService.dismissAll();
  }

}

