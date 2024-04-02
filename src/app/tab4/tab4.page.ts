import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service'; // Import UserService
import { UserInfo } from '../user/user-info.model'; // Import UserInfo model
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  // User list
  userList: UserInfo[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // Get user list from UserService
    this.userList = this.userService.getUsers();
  }

  // Open user details page
  openUserDetails(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }

  // Go to add new friend page
  goToNewFriendPage() {
    this.router.navigate(['/new-friend']);
  }
}
