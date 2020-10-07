import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackCard } from '../../models/FeedbackCard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css'],
})
export class FeedbackCardComponent implements OnInit, OnDestroy {
  @Input('data') feedbackCard: FeedbackCard;
  @Output('delete') deleteFeedbackCard = new EventEmitter();
  @Output('update') updateFeedbackCard = new EventEmitter();
  public cor: any;
  public enabledEdition: boolean;
  public showMenu: boolean;
  public temporaryName = ""
  public temporaryDescription = ""

  @Input('evaluation') evaluation;
  @Input('creationEnabled') creationEnabled
  @Input('newEvaluationEditConfirmed') newEvaluationEditConfirmed
  private eventsSubscription: Subscription;

  @Output('hideAddCard') hideAddCard = new EventEmitter();
  @Output('saveNewEvaluation') saveNewEvaluation = new EventEmitter();
  @Output('classificationChanges') classificationChanges = new EventEmitter();
  @Output('descriptionChanges') descriptionChanges = new EventEmitter();

  constructor() {
    this.showMenu = false;
    this.creationEnabled = false;
  }

  ngOnInit(): void {

    if(!this.creationEnabled){
      this.eventsSubscription = this.newEvaluationEditConfirmed.subscribe((eva) => {
        if (eva.id == this.evaluation.id){
          this.cancelSaving()
        }
      });  
    }

    if (this.creationEnabled) {
      this.evaluation = {name:"", description: "", mainEvaluation: "INDIFERENTE"}
      this.enabledEdition = true;
    }
    if (this.evaluation && !this.creationEnabled){
      this.temporaryName = this.evaluation.name;
      this.temporaryDescription = this.evaluation.description;
    }
    this.setUpColor()
  }

  ngOnDestroy(){
    if(!this.creationEnabled){
      this.eventsSubscription.unsubscribe();
    }
  }


  setUpColor(){
    switch(this.evaluation.mainEvaluation) {
      case "MANTER":
        this.cor = '#5eca38';
        break;
      case "ATENTAR":
        this.cor = 'rgb(278, 200, 20)';
        break;
	    case "CORRIGIR":
        this.cor = '#eb4929';
        break;
      default:
        this.cor = '#161825';
        break;
    }
  }

  displayMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  closeEdition() {
    if (!this.creationEnabled){
      if (this.enabledEdition) {
        this.descriptionChanges.emit({value: null, errorMap: new Map<string, boolean>()});
        this.enabledEdition = false;
      }
    }
  }

  enableEdit(event) {
    event.stopPropagation();
    this.displayMenu();
    this.enabledEdition = true;
  }

  deleteCard() {
    console.log("fdfd")
    this.deleteFeedbackCard.emit({});
  }

  saveEvaluation(){
    this.evaluation.name = this.temporaryName;
    this.evaluation.description = this.temporaryDescription;
    this.saveNewEvaluation.emit(this.evaluation);
  }

  saveChanges(){
    if(this.evaluation.description != this.temporaryDescription){
      let aux = this.validDescription(this.temporaryDescription);
      this.descriptionChanges.emit({value: this.temporaryDescription, errorMap: aux});
    }
    else{
      this.closeEdition()
    }
  }

  validDescription(description){
    let aux = new  Map<string, boolean>();
    if (description.length > 200) {
      console.log("3")
      aux.set("descriptionOver200", true);
    }
    if (description.split(" ").join("").length == 0){
      console.log("4")
      aux.set("descriptionOnlyEmptySpaces", true);
    }

    return aux;
  }


  cancelSaving(){
    this.closeEdition();
    this.hideAddCard.emit();
  }

  pegaCor(cardCor) {
    this.cor = cardCor;
    switch(cardCor) {
      case '#5eca38':
        this.evaluation.mainEvaluation = "MANTER";
        this.classificationChanges.emit( this.evaluation.mainEvaluation)
        break;
      case 'rgb(278, 200, 20)':
        this.evaluation.mainEvaluation = "ATENTAR";
        this.classificationChanges.emit( this.evaluation.mainEvaluation)
        break;
	    case '#eb4929':
        this.evaluation.mainEvaluation = "CORRIGIR";
        this.classificationChanges.emit( this.evaluation.mainEvaluation)
        break;
      default:
        this.evaluation.mainEvaluation = "INDIFERENTE";
        this.classificationChanges.emit( this.evaluation.mainEvaluation)
        break;
    }
  }
}
