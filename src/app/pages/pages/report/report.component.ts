import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TableColumn} from '../../../../@vex/interfaces/table-column.interface';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {untilDestroyed} from 'ngx-take-until-destroy';
import theme from '../../../../@vex/utils/tailwindcss';
import {ReportService} from '../../services/report.service';
import {
  CoordinatorModel,
  DailyReportResponseModel,
  DeliveryTypeModel,
  RegionModel,
  ReportRequestModel,
  StoreHouseModel
} from '../../models/report.model';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
} from 'ng-apexcharts';
import {AuthenticationService} from '../../services/authentication.service';
import {ChartUtilities} from '../../utilities/chart.utilities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReplaySubject} from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any;
  dataLabels: any;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'vex-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ChartUtilities]
})
export class ReportComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  reportForm: FormGroup;
  coordinatorList: CoordinatorModel[] = [];
  regionList: RegionModel[] = [];
  storeHouseList: StoreHouseModel[] = [];
  deliveryTypeList: DeliveryTypeModel[] = [];
  colsBreakpoint;
  screenSize = 850;
  theme = theme;
  reportRequestModel: ReportRequestModel;
  dailyChartDataReady = false;
  dailyTableDataReady = false;
  layoutCtrl = new FormControl('boxed');
  subject$: ReplaySubject<DailyReportResponseModel[]> = new ReplaySubject<DailyReportResponseModel[]>(1);
  dailyData: DailyReportResponseModel[];

  @Input()
  displayedColumns: string[] = ['day', 'lastYearNetKargo', 'currentYearNetKargo'];
  pageSize = 10;
  totalPosts = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<DailyReportResponseModel> | null;
  searchCtrl = new FormControl();
  private pagedDailyData = [];
  constructor(private cd: ChangeDetectorRef,
              private reportService: ReportService,
              private authenticationService: AuthenticationService,
              private chartUtilities: ChartUtilities) {
  }

  ngOnInit() {
    this.colsBreakpoint = (window.innerWidth <= this.screenSize) ? 1 : 4;
    this.reportForm = new FormGroup({
      coordinator: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required),
      departureStoreHouse: new FormControl(null, Validators.required),
      destinationStoreHouse: new FormControl(null, Validators.required),
      deliveryType: new FormControl(null, Validators.required),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      dailyToggle: new FormControl(null)
    });
    this.authenticationService.login();
    this.reportService.getCoordinators()
      .subscribe(res => this.coordinatorList = res);
    this.reportService.getRegions()
      .subscribe(res => this.regionList = res);
    this.reportService.getDeliveryTypes()
      .subscribe(res => this.deliveryTypeList = res);
    this.reportService.getStoreHouses()
      .subscribe(res => this.storeHouseList = res);
    this.dataSource = new MatTableDataSource();

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    if (this.reportForm.valid) {
      this.reportRequestModel = new ReportRequestModel(
        this.reportForm.controls.coordinator.value,
        this.reportForm.controls.region.value,
        this.reportForm.controls.departureStoreHouse.value,
        this.reportForm.controls.destinationStoreHouse.value,
        this.reportForm.controls.deliveryType.value);
      this.reportService.GetDailyReport(this.reportRequestModel).then(
        res => {
          this.dailyData = res;
          this.totalPosts = this.dailyData.length;
          this.pageSizeOptions = [5, 10, 20, this.totalPosts];
          this.pagedDailyData = this.dailyData.slice(0, 10);
          this.dataSource = new MatTableDataSource(this.pagedDailyData);
          this.dailyTableDataReady = true;
          this.chartOptions = this.chartUtilities.PrepareDailyChartData(this.dailyData);
          this.dailyChartDataReady = true;
        });
    }
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  ngOnDestroy() {
  }

  onResize(event) {
    this.colsBreakpoint = (event.target.innerWidth <= this.screenSize) ? 1 : 4;
  }

  toggleAllSelection(list, select) {
    if (select.source._selected) {
      this.reportForm.get(select.source._parent.ngControl.name)
        .setValue([...list.map(item => item), '0']);
    } else {
      this.reportForm.get(select.source._parent.ngControl.name).patchValue(null);
    }
  }

  onTableChangedPage(pageData: PageEvent) {
    this.pagedDailyData = [];
    for (let i = 0; i < pageData.pageSize && pageData.pageIndex * pageData.pageSize + i < pageData.length; i++) {
      this.pagedDailyData.push(this.dailyData[pageData.pageIndex * pageData.pageSize + i]);
    }
    this.dataSource = new MatTableDataSource(this.pagedDailyData);
    this.dataSource.sort = this.sort;
  }
}
