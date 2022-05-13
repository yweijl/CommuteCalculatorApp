import { DataSource } from '@angular/cdk/collections';
import { ContactResponse } from '../http-client/api-http-client';
import { Observable, ReplaySubject } from 'rxjs';

export class SelectedTravelplansDataSource extends DataSource<
  [id: number, contact: ContactResponse]
> {
  private _dataStream = new ReplaySubject<
    [id: number, contact: ContactResponse][]
  >();

  constructor() {
    super();
  }

  connect(): Observable<[id: number, contact: ContactResponse][]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: [id: number, contact: ContactResponse][]) {
    this._dataStream.next(data);
  }
}
