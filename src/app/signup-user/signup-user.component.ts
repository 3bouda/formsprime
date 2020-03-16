import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthUserService } from '../auth-user.service';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {
  user:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthUserService) { }

  ngOnInit() {
    this.auth.afficherUser();
    this.user=this.fb.group({
      data:this.fb.array([this.fb.group({
      userName:['',Validators.required],
      useremail:['',Validators.required],
      userPassword:['',Validators.required]
    })
    ]),
      questionnaireListe:this.fb.array([this.ques()]),
    })
  }
 
  ques():FormGroup{
    return this.fb.group({
      questionnaire:this.fb.array([])
    })
  }
 
  onSubmit(u){
    this.auth.signup(u);
  }
}
