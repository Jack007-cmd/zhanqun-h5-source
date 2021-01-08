import {Injectable} from "@angular/core";

@Injectable()
export class StorageService {

  public localStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }

    this.localStorage = localStorage;
  }

  public set(key: string, value: string): void {
    this.localStorage[key] = value;
  }

  public get(key: string): string {
    return this.localStorage[key] || false;
  }

  public setObject(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): {} {
    let value: string = this.localStorage[key];
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);
    }
    return null;
  }

  public setArray(key: string, value): void {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  public getArray(key: string) {
    let value = this.localStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(this.localStorage.getItem(key));
    }
    return [];
  }

  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }

  clear() {
    this.localStorage.clear();
  }

}
