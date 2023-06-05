import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const BIKES_BIKE_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/bikes',
        iconClass: 'fas fa-bicycle',
        name: '::Menu:Bikes',
        layout: eLayoutType.application,
        requiredPolicy: 'BikeListing.Bikes',
      },
    ]);
  };
}
