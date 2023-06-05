import { ABP, downloadBlob, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type { GetBikesInput, BikeWithNavigationPropertiesDto } from '../../../proxy/bikes/models';
import { BikeService } from '../../../proxy/bikes/bike.service';
@Component({
  selector: 'app-bike',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './bike.component.html',
  styles: [],
})
export class BikeComponent implements OnInit {
  data: PagedResultDto<BikeWithNavigationPropertiesDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetBikesInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  isExportToExcelBusy = false;

  selected?: BikeWithNavigationPropertiesDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: BikeService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>
      this.service.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<BikeWithNavigationPropertiesDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetBikesInput;
  }

  buildForm() {
    const { model, frameSize, price, manufacturerId } = this.selected?.bike || {};

    this.form = this.fb.group({
      model: [
        model ?? null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(100)],
      ],
      frameSize: [frameSize ?? null, []],
      price: [price ?? null, []],
      manufacturerId: [manufacturerId ?? null, [Validators.required]],
    });
  }

  hideForm() {
    this.isModalOpen = false;
    this.form.reset();
  }

  showForm() {
    this.buildForm();
    this.isModalOpen = true;
  }

  submitForm() {
    if (this.form.invalid) return;

    const request = this.selected
      ? this.service.update(this.selected.bike.id, {
          ...this.form.value,
          concurrencyStamp: this.selected.bike.concurrencyStamp,
        })
      : this.service.create(this.form.value);

    this.isModalBusy = true;

    request
      .pipe(
        finalize(() => (this.isModalBusy = false)),
        tap(() => this.hideForm())
      )
      .subscribe(this.list.get);
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: BikeWithNavigationPropertiesDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: BikeWithNavigationPropertiesDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.bike.id))
      )
      .subscribe(this.list.get);
  }

  exportToExcel() {
    this.isExportToExcelBusy = true;
    this.service
      .getDownloadToken()
      .pipe(
        switchMap(({ token }) =>
          this.service.getListAsExcelFile({ downloadToken: token, filterText: this.list.filter })
        ),
        finalize(() => (this.isExportToExcelBusy = false))
      )
      .subscribe(result => {
        downloadBlob(result, 'Bike.xlsx');
      });
  }
}
