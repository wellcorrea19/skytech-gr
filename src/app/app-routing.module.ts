import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContratosComponent } from './pages/contratos/contratos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SoliPedidoComponent } from './pages/soli-pedido/soli-pedido.component';
import { AuthGuardGuard } from './service/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'soli-pedido',
    component: SoliPedidoComponent
  },
  {
    path: 'contratos',
    component: ContratosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
