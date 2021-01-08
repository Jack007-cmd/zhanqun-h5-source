import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AppConfig} from "../../../service/app-config.service";
import {AboutService} from "../../about/about.service";
import {StorageService} from "../../../service/storage.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AlertService} from "../../../service/alert.service";

/**
 * Generated class for the DataAnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare let echarts: any;

@Component({
  selector: 'page-data-analysis',
  templateUrl: 'data-analysis.html',
})
export class DataAnalysisPage {
  currentType = {
    code: 'tjssc',
    name: "天津时时彩",
    type: 2
  };
  public showType = -1;
  public showVideo = false;//视频显示
  video_url;
  public myDate;//选中日期
  private today;
  public now = new Date();
  categoryList = [];
  private aboutList: any;//当前期基本数据
  private current_number;
  private allSeconds: number = 0;//距离下期开奖时间（秒）(动态)
  private interval: number;  //接口返回数据时距离下期开奖时间（秒）
  private hour;//时
  private minute = "00";//分
  private second = "00"; //秒
  private st;
  private rl;
  readonly timeDiff: number;//服务器与客户端时间差
  myChart: any;
  private selectType = -1;
  private checkedFactor = {// 已选中条件
    position: 0,
    betting: 1,
    num: ['1'],
    limit: 100
  };
  private tempNoArr = [];//号码选择面板选中号码
  private factorList;// 当前彩种对应筛选条件
  private objectKeys = Object.keys;
  private statistics;// 出号统计
  private label = [];
  private win = [];
  private lose = [];
  private issue = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private appConfig: AppConfig, private alertService: AlertService,
              private aboutService: AboutService, private storageService: StorageService, private sanitizer: DomSanitizer,) {
    let m = (this.now.getMonth() < 9 ? '0' : '') + (this.now.getMonth() + 1);
    let d = (this.now.getDate() < 10 ? '0' : '') + this.now.getDate();
    this.today = this.myDate = this.now.getFullYear() + "-" + m + "-" + d;
    this.currentType["video_url"] = this.sanitizer.bypassSecurityTrustResourceUrl(this.appConfig.imgHost + '/assets/web/common/lottery/lotteryVideo/index.html?key=tjssc');
    this.timeDiff = Number(this.storageService.get("timeDiff"));
    this.timeDiff = isNaN(this.timeDiff) ? 0 : this.timeDiff;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataAnalysisPage');
  }

  ionViewWillEnter() {
    this.getAboutCategoryList();
    this.getAboutOnce();
    this.getFilterFactor();
  }

  //视频播放控制
  videoCtrl() {
    this.showVideo = !this.showVideo;
  }

  ionViewWillLeave() {
    clearInterval(this.st);
    clearInterval(this.rl);
  }

  ionViewDidEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
    this.myChart = echarts.init(document.getElementById('echart-div') as HTMLDivElement);
  }

  getAboutCategoryList() {
    let that: any = this;
    that.aboutService.getAboutCategoryList().then((rs) => {
      if (rs.code == 0) {
        that.categoryList = [];
        Object.keys(rs.data).forEach(k => {
          rs.data[k].list.forEach((v) => {
            let temp = that.getAboutItem(v.code);
            // console.log(temp);
            v['url'] = temp['url'];
            v['des'] = temp['des'];
            v['logo'] = temp['logo'];
          });
          that.categoryList.push(rs.data[k]);
        });
      }
    });
  }

  //获取当前期基本数据
  getAboutOnce() {
    let that: any = this;
    that.aboutService.getAboutOnce(that.currentType.code).then((rs) => {
      if (rs.code == 0) {
        that.aboutList = rs.data;
        that.current_number = rs.data.current_number;
        that.countDown();
        that.numberRoll();
      } else {
        that.alertService.msg(rs.msg);
      }
    });
  }

  //下期开奖倒计时
  countDown() {
    this.interval = this.allSeconds = Math.floor((new Date(this.aboutList.next_time.replace(/-/g, "/")).getTime() - new Date().getTime() - this.timeDiff) / 1000);
    this.st = setInterval(() => {
      this.allSeconds -= 2;
      if (this.allSeconds <= 0) {
        this.minute = '00';
        this.second = '00';
        this.getAboutOnce();
        clearInterval(this.st);
      } else {
        this.hour = Math.floor(this.allSeconds / 3600);
        let lastSeconds = this.allSeconds % 3600;
        this.minute = ((lastSeconds / 60 < 10) ? '0' : '') + Math.floor(lastSeconds / 60);
        this.second = (lastSeconds % 60 < 10 ? '0' : '') + lastSeconds % 60;
      }
    }, 2000);
  }

  //号码滚动
  numberRoll() {
    let that: any = this;
    that.rl = setInterval(() => {
      if (that.allSeconds >= 0) {
        clearInterval(this.rl);
        return;
      }
      that.aboutList.current_code.forEach((v, k) => {
        that.aboutList.current_code[k] = Math.floor(10 * Math.random());
      });
    }, 200);
  }

  switchType(item) {
    this.showType = -1;
    if (this.currentType.code == item.code) return;
    this.currentType.code = item.code;
    this.currentType.name = item.name;
    this.currentType['video_url'] = this.sanitizer.bypassSecurityTrustResourceUrl(item['url']);
    this.currentType.type = Number(item.des.split("_")[1].split("P")[0]);
    clearInterval(this.st);
    clearInterval(this.rl);
    this.getAboutOnce();
    this.checkedFactor = {// 已选中条件
      position: 0,
      betting: 1,
      num: ['1'],
      limit: 100
    };
    this.getFilterFactor();
  }

  getAboutItem(code) {
    let basicArr = this.storageService.getArray("basicArr");
    let data = basicArr.filter(item => {
      return item.code == code;
    });
    return data[0];
  }

  ionScroll(event) {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        if (event.directionY == "down") {
          elements[key].style.display = 'none';
        } else {
          elements[key].style.display = 'flex';
        }
      });
    }
  }

  getFilterFactor() {
    let that: any = this;
    this.aboutService.getFilterFactor(that.currentType.code).then((rs) => {
      if (rs.code == "0") {
        that.factorList = rs.data.list;
        that.getDataAnalysisDetail(that.currentType.code, that.checkedFactor.position, that.checkedFactor.limit, that.checkedFactor.betting, that.checkedFactor.num);
      } else {
        that.alertService.msg("网络异常，稍后再试");
      }
    });
  }

  getDataAnalysisDetail(code, position, limit, bettingLimit, num) {
    let that: any = this;
    that.aboutService.getDataAnalysisDetail(code, position, limit, bettingLimit, num).then((rs) => {
      if (rs.code == '0') {
        that.statistics = rs.data.data.list;
        that.label = rs.data.data.chart.label;
        that.win = rs.data.data.chart.win;
        that.lose = rs.data.data.chart.lose;
        that.issue = rs.data.data.chart.issue;
        that.drawCanvas();
      } else {
        that.alertService.msg("网络异常，稍后再试");
      }
    });
  }

  // 画图
  drawCanvas() {
    let that: any = this;
    let temp = that.lose.filter(function (item) {
      return item != "-"
    });
    let maxLose = Math.max.apply(null, temp);
    let sum = 0;
    for (let i in temp) {
      sum += temp[i];
    }
    let tempWin = that.win.filter(function (item) {
      return item != "-"
    });
    let sumWin = 0;
    for (let j in tempWin) {
      sumWin += tempWin[j];
    }
    let averageLose = sum / (sumWin + 1);
    averageLose = Math.round(averageLose * 100) / 100;
    let option = {
      dataZoom: [
        {
          id: 'dataZoomX',
          type: 'slider',
          xAxisIndex: [0],
          filterMode: 'empty', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
          start: 0,
          end: that.label.length > 90 ? 10 : (that.label.length > 40 ? 20 : (that.label.length < 30 ? (that.label.length < 15 ? 100 : 50) : 40))
        },
      ],
      backgroundColor: '#f5fbff',//背景色
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          let tar;
          if (params[1].value !== '-') {
            tar = params[1];
          } else {
            tar = params[0];
          }
          return that.issue[tar['dataIndex']] + ":" + tar.name + tar.value;
        }
      },
      legend: {},
      grid: {
        left: '-4%',
        right: '24%',
        bottom: '4%',
        containLabel: true
      },
      xAxis: {
        // type: 'category',
        // splitLine: {show: false},
        data: function () {
          return that.label;
        }(),
        axisLabel: {
          color: function (value) {
            return value == '输' ? 'green' : 'red';
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#cfebfe',
            width: 1,//这里是为了突出显示加上的
          }
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#cfebfe',
            width: 1,//这里是为了突出显示加上的
          }
        },
        splitLine: {     //网格线
          show: false
        }
      },
      series: [
        {
          // name: '收入',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              color: "#e12121",
              type: 'solid'
            },
          },
          legendHoverLink: true,       //---是否启用图例 hover 时的联动高亮
          data: that.win,
        },
        {
          // name: '支出',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              color: "#3db83d",
              type: 'solid'
            }
          },
          legendHoverLink: true,       //---是否启用图例 hover 时的联动高亮
          data: that.lose,
          markLine: {
            symbol: 'none',
            lineStyle: {
              normal: {
                type: 'dotted'
              }
            },
            data: [
              {
                name: '最大遗漏',
                lineStyle: {
                  normal: {
                    type: 'dotted',
                    color: '#e12120',
                  },
                },
                label: {
                  normal: {
                    show: true,
                    position: 'end',
                    formatter: '最大遗漏' + maxLose
                  }
                },
                yAxis: maxLose,
              },
              {
                name: '平均遗漏',
                lineStyle: {
                  normal: {
                    type: 'dotted',
                    color: '#2c80c9',
                  },
                },
                label: {
                  normal: {
                    show: true,
                    position: 'end',
                    formatter: "平均遗漏" + averageLose
                  }
                },
                yAxis: averageLose
              },
            ]
          },
        }
      ],
      label: {
        normal: {
          show: true,
          position: 'top',  // 柱体顶端显示数值
          textStyle: {
            color: '#333333'
          }
        }
      }
    };
    // 使用刚指定的配置项和数据显示图表。
    that.myChart.clear();
    that.myChart.setOption(option);

  }

  /**
   * 开始分析
   */
  toAnalyzing() {
    let that: any = this;
    if (that.checkedFactor.num.length == 0) {
      that.alertService.msg("请选择号码");
      return;
    }
    if (that.checkedFactor.betting < 10 && that.checkedFactor.num.length != that.checkedFactor.betting) {
      that.alertService.msg("号码个数与投注个数不一致，请重新选择");
      return;
    }
    that.statistics = [];
    this.myChart.clear();
    that.getDataAnalysisDetail(that.currentType.code, that.checkedFactor.position, that.checkedFactor.limit, that.checkedFactor.betting, that.checkedFactor.num);
  }

  /**
   * 选择位置
   */
  positionSelection(k) {
    let that: any = this;
    that.selectType = -1;
    that.checkedFactor.position = k;
    that.checkedFactor.betting = that.objectKeys(that.factorList.betting[k])[0];
    that.checkedFactor.num = [];
    that.checkedFactor.num.push(that.objectKeys(that.factorList.num[that.checkedFactor.betting])[0]);
  }

  /**
   * 选择投注
   */
  bettingSelection(j) {
    let that: any = this;
    that.selectType = -1;
    that.checkedFactor.betting = j;
    that.checkedFactor.num = [];
    that.checkedFactor.num.push(that.objectKeys(that.factorList.num[j])[0]);
  }

  /**
   * 号码选择：选择投注的个数关联选择号码个数
   */
  numberSelection(n) {
    let that: any = this;
    switch (n) {
      case 100://打开号码选择面板
        that.selectType = 3;
        that.tempNoArr = Array.from(that.checkedFactor.num);
        break;
      case 200://取消：关闭号码选择面板
        that.tempNoArr = [];
        that.selectType = -1;
        break;
      case 300://确定
        if (that.tempNoArr.length == 0) {
          that.alertService.msg("请选择号码");
          break;
        }
        if (Number(that.checkedFactor.betting) < 10 && that.tempNoArr.length != that.checkedFactor.betting) {
          that.alertService.msg("号码个数与投注个数不一致，请重新选择");
          break;
        } else if (Number(that.checkedFactor.betting) > 9 && that.tempNoArr.length > 1) {
          that.alertService.msg("只可以选择一个号码");
          break;
        }
        that.checkedFactor.num = Array.from(that.tempNoArr.sort());
        that.selectType = -1;
        that.tempNoArr = [];
        break;
      default:
        if (that.tempNoArr.indexOf(n) == -1) {
          that.tempNoArr.push(n);
        } else {
          that.tempNoArr.splice(that.tempNoArr.indexOf(n), 1);
        }
    }
  }
}
