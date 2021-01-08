import {Component, Input,OnChanges, SimpleChanges} from '@angular/core';
import {AboutService} from "../../pages/about/about.service";
import {AlertService} from "../../service/alert.service";
import {LoadingController} from "ionic-angular";
import {StorageService} from "../../service/storage.service";

/**
 * Generated class for the DsdxLuzhuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dsdx-luzhu',
  templateUrl: 'dsdx-luzhu.html'
})
export class DsdxLuzhuComponent implements OnChanges{

  // text: string;
  @Input() code;
  @Input() date;
  @Input() current_number;

  public showFilter=-1;
  private mainData:any;
  private mode = '2';//9综合模式，1单选模式，2双选模式
  private allSet=[];
  private filterRs:string;
  private tempRs: string;

  private codeType:number;
  constructor(private aboutService: AboutService, private alertService: AlertService, private loadingCtrl: LoadingController,private localStorage:StorageService) {
    console.log('Hello DsdxLuzhuComponent Component');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.code && this.date && this.current_number) {
      this.getAnalysisDetail();
    }
  }
  ngOnInit(){
    let allTypes = this.localStorage.getObject("analysisKinds")["dxdslz"];
    // Detail-01 :北京PK10(bjpks) 澳洲幸运10(ajxys) 极速赛车(jssc) 极速飞艇(jsft)（4）
    // Detail-02:重庆时时彩(cqssc) 天津时时彩(tjssc) 新疆时时彩(xjssc) 极速时时彩(jsssc) 重庆七星彩(cqqxc) 澳洲幸运5(ajxyw)（6）
    if (allTypes["type1"].indexOf(this.code) != -1) {
      this.codeType=1;
      this.allSet=['0', '1', '2', '3', '4','5','6','7','8','9',  'd', 'b'];
    }else if (allTypes["type2"].indexOf(this.code) != -1) {
      this.codeType=2;
      this.allSet = ['0', '1', '2', '3', '4',  'd', 'b' ];
    }else if(allTypes["type3"].indexOf(this.code) != -1) {
      this.codeType=3;
      this.allSet=['0', '1', '2', '3', '4','5','6','7',  'd', 'b'];
    }
    this.filterRs = this.allSet.toString();
    this.filterRs = this.filterRs.replace('b','');
  }
  getAnalysisDetail() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: '玩命加载中'
    });
    loading.present();
    let that: any = this;
    that.mainData=null;
    that.aboutService.getAnalysisDetail(that.code, 'dxdslz', that.date).then((res) => {
      if (res.code == 0) {
        that.mainData = res.data;
        loading.dismiss();
      }else{
        loading.dismiss();
        that.alertService.msg(res.msg);
      }
    }).catch(() => {
      loading.dismiss();
      that.alertService.msg("网络异常，请稍后再试");
    });
  }
  choseCon(n) {
    if (n == 1) {
      this.tempRs = this.filterRs;
      this.showFilter = 1;
    } else if (n == -1) {
      this.tempRs = '';
      this.showFilter = -1;
    } else {
      this.filterRs = this.tempRs;
      this.showFilter = -1;
    }
  }

  checkOne(m) {
    if (m == '999') {
      this.tempRs = this.allSet.toString();
    } else if (m == '-1') {
      this.tempRs = '';
    } else {
      if (this.mode == '9') {
        if (this.tempRs.indexOf(m) == -1) {
          this.tempRs += m;
        } else {
          this.tempRs = this.tempRs.replace(m, "");
        }
      } else if (this.mode == '1') {
        if (this.allSet.indexOf(m) < this.allSet.length-2) {
          if (this.tempRs.indexOf(m) == -1) {
            for (let i = 0; i < this.allSet.length-2; i++) {
              if(this.tempRs.indexOf(this.allSet[i])!=-1)
                this.tempRs = this.tempRs.replace(this.allSet[i], '');
            }
            this.tempRs += m;
          }
        } else {
          if (this.tempRs.indexOf(m) == -1) {
            this.tempRs += m;
          } else {
            this.tempRs = this.tempRs.replace(m, "");
          }
        }
      } else {
        if (this.allSet.indexOf(m) > this.allSet.length-3) {
          if (this.tempRs.indexOf(m) == -1) {
            for (let i = this.allSet.length-2; i < this.allSet.length; i++) {
              if(this.tempRs.indexOf(this.allSet[i])!=-1)
                this.tempRs = this.tempRs.replace(this.allSet[i], '');
            }
            this.tempRs += m;
          }
        } else {
          if (this.tempRs.indexOf(m) == -1) {
            this.tempRs += m;
          } else {
            this.tempRs = this.tempRs.replace(m, "");
          }
        }
      }
    }
  }

  choseMode(p){
    this.mode=p;
    let a=false;
    if(p=='9'){
      this.filterRs=this.allSet.toString();
    }else if(p=='1'){
      for(let i=0;i<this.allSet.length-2;i++){
        if(!a && this.filterRs.indexOf(this.allSet[i])!=-1){
          a=true;
        }else{
          if(this.filterRs.indexOf(this.allSet[i])!=-1)
            this.filterRs=this.filterRs.replace(this.allSet[i],'');
        }
      }
      for(let j=this.allSet.length-2;j<this.allSet.length;j++){
        if(this.filterRs.indexOf(this.allSet[j])==-1){
          this.filterRs+=this.allSet[j];
        }
      }
    }else {
      for(let i=this.allSet.length-2;i<this.allSet.length;i++){
        if(!a && this.filterRs.indexOf(this.allSet[i])!=-1){
          a=true;
        }else{
          if(this.filterRs.indexOf(this.allSet[i])!=-1)
            this.filterRs=this.filterRs.replace(this.allSet[i],'');
        }
      }
      for(let j=0;j<this.allSet.length-2;j++){
        if(this.filterRs.indexOf(this.allSet[j])==-1){
          this.filterRs+=this.allSet[j];
        }
      }
    }
  }
  ulScroll(event) {
    event.stopPropagation();
  }
}
