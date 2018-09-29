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
  groupArr = [];
  constructor(private router: Router, private form: FormsModule, private httpClient: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  ngOnInit() {
    this.availableRoles = ['user', 'groupAdmin', 'superAdmin'];
    this.httpClient.get(this.apiURL + 'user/read')
      .subscribe((data: any) => {
        for (var i = 0; i < data.length; i++) {
          this.availableUsers.push(data[i].username);
          //console.log(data[i].username);
          //console.log(this.availableUsers);
        }
      });
    this.httpClient.get(this.apiURL + 'group/read')
      .subscribe((data: any) => {
        this.groupArr = data;
        console.log(this.groupArr);
        for (var i = 0; i < data.length; i++) {
          this.availableGroups.push(data[i].GroupName);
          //console.log(data[i].GroupName);
          //console.log(this.availableGroups);
          //console.log(data[i].User);
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
          if (data == true) {
            alert('User has been sucessfuly created!');
            window.location.reload();
          } else {
            alert('User already exist');
          }
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
      this.groupObj = { groupname: this.selectedGroup2 };
      this.httpClient.post(this.apiURL + 'group/delete', JSON.stringify(this.groupObj), httpOptions)
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

  // add user to group
  selectedUser2: string;
  selectedGroup: string;
  data4: any = {};
  addUserToGroup(event) {
    event.preventDefault();
    if (this.selectedUser2 != undefined && this.selectedGroup != undefined) {
      this.groupObj = { groupname: this.selectedGroup, username: this.selectedUser2 };
      this.httpClient.post(this.apiURL + 'group/addUser', JSON.stringify(this.groupObj), httpOptions)
        .subscribe((data: any) => {
          console.log(data);
          if (data == true) {
            alert('User added to group!')
            window.location.reload();
          } else {
            alert('User already exist in group')
          }
        });
    } else {
      alert('Empty field(s)')
    }
  }

  //delete user from group
  selectedUser4: string;
  selectedGroup5: string;
  deleteUserFromGroup(event) {
    event.preventDefault();
    if (this.selectedUser4 != undefined && this.selectedGroup5 != undefined) {
      this.groupObj = { groupname: this.selectedGroup5, username: this.selectedUser4 };
      this.httpClient.post(this.apiURL + 'group/deleteUser', JSON.stringify(this.groupObj), httpOptions)
        .subscribe((data: any) => {
        console.log(data);
        if (data == true) {
          alert('User removed from group!')
          window.location.reload();
        } else {
          alert('User does not exist in group')
        }
      });
    } else {
      alert('Empty field(s)')
    }
  }

  //create channel
  selectedGroup3: string;
  newChannelName: string;
  channelObj: any = {};
  createChannel(event) {
    event.preventDefault();
    if (this.selectedGroup3 != undefined && this.newChannelName != undefined && this.newChannelName.trim() != '') {
      this.channelObj = { groupname: this.selectedGroup3, channelname: this.newChannelName };
      this.httpClient.post(this.apiURL + 'channel/create', JSON.stringify(this.channelObj), httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        if (data == true) {
          alert('Channel has been sucessfuly created!')
          window.location.reload();
        } else {
          alert('Error, Channel already exist.')
        }
      });
    } else {
      alert('Field is empty')
    }
  }

  //delete channel
  selectedGroup7: string;
  selectedChannel2: string;
  deleteChannel(event) {
    event.preventDefault();
    if (this.selectedChannel2 != undefined && this.selectedGroup7 != undefined) {
      this.channelObj = { groupname: this.selectedGroup7, channelname: this.selectedChannel2 };
      this.httpClient.post(this.apiURL + 'channel/delete', JSON.stringify(this.channelObj), httpOptions)
        .subscribe((data: any) => {
          console.log(data);
        if (data == true) {
          alert('Channel has been sucessfuly deleted!')
          window.location.reload();
        } else {
          alert('An error has occured')
        }
      });
    } else {
      alert('Channel is not selected')
    }
  }

  // add user to channel
  selectedUser3: string;
  selectedGroup4: string;
  selectedChannel: string;
  addUserToChannel(event) {
    event.preventDefault();
    if (this.selectedUser3 != undefined && this.selectedChannel != undefined && this.selectedGroup4 != undefined) {
      this.channelObj = { groupname: this.selectedGroup4, channelname: this.selectedChannel, username: this.selectedUser3 };
      this.httpClient.post(this.apiURL + 'channel/addUser', JSON.stringify(this.channelObj), httpOptions)
        .subscribe((data: any) => {
          console.log(data);
        if (data == true) {
          alert('User added to channel!')
          window.location.reload();
        } else {
          alert('User already exist in channel')
        }
      });
    } else {
      alert('Empty field(s)');
    }
  }


  // delete user from channel
  selectedUser5: string;
  selectedGroup6: string;
  selectedChannel3: string;
  deleteUserFromChannel(event) {
    event.preventDefault();
    if (this.selectedUser5 != undefined && this.selectedChannel3 != undefined && this.selectedGroup6 != undefined) {
      this.channelObj = { groupname: this.selectedGroup6, channelname: this.selectedChannel3, username: this.selectedUser5 };
      this.httpClient.post(this.apiURL + 'channel/deleteUser', JSON.stringify(this.channelObj), httpOptions)
        .subscribe((data: any) => {
          console.log(data);
          if (data == true) {
          alert('User removed from channel!')
          window.location.reload();
        } else {
          alert('User does not exist in channel')
        }
      });
    } else {
      alert('Empty field(s)');
    }
  }

}
