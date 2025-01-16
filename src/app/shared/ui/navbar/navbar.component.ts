import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  userName: string = '';
  userRole: string = '';

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser) {
      this.userName = currentUser.name || 'Usuario';
      this.userRole = currentUser.role || 'Sin rol';
    }
  }
  
  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
