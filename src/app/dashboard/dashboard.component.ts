import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-host-dashboard *abpPermission="'BikeListing.Dashboard.Host'"></app-host-dashboard>
    <app-tenant-dashboard *abpPermission="'BikeListing.Dashboard.Tenant'"></app-tenant-dashboard>
  `,
})
export class DashboardComponent {}
