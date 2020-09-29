import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private restService: RestService,
    private _snackBar: MatSnackBar
    ) { }

  getAppProjects() {
    return this.restService.loadProjects().then(data => {
      return data;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
