import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login() {
    return this.http.get('http://pportal-demo.herokuapp.com/users/21533073/auth?dob=06-13');
  }
}
