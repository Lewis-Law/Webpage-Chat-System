import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  constructor(private router: Router, private form: FormsModule, private httpClient: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';

  username: string;
  userArr = [];
  groupArr = [];
  detailArr = [];
  userImage: boolean;
  ngOnInit() {
    //determine if user logged in
    if (!sessionStorage.getItem('username')) {
      console.log('Not validated');
      sessionStorage.clear();
      alert("User not logged in");
      this.router.navigateByUrl('login');
    } else {
      this.username = sessionStorage.getItem('username');
      this.httpClient.get(this.apiURL + 'user/read')
        .subscribe((data: any) => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].username == this.username) {
              this.userArr = data[i]
              console.log('data');
              console.log(this.userArr);
              if (data[i].image.length > 0) {
                this.userImage = true;
              } else {
                this.userImage = false;
              }
            }
          }
        });
      this.httpClient.get(this.apiURL + 'group/read')
        .subscribe((data: any) => {
          this.groupArr = data;
          console.log(this.groupArr);
          for (var i = 0; i < this.groupArr.length; i++) {
            for (var j = 0; j < this.groupArr[i].User.length; j++) {
              if (this.groupArr[i].User[j] == this.username) {
                this.detailArr.push('Group: ' + this.groupArr[i].GroupName );
                for (var k = 0; k < this.groupArr[i].Channel.length; k++) {
                  for (var x = 0; x < this.groupArr[i].Channel[k].user.length; x++) {
                    if (this.groupArr[i].Channel[k].user[x] == this.username) {
                      this.detailArr.push( 'Channel: ' + this.groupArr[i].Channel[k].name );
                      
                    }
                  }
                }
              }
            }
          }
          console.log(this.detailArr);
        });

    }

  }

}
