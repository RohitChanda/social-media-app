import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnInit {
  token:string;
  friendsList:any=[];
  isFriendList:boolean=false;
  default_profil_img="http://localhost:5000/public/uploadfile/userspost/default-profile.png";
  constructor( private dataService:ApiServiceService,private cookieService:CookieService) { }

  ngOnInit(): void {
    if(this.cookieService.get('jwt')){
      this.token=this.cookieService.get('jwt');
    }
    this.dataService.friendList(this.token).subscribe((res)=>{
      this.friendsList=res.friends;
      this.isFriendList=true;
    });
  }

}
