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
  private apiURL = 'http://localhost:3000/api/';
  constructor(private router: Router, private form: FormsModule, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedfile = event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedfile, this.selectedfile.name);
    this.httpClient.post(this.apiURL + 'image/upload', fd)
      .subscribe((res: any) => {
      this.imagepath = res.data.filename;
      console.log(res.data.filename + ' , ' + res.data.size);
    });
  }

}
