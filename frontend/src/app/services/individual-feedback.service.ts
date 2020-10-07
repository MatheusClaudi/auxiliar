import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndividualFeedbackService {
  private INDFEED_API: string;
  private httpOptions: object;

  constructor(private http: HttpClient) {
    const API = environment.API;
    this.INDFEED_API = API + '/api/indFeedback';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8' }),
    };
  }


  addAnnotationOnIndividualFeedback(indFeedId, evaluation): Observable<any> {
    let url = this.INDFEED_API + "/evaluation/"+ indFeedId+"/";
    return this.http.post(url, evaluation);
  }

  deleteAnnotationFromIndividualFeedback(indFeedId, evaluationId): Observable<any> {
    let url = this.INDFEED_API + "/evaluation/"+ indFeedId+"/" + evaluationId + "/";
    return this.http.delete(url);
  }

  
}
