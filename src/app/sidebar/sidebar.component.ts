import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

  isSidebarVisible: boolean = true; // Track sidebar visibility

  // Method to toggle the sidebar
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  closeSidebar() {
    this.isSidebarVisible = false;
  }

  openSidebar() {
    this.isSidebarVisible = true;
  }

  @Output() sidebarClose = new EventEmitter<void>();

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Transactions', icon: 'list_alt', route: '/transactions' },
    { label: 'Reports', icon: 'bar_chart', route: '/reports' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];
}
