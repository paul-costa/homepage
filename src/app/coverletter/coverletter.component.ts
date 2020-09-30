import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coverletter',
  templateUrl: './coverletter.component.html',
  styleUrls: ['./coverletter.component.css']
})
export class CoverletterComponent implements OnInit {

  public textProgress = 0;
  public textSpeed = 30;
  progressBtnMode: 'skip' | 'pause';

  public coverTextArr: string[];

  public cardContent: string;

  constructor() { }

  ngOnInit(): void {
    this.coverTextArr = [
      `Welcome to my digital cover letter. I hope this little different recruiting experience brightens up your day...`,
      `Down below you see the progress of the current paragraph and the timer until the next paragraph starts. You can always pause on a paragraph to read it in its entirety. The buttons for slow down and speed up are quite self-explanatory, I hope.
      Moreover, you can always download the pdf with the entire letter included via the button down below. This whole ordeal should not take more than 5 minutes at most.`,
      `I figured instead of writing an elaborate cover letter, using three online dictionaries and two lectors, I'd simply like to show you my interest and approach in finding streamlined solution for enterprise level projects, but also unusual and somewhat over-engineered solutions for simple tasks. Like this cover 'letter'.`,
      `I have a great passion for web development, especially in creating an UX and elegant easily approachable application appropriable for the targeted user base. In my current occupation I am constantly faced with the challenge of understanding and interpreting vague requirements for applications.` ,
      `Following I am responsible for the entire development chain, beginning at planning, design, prototyping, testing, development, deployment, and maintenance. Thereby, I was able to acquire a broad spectrum of technical and social, required for understanding the complexity of the development process.`,
      `"See one, do one, teach one" - like William Stewart Halsted (I admittedly had to look that up) proposed, I followed a similar approach in training a junior developer on my team. Thereby, I revealed and filled some gaps in my knowledge and education, as well as gathering some experience in training, managing, and delegating.`,
      `Based on these presented experiences and facts about, I see myself as a great fit for your team and role. Some experiences and web applications I am making in my occupation at the BAWAG Group I was naturally unable to share publicly. I would greatly appreciate the possibility to talk to you about them in an interview.`,
      `That's it, thanks for your endurance.`
    ];

    this.writeText(0);
  }


  public writeText(index: number) {
    let characterPosInText = 1;
    this.startProgressSpinner(this.coverTextArr[index].length);


    const interval = setInterval(() => {
      if (characterPosInText <= this.coverTextArr[index].length) {
        this.cardContent = this.coverTextArr[index].substring(0, characterPosInText);
        characterPosInText++;
      } else {
        clearInterval(interval);

        setTimeout(() => {
          this.textProgress = 0;
        }, 2250);

        setTimeout(() => {
          index++;

          if (index < this.coverTextArr.length) {
            this.writeText(index);
          } else {
            console.log('finish');
          }
        }, 2500);
      }
    }, this.textSpeed);



    // this.progressBtnMode = 'skip';

    // setTimeout(() => {
    //   this.progressBtnMode = 'pause';
    // }, 2000);
  }

  public startProgressSpinner(lengthOfTextBlock: number) {
    const intervalForSpinner = lengthOfTextBlock * this.textSpeed / 100 ;

    const interval = setInterval(() => {
      if (this.textProgress <= 100) {
        this.textProgress++;
      } else {
        clearInterval(interval);
      }
    }, intervalForSpinner);
  }

}
