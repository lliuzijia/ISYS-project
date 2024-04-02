import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service'; // Import UserService
import { UserInfo } from '../user/user-info.model'; // Import UserInfo model

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  user: UserInfo;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.user = { id: -1, name: '', avatar: '', description: '', phone: '', email: '', address: '', company: '', department: '', position: '', notes: '' };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      const user = this.userService.getUserById(userId);
      if (user) {
        this.user = user;
      } else {
        // Handle the case where user is not found, e.g., display error message or redirect to another page
      }
    });
  }
}
