import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const MANUFACTURERS_MANUFACTURER_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/manufacturers',
        iconClass: 'fas fa-industry',
        name: '::Menu:Manufacturers',
        layout: eLayoutType.application,
        requiredPolicy: 'BikeListing.Manufacturers',
      },
    ]);
  };
}
