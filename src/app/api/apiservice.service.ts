import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private readonly API_URL_GET = 'http://localhost:8080/membership';
  private readonly API_URL_DELETE = 'http://localhost:8080/deleteMember';
  private readonly API_URL_CREATE = 'http://localhost:8080/createMembership';
  private readonly API_URL_UPDATE = 'http://localhost:8080/updateMember';
  constructor(private readonly httpClient: HttpClient) { }

getMembership(): Observable<any> {
  return this.httpClient.get<any>(this.API_URL_GET);
}

deleteMember(id:any):Observable<any> {
  return this.httpClient.delete(this.API_URL_DELETE+"/"+id, {responseType: 'text'});
}

createMember(payload : any):Observable<any>{
  return this.httpClient.post(this.API_URL_CREATE, payload, {responseType: 'text'});
}

updateMember(payload : any):Observable<any>{
  console.log(payload, 'payload in api')
  return this.httpClient.put(this.API_URL_UPDATE+"/"+ payload.id, payload, {responseType: 'text'});
}
}