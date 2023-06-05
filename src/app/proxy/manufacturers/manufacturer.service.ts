import type { GetManufacturersInput, ManufacturerCreateDto, ManufacturerDto, ManufacturerExcelDownloadDto, ManufacturerUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {
  apiName = 'Default';
  

  create = (input: ManufacturerCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ManufacturerDto>({
      method: 'POST',
      url: '/api/app/manufacturers',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/manufacturers/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ManufacturerDto>({
      method: 'GET',
      url: `/api/app/manufacturers/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/manufacturers/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetManufacturersInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ManufacturerDto>>({
      method: 'GET',
      url: '/api/app/manufacturers',
      params: { filterText: input.filterText, name: input.name, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: ManufacturerExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/manufacturers/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: ManufacturerUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ManufacturerDto>({
      method: 'PUT',
      url: `/api/app/manufacturers/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
