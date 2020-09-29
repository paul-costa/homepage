import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {


  public loaded = false;

  public allApplications = [];
  public applications = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.loadAppProjects();

  }


  private loadAppProjects() {
    this.sharedService.getAppProjects().then(appProjects => {
      this.allApplications = appProjects;
      this.selectApplications();
      this.loaded = true;
    })
  }


  private selectApplications() {
    for (let i = 0; i < this.allApplications.length; i++) {
      this.allApplications[i].id = i;
    }

    this.applications = this.allApplications.filter(app => app.id<5);

    this.applyAppElStyles();
  }



  private applyAppElStyles(edgeIndex?: -2 | -1 | 1 | 2) {
    if (edgeIndex) {
      for(let i=0; i<this.applications.length; i++) {
        // mark all outer
        this.applications[i].position = 'outer';
      }

      // mark neighbors middle
      if(this.applications[Math.floor(this.applications.length/2 - edgeIndex)-1]!==undefined) {
        this.applications[Math.floor(this.applications.length/2 - edgeIndex)-1].position = 'middle';
      }
      if(this.applications[Math.floor(this.applications.length/2 - edgeIndex)+1]) {
        this.applications[Math.floor(this.applications.length/2 - edgeIndex)+1].position = 'middle';
      }

      // mark main
      this.applications[Math.floor(this.applications.length/2 - edgeIndex)].position = 'main';
      return;
    }

    // find main card card
    this.applications[Math.floor(this.applications.length/2)].position = 'main';

    // find midde/second cards
    this.applications[Math.floor(this.applications.length/2)-1].position = 'middle';
    this.applications[Math.floor(this.applications.length/2)+1].position = 'middle';

    // find outer/third cards
    this.applications[Math.floor(this.applications.length/2)-2].position = 'outer';
    this.applications[Math.floor(this.applications.length/2)+2].position = 'outer';
  }


  public onClickOnCard(event, id: number) {
    if (id === this.applications.find(app => app.position === 'main').id) {
      event.stopPropagation();
      return;
    }

    // make all outer for slow transition
    for(let i=0; i<this.applications.length; i++) {
      this.applications[i].position = 'outer';
    }

    // change positions
    setTimeout(() => {
      // get 5 element array from clicked element in the middle
    if(id+2 < this.allApplications.length && id-2 > 0) {
      // if element is not on the edge
      this.applications = this.allApplications.filter(appEl => {
        if(appEl.id <= id+2 && appEl.id >= id-2) {
          return appEl;
        }
      });
      this.applyAppElStyles();
    } else if (id+1 <= this.allApplications.length && id-1 >= 0) {
      // if element has only one neighbor on one side
      if(id > this.allApplications.length/2 + 1) {
        // right side
        this.applications = this.allApplications.filter(appEl => {
          if(appEl.id <= id+1 && appEl.id >= id-3) {
            return appEl;
          }
        });
        this.applyAppElStyles(-1);
      } else {
        // left side
        this.applications = this.allApplications.filter(appEl => {
          if(appEl.id <= id+3 && appEl.id >= id-1) {
            return appEl;
          }
        });
        this.applyAppElStyles(1);
      }
    } else {
      // if element has no neighbors on one side
      if(id > this.allApplications.length/2 + 1) {
        this.applications = this.allApplications.filter(appEl => {
          if(appEl.id <= id && appEl.id >= id-4) {
            return appEl;
          }
        });
        this.applyAppElStyles(-2);
      } else {
        this.applications = this.allApplications.filter(appEl => {
          if(appEl.id <= id+4 && appEl.id >= id) {
            return appEl;
          }
        });
        this.applyAppElStyles(2);
      }

    }
    }, 500);


  }


  public onOpenLink(event, link) {
    event.stopPropagation();

    this.spinActiveCard();

    if(link.includes('github.com')) {
      this.sharedService.openSnackBar('selected github repo will open in new tab', 'ok');
    } else {
      this.sharedService.openSnackBar('selected web app will open in new tab', 'ok');
    }

    setTimeout(() => {
      window.open(link, '_blank');
    }, 1000);
  }

  private spinActiveCard() {
    document.getElementsByClassName('activeCard')[0].classList.add('spinCardFast');

    setTimeout(() => {
      document.getElementsByClassName('activeCard')[0].classList.remove('spinCardFast');
    }, 2000);
  }
}
