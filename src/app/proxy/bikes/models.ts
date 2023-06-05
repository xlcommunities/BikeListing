import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ManufacturerDto } from '../manufacturers/models';

export interface BikeCreateDto {
  model: string;
  frameSize?: number;
  price?: number;
  manufacturerId: string;
}

export interface BikeDto extends FullAuditedEntityDto<string> {
  model: string;
  frameSize?: number;
  price?: number;
  manufacturerId: string;
  concurrencyStamp?: string;
}

export interface BikeExcelDownloadDto {
  downloadToken?: string;
  filterText?: string;
  name?: string;
}

export interface BikeUpdateDto {
  model: string;
  frameSize?: number;
  price?: number;
  manufacturerId: string;
  concurrencyStamp?: string;
}

export interface BikeWithNavigationPropertiesDto {
  bike: BikeDto;
  manufacturer: ManufacturerDto;
}

export interface GetBikesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  model?: string;
  frameSizeMin?: number;
  frameSizeMax?: number;
  priceMin?: number;
  priceMax?: number;
  manufacturerId?: string;
}
