import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  selectedfile = null;
  imagepath = "";
  username: string;
  private apiURL = 'http://localhost:3000/api/';
  constructor(private router: Router, private form: FormsModule, private httpClient: HttpClient) { }
  
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
              this.imagepath = data[i].image

            }
          }
        });
    }
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedfile = event.target.files[0];
  }

  imageObj: any = { };
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedfile, this.selectedfile.name);
    this.httpClient.post(this.apiURL + 'image/upload', fd)
      .subscribe((res: any) => {
      this.imagepath = res.data.filename;
        console.log(res.data.filename + ' , ' + res.data.size);
        this.imageObj = {username: this.username, imagename: this.imagepath}
        this.httpClient.post(this.apiURL + 'user/addImage', JSON.stringify(this.imageObj), httpOptions )
          .subscribe((data: any) => {
            if (data == true) {
              alert("image uploaded succesfully");
            } else {
              alert("error");
            }
          });
      });


  }

}
