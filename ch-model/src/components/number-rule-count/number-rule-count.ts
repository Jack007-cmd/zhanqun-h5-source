import {Component, Input, OnChanges, AfterViewChecked, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the NumberRuleCountComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var $: any;

@Component({
  selector: 'number-rule-count',
  templateUrl: 'number-rule-count.html'
})
export class NumberRuleCountComponent implements OnChanges, AfterViewChecked {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  public showFilter = -1;
  private mainData: any = {};
  private modeType = 0;//0图表 1数据
  private tPeriods = 30;
  private rank = 1;//第一球
  private radio = 0;//0号码分布 1单双大小
  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello DldragonCountComponent Component');
  }

  ngAfterViewChecked() {
    // if (this.change == 1 ) {
    $("canvas").remove();
    this.lineToChart();
    // }
  }

  lineToChart() {
    if (document.getElementsByClassName("hot").length < 2) {
      return;
    }
    for (let i = 1; i < document.getElementsByClassName("hot").length; i++) {
      this.line(document.getElementsByClassName("hot")[i - 1],
        document.getElementsByClassName("hot")[i], 1, "#0092e0");
    }
  }

  //画直线方法：起始元素、终止元素、线宽、颜色
  line(header, footer, line_width, line_color) {
    let xstart = 4;
    let xpos = 4;
    let ypos = 30;
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.visibility = "visible";
    canvas.height = 30;
    if (header.offsetLeft < footer.offsetLeft) {
      canvas.style.top = (15 + header.offsetTop) + "px";
      canvas.style.left = (17 + header.offsetLeft) + "px";
      canvas.width = (footer.offsetLeft - header.offsetLeft);
      xpos = footer.offsetLeft - header.offsetLeft - 14;
    } else if (header.offsetLeft == footer.offsetLeft) {
      xstart = 2;
      xpos = 2;
      ypos = 15;
      canvas.height = 13;
      canvas.style.top = (24 + header.offsetTop) + "px";
      canvas.style.left = (10 + header.offsetLeft) + "px";
      canvas.width = 10;
    } else {
      canvas.style.top = (15 + header.offsetTop) + "px";
      canvas.style.left = (17 + footer.offsetLeft) + "px";
      canvas.width = (header.offsetLeft - footer.offsetLeft);
      xstart = header.offsetLeft - footer.offsetLeft - 14;
    }
    let ctx = canvas.getContext('2d');
    ctx.fill();
    ctx.lineWidth = line_width;
    ctx.strokeStyle = line_color;
    ctx.beginPath();
    ctx.moveTo(xstart, 0);
    ctx.lineTo(xpos, ypos);
    ctx.stroke();
    ctx.closePath();
    document.getElementById("chartLinediv").appendChild(canvas);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
    }
  }

  getAnalysisDetail() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: '玩命加载中'
    });
    loading.present();
    let that: any = this;
    that.mainData = null;
    $("canvas").remove();
    let extra = 'rank=' + that.rank + (that.tPeriods > 90 ? '' : '%26limit=' + that.tPeriods);
    that.aboutService.getAnalysisDetail(that.code, 'hmgltj', that.date, extra).then((res) => {
      if (res.code == 0) {
        that.mainData = {};
        res.data.list.forEach((v) => {
          v.on = Number(v.on);
        });
        that.mainData.list = res.data.list;
        let appear = [];
        Object.keys(res.data.appear).forEach(function (k) {
          appear.push(res.data.appear[k]);
        });
        that.mainData.appear = appear;
        that.mainData.max = Math.max.apply(null, appear);
        loading.dismiss();
      } else {
        loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch(() => {
      loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  chosePeriods(p) {
    if (p != this.tPeriods) {
      this.tPeriods = p;
      this.showFilter = -1;
      this.getAnalysisDetail();
    }
  }

  rankCheck(r) {
    if (this.rank == r) {
      return;
    }
    this.rank = r;
    this.getAnalysisDetail();
  }
}
