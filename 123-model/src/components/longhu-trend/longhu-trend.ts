import {Component, Input, OnInit, AfterViewChecked, OnChanges,OnDestroy, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the LonghuTrendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var $: any;

@Component({
  selector: 'longhu-trend',
  templateUrl: 'longhu-trend.html'
})
export class LonghuTrendComponent implements OnInit, OnChanges,OnDestroy, AfterViewChecked {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  public showFilter = -1;
  private mainData = {list: []};
  private tPeriods = 30;
  private filterRs: any = {
    missing: true,//遗漏
    disassemble: true,//拆线
    missingLayer: false,//遗漏分层
    dividingLine: false//分割线
  };
  private temRs: any = {};
  private change = 0;
  private codeType;
  private loading;
  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController,private localStorage:StorageService) {
    console.log('Hello LonghuTrendComponent Component');
  }

  ngOnInit() {
    let allTypes = this.localStorage.getObject("analysisKinds")["lhzs"];
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType = 1;
    } else if (allTypes["type2"].indexOf(this.code) != -1) {
      this.codeType = 2;
    }
  }

  ngAfterViewChecked() {
    if (this.change == 1 || this.filterRs.disassemble || !this.filterRs.missing) {
      $("#" + this.code).find("canvas").remove();
      this.lineToChart();
      this.filterCtrl();
    }
  }

  lineToChart() {
    let hot = $("#" + this.code).find(".hot_gyh");
    if (hot.length < 2) {
      return;
    }
    for (let i = 1; i < hot.length; i++) {
      this.line(hot[i - 1],
        hot[i], 1, "#0092e0");
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
      canvas.style.left = ((this.codeType == 1 ? 0 : 12) + 33 + header.offsetLeft) + "px";
      canvas.width = (footer.offsetLeft - header.offsetLeft);
      xpos = footer.offsetLeft - header.offsetLeft - 14;
      ypos = 30;
    } else if (header.offsetLeft == footer.offsetLeft) {
      canvas.height = 13;
      canvas.style.top = (24 + header.offsetTop) + "px";
      canvas.style.left = ((this.codeType == 1 ? 0 : 12) + 26 + header.offsetLeft) + "px";
      canvas.width = 10;
    } else {
      ypos = 30;
      canvas.style.top = (15 + header.offsetTop) + "px";
      canvas.style.left = ((this.codeType == 1 ? 0 : 12) + 33 + footer.offsetLeft) + "px";
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


  goBottom() {
    $("#" + this.code).find('#chartbottom')[0].scrollIntoView();
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

  ngOnDestroy(){
    // this.loading.dismiss();
  }

  getAnalysisDetail() {
    let that: any = this;
    that.mainData = {list: []};
    $("#" + that.code).find("canvas").remove();
    that.aboutService.getAnalysisDetail(that.code, 'lhzs', that.date).then((res) => {
      if (res.code == 0) {
        if ((typeof res.data.list == 'object') && res.data.list.constructor == Array) {
          that.mainData = res.data;
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
      //  this.filterCtrl();
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
          if (i > 1) {
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
      if ($("#" + this.code).find("canvas").length == 0) {
        this.lineToChart();
      }
    }
    if (!this.filterRs.missingLayer) {
      $("#" + this.code).find(".purple").removeClass("purple");
    } else {
      if (this.mainData.list) {
        let temp = [];
        let d = true;
        let t = true;
        let s = true;
        for (let i = 0; i < this.mainData.list.length; i++) {
          if (d) {
            if (this.mainData.list[i].list.dts[0].d == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 2;
              temp.push(item);
              d = false;
            }
          }
          if (t) {
            if (this.mainData.list[i].list.dts[0].t == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 3;
              temp.push(item);
              t = false;
            }
          }
          if (s) {
            if (this.mainData.list[i].list.dts[0].s == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 4;
              temp.push(item);
              s = false;
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

}
