import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public assignmentHover = false;
  public coverletterHover = false;

  public internalRedirectTriggered = false;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }


  public onRedirect(btnValue: 'github' | 'linkedIn' | 'email'| 'studies' | 'resume' | 'letter') {
    // internal redirect
    if (btnValue === 'letter') {
      this.internalRedirect(btnValue);
      return;
    }

    let url = '';

    switch (btnValue) {
      case 'github':
        url = 'https://github.com/paul-costa';
        break;

      case 'linkedIn':
        url = 'https://www.linkedin.com/in/paul-costa/';
        break;

      case 'email':
        url = 'mailto:admin@paulcosta.at';
        break;

      case 'studies':
        url = 'https://www.technikum-wien.at/en/study_programs/master_s/innovation_and_technology_management_/';
        break;

      case 'resume':
        url = 'https://github.com/paul-costa/homepage/blob/master/cover-letter.pdf';
        break;

      default:
        break;
    }

    this.sharedService.openSnackBar('you get redirected in a second', 'ok');

    setTimeout(() => {
      window.open(url, '_blank');
    }, 1000);
  }

  public internalRedirect(url) {
    this.internalRedirectTriggered = true;

    setTimeout(() => {
      this.router.navigate([url]);
    }, 1000);
  }
}
