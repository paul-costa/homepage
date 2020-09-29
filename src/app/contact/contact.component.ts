import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }


  public onContactBtn(btnValue: 'github' | 'linkedIn' | 'email'| 'studies') {
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


      default:
        break;
    }


    this.sharedService.openSnackBar('you get redirected in a second', 'ok');

    setTimeout(() => {
      window.open(url, '_blank');
    }, 1000);
    }
}
