import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

class PedidoItemResp {
  id_usuariogr: any;
  id_pedido: any; 
  id_pedido_item: any; 
  data_validade: any;
  data_registro: any;
  protocolo_resp: any; 
  id_motivo_rejeicao: any; 
  liberacao_pontual: any;
  usuariomm: any;
  data_validade_cadastro: any;
  motivo_rejeicao: any;
  MotivoRejeicao: MotivoRejeicao;

  constructor() {
    this.id_usuariogr = '';
    this.id_pedido = ''; 
    this.id_pedido_item = ''; 
    this.data_validade = '';
    this.data_registro = '';
    this.protocolo_resp = ''; 
    this.id_motivo_rejeicao = ''; 
    this.liberacao_pontual = '';
    this.usuariomm = '';
    this.data_validade_cadastro = '';
    this.motivo_rejeicao = '';
    this.MotivoRejeicao = new MotivoRejeicao();
  }
}

class MotivoRejeicao {
  descricao: any;
  id: any;

  constructor () {
    this.descricao = '';
    this.id = '';
  }
}

@Component({
  selector: 'app-soli-pedido',
  templateUrl: './soli-pedido.component.html',
  styleUrls: ['./soli-pedido.component.scss']
})
export class SoliPedidoComponent implements OnInit {

  public list: any;
  filteredList: any;
  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
  dados: any;
  empresas: any;
  forma: any;
  cidades: any;
  filteredCidades: any;
  tipo: any;
  sublist: any;
  pedidoItemRespList: Array<PedidoItemResp> = [];

  searchValue:string ='';
  searchCidadeValue: string = '';

  //pedidoItemResp form helper
  novoPedidoItemResp: boolean = true;

  solicitacao: any ={
    protocolo: null,
    id_tipo_solicitao: null,
    tipo_solicitacao: null,
    id_user: null,
    id_empresa: null,
    id_pedido: null,
    id_forma_pedido: null,
    empresa: null,
    data_solicitacao: null,
    data_conclusao: null,
    expressa: null,
    valor: null,
    produto_pred: null,
  }
  
  pedidoItem: any = {
    id: '',
    id_pedido: '',
    id_user: '',
    protocolo_item: '',
    data_registro: '',
    id_tipo_item_pedido: '', 
    pessoa_documento: '',
    pessoa_nome: '',
    pessoa_nfantasia: '',
    veiculo_placa: '',
    veiculo_renavam: '',
    veiculo_chassi: '',
    pessoa_endereco: '',
    pessoa_bairro: '',
    pessoa_complemento: '',
    pessoa_numero: '',
    pessoa_cep: '',
    pessoa_cidade: '',
    pessoa_uf: '',
    pessoa_ibge: '',
    veiculo_cor: '',
    veiculo_modelo: '',
    veiculo_marca: '',
  }

  pedidoItemResp: PedidoItemResp = new PedidoItemResp();

  constructor(
    private router: Router,
    public modal: NgbActiveModal,
    public modalService: NgbModal,
    public toastr: ToastrService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.GetInfo();
    this.GetCidades();
    this.GetFormaPedido();
    this.GetEmpresas();
    this.GetTipoPedido();
  }

  //Por enquanto está tratando pedidos que é o objeto utilizado no html desse component.
  search() {
    const data = this.searchValue.toLowerCase();
    this.filteredList = this.list;
    if (this.searchValue) {
      this.filteredList = this.list.filter((ele: any, i: any, array: any) => {
        let match = false;
        let arrayelement = '';
        
        if (ele.protocolo) {
          arrayelement = ele.protocolo.toLowerCase();
          arrayelement.includes(data) ? match=true : null;
        }

        if (ele.id_empresa) {
          for(let empresa of this.empresas) {
            if(ele.id_empresa === empresa.id) { 
              arrayelement = empresa.razaosocial.toLowerCase();
              break;
            }
          };
          arrayelement.includes(data) ? match=true : null;
        }
        
        if (ele.tipo_solicitacao) {
          arrayelement = ele.tipo_solicitacao.toLowerCase();
          arrayelement.includes(data) ? match=true : null;
        }

        if (ele.data_solicitacao) {
          arrayelement = new Date(ele.data_solicitacao).toLocaleString();
          arrayelement.includes(data) ? match=true : null;
        }

        if (ele.expressa) {
          arrayelement = ele.expressa.toLowerCase();
          arrayelement.includes(data) ? match=true : null;
        }

        if (ele.valor) {
          arrayelement = ele.valor;
          String(arrayelement).includes(data) ? match=true : null;
        }

        if (ele.produto_pred) {
          arrayelement = ele.produto_pred.toLowerCase();
          arrayelement.includes(data) ? match=true : null;
        }

        return match;
      });
    }
  }
  
