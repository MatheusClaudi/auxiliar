import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import * as moment from 'moment';


@Component({
  selector: 'app-feedback-project',
  templateUrl: './feedback-project.component.html',
  styleUrls: ['./feedback-project.component.css'],
  providers: [FeedbackService],
})
export class FeedbackProjectComponent implements OnInit {
  public feedbackId: number;
  public feedback: any;
  public membros: Array<any> = [];
  public encontros: Array<any> = [];
  public currentPage = 1;
  
  public meetingsList: Array<any> = [];
  public usersMap: Map<string, any>;
  public usersObjectMap: Map<string, any>;
  public usersList: Array<any> = [];

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService
  ) {
    this.usersMap = new Map<string, any>();
    this.usersObjectMap = new Map<string, any>();
  }

  ngOnInit(): void {
    this.routeActive.params.subscribe((params) => {
      this.feedbackId = params['id'];
    });

    this.feedbackService
      .getFeedbackById(this.feedbackId)
      .subscribe((feedback) => {
        console.log(feedback)
        this.feedback = feedback;
        this.encontros = this.feedback.meetings; //to change how the meet be catch
        this.setup();
      });

  }

  setup(){
    this.encontros.forEach((meeting) => {
      this.meetingsList.push(meeting);

      meeting.individualFeedbacks.forEach((userFeedback) => {
        let userId = userFeedback.userFeedback.user.id;

        if (this.usersMap.has(userId)){
          let aux: Array<any> = this.usersMap.get(userId);
          aux.push({feed: userFeedback, meeting: meeting})
          this.usersMap.set(userId, aux);
        }
        else{
          this.usersMap.set(userId, [{feed: userFeedback, meeting: meeting}]);
          this.usersObjectMap.set(userId, userFeedback.userFeedback.user);
        }
      })
    })
  }

  teste() {}

  redirectToFeedback() {
    this.router.navigate(['/feedback']);
  }

  redirectToIndividualFeedback(membro) {
    console.log(membro)
    this.router.navigate([
      `feedback-project/${this.feedbackId}/individual`,
      membro.key,
    ]);
  }

  adjustString(word: String): String {
    if (!word) {
      return '';
    }
    let aux = word.toLowerCase();
    return aux.charAt(0).toUpperCase() + aux.slice(1);
  }

  adjustStatus(feed): String {

    if (feed.feed.status == 'DONE') {
      return 'Feito';
    } else {

      let now = moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY', true)
      let date = moment(feed.meeting.ocurrencyDate, 'DD-MM-YYYY', true)
    
      if(now.isAfter(date)){
        return 'Atrasado'
      }
      else{
        return 'Pendente';
      }
    }
  }
}
