import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44352/',
  redirectUri: baseUrl,
  clientId: 'BikeListing_App',
  responseType: 'code',
  scope: 'offline_access BikeListing',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'BikeListing',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44352',
      rootNamespace: 'BikeListing',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
