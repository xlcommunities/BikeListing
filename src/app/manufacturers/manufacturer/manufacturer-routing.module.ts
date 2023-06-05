import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManufacturerComponent } from './components/manufacturer.component';

const routes: Routes = [
  {
    path: '',
    component: ManufacturerComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManufacturerRoutingModule {}
