import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // 添加此行
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'check-in',
    loadChildren: () => import('./check-in/check-in.module').then( m => m.CheckInPageModule)
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'user-details/:id',
    loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
  },
  {
    path: 'new-friend',
    loadChildren: () => import('./new-friend/new-friend.module').then( m => m.NewFriendPageModule)
  },
  {
    path: 'regist',
    loadChildren: () => import('./page/regist/regist.module').then( m => m.RegistPageModule)
  },
  {
    path: 'login', component: LoginComponent 
    
  }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicModule // 添加 IonicModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }