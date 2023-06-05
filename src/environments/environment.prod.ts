import { Environment } from '@abp/ng.core';

const baseUrl = 'https://bike-listing.vercel.app/';

const oAuthConfig = {
  issuer: 'https://bikelistingapi.azurewebsites.net/',
  redirectUri: baseUrl,
  clientId: 'BikeListing_App',
  responseType: 'code',
  scope: 'offline_access BikeListing',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'BikeListing',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://bikelistingapi.azurewebsites.net',
      rootNamespace: 'BikeListing',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
