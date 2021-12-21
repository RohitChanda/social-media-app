import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-peoplelist',
  templateUrl: './peoplelist.component.html',
  styleUrls: ['./peoplelist.component.css']
})
export class PeoplelistComponent implements OnInit {
  default_profil_img="http://localhost:5000/public/uploadfile/userspost/default-profile.png";
  token:string;
  userdata:any[];
  isSearch:boolean=false;
  searchProfile:any=[];
  ownProfileFriends:any=[];
  constructor(private cookieService:CookieService,private dataService:ApiServiceService,private router:Router) { }

  ngOnInit(): void {
    if(this.cookieService.get('jwt')){
      this.token=this.cookieService.get('jwt');
    }


    this.dataService.handeluserNameList(this.token).subscribe((res)=>{
      this.userdata=res.data;
      this.ownProfileFriends=res.profile[0].friends;
      console.log(this.ownProfileFriends);
    });

  } 
  searchUser(e){
    e.preventDefault();
    const input=(<HTMLInputElement>document.getElementById('searchinput')).value.toLowerCase().trim();
    if(input && input!=" "){
      this.dataService.handelSearchProfile(input).subscribe((res)=>{
        this.searchProfile=res.result;
        this.isSearch=true;
      });
    }
  }
  closeSearchDiv(e){
    e.preventDefault();
    this.searchProfile=[];
    (<HTMLInputElement>document.getElementById('searchinput')).value=null
    this.isSearch=false;
  } 
  handelFriendReq(recipient_id){
    
    this.dataService.sendFriendReq(recipient_id,this.token).subscribe((res)=>{
     
        alert("Friend Request send");
        this.reloadComponent();
      
      
    });
  }
  checkFriend(id){
    // console.log(id)//single people
    if(this.ownProfileFriends.includes(id)){
      return false;
    }else{
      return true;
    }
  }
  reloadComponent():void 
  {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
