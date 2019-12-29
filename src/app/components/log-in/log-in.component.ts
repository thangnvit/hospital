import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  turnID = null;
  birthday = null;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    // http://pportal-demo.herokuapp.com/users/21533073/auth?dob=06-13
    const urlFilter = 'http://pportal-demo.herokuapp.com/users/' + this.turnID + '/auth?dob' + moment(this.birthday).format('MM-DD');
    this.http.get(urlFilter).subscribe(data => {
      this.router.navigate(['./patient']);
    }, error => {
      alert('Không tìm thấy dữ liệu')
    });
  }
}
