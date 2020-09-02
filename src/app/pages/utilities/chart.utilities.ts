import {DailyReportResponseModel} from '../models/report.model';
import {ChartOptions} from '../pages/report/report.component';
import {TableColumn} from '../../../@vex/interfaces/table-column.interface';


export class ChartUtilities {
  constructor() {
  }

  public PrepareDailyChartData(dailyReportResponseModel: DailyReportResponseModel[]) {

    const chartOptions: Partial<ChartOptions> =  {
      series: [
        {
          name: 'Yıl bazında kümilatif net kargo',
          type: 'column',
          data: dailyReportResponseModel.filter(x => x.day !== 'Toplam').map(x => x.lastYearNetKargo)
        },
        {
          name: 'Net Kargo',
          type: 'line',
          data: dailyReportResponseModel.filter(x => x.day !== 'Toplam').map(x => x.currentYearNetKargo)
        }
      ],
      chart: {
        height: 350,
        type: 'line'
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: 'Kargo Grafiği'
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [...
       dailyReportResponseModel.map(x => x.day + '. Gün')
      ],
      yaxis: [
        {
          title: {
            text: 'Net Kargo'
          }
        },
        {
          opposite: true,
          title: {
            text: 'Günler'
          }
        }
      ]
    };
    return chartOptions;
  }
  public GetMonthlyTableColumns() {
    const tableOptions: TableColumn<DailyReportResponseModel>[] = [
    {label: 'Gün', property: 'day', type: 'text', visible: true},
    {label: 'Geçen Yıl Net Kargo', property: 'lastYearNetKargo', type: 'text', visible: true},
    {label: 'Bu Yıl Net Kargo', property: 'currentYearNetKargo', type: 'text', visible: true}
    ];
    return tableOptions;
  }

}
