import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import {ScrollEventModule} from "ngx-scroll-event";
// import {NewsDetailPageModule} from "../pages/news/news-detail/news-detail.module";
import {AboutItem} from "../pages/about/about-item/about-item";
import {WinNumberComponent} from "../components/win-number/win-number";
import {LuzhuAnalysisComponent} from "../components/luzhu-analysis/luzhu-analysis";
import {LengreAnalysisComponent} from "../components/lengre-analysis/lengre-analysis";
import {GuanyaTrendComponent} from "../components/guanya-trend/guanya-trend";
import {DsdxHistoryComponent} from "../components/dsdx-history/dsdx-history";
import {LonghuCountComponent} from "../components/longhu-count/longhu-count";
import {DldragonCountComponent} from "../components/dldragon-count/dldragon-count";
import {LonghuLuzhuComponent} from "../components/longhu-luzhu/longhu-luzhu";
import {NumberqhLuzhuComponent} from "../components/numberqh-luzhu/numberqh-luzhu";
import {GuanyaLuzhuComponent} from "../components/guanya-luzhu/guanya-luzhu";
import {DsdxLuzhuComponent} from "../components/dsdx-luzhu/dsdx-luzhu";
import {NumberRuleCountComponent} from "../components/number-rule-count/number-rule-count";
import {BasicTrendComponent} from "../components/basic-trend/basic-trend";
import {PositionTrendComponent} from "../components/position-trend/position-trend";
import {TodayNumberCountComponent} from "../components/today-number-count/today-number-count";
import {DoubleSidesCountComponent} from "../components/double-sides-count/double-sides-count";
import {GuanyaSmHistoryComponent} from "../components/guanya-sm-history/guanya-sm-history";
import {TotalLuzhuComponent} from "../components/total-luzhu/total-luzhu";
import {NumberLuzhuComponent} from "../components/number-luzhu/number-luzhu";
import {LonghuTrendComponent} from "../components/longhu-trend/longhu-trend";
import {PatternTrendComponent} from "../components/pattern-trend/pattern-trend";
import {HistoryNumberCountComponent} from "../components/history-number-count/history-number-count";
import {NumberDistributionComponent} from "../components/number-distribution/number-distribution";
import {SizeTrendComponent} from "../components/size-trend/size-trend";
import {ValueTrendComponent} from "../components/value-trend/value-trend";
import {ParityTrendComponent} from "../components/parity-trend/parity-trend";

@NgModule({
  declarations: [
    AboutItem,
    WinNumberComponent,
    LuzhuAnalysisComponent,
    LengreAnalysisComponent,
    GuanyaTrendComponent,
    DsdxHistoryComponent,
    LonghuCountComponent,
    DldragonCountComponent,
    LonghuLuzhuComponent,
    NumberqhLuzhuComponent,
    GuanyaLuzhuComponent,
    DsdxLuzhuComponent,
    NumberRuleCountComponent,
    BasicTrendComponent,
    PositionTrendComponent,
    TodayNumberCountComponent,
    DoubleSidesCountComponent,
    GuanyaSmHistoryComponent,
    TotalLuzhuComponent,
    NumberLuzhuComponent,
    LonghuTrendComponent,
    PatternTrendComponent,
    HistoryNumberCountComponent,
    NumberDistributionComponent,
    SizeTrendComponent,
    ValueTrendComponent,
    ParityTrendComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ScrollEventModule
  ],
  exports: [
    CommonModule,
    AboutItem,
    WinNumberComponent,
    LuzhuAnalysisComponent,
    LengreAnalysisComponent,
    GuanyaTrendComponent,
    DsdxHistoryComponent,
    LonghuCountComponent,
    DldragonCountComponent,
    LonghuLuzhuComponent,
    NumberqhLuzhuComponent,
    GuanyaLuzhuComponent,
    DsdxLuzhuComponent,
    NumberRuleCountComponent,
    BasicTrendComponent,
    PositionTrendComponent,
    TodayNumberCountComponent,
    DoubleSidesCountComponent,
    GuanyaSmHistoryComponent,
    TotalLuzhuComponent,
    NumberLuzhuComponent,
    LonghuTrendComponent,
    PatternTrendComponent,
    HistoryNumberCountComponent,
    NumberDistributionComponent,
    SizeTrendComponent,
    ValueTrendComponent,
    ParityTrendComponent
  ]
})

export class AppCommonModule {

}
