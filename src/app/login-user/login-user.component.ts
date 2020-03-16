import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthUserService } from '../auth-user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
 user:FormGroup;
  constructor(private fb:FormBuilder, private auth:AuthUserService) { }

  ngOnInit() {
    this.user=this.fb.group({
      userName:['',Validators.required],
      userPassword:['',Validators.required]
    })
    
  }
  onSubmit(u){
    this.auth.login(u);
  }

}
