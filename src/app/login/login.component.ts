import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private form: FormsModule, private httpClient: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  ngOnInit() {
  }

  username: string;
  password: string;
  userObj: any = {};

  role: string;
  loginUser(event) {
    event.preventDefault();
    if (this.username != undefined && this.username.trim() != '' && this.password != undefined && this.password.trim() != '') {
      this.userObj = { username: this.username, password: this.password };
      console.log(this.userObj);
      this.httpClient.post(this.apiURL + 'user/auth', JSON.stringify(this.userObj), httpOptions)
        .subscribe((data: any) => {
          if (data.success == true) {
            sessionStorage.setItem('username', this.username);
            this.httpClient.get(this.apiURL + 'user/read')
              .subscribe((data: any) => {
                for (var i = 0; i < data.length; i++) {
                  if (data[i].username == this.username) {
                    this.role = data[i].role;
                    console.log(this.role);
                    sessionStorage.setItem('role', this.role);
                    this.router.navigateByUrl('/account');
                  }
                }
              });
          } else {
            alert('Incorrect Username/Password')
          }
        });
    } else {
      alert('Empty Field(s)!')
    }
  }

}
