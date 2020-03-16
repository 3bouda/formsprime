import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from './questionnaire.service';
import { FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AuthUserService implements OnInit{
user;
aa=true;
a;
bb=false;
  constructor(private router:Router, private questionnaire:QuestionnaireService) { }
logIn = false;
  ngOnInit(){
    this.afficherUser();
  }
  afficherUser(){
    this.questionnaire.getUser().subscribe( response =>{ 
      this.user=response;      
    })
  }
 

   login(t){
     for(let y of this.user){
  for (let x of y['data']){
    if (t.userName == x.userName && t.userPassword == x.userPassword){
        this.aa=false;
        this.logIn = true;
        this.router.navigate(['/userQuestionnaireListe',y.id]);
      } 
    }
      if (this.aa == true){
        this.router.navigateByUrl('/login-user');      
      }
  }}
  signup(t){
    this.logIn = true;
   
    for(let y of this.user){
      this.a=y.id;
      for(let x of y['data']){
        if(t.useremail != x.useremail && t.userPassword != x.userPassword){
          this.bb=true
        }
      }
    }
    this.a+=1;
    if(this.bb == true){
    this.questionnaire.ajouterUser(t).subscribe(response=>{
      this.afficherUser() ;
    });
  }
    this.router.navigate(['/userQuestionnaireListe',this.a]);
  }
  logOut(){
    this.logIn = false;
  }
  connected(){
    return this.logIn;
  }
}
