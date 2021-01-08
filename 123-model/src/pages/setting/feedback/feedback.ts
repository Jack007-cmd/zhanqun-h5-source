import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertService} from "../../../service/alert.service";
import {GeneralService} from "../../../service/general.service";

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  private type = 1;
  private name;
  private contactInfo;
  private content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertService: AlertService,
              private gService: GeneralService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  selChange() {
    let Sel = document.getElementsByTagName("select")[0];
    let index = Sel.selectedIndex;             // selectedIndex是所选中的项的index
    this.type = Number(Sel.options[index].value);
  }

  submitComment() {
    let rel = new RegExp("^[a-zA-Z0-9\u4e00-\u9fa5]+$");
    let mobile_reg = /^(1(([3][0-9])|([5][012356789])|([4][57])|([7][0-9])|[8][012356789]))\d{8}$/;
    let tel_reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,7}))?$/;
    let wxreg = new RegExp("^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$");
    let qq = new RegExp("^[1-9]\d{4,9}$");
    let email = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$");
    if (!this.name) {
      this.alertService.msg("昵称不可为空");
      return;
    }else{
      if(!rel.test(this.name)){
        this.alertService.msg("昵称格式不正确！");
        return;
      }
    }
    if (!this.contactInfo) {
      this.alertService.msg("联系方式不可为空");
      return;
    } else {
      if (this.type == 1 && !mobile_reg.test(this.contactInfo) && !tel_reg.test(this.contactInfo)) {
        this.alertService.msg("请输入正确的电话号码！");
        return;
      }
      if (this.type == 2 && !email.test(this.contactInfo)) {
        this.alertService.msg("请输入正确的email！");
        return;
      }
      if (this.type == 3 && !qq.test(this.contactInfo)) {
        this.alertService.msg("请输入正确的qq号码！");
        return;
      }
      if (this.type == 4 && !wxreg.test(this.contactInfo)) {
        this.alertService.msg("请输入正确的微信号！");
        return;
      }
    }
    if (!this.content) {
      this.alertService.msg("内容不可为空");
      return;
    }
    this.gService.submitComment(this.name, this.contactInfo, this.content, this.type).then((res) => {
      if (res.code == 0) {
        this.alertService.msg("意见反馈成功");
        this.navCtrl.pop();
      } else {
        this.alertService.msg(res.msg);
      }
    }).catch(() => {
      this.alertService.msg('网络异常，稍后再试');
    });
  }
}
