import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-peopleprofile',
  templateUrl: './peopleprofile.component.html',
  styleUrls: ['./peopleprofile.component.css']
})
export class PeopleprofileComponent implements OnInit {

  constructor(private route:ActivatedRoute,private dataService:ApiServiceService) { }
  default_profil_img="http://localhost:5000/public/uploadfile/userspost/default-profile.png";
  id:any;
  age:number;
  singleProfile:any;
  muFriends:any=[];
  isFriends:boolean=false;
  ngOnInit(): void {
    this.id=this.route.snapshot.params['data'];
    console.log(this.default_profil_img);
    this.dataService.peopleProfile(this.id).subscribe((res)=>{
      this.singleProfile=res.profile[0];
      this.age=new Date().getFullYear()-this.singleProfile.year;
      this.muFriends=res.mutual;
      this.isFriends=true;
    })
  }

}
