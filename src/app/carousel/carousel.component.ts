import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  public allApplications = [
    {
      title: 'First Application',
      logoUrl: '',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      directLink: '',
      githubLink: '',
      applicationId: undefined,
      position: undefined,
    },
    {
      title: 'Second Application',
      logoUrl: '',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      directLink: '',
      githubLink: '',
      applicationId: undefined,
      position: undefined,
    },
    {
      title: 'Third Application',
      logoUrl: '',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      directLink: '',
      githubLink: '',
      applicationId: undefined,
      position: undefined,
    },
    {
      title: 'Fourth Application',
      logoUrl: '',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      directLink: '',
      githubLink: '',
      applicationId: undefined,
      position: undefined,
    },
    {
      title: 'Fifth Application',
      logoUrl: '',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      directLink: '',
      githubLink: '',
      applicationId: undefined,
      position: undefined,
    },
    {
      title: 'Sixth Application',
      logoUrl: '',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      directLink: '',
      githubLink: '',
      applicationId: undefined,
      position: undefined,
    },
    {
      title: 'Seventh Application',
      logoUrl: '',
      desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      directLink: '',
      githubLink: '',
      applicationId: undefined,
      position: undefined,
    },
  ]

  public applications = []

  constructor() { }

  ngOnInit(): void {
    this.selectApplications();
  }


  private selectApplications() {
    for(let i = 0; i < this.allApplications.length; i++) {
      this.allApplications[i].applicationId = i;
    }

    this.applications = this.allApplications.filter(app => app.applicationId<5);

    this.applyAppElStyles();
  }



  private applyAppElStyles(edgeIndex?: -2 | -1 | 1 | 2) {

    if(edgeIndex) {
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


  public onClickOnCard(applicationId: number) {
    // make all outer for slow transition
    for(let i=0; i<this.applications.length; i++) {
      this.applications[i].position = 'outer';
    }

    // change positions
    setTimeout(() => {
      // get 5 element array from clicked element in the middle
    if(applicationId+2 < this.allApplications.length && applicationId-2 > 0) {
      // if element is not on the edge
      this.applications = this.allApplications.filter(appEl => {
        if(appEl.applicationId <= applicationId+2 && appEl.applicationId >= applicationId-2) {
          return appEl;
        }
      });
      this.applyAppElStyles();
    } else if (applicationId+1 <= this.allApplications.length && applicationId-1 >= 0) {
      // if element has only one neighbor on one side
      if(applicationId > this.allApplications.length/2 + 1) {
        // right side
        this.applications = this.allApplications.filter(appEl => {
          if(appEl.applicationId <= applicationId+1 && appEl.applicationId >= applicationId-3) {
            return appEl;
          }
        });
        this.applyAppElStyles(-1);
      } else {
        // left side
        this.applications = this.allApplications.filter(appEl => {
          if(appEl.applicationId <= applicationId+3 && appEl.applicationId >= applicationId-1) {
            return appEl;
          }
        });
        this.applyAppElStyles(1);
      }
    } else {
      // if element has no neighbors on one side
      if(applicationId > this.allApplications.length/2 + 1) {
        this.applications = this.allApplications.filter(appEl => {
          if(appEl.applicationId <= applicationId && appEl.applicationId >= applicationId-4) {
            return appEl;
          }
        });
        this.applyAppElStyles(-2);
      } else {
        this.applications = this.allApplications.filter(appEl => {
          if(appEl.applicationId <= applicationId+4 && appEl.applicationId >= applicationId) {
            return appEl;
          }
        });
        this.applyAppElStyles(2);
      }

    }
    }, 500);


  }
}
