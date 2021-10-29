import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/service/util/util.service';
import { ApiService } from 'src/app/service/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit {

  list: any;
  sublist: any;
  dados: any;
  editar: boolean= false;
  contrato:any={
    cnpj:'',
    email:'',
    cep:'',
    bairro:'',
    complemento:'',
    endereco:'',
    razaosocial:'',
    nomefantasia:''
  }

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
          break;
          case (true):
            this.toastr.error(data.msg);
            break;
          }
        });
      });
    }

  async empresas() {
    const params = {
      method: 'empresasByContrato/'+this.dados.id,
      function: 'listEmpresaByContrato',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {
      response.subscribe(data => {
      switch (data.error) {
        case (false):
          this.FillArray( 'sublist', data.list)
          break;
          case (true):
            this.toastr.error(data.msg);
            break;
          }
        });
      });
  }

  async emails() {
    
    const params = {
      method: 'contratoemailByContrato/'+this.dados.id,
      function: 'listEmailByContrato',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {
      response.subscribe(data => {
      switch (data.error) {
        case (false):
          this.FillArray( 'sublist', data.list)
          console.log(data.list)
          break;
          case (true):
            this.toastr.error(data.msg);
            break;
          }
        });
      });
  }

  async integradores() {
    
    const params = {
      method: 'contratointegradorByContrato/'+this.dados.id,
      function: 'listIntegradorByContrato',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {
      response.subscribe(data => {
      switch (data.error) {
        case (false):
          this.FillArray( 'sublist', data.list)
          console.log(data.list)
          break;
          case (true):
            this.toastr.error(data.msg);
            break;
          }
        });
      });
  }

  async usuarios() {
    
    const params = {
      method: 'usergrByContrato/'+ this.dados.id,
      function: 'listByContrato',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {
      response.subscribe(data => {
      switch (data.error) {
        case (false):
          this.FillArray( 'sublist', data.list)
          console.log(data.list)
          break;
          case (true):
            this.toastr.error(data.msg);
            break;
          }
        });
      });
  }
  // Filtrar arrays
  FillArray(name: string, values: any) {
    var util = require('type-util');
    if (util.isArray(values)) {
      if (name === 'list' || name === 'sublist') {
          this[name] = values;
      }
    }
  }

  goNavigate(path: any){
    this.router.navigate([path]);
  }

  open(content: any, item: any){
    this.modalService.open(content, { size: 'lg' });
    this.dados = item;
    this.empresas();
  }

  edit(content: any, item: any){
    this.modalService.open(content, { size: 'lg' });
    this.contrato = item;
    this.editar = true;
    this.empresas();
  }

  close(){
    this.modalService.dismissAll();
  }
  // Função inserindo dados
  async insertInfo() {
     const params = {
       method: 'contrato',
       function: 'insertContrato',
       type: 'post',
       data:this.contrato
     };
     this.api.AccessApi(params).then((response) => {
      response.subscribe(data => {
          switch (data.error) {
            case (false):
              this.FillArray( 'list', data.list);
              this.toastr.success('Cadastrado com sucesso');
              this.GetInfo();
              this.close();
              break;
            case (true):
              this.toastr.error(data.msg);
              break;
            }
        });
      });
   }
   
  async updateInfo() {
    const params = {
      method: 'contrato',
      function: 'updateContrato',
      type: 'put',
      data:this.contrato
    };
    this.api.AccessApi(params).then((response) => {
      response.subscribe(data => {
          switch (data.error) {
            case (false):
              this.FillArray( 'list', data.list);
              this.toastr.success('Atualizado com sucesso');
              this.GetInfo();
              this.close();
              break;
            case (true):
              this.toastr.error(data.msg);
              break;
          }
      });
    });
  }
}
