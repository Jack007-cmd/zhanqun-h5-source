import {AfterViewChecked, Component, Input, OnChanges,OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the SizeTrendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var $: any;

@Component({
  selector: 'size-trend',
  templateUrl: 'size-trend.html'
})
export class SizeTrendComponent implements OnChanges,OnDestroy, AfterViewChecked {
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
  private temRs: any = {};
  private option = 'A';
  private change = 0;
  private loading;
  private objectKeys = Object.keys;

  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController) {
    console.log('Hello SizeTrendComponent Component');
  }

  ngAfterViewChecked() {
    if (this.change == 1 || this.filterRs.disassemble || !this.filterRs.missing) {
      $("#" + this.code).find("canvas").remove();
      this.hotSpanDrawLine();
      this.filterCtrl();
    }
  }

  ngOnDestroy(){
    this.loading.dismiss();
  }

  hotSpanDrawLine() {
    this.lineToChart('.pok', 1, "#50befa");
    this.lineToChart('.pol', 1, "#ee9a00");
  }


  lineToChart(a, b, c) {
    let hot = $("#" + this.code).find(a);
    if (hot.length > 1) {
      for (let i = 1; i < hot.length; i++) {
        this.line(hot[i - 1], hot[i], b, c);
      }
    }
  }

  line(header, footer, line_width, line_color) {
    let xstart = 0;
    let xpos = 0;
    let ypos = 20;
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.visibility = "visible";
    canvas.height = 25;
    if (header.offsetLeft < footer.offsetLeft) {
      canvas.style.top = (18 + header.offsetTop) + "px";
      canvas.style.left = (17 + header.offsetLeft) + "px";
      canvas.width = (footer.offsetLeft - header.offsetLeft);
      xpos = footer.offsetLeft - header.offsetLeft - 14;
      ypos = 25;
    } else if (header.offsetLeft == footer.offsetLeft) {
      canvas.height = 27;
      canvas.style.top = (20 + header.offsetTop) + "px";
      canvas.style.left = (10 + header.offsetLeft) + "px";
      canvas.width = 10;
    } else {
      ypos = 25;
      canvas.style.top = (18 + header.offsetTop) + "px";
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
    $("#" + this.code).find("#chartbottom")[0].scrollIntoView();
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



  getAnalysisDetail() {
    let that: any = this;
    that.mainData = null;
    $("#" + that.code).find("canvas").remove();
    that.change++;
    that.aboutService.getAnalysisDetail(that.code, 'dxzs', that.date).then((res) => {
      if (res.code == 0) {
        that.mainData = res.data;
        that.mainData.list.forEach((v) => {
          v.list["b_num"] = v.list["b_num"][0];
          v.list["s_num"] = v.list["s_num"][0];
        });
        // that.loading.dismiss();
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
      $("#" + this.code).find(".allNumber").eq(0).find("tr").each(function () {
        let tds = $(this).find("td");
        tds.each(function (i) {
          if (i > 1) {
            $(this).find("span").hide();
          }
        });
      });
      $(".hot").find("span").show();
    } else {
      $("#" + this.code).find(".allNumber").eq(0).find("tr").find("td").find("span").show();
    }
    if (this.filterRs.dividingLine) {
      if ($(".bold_top_border").length == 0) {
        $("#" + this.code).find(".allNumber").eq(0).find("tr").each(function () {
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
        this.lineToChart('.pok', 1, "#50befa");
        this.lineToChart('.pol', 1, "#ee9a00");
      }
    }
    if (!this.filterRs.missingLayer) {
      $("#" + this.code).find(".purple").removeClass("purple");
    } else {
      let temp = [];
      let a = 6;
      let b = 4;
      let c = 4;
      let trs = $(".allNumber").eq(0).find("tr").length;
      for (let i = 0; i < a; i++) {
        let flag = true;
        $(".allNumber").eq(0).find("tr").each(function (index) {
          if (flag) {
            if ($(this).find("td").eq(i + 2).hasClass("hot") || index == (trs - 1)) {
              temp.push({rows: index, cols: i + 2});
              flag = false;
            }
          }
        });
      }
      for (let j = 0; j < b; j++) {
        let f = true;
        $(".allNumber").eq(0).find("tr").each(function (index) {
          if (f) {
            if ($(this).find("td").eq(j + 8).hasClass("hot") || index == (trs - 1)) {
              temp.push({rows: index, cols: j + 8});
              f = false;
            }
          }
        });
      }
      for (let k = 0; k < c; k++) {
        let f = true;
        $(".allNumber").eq(0).find("tr").each(function (index) {
          if (f) {
            if ($(this).find("td").eq(k + 12).hasClass("hot") || index == (trs - 1)) {
              temp.push({rows: index, cols: k + 12});
              f = false;
            }
          }
        });
      }
      temp.forEach((v) => {
        $("#" + this.code).find(".allNumber").eq(0).find("tr").each(function (i) {
          if (i < v.rows) {
            $(this).find("td").eq(v.cols).addClass("purple");
          }
        });
      });
    }
  }

}
