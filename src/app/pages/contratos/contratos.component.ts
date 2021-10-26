import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/service/util/util.service';
import { ApiService } from 'src/app/service/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit {

  public list: any;
  public dados: any;

  constructor(
    private router: Router,
    public modalService: NgbModal,
    private util: UtilService,
    private api: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.GetInfo();
  }

  // Função pegando dados
  async GetInfo() {
    const params = {
      method: 'contratos',
      function: 'listContrato',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {

    response.subscribe(data => {
    switch (data.error) {
      case (false):
        this.FillArray( 'list', data.list)
        console.log(data.list)
        break;
        case (true):
          this.toastr.error(data.msg);
          break;
        }
      });
    });
  }

  // Função inserindo dados
  // async insertInfo() {
  //   const params = {
  //     method: 'contrato',
  //     function: 'insertContrato',
  //     type: 'post'
  //   };

  //   this.api.AccessApi(params).then((response) => {

  //   response.subscribe(data => {
  //   switch (data.error) {
  //     case (false):
  //       this.FillArray( 'list', data.list)
  //       console.log(data.list)
  //       break;
  //       case (true):
  //         this.toastr.error(data.msg);
  //         break;
  //       }
  //     });
  //   });
  // }

  // Filtrar arrays
  FillArray(name: string, values: any) {
    var util = require('type-util');
    if (util.isArray(values)) {
      if (name === 'list') {
          this.list = values;
      }
    }
  }


  goNavigate(path: any){
    this.router.navigate([path]);
  }

  open(content: any, item: any){
    this.modalService.open(content, { size: 'lg' });
    this.dados = item;
    console.log(item);
  }

  close(){
    this.modalService.dismissAll();
  }

}
