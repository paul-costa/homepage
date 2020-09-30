import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';

  constructor(public sharedService: SharedService) {}

  public onOpen(type: 'credits' | 'legal') {
    let url = '';

    switch (type) {
      case 'credits':
        url = 'https://github.com/paul-costa/homepage/blob/master/CREDITS.md';
        break;

      case 'legal':
        url = 'https://github.com/paul-costa/homepage/blob/master/LEGAL.md';
        break;

      default:
        return;
        break;
    }

    this.sharedService.openSnackBar('new tab will be opened in a second', 'ok');

    setTimeout(() => {
      window.open(url, '_blank');
    }, 1000);
  }
}
