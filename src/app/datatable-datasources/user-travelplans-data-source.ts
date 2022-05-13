import { DataSource } from '@angular/cdk/collections';
import { TravelplanResponse } from '../http-client/api-http-client';
import { Observable, ReplaySubject } from 'rxjs';

export class UserTravelplansDataSource extends DataSource<TravelplanResponse> {
  private _dataStream = new ReplaySubject<TravelplanResponse[]>();

  constructor() {
    super();
  }

  connect(): Observable<TravelplanResponse[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: TravelplanResponse[]) {
    this._dataStream.next(data);
  }
}
