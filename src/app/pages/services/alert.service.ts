import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  showed = false;
  _message: string;
  type = 'success';

  public get isShowed(){
    return this.showed;
  }

  private show(message) {
    this._message = message;
    this.showed = true;
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  public error(message) {
    this.type = 'danger';
    this.show(message);
  }

  public success(message) {
    this.type = 'success';
    this.show(message);
  }

  public close(){
    this._message = null;
    this.type = 'success';
    this.showed = false;
  }

  constructor() { }
}
