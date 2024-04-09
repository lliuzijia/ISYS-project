import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router'; // 注意，不再从 @angular/router 中导入 BrowserModule
import { HttpClientModule } from '@angular/common/http'; // 导入 HttpClientModule
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from './service/auth.service'; // 确保在这里导入 AuthService

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    RouterModule, // 确保导入 RouterModule
    HttpClientModule // 添加 HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AuthService, // 确保在 providers 中提供 AuthService
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
