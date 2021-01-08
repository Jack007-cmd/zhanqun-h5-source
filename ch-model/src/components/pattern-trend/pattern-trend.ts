import {Component, Input, AfterViewChecked, OnChanges,OnDestroy, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the PatternTrendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
declare var $: any;

@Component({
  selector: 'pattern-trend',
  templateUrl: 'pattern-trend.html'
})
export class PatternTrendComponent implements AfterViewChecked, OnChanges,OnDestroy {

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;
  public showFilter = -1;
  private mainData = {list: []};
  private tPeriods = 30;
  private modeType = 1;//1:前三形态 2：中三形态 3：后三形态
  private filterRs: any = {
    missing: true,//遗漏
    disassemble: true,//拆线
    missingLayer: false,//遗漏分层
    dividingLine: false//分割线
  };
  private temRs: any = {};
  private change = 0;
  private loading;
  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello PatternTrendComponent Component');
  }

  ngAfterViewChecked() {
    if (this.change == 1 || this.filterRs.disassemble || !this.filterRs.missing) {
      $("#" + this.code).find("canvas").remove();
      this.lineToChart();
      this.filterCtrl();
    }
  }

  lineToChart() {
    let orblue = $("#" + this.code).find(".orblue");
    let orcls = $("#" + this.code).find(".orcls");
    if (orblue.length > 1) {
      for (let i = 1; i < orblue.length; i++) {
        this.line(orblue[i - 1].parentElement, orblue[i].parentElement, 1, "#0092e0");
      }
    }
    if (orcls.length > 1) {
      for (let i = 1; i < orcls.length; i++) {
        this.line(orcls[i - 1].parentElement, orcls[i].parentElement, 1, "#f2b653");
      }
    }
  }

  line(header, footer, line_width, line_color) {
    let xstart = 0;
    let xpos = 0;
    let ypos = 9;
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.visibility = "visible";
    canvas.height = 26;
    if (header.offsetLeft < footer.offsetLeft) {
      canvas.style.top = (13 + header.offsetTop) + "px";
      canvas.style.left = (28 + header.offsetLeft) + "px";
      canvas.width = (footer.offsetLeft - header.offsetLeft);
      xpos = footer.offsetLeft - header.offsetLeft - 20;
      ypos = 26;
    } else if (header.offsetLeft == footer.offsetLeft) {
      canvas.height = 13;
      canvas.style.top = (21 + header.offsetTop) + "px";
      canvas.style.left = (14 + header.offsetLeft) + "px";
      canvas.width = 10;
    } else {
      ypos = 26;
      canvas.style.top = (13 + header.offsetTop) + "px";
      canvas.style.left = (28 + footer.offsetLeft) + "px";
      canvas.width = (header.offsetLeft - footer.offsetLeft);
      xstart = header.offsetLeft - footer.offsetLeft - 23;
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

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.loading = this.loadingCtrl.create({
        spinner: 'dots',
        content: '玩命加载中'
      });
      this.loading.present();
      this.getAnalysisDetail();
    }
  }

  ngOnDestroy(){
    this.loading.dismiss();
  }

  getAnalysisDetail() {
    let that: any = this;
    that.mainData = {list: []};
    $("canvas").remove();
    that.change++;
    that.aboutService.getAnalysisDetail(that.code, 'xtzs', that.date).then((res) => {
      if (res.code == 0) {
        if ((typeof res.data.list == 'object') && res.data.list.constructor == Array) {
          that.mainData = res.data;
          that.loading.dismiss();
        } else {
          setTimeout(that.getAnalysisDetail(),500);
        }
      } else {
        that.loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch(() => {
      that.loading.dismiss();
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
          if (i > 3) {
            $(this).find("span").hide();
          }
        });
      });
      $("#" + this.code).find(".hot").find("span").show();
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
      if (this.mainData.list) {
        let temp = [];
        let is = true;
        let ag = true;
        let ps = true;
        let hag = true;
        let or = true;
        let gt = true;
        let gs = true;
        for (let i = 0; i < this.mainData.list.length; i++) {
          if (is) {
            if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].is == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 4;
              temp.push(item);
              item = {};
              item.rows = i;
              item.cols = 11;
              temp.push(item);
              is = false;
            }
          }
          if (ag) {
            if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].ag == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 5;
              temp.push(item);
              ag = false;
            }
          }
          if (ps) {
            if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].ps == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 6;
              temp.push(item);
              ps = false;
            }
          }
          if (hag) {
            if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].hag == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 7;
              temp.push(item);
              hag = false;
            }
          }
          if (or) {
            if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].or == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 8;
              temp.push(item);
              or = false;
            }
          }
          if (gt) {
            if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].gt == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 9;
              temp.push(item);
              gt = false;
            }
          }
          if (gs) {
            if (i == this.mainData.list.length - 1 || this.mainData.list[i].list.numList[this.modeType - 1].gs == 0) {
              let item: any = {};
              item.rows = i;
              item.cols = 10;
              temp.push(item);
              gs = false;
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

