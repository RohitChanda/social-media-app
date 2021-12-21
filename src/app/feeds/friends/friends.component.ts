import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  token:string;
  friends_req:any=[];
  default_profil_img="http://localhost:5000/public/uploadfile/userspost/default-profile.png";
  isRequest:boolean=false;
  constructor(private dataService:ApiServiceService,private cookieService:CookieService,private router:Router) { }

  ngOnInit(): void {
    if(this.cookieService.get('jwt')){
      this.token=this.cookieService.get('jwt');
    }
    this.dataService.checkPendingReq(this.token).subscribe((res)=>{
      if(res.status){
        this.friends_req=res.friends
        console.log(this.friends_req);
        this.isRequest=true;
      }
    });
  }
  reloadComponent():void 
  {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
  

  handelAcceptReq(req_id){
    // console.log(req_id);
    this.dataService.acceptReq(req_id,this.token).subscribe((res)=>{
         alert("friend request accept");
         this.reloadComponent();
    });
  }
  handelDeclineReq(req_id){
    this.dataService.declineReq(req_id,this.token).subscribe((res)=>{
      alert("friend request decline");
      this.reloadComponent();
  });
  }
 

}
