import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private EVA_API: string;
  private httpOptions: object;

  constructor(private http: HttpClient) {
    const API = environment.API;
    this.EVA_API = API + '/api/evaluation';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'utf-8' }),
    };
  }

  putEvaluationClassification(evaluationId, classification): Observable<any> {
    let url = this.EVA_API + "/classification/" + evaluationId;
    return this.http.put(url, classification);
  }

  putEvaluationName(evaluationId, name): Observable<any> {
    let url = this.EVA_API + "/name/" + evaluationId;
    return this.http.put(url, name);
  }

  putEvaluationDescription(evaluationId, description): Observable<any> {
    let url = this.EVA_API + "/description/" + evaluationId;
    return this.http.put(url, description);
  }
  
}
