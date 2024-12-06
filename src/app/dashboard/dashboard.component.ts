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
  filteredData: any[] = []; // Array to store filtered data
  rowsPerPage: number = 10; // Ensure 10 rows per page
  currentPage: number = 1;
  rowsOptions: number[] = [5, 10, 15, 100];
  showTable = true;
  searchQuery: string = ''; // Variable for the search query

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

            // Update 'type' column values by replacing underscores with spaces
            this.data.forEach(item => {
              // Replace underscores in 'type' with spaces
              if (item.requestType) {
                item.requestType = item.requestType.replace(/_/g, ' ');

                // Add arrows based on 'requesttype'
                if (item.requestType === 'Stock In') {
                  item.requestType += ''; // Down arrow for 'Stock In'
                } else if (item.requestType === 'Stock Out') {
                  item.requestType += ''; // Up arrow for 'Stock Out'
                }
              }
            });

            this.filteredData = [...this.data]; // Initialize filteredData with the fetched data
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

  // Method to filter data based on the search query
  filterData() {
    if (this.searchQuery) {
      this.filteredData = this.data.filter(item => {
        // Safely access fields and convert to lowercase if they are strings
        return (
          (item.batchNumber && item.batchNumber.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (item.serialNumber && item.serialNumber.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (item.type && item.type.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (item.requestType && item.requestType.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (item.receivedFrom && item.receivedFrom.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (item.destination && item.destination.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (item.productName && item.productName.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (item.productCode && item.productCode.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          (item.transactionToken && item.transactionToken.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      });
    } else {
      this.filteredData = [...this.data]; // Reset to original data if no search query
    }
    this.updatePaginatedData(); // Update paginated data after filtering
  }
  
  
  
  getTypeColor(type: string): string {
    if (type === 'Pallete') {
      return 'yellow-bg'; // For 'Pallete', return a class name for yellow background
    }
    return 'other-color'; // For other types, return a different class
  }

  // Cards data
  cards: { title: string; content: string }[] = [
    { title: 'Card 1', content: 'This is the content of card 1.' },
    { title: 'Card 2', content: 'This is the content of card 2.' },
    { title: 'Card 3', content: 'This is the content of card 3.' },
  ];

  // Total number of pages based on rowsPerPage
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.rowsPerPage);
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
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  // Change rows per page and update paginated data
  changeRowsPerPage(rows: number) {
    this.rowsPerPage = rows;
    this.currentPage = 1; // Reset to first page when rows per page change
    this.updatePaginatedData();
  }
}
