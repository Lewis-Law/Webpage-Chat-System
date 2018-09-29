import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  availableRoles = [];
  availableUsers = [];
  availableGroups = [];
  constructor(private router: Router, private form: FormsModule, private httpClient: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  ngOnInit() {
    this.availableRoles = ['user', 'groupAdmin', 'superAdmin'];
    this.httpClient.get(this.apiURL + 'user/read')
      .subscribe((data: any) => {
        for (var i = 0; i < data.length; i++) {
          this.availableUsers.push(data[i].username);
          console.log(data[i].username);
          console.log(this.availableUsers);
        }
      });
    this.httpClient.get(this.apiURL + 'group/read')
      .subscribe((data: any) => {
        for (var i = 0; i < data.length; i++) {
          this.availableGroups.push(data[i].GroupName);
          console.log(data[i].GroupName);
          console.log(this.availableGroups);
        }
      });
    
  }


  //create user
  newUsername: string;
  newPassword: string;
  newEmail: string;
  newRole: string;
  data: any = {};
  userObj: any = {};
  createUser(event) {
    event.preventDefault();
    if (this.newUsername != undefined && this.newUsername.trim() != '' && this.newPassword != undefined && this.newPassword.trim() != '' && this.newEmail != undefined && this.newEmail.trim() != '' && this.newRole != undefined && this.newRole.trim() != '') {
      this.userObj = { username: this.newUsername, password: this.newPassword, email: this.newEmail, role: this.newRole };
      console.log(this.userObj);
      this.httpClient.post(this.apiURL + 'user/reg', JSON.stringify(this.userObj), httpOptions)
        .subscribe((data: any) => {
          console.log(data);
          alert('User has been sucessfuly created!');
          window.location.reload();
        });
    } else {
      alert('Field(s) is/are empty')
    }
  }

  // delete user
  selectedUser: string;
  deleteUser(event) {
    event.preventDefault();
    console.log(this.selectedUser);
    if (this.selectedUser != undefined) {
      this.userObj = { username: this.selectedUser };
      this.httpClient.post(this.apiURL + 'user/delete', JSON.stringify(this.userObj), httpOptions)
        .subscribe((data: any) => {
          if (data == true) {
            alert('User has been sucessfuly deleted!');
            window.location.reload();
          } else {
            alert('An error has occured');
            console.log(data);
          }
        });
    } else {
      alert('User is not selected');
    }
  }

  //Create Group
  newGroupName: string;
  groupObj: any = {};
  
  createGroup(event) {
    event.preventDefault();
    if (this.newGroupName != undefined && this.newGroupName.trim() != '') {
      this.groupObj = { groupname: this.newGroupName };
      console.log(this.groupObj);
      this.httpClient.post(this.apiURL + 'group/create', JSON.stringify(this.groupObj), httpOptions)
        .subscribe((data: any) => {
          console.log(data);
          alert('Group has been sucessfuly Created!');
          window.location.reload();
        });
    } else {
      alert('Field is empty')
    }
  }

  //Delete Group
  selectedGroup2: string;
  deleteGroup(event) {
    event.preventDefault();
    console.log(this.selectedGroup2);
    if (this.selectedGroup2 != undefined) {
      this.userObj = { groupname: this.selectedGroup2 };
      this.httpClient.post(this.apiURL + 'group/delete', JSON.stringify(this.userObj), httpOptions)
        .subscribe((data: any) => {
          if (data == true) {
            alert('Group has been sucessfuly deleted!');
            window.location.reload();
          } else {
            alert('An error has occured');
            console.log(data);
          }
        });
    } else {
      alert('User is not selected');
    }
  }
}
