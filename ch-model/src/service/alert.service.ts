import {Injectable} from "@angular/core";
import {ModalController, ToastController, LoadingController, Loading} from "ionic-angular";

@Injectable()
export class AlertService {
  load: Loading;

  constructor(public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {
  }

  msg(msg: string, time?: number): Promise<any> {
    if (!time) time = 2000;

    return new Promise((resolve, reject) => {
      let tips = this.loadingCtrl.create({
        content: msg,
        duration: time,
        spinner: 'hide',
        dismissOnPageChange: true
      });
      tips.onDidDismiss((data) => {
        resolve(data);
      });
      tips.present();
    });
  }

  createModal(name: any, param?: {}): Promise<any> {
    let alert = this.modalCtrl.create(name, param);
    alert.present();

    return new Promise((resolve, reject) => {
      alert.onDidDismiss((data) => {
        resolve(data);
      })
    });
  }

  show(content: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let alert = this.modalCtrl.create("AlertPage", {content: content});
      alert.onDidDismiss((data) => {
        resolve(data);
      });
      alert.present({animate: false}).then(() => {
      }).catch(() => {
      })
    });
  }

  loading(time?: number) {
    this.load = this.loadingCtrl.create({
      spinner: 'bubbles',
      cssClass: 'app-loading',
      dismissOnPageChange: true,
      enableBackdropDismiss: true,
      duration: time
    });
    this.load.present();
  }

  hideLoading() {
    this.load.dismissAll();
  }


}