  searchCidade() {
    const data = this.searchCidadeValue.toLowerCase();
    this.filteredCidades = this.cidades;
    if (this.searchCidadeValue) {
      this.filteredCidades = this.cidades.filter(function (ele: any) {
        let match = false;
        let arrayelement = '';

        arrayelement = ele.nome_cidade.toLowerCase();
        arrayelement.includes(data) ? match=true : null;

        return match;
      });
    }
  }

  // Get Events
  getTipo($event: any) {
    // tslint:disable-next-line:object-literal-key-quotes
    this.solicitacao.id_tipo_solicitacao = $event.target.value;
  }

  getEmpresa($event: any) {
    // tslint:disable-next-line:object-literal-key-quotes
    this.solicitacao.id_empresa = $event.target.value;
  }

  getForma($event: any) {
    // tslint:disable-next-line:object-literal-key-quotes
    this.solicitacao.id_forma_pedido = $event.target.value;
  }
  
  getDataSolicitacao($event: any) {
    // tslint:disable-next-line:object-literal-key-quotes
    this.solicitacao.data_solicitacao = $event.target.value;
  }

  getExpressa($event: any) {
    // tslint:disable-next-line:object-literal-key-quotes
    this.solicitacao.expressa = $event.target.value;
  }
  
  getValorMercadoria($event: any) {
    // tslint:disable-next-line:object-literal-key-quotes
    this.solicitacao.valor = $event.target.value;
  }

  getProdutoPred($event: any) {
    this.solicitacao.produto_pred = $event.target.value;
  }

  // Filtrar arrays
  FillArray(name: string, values: any) {
    var util = require('type-util');
    if (util.isArray(values)) {
      if (name === 'list') {
          this.list = values;
      }
      if (name === 'sublist') {
          this.sublist = values;
      }
      if (name === 'pedidoItemResp') {
          console.log(values);
          this.pedidoItemRespList = values;
      }
      if (name === 'empresas') {
        this.empresas = values;
      }
      if (name === 'forma') {
        this.forma = values;
      }
      if (name === 'cidades') {
        this.cidades = values;
      }
      if (name === 'tipo') {
        this.tipo = values;
      }
    }
  }

  goNavigate(path: any){
    this.router.navigate([path]);
  }

  openCadastro(content: any){
    this.GetEmpresas();
    this.GetFormaPedido();
    this.modalService.open(content, { size: 'lg' });
  }

  openConsulta(content: any){
    this.GetEmpresas();
    this.GetFormaPedido();
    this.modalService.open(content, { size: 'lg' });
  }
  
  openPedidoItemResp(content: any, item: any) {
    this.pedidoItem = {...item};
    this.GetPedidoItemResp();
    this.pedidoItemResp = new PedidoItemResp();
    this.novoPedidoItemResp = true;
    this.modalService.open(content, { size: 'lg' });
  }

  open(content: any, item: any, dados: boolean = false){
    if(dados){
      this.dados = item;
      this.GetPedidoItem();
    }

    this.modalService.open(content, { size: 'lg' });
  }

  close(){
    this.modalService.dismissAll();
  }

  setPedidoItemResp(item:any) {
    this.novoPedidoItemResp = false;
    this.pedidoItemResp = {...item};
  }

  // Função inserindo dados
  async insertInfo() {
    const params = {
      method: 'solicitacao',
      function: 'insertSolicitacao',
      type: 'post',
      data:this.solicitacao
    };
    this.api.AccessApi(params).then((response) => {
     response.subscribe((data:any) => {
          this.FillArray( 'list', data.list);
          this.toastr.success('Cadastrado com sucesso');
          this.GetInfo();
          this.close();
       },
       (err:any) => {
         this.toastr.error(err.error.msg);
       });
     });
  }

