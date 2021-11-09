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
  paginaAtual = 1;
  tab = 'empresa';
  contrato:any={
    cnpj:'',
    email:'',
    cep:'',
    bairro:'',
    complemento:'',
    endereco:'',
    razaosocial:'',
    nomefantasia:''
  };
  empresa:any={
    cnpj:'',
    razaosocial:'',
    nomefantasia:'',
    id_contrato:null
  };
  email:any={
    email:'',
    nomecontato:'',
    cargo:''
  };
  integrador:any={
    usuario:'',
    senha:'',
    token:'',
    integrador:''
  };
  usuario:any={
    cpf:'',
    email:'',
    usuario   :'',
    id_contrato:null
  };
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
    this.tab = 'empresa';
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
    this.tab = 'email';
    console.log(this.tab);
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
    this.tab = 'integrador';
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
    this.tab = 'usuarios';
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

  open(content: any, item: any, dados: boolean = false,tipo:string='', acao:string = 'cadastro', contents: any=null){

    if(acao === 'cadastro' || acao === 'exibir'){
      this.editar = false;
    }else{
      this.editar = true;
    }
    console.log(item);
    console.log(this.dados);
    console.log(dados);
    if(dados){
      
      this.dados = item;
      this.empresas();
    }
    if(tipo === 'empresa'){
      if(acao !=='cadastro'){
        this.empresa = item; 
      }
      content = contents.empresa;
    }else if(tipo === 'email'){
      if(acao !=='cadastro'){
        this.email = item; 
      }
      content = contents.email;
    }else if(tipo === 'integrador'){
      if(acao !=='cadastro'){
        this.integrador = item;
      } 
      content = contents.integrador;
    }else if(tipo === 'usuarios'){
      if(acao !=='cadastro'){
        this.usuario = item; 
      } 
      content = contents.usuario;
    }else{
      this.contrato = JSON.parse(JSON.stringify(item));
    }

    this.modalService.open(content, { size: 'lg' });
    
  }

  edit(content: any, item: any, dados: boolean = false,tipo:string=''){
    this.modalService.open(content, { size: 'lg' });
    if(tipo === 'empresa'){
      this.empresa = item; 
    }else if(tipo === 'email'){
      this.email = item; 
    }else if(tipo === 'integrador'){
      this.integrador = item; 
    }else if(tipo === 'usuario'){
      this.usuario = item; 
    }else{
      this.contrato = item;
    }
    this.editar = true;
    this.empresas();
  }

  close(form:string=''){
    this.list=null;
    this.sublist=null;
    
    if(form === 'contrato'){
      this.contrato={
        cnpj:'',
        email:'',
        cep:'',
        bairro:'',
        complemento:'',
        endereco:'',
        razaosocial:'',
        nomefantasia:''
      };
    }
    this.empresa={
      cnpj:'',
      razaosocial:'',
      nomefantasia:'',
      id_contrato:null
    };
    this.email={
      email:'',
      nomecontato:'',
      cargo:''
    };
    this.integrador={
      usuario:'',
      senha:'',
      token:'',
      integrador:''
    };
    this.usuario={
      cpf:'',
      email:'',
      usuario   :'',
      id_contrato:null
    };
  
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
              this.close('contrato');
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
              this.close('contrato');
              break;
            case (true):
              this.toastr.error(data.msg);
              break;
          }
      });
    });
  }

  async insertInfoEmpresa() {
    this.empresa.id_contrato = this.contrato.id;
    const params = {
      method: 'empresa',
      function: 'insertEmpresa',
      type: 'post',
      data:this.empresa
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
  
 async updateInfoEmpresa() {
   const params = {
     method: 'empresa',
     function: 'updateEmpresa',
     type: 'put',
     data:this.empresa
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

 async insertInfoEmail() {
  this.email.id_contrato = this.contrato.id;
  const params = {
    method: 'contratoemail',
    function: 'insertContratoEmail',
    type: 'post',
    data:this.email
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

async updateInfoEmail() {
 const params = {
   method: 'contratoemail',
   function: 'updateContratoEmail',
   type: 'put',
   data:this.empresa
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

async insertInfoIntegrador() {
  this.integrador.id_contrato = this.contrato.id;
  
  const params = {
    method: 'contratointegrador',
    function: 'insertContratoIntegrador',
    type: 'post',
    data:this.integrador
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

async updateInfoIntegrador() {
 const params = {
   method: 'contratointegrador',
   function: 'updateContratoIntegrador',
   type: 'put',
   data:this.integrador
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

async insertInfoUsuario() {
  this.usuario.id_contrato = this.contrato.id;
  const params = {
    method: 'usergr',
    function: 'insertUsuariogr',
    type: 'post',
    data:this.usuario
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

async updateInfoUsuario() {
 const params = {
   method: 'usergr',
   function: 'updateUsuariogr',
   type: 'put',
   data:this.usuario
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
