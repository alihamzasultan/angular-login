import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: any[] = []; // All data fetched from the API
  paginatedData: any[] = []; // Data to display in the table
  rowsPerPage: number = 10; // Number of rows per page
  currentPage: number = 1; // Current page number
  rowsOptions: number[] = [5, 10, 15, 100]; // Options for rows per page dropdown

  constructor() {}

  ngOnInit(): void {
    this.fetchData();
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

          // Extract the array from the 'data' property
          if (response.data && Array.isArray(response.data.data)) {
            this.data = response.data.data; // Assign the array to `data`
            this.updatePaginatedData(); // Update paginated data after fetching
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

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  changeRowsPerPage(rows: number) {
    this.rowsPerPage = rows;
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedData();
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.rowsPerPage);
  }
}
