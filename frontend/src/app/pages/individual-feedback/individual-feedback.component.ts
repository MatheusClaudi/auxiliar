import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';
import { IndividualFeedbackService } from 'src/app/services/individual-feedback.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-individual-feedback',
  templateUrl: './individual-feedback.component.html',
  styleUrls: ['./individual-feedback.component.css'],
})
export class IndividualFeedbackComponent implements OnInit {
  private idFeedback: Number;
  private userId: Number;
  public devName: String;
  public feedback;
  public meetings;
  public indFeedMap: Map<string, any>;
  public evaluationMap: Map<string, any>;
  public classNameMap: Map<string, Map<string, number>>;

  public displayAddCard: boolean;
  public indexAddCard: number;
  public codeErrors: Map<string, boolean>;
  public codeErrorsEva: Map<number, Map<string, boolean>>;

  public newEvaluationEditConfirmed : Subject<any>;

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService,
    private indFeedService: IndividualFeedbackService,
    private evaService: EvaluationService
  ) {
    this.indFeedMap = new Map<string, any>();
    this.evaluationMap = new Map<string, any>();
    this.classNameMap = new  Map<string, Map<string, number>>();
    this.codeErrors = new Map<string, boolean>();
    this.codeErrorsEva = new  Map<number, Map<string, boolean>>();
    this.newEvaluationEditConfirmed = new Subject<any>();
  }

  ngOnInit() {
    this.routeActive.params.subscribe((params) => {
      this.idFeedback = params['feedId'];
      this.userId = params['devId'];
    });

    this.feedbackService
      .getFeedbackById(this.idFeedback)
      .subscribe((feedback) => {
        this.feedback = feedback;     
        this.meetings = this.feedback.meetings;
        this.setup()
      });
  }

  setup(){
    this.feedback.meetings.forEach((meeting, i) => {
      for(let feed of meeting.individualFeedbacks){
        console.log(feed)
        if (this.userId == feed.userFeedback.user.id){
          if (!this.devName){
            let user = feed.userFeedback.user;
            this.devName = `${user.firstName} ${user.lastName}`;
          }

          this.ise(meeting.ocurrencyDate, i, feed.evaluations);
          this.indFeedMap.set(meeting.ocurrencyDate, feed)
          console.log(this.indFeedMap);
          if (i == this.feedback.meetings.length-1){
            this.ase()
          }
          break
        }
      }
    })
  }

  ase(){
    console.log("---ss--")
    this.feedback.meetings.forEach((meeting, i) => {
      
      let oriList = this.evaluationMap.get(meeting.ocurrencyDate);
      let auxList = new Array(oriList.length);
      let last = oriList.length-1;
      let ini = 0
      
      let repeatPostList = Array();
      let jokerList = Array();


      if (i == 0){
        if (this.feedback.meetings.length > 1){
          oriList.forEach((eva, j) => {
            let classMap = this.classNameMap.get(meeting.ocurrencyDate);
            let nextClassMap = this.classNameMap.get(this.meetings[i+1].ocurrencyDate);

            if(nextClassMap.has(eva.name)){
              auxList[ini] = eva
              classMap.set(eva.name, ini)
              ini = ini + 1
            }
            else{
              auxList[last] = eva
              classMap.set(eva.name, last)
              last = last - 1
            }

            if (j == oriList.length-1){
              this.evaluationMap.set(meeting.ocurrencyDate, auxList);
            }
          });
        }
      }
      else {
        oriList.forEach((eva, j) => {
          let classMap = this.classNameMap.get(meeting.ocurrencyDate);
          let prevClassMap = this.classNameMap.get(this.meetings[i-1].ocurrencyDate);
          let postClassMap

          if (this.meetings.length != i+1){
            postClassMap = this.classNameMap.get(this.meetings[i+1].ocurrencyDate);
          }
          else{
            postClassMap = new Map();
          }

          if(prevClassMap.has(eva.name)){
            auxList[prevClassMap.get(eva.name)] = eva
            classMap.set(eva.name, prevClassMap.get(eva.name))
          }
          else{

            if (postClassMap.has(eva.name)){
              repeatPostList.push(eva);
            }
            else{
              jokerList.push(eva);
            }

            //auxList[last] = eva
            //classMap.set(eva.name, last)
            //last = last - 1
          }

          if (j == oriList.length-1){
            
            let index = this.getNextSpot(auxList)
            console.log(index)
            for (let eva of repeatPostList){
              auxList[index] = eva;
              classMap.set(eva.name, index)
              index = this.getNextSpot(auxList)
            }
            for (let eva of jokerList){
              auxList[index] = eva;
              classMap.set(eva.name, index)
              index = this.getNextSpot(auxList)
            }

        
            this.evaluationMap.set(meeting.ocurrencyDate, this.ajust(auxList, oriList.length, classMap));
            console.log(auxList)
          }
        });
      }
    })
  }


  ajust(evalist, oriLength, classMap){
    let aux = new Array();
    let i = 0
    for (let eva of evalist){
      if (eva != undefined){
        aux.push(eva);
        classMap.set(eva.name, i)
        i = i + 1;
      }
    }
    return aux;
  }

  getNextSpot(evalist){
    for (let i = 0; i < evalist.length; i++){
      if (!evalist[i]){
        return i
      }
    }

    return null;
  }


  ise(meetingDate, i, evaluations) {
    if(evaluations.length == 0){
      console.log("a")
      let auxMap = new Map<string, number>();
      this.classNameMap.set(meetingDate, auxMap);
      this.evaluationMap.set(meetingDate, evaluations);
    }
    else{
      let auxMap = new Map<string, number>();
      evaluations.forEach((eva, j) => {
        console.log("b")
        auxMap.set(eva.name, j);

        if (j == evaluations.length-1){
          this.classNameMap.set(meetingDate, auxMap);
          this.evaluationMap.set(meetingDate, evaluations);
        }
      });
    }      
  }

  
  showAddCard(index){
    if (!this.displayAddCard || this.indexAddCard != index){
      this.displayAddCard = true;
      this.indexAddCard = index;
      this.codeErrors = new Map<string, boolean>();    
    }
    else{
      this.hideAddCard();
    }
  }

  hideAddCard(){
    this.displayAddCard = false;
    this.indexAddCard = undefined;
  }

  saveNewEvaluation(meetingDate, event){
    if (this.validEvaluation(event,meetingDate)){
      this.indFeedService.addAnnotationOnIndividualFeedback(this.indFeedMap.get(meetingDate).id, event).subscribe(
        data => {
          console.log(data)
          this.hideAddCard()
          let aux = this.evaluationMap.get(meetingDate)
          aux.push(data);
          let aux2 = this.classNameMap.get(meetingDate)
          aux2.set(data.name, aux.length-2)
          this.ase()
        }
      )
    }
  }

  deleteEvaluation(event,meetingDate,eva){
    this.indFeedService.deleteAnnotationFromIndividualFeedback(this.indFeedMap.get(meetingDate).id, eva.id).subscribe(
      data => {
        let aux = this.evaluationMap.get(meetingDate)
        let aux2 = this.classNameMap.get(meetingDate)
        for (let i = 0; i < aux.length; i++){
          if(aux[i].id == eva.id){
            aux.splice(i, 1);
            aux2.delete(eva.name)
            this.ase()
          }
        }
      }
    )
  }

  onClassificationChanges(event, eva) {
    console.log(event)
    this.evaService.putEvaluationClassification(eva.id, event).subscribe(
      data => {
        console.log("changed")
      }
    )
  }

  onDescriptionChanges(event, eva){
    console.log(event)
    if(event.errorMap.size != 0){
      this.codeErrorsEva.set(eva.id, event.errorMap);
    }
    else{
        if (this.codeErrorsEva.has(eva.id)){
          this.codeErrorsEva.delete(eva.id)
        }
        if(event.value != null){
          eva.description = event.value
          this.evaService.putEvaluationDescription(eva.id, event.value).subscribe(
            data => {
              console.log("changed")
              this.newEvaluationEditConfirmed.next(eva);
            }
          )
        }
      }
  }

  redirectToFeedbackProject() {
    this.router.navigate([`/feedback-project/${this.idFeedback}`]);
  }

  validEvaluation(evaluation, meetingDate){

    let retorno = true;
    
    if (evaluation.name.length > 200) {
      console.log("1")
      this.codeErrors.set("nameOver200", true);
      retorno = false;
    }else{
      if(this.codeErrors.has("nameOver200")){
        this.codeErrors.delete("nameOver200");
      }
    }

    if (evaluation.name.split(" ").join("").length == 0){
      console.log("2")
      this.codeErrors.set("nameOnlyEmptySpaces", true);
      retorno = false;
    }else{
      if(this.codeErrors.has("nameOnlyEmptySpaces")){
        this.codeErrors.delete("nameOnlyEmptySpaces");
      }
    }

    if (evaluation.description.length > 200) {
      console.log("3")
      this.codeErrors.set("descriptionOver200", true);
      retorno = false;
    }else{
      if(this.codeErrors.has("descriptionOver200")){
        this.codeErrors.delete("descriptionOver200");
      }
    }

    if (evaluation.description.split(" ").join("").length == 0){
      console.log("4")
      this.codeErrors.set("descriptionOnlyEmptySpaces", true);
      retorno = false;
    }else{
      if(this.codeErrors.has("descriptionOnlyEmptySpaces")){
        this.codeErrors.delete("descriptionOnlyEmptySpaces");
      }
    }

    let aux = this.classNameMap.get(meetingDate);
  
    if (aux.has(evaluation.name)){
      console.log("5");
      this.codeErrors.set("repeatClass", true);
      retorno = false;
    }else{
      if(this.codeErrors.has("repeatClass")){
        this.codeErrors.delete("repeatClass");
      }
    }

    return retorno;
  }
}
