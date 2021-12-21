import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl:string=" http://localhost:5000/api"
  constructor(private httpClient:HttpClient) { }

  userprofile(token){
    return this.httpClient.get<any>(this.baseUrl + '/userprofile',{params:{token:token}});
  }

  
  handelUserOwnPosts(token)
  {
    return this.httpClient.get<any>(this.baseUrl + '/ownposts',{params:{token:token}});
  }

  handelUserPosts(file:File,text:string,token:string)
  {
    const userPostForm: FormData = new FormData();
    userPostForm.append('file', file, file.name);
    return this.httpClient.post<any>(this.baseUrl + '/userpost',userPostForm,{params:{text,token}});
  }
  fetchAllFeeds(token){
    return this.httpClient.get<any>(this.baseUrl + '/fetchallposts',{params:{token}});
  }
  uploadUserProfilepic(file:File,token){
    const dpForm: FormData = new FormData();
    dpForm.append('file',file, file.name);
    return this.httpClient.post<any>(this.baseUrl + '/updateprofilepic',dpForm,{params:{token}});
  }
  handeluserNameList(token:string){
    return this.httpClient.get<any>(this.baseUrl + '/usernamelist',{params:{token}});
  }
  handelSearchProfile(profile){
    return this.httpClient.get<any>(this.baseUrl + '/searchprofile',{params:{profile}});
  }
  peopleProfile(id){
    return this.httpClient.get<any>(this.baseUrl + '/peopleprofile',{params:{id}});
  }

  sendFriendReq(rec_id,req_data){
    console.log("recipant"+rec_id);
    console.log("requester"+req_data);
   
    return this.httpClient.post<any>(this.baseUrl + '/friendreq',{params:{rec_id,req_data}});
  }
  checkPendingReq(rec_data){
    return this.httpClient.get<any>(this.baseUrl + '/pendingreq',{params:{rec_data}});
  }
  acceptReq(req_id,token){
    console.log(req_id,token);
    return this.httpClient.post<any>(this.baseUrl + '/acceptreq',{params:{req_id,token}});
  }
  declineReq(req_id,token){
    return this.httpClient.post<any>(this.baseUrl + '/declinereq',{params:{req_id,token}});

  }
  friendList(token){
    return this.httpClient.get<any>(this.baseUrl + '/friendlist',{params:{token}});
  }
  
} 

