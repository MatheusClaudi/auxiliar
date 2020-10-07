import { Component, OnInit, Output, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Board } from '../../models/Board';
import { TokenService } from 'src/app/services/token.service';
import { ListBoard } from '../../models/ListBoard';
import { Router } from '@angular/router';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/models/Sprint';

@Component({
  selector: 'create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css'],
})
export class CreateBoardComponent implements OnInit {
  public modalForm: FormGroup;
  private apiUrl: string;
  public showError = false;

  constructor(
    public dashBoardService: DashboardService,
    private router: Router,
    private _ss: SprintService
  ) {
    const API = environment.API;
    this.apiUrl = API + '/api';
    this.modalForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200),
      ]),
      sprint: new FormControl(''),
    });
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.modalForm.get(field);
    return (
      (ctrl.dirty && ctrl.hasError(error)) ||
      (this.showError && ctrl.hasError(error))
    );
  }

  ngOnInit() {}

  createBoard(): void {
    if (this.modalForm.valid) {
      let board = new Board();
      board.name = this.modalForm.get('name').value;
      board.sprint = this.modalForm.get('sprint').value;
      board.lists = [
        new ListBoard('Ótimo'),
        new ListBoard('Aprimorar'),
        new ListBoard('Pontos de ação'),
      ];

      this.dashBoardService.save(board).subscribe((data) => {
        console.log(data);
        this.dashBoardService.newBoardSubject.next(board);
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.showError = true;
    }
  }
}
