import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {
  CoordinatorModel,
  DeliveryTypeModel,
  RegionModel,
  ReportRequestModel,
  StoreHouseModel
} from '../models/report.model';
import {map} from 'rxjs/operators';

const key = 'data';
@Injectable({
  providedIn: 'root'
})

export class ReportService {
  constructor(private http: HttpClient) {
  }

  public getCoordinators() {
    return this.http.post<CoordinatorModel[]>(`${environment.api_url}/Koordinator/List`, {}).pipe(
      map( res => res[key] ));
  }

  public getRegions() {
    return this.http.post<RegionModel[]>(`${environment.api_url}/Bolge/List`, {}).pipe(
      map( res => res[key] ));
  }

  public getStoreHouses() {
    return this.http.post<StoreHouseModel[]>(`${environment.api_url}/Depo/List`, {}).pipe(
      map( res => res[key] ));
  }
  public getDeliveryTypes() {
    return this.http.post<DeliveryTypeModel[]>(`${environment.api_url}/TeslimatTipi/List`, {}).pipe(
      map( res => res[key] ));
  }
  public GetDailyReport(reportRequestModel: ReportRequestModel): Promise<any> {
    return this.http.post(`${environment.api_url}/DailyReport/List`, reportRequestModel).pipe(
      map( res => res[key] )).toPromise();
  }
  /*public GetMonthlyReport(reportRequestModel: ReportRequestModel): Promise<any> {
    return this.http.post(`${environment.api_url}/MonthlyReport/List`, reportRequestModel).pipe(
      map( res => res[key] )).toPromise();
  }*/
}
