import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetManufacturersInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
}

export interface ManufacturerCreateDto {
  name: string;
}

export interface ManufacturerDto extends FullAuditedEntityDto<string> {
  name: string;
  concurrencyStamp?: string;
}

export interface ManufacturerExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
}

export interface ManufacturerUpdateDto {
  name: string;
  concurrencyStamp?: string;
}
