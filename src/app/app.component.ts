import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form in the constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    // You can still perform additional initialization here if needed
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