  async insertPedidoItemResp() {
    this.pedidoItemResp.id_pedido = this.pedidoItem.id_pedido;
    this.pedidoItemResp.id_pedido_item = this.pedidoItem.id;
    this.pedidoItemResp.motivo_rejeicao = this.pedidoItemResp.MotivoRejeicao.descricao;
    const params = {
      method: 'pedidoitemresp',
      function: 'insertPedidoItemResp',
      type: 'post',
      data:this.pedidoItemResp
    };
    this.api.AccessApi(params).then((response) => {
      response.subscribe((data:any) => {
        this.FillArray( 'list', data.list);
        this.toastr.success('Resposta criada com sucesso');
        this.GetInfo();
        this.close();
      },
      (err:any) => {
        this.toastr.error(err.error.msg);
      });
    }).catch((err:any) => {
      this.toastr.error(err.error.msg);
    });
  }
  
  async updatePedidoItemResp() {
    this.pedidoItemResp.motivo_rejeicao = this.pedidoItemResp.MotivoRejeicao.descricao;
    const params = {
      method: 'pedidoitemresp',
      function: 'updatePedidoItemResp',
      type: 'put',
      data:this.pedidoItemResp
    };
    this.api.AccessApi(params).then(response => {
      response.subscribe((data:any) => {
        this.toastr.success('Resposta atualizada com sucesso.');
        this.GetInfo();
        this.close();
      });
    }).catch((err:any) => {
      this.toastr.error(err.error.msg);
    });
  }

  // Função pegando dados
  async GetInfo() {
    const params = {
      method: 'solicitacao',
      function: 'listSolicitacao',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {

    response.subscribe((data:any) => {
        this.FillArray( 'list', data.list)
        this.filteredList = this.list;
      },
      (err:any) => {
        this.toastr.error(err.error.msg);
      });
    });
  }

  // Get pedido item
  async GetPedidoItem() {
    const params = {
      method: 'pedidoitembypedido/'+this.dados.id_pedido,
      function: 'getPedidoItemByPedido',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {
      response.subscribe((data:any) => {
          this.FillArray( 'sublist', data.list)
        },
        (err:any) => {
          this.toastr.error(err.error.msg);
        });
      });
  }

  // Get tipo pedido
  async GetTipoPedido() {
    const params = {
      method: 'tipopedido',
      function: 'listTipoPedido',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {
      response.subscribe((data:any) => {
          this.FillArray( 'tipo', data.list)
        },
        (err:any) => {
          this.toastr.error(err.error.msg);
        });
      });
  }

  // Get empresas 
  async GetEmpresas() {
    const params = {
      method: 'empresa',
      function: 'listEmpresa',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {

    response.subscribe((data:any) => {
        this.FillArray( 'empresas', data.list)
      },
      (err:any) => {
        this.toastr.error(err.error.msg);
      });
    });
  }

  // Get forma pedido
  async GetFormaPedido() {
    const params = {
      method: 'formapedido',
      function: 'listFormaPedido',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {

    response.subscribe((data:any) => {
        this.FillArray( 'forma', data.list)
      },
      (err:any) => {
        this.toastr.error(err.error.msg);
      });
    });
  }
  
  // Get Cidades
  async GetCidades() {
    const params = {
      method: 'cidade',
      function: 'listCidade',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {

    response.subscribe((data:any) => {
        this.FillArray( 'cidades', data.list)
        this.filteredCidades = this.cidades;
      },
      (err:any) => {
        this.toastr.error(err.error.msg);
      });
    });
  }
  
  // Get pedido item resposta por pedido item
  async GetPedidoItemResp() {
    const params = {
      method: 'pedidoitemrespbypedidoitem/'+this.pedidoItem.id,
      function: 'getPedidoItemRespByPedidoItem',
      type: 'get'
    };

    this.api.AccessApi(params).then((response) => {
      response.subscribe((data:any) => {
          this.FillArray( 'pedidoItemResp', data.list)
        },
        (err:any) => {
          this.toastr.error(err.error.msg);
        });
      });
  }

}

