import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service'; // Import UserService
import { Users } from '../user/user-info.model'; // Import UserInfo model

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {


  constructor(private route: ActivatedRoute, private userService: UserService) {
   
  }

  ngOnInit() {
   
  }
}
