import {Component, Input, AfterViewChecked, OnChanges,OnDestroy, SimpleChanges} from '@angular/core';
// import {Content} from "ionic-angular";
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the GuanyaTrendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var $: any;

@Component({
  selector: 'guanya-trend',
  templateUrl: 'guanya-trend.html'
})
export class GuanyaTrendComponent implements AfterViewChecked, OnChanges,OnDestroy {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  public showFilter = -1;
  private mainData: any = {};
  private tPeriods = 30;
  private filterRs: any = {
    missing: true,//遗漏
    disassemble: true,//拆线
    missingLayer: false,//遗漏分层
    dividingLine: false//分割线
  };
  private temRs: any = {
    list: [],
    statistics: {
      appear: [],
      avg: [],
      max: [],
      maxAway: [],
      current: []
    }
  };
  private change = 0;

  private loading;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello GuanyaTrendComponent Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      // this.loading = this.loadingCtrl.create({
      //   spinner: 'dots',
      //   content: '玩命加载中'
      // });
      // this.loading.present();
      this.getAnalysisDetail();
    }
  }

  ngAfterViewChecked() {
    if (this.change == 1 || this.filterRs.disassemble || !this.filterRs.missing) {
      $("#" + this.code).find("canvas").remove();
      //this.lineToChart();
      this.filterCtrl();
    }
  }

  ngOnDestroy(){
    // this.loading.dismiss();
  }

  lineToChart() {
    let hot = $("#" + this.code).find(".hot_gyh");
    if (hot.length > 1) {
      for (let i = 1; i < hot.length; i++) {
        this.line(hot[i - 1],
          hot[i], 1, "#0092e0");
      }
    }
  }

  //画直线方法：起始元素、终止元素、线宽、颜色
  line(header, footer, line_width, line_color) {
    let xstart = 0;
    let xpos = 0;
    let ypos = 15;
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.visibility = "visible";
    canvas.height = 30;
    if (header.offsetLeft < footer.offsetLeft) {
      canvas.style.top = (15 + header.offsetTop) + "px";
      canvas.style.left = (17 + header.offsetLeft) + "px";
      canvas.width = (footer.offsetLeft - header.offsetLeft);
      xpos = footer.offsetLeft - header.offsetLeft - 14;
      ypos = 30;
    } else if (header.offsetLeft == footer.offsetLeft) {
      canvas.height = 13;
      canvas.style.top = (24 + header.offsetTop) + "px";
      canvas.style.left = (10 + header.offsetLeft) + "px";
      canvas.width = 10;
    } else {
      ypos = 30;
      canvas.style.top = (15 + header.offsetTop) + "px";
      canvas.style.left = (17 + footer.offsetLeft) + "px";
      canvas.width = (header.offsetLeft - footer.offsetLeft);
      xstart = header.offsetLeft - footer.offsetLeft - 14;
    }
    let ctx = canvas.getContext('2d');
    // ctx.clearRect(0,0,xpos,ypos); //清空画布，多个表格时使用
    ctx.fill();
    ctx.lineWidth = line_width;
    ctx.strokeStyle = line_color;
    ctx.beginPath();
    ctx.moveTo(xstart, 0);
    ctx.lineTo(xpos, ypos);
    ctx.stroke();
    ctx.closePath();
    $("#" + this.code).find("#chartLinediv").append(canvas);
  }

  //滚动到底部
  goBottom() {
    $("#" + this.code).find('#chartbottom')[0].scrollIntoView();
  }

  getAnalysisDetail() {
    let that: any = this;
    that.mainData = {
      list: [],
      statistics: {
        appear: [],
        avg: [],
        max: [],
        maxAway: [],
        current: []
      }
    };
    $("#" + that.code).find("canvas").remove();
    that.aboutService.getAnalysisDetail(that.code, 'gyhzs', that.date).then((res) => {
      if (res.code == 0) {
        if ((typeof res.data.list == 'object') && res.data.list.constructor == Array) {
          let list = [];
          res.data.list.forEach((v) => {
            let item: any = {};
            let tas = [];
            v.list.tas.forEach((value) => {
              Object.keys(value).forEach(function (key) {
                tas.push(value[key]);
              });
            });
            item.no = v.no;
            item.tas = tas;
            list.push(item);
          });
          this.mainData.list = list;
          let appear = [];
          let avg = [];
          let max = [];
          let maxAway = [];
          let current = [];
          res.data.statistics.appear.tas.forEach((v) => {
            Object.keys(v).forEach(function (key) {
              appear.push(v[key]);
            });
          });
          res.data.statistics.avg.tas.forEach((v) => {
            Object.keys(v).forEach(function (key) {
              avg.push(v[key]);
            });
          });
          res.data.statistics.max.tas.forEach((v) => {
            Object.keys(v).forEach(function (key) {
              max.push(v[key]);
            });
          });
          res.data.statistics.maxAway.tas.forEach((v) => {
            Object.keys(v).forEach(function (key) {
              maxAway.push(v[key]);
            });
          });
          res.data.statistics.current.tas.forEach((v) => {
            Object.keys(v).forEach(function (key) {
              current.push(v[key]);
            });
          });
          that.mainData.statistics.appear = appear;
          that.mainData.statistics.avg = avg;
          that.mainData.statistics.max = max;
          that.mainData.statistics.maxAway = maxAway;
          that.mainData.statistics.current = current;
          // that.loading.dismiss();
        } else {
          setTimeout(that.getAnalysisDetail(),500);
        }
      } else {
        // that.loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch(() => {
      // that.loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }

  chosePeriods(p) {
    if (p != this.tPeriods) {
      $("#" + this.code).find("canvas").remove();
      this.change++;
      this.tPeriods = p;
      this.showFilter = -1;
      // this.hotSpanDrawLine();
      // this.filterCtrl();
    }
  }

  choseCon(n) {
    if (n == 3) {
      this.showFilter = 3;
      this.temRs = this.filterRs;
    } else if (n == -1) {
      this.showFilter = -1;
      this.temRs = {};
    } else {
      this.showFilter = -1;
      this.filterRs = this.temRs;
      this.filterCtrl();
    }
  }

  filterCtrl() {
    if (!this.filterRs.missing) {
      $("#allNumber").find("tr").each(function () {
        let tds = $(this).find("td");
        tds.each(function (i) {
          if (i > 0) {
            $(this).find("span").hide();
          }
        });
      });
      $("#" + this.code).find(".hot_gyh").find("span").show();
    } else {
      $("#" + this.code).find("#allNumber").find("tr").find("td").find("span").show();
    }
    if (this.filterRs.dividingLine) {
      if ($(".bold_top_border").length == 0) {
        $("#" + this.code).find("#allNumber").find("tr").each(function () {
          if (Number($(this).find("td").eq(0).text().trim()) % 5 == 0) {
            $(this).addClass("bold_top_border");
          }
        });
      }
    } else {
      $("#" + this.code).find(".bold_top_border").removeClass("bold_top_border");
    }
    if (!this.filterRs.disassemble) {
      $("#" + this.code).find("canvas").remove();
      this.change++;
    } else {
      if ($("canvas").length == 0) {
        this.lineToChart();
      }
    }
    if (!this.filterRs.missingLayer) {
      $("#" + this.code).find(".purple").removeClass("purple");
    } else {
      let temp = [];
      for (let i = 3; i < 20; i++) {
        let flag = true;
        for (let j = 0; j < this.mainData.list.length; j++) {
          if (flag) {
            if (j == this.mainData.list.length - 1 || this.mainData.list[j].tas[i - 3] == 0) {
              let item: any = {};
              item.rows = j;
              item.cols = i - 2;
              temp.push(item);
              flag = false;
            }
          }
        }
      }
      temp.forEach((v) => {
        $("#" + this.code).find("#allNumber").find("tr").each(function (i) {
          if (i < v.rows) {
            $(this).find("td").eq(v.cols).addClass("purple");
          }
        });
      });
    }
  }
}

