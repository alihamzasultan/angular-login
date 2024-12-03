import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { // Inject Router
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    // Initialization if necessary
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.login(email, password);
    } else {
      console.log('Form is not valid');
    }
  }

  login(email: string, password: string) {
    const url = 'https://kaizenportal.atksrv.net:9092/api/users/login';
    const headers = {
      'x-api-key': '1234',
      'Content-Type': 'application/json',
    };
    const data = { email, password };
  
    axios
      .post(url, data, { headers })
      .then((response) => {
        console.log('Response:', response.data);
  
        if (response.data.message === 'Invalid username or password.') {
          console.error('Invalid credentials');
          Swal.fire({
            icon: 'error',
            title: 'Invalid credentials',
            text: 'The email or password you entered is incorrect.',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          const accessToken = response.data.access_token; // Store the token
          localStorage.setItem('access_token', accessToken); // Save token in localStorage
  
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Welcome back to the portal.',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate(['/dashboard']);
          });
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      });
  }
  
}