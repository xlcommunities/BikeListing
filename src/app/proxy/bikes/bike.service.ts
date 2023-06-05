import type { BikeCreateDto, BikeDto, BikeExcelDownloadDto, BikeUpdateDto, BikeWithNavigationPropertiesDto, GetBikesInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  apiName = 'Default';
  

  create = (input: BikeCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeDto>({
      method: 'POST',
      url: '/api/app/bikes',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/bikes/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeDto>({
      method: 'GET',
      url: `/api/app/bikes/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/bikes/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetBikesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BikeWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/bikes',
      params: { filterText: input.filterText, model: input.model, frameSizeMin: input.frameSizeMin, frameSizeMax: input.frameSizeMax, priceMin: input.priceMin, priceMax: input.priceMax, manufacturerId: input.manufacturerId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: BikeExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/bikes/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name },
    },
    { apiName: this.apiName,...config });
  

  getManufacturerLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/bikes/manufacturer-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/bikes/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: BikeUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BikeDto>({
      method: 'PUT',
      url: `/api/app/bikes/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
