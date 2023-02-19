import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "http://localhost:3000/enquiry"

  constructor(private http: HttpClient) { }

  postRegisteration(registerObj: user) {
    return this.http.post<user>(`${this.baseUrl}`, registerObj)
  }

  getRegisterUser() {
    return this.http.get<user[]>(`${this.baseUrl}`)
  }

  UpdateRegisteration(registerObj: user, id:number) {
    return this.http.put<user>(`${this.baseUrl}/${id}`, registerObj)
  }

  deleteRegistered(id:number) {
    return this.http.delete<user>(`${this.baseUrl}/${id}`)
  }

  getRegisterUserId(id:number) {
    return this.http.get<user>(`${this.baseUrl}/${id}`)
  }
}
