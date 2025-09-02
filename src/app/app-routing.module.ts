import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigService } from './core/utils/config-service';

import { NotFoundComponent } from './views/not-found-component/not-found-component.component';


const routes: Routes = [
  {path: '', redirectTo: `/${ConfigService.home_uri}`,pathMatch:'full'},
  { path: '', loadChildren: () => import('./views/public/public.module').then(m => m.PublicModule)},
  { path: 'admin', loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
