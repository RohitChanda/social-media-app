import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../authguard/authguard.guard';
import { FriendsComponent } from './friends/friends.component';
import { FriendslistComponent } from './friendslist/friendslist.component';
import { PeopleComponent } from './people/people.component';
import { PeoplelistComponent } from './peoplelist/peoplelist.component';
import { PeopleprofileComponent } from './peopleprofile/peopleprofile.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {path:'posts',component:PostsComponent,canActivate:[AuthguardGuard]},
  {path:'peoplelist',component:PeoplelistComponent,canActivate:[AuthguardGuard]},
  {path:'peopleprofile/:data',pathMatch: 'prefix',component:PeopleprofileComponent,canActivate:[AuthguardGuard]},
  {path:'friendreq',component:FriendsComponent,canActivate:[AuthguardGuard]},
  {path:'friendlist',component:FriendslistComponent,canActivate:[AuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedsRoutingModule { }
