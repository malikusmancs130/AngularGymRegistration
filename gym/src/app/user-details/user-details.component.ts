import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { user } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public userID !: number;
  userDetail!: user;

  constructor(private activatedRoute : ActivatedRoute, private api:ApiService) {

  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userID = val['id'];
      this.userDetail=val['id'];
      this.fetchUserDetails(this.userID);
    })
  }

fetchUserDetails(userID:number) {
  this.api.getRegisterUserId(userID)
  .subscribe(res => {
    this.userDetail = res;
  })
}

}
