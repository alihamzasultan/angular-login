import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isSidebarVisible = true; // Sidebar initially visible
  data: any[] = [];
  paginatedData: any[] = [];
  rowsPerPage: number = 10; // Ensure 10 rows per page
  currentPage: number = 1;
  rowsOptions: number[] = [5, 10, 15, 100];
  showTable = true;

  constructor() {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Toggle Sidebar visibility
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  // Toggle Table visibility
  toggleTableVisibility() {
    this.showTable = !this.showTable;
  }

  fetchData() {
    const url = 'https://kaizenportal.atksrv.net:9092/api/kaizen/getalltransactions';
    const token = localStorage.getItem('access_token');

    if (token) {
      const headers = {
        'x-api-key': '1234',
        'Authorization': `Bearer ${token}`,
      };

      axios
        .get(url, { headers })
        .then((response) => {
          console.log('Fetched Data:', response.data);
          if (response.data && Array.isArray(response.data.data)) {
            this.data = response.data.data;
            this.updatePaginatedData();
          } else {
            console.error('Unexpected data format:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('No access token found!');
    }
  }

  // Total number of pages based on rowsPerPage
  get totalPages(): number {
    return Math.ceil(this.data.length / this.rowsPerPage);
  }

  // Change page function
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return; // Avoid invalid page numbers
    this.currentPage = page;
    this.updatePaginatedData();
  }

  // Update the paginated data based on current page
  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }
}
