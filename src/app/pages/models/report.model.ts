class CoordinatorModel {
  koordinatorId: string;
  koordinatorKodu: string;
  koordinatorAdi: string;
}

class RegionModel {
  bolgeId: string;
  bolgeKodu: string;
  bolgeAdi: string;
}

class StoreHouseModel {
  depoId: string;
  depoKodu: string;
  depoAdi: string;
}

class DeliveryTypeModel {
  teslimatTipiId: string;
  teslimatTipiKodu: string;
  teslimatTipiAdi: string;
}

class ReportRequestModel {
  koordinatorIdList: string[];
  bolgeIdList: string[];
  cikisDepoIdList: string[];
  varisDepoIdList: string[];
  teslimatTipiIdList: string[];

  constructor(coordinatorModels: CoordinatorModel[],
              regionModels: RegionModel[],
              departureModels: StoreHouseModel[],
              destinationModels: StoreHouseModel[],
              deliveryTypeModels: DeliveryTypeModel[]) {
    this.koordinatorIdList = coordinatorModels.map(x => x.koordinatorId).filter(x => x !== undefined);
    this.bolgeIdList = regionModels.map(x => x.bolgeId).filter(x => x !== undefined);
    this.cikisDepoIdList = departureModels.map(x => x.depoId).filter(x => x !== undefined);
    this.varisDepoIdList = destinationModels.map(x => x.depoId).filter(x => x !== undefined);
    this.teslimatTipiIdList = deliveryTypeModels.map(x => x.teslimatTipiId).filter(x => x !== undefined);
  }
}

class DailyReportResponseModel {
  day: string;
  lastYearNetKargo: number;
  currentYearNetKargo: number;
}
/*
class MonthlyReportResponseModel {
  month: string;
  previousYearTotal: number;
  currentYearTotal: number;
  lastYearTotal: number;
  lastYearRateOfChangeTotal: number;

  constructor(monthlyDataResponseModel: MonthlyReportResponseModel) {
    this.month = monthlyDataResponseModel.month;
    this.previousYearTotal = monthlyDataResponseModel.previousYearTotal;
    this.currentYearTotal = monthlyDataResponseModel.currentYearTotal;
    this.lastYearTotal = monthlyDataResponseModel.lastYearTotal;
    this.lastYearRateOfChangeTotal = monthlyDataResponseModel.lastYearRateOfChangeTotal;
  }
}*/

export {
  CoordinatorModel,
  RegionModel,
  StoreHouseModel,
  DeliveryTypeModel,
  ReportRequestModel,
  DailyReportResponseModel
};
