import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';
import { ImagesComponent } from './images/images.component';
import { DatabaseComponent } from './database/database.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountDetailsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'database', component: DatabaseComponent }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
