import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from '../answer';
import { UserQuestion } from '../userQuestion';
import { UserSection } from '../userSection';
import { UserQuestionnaire } from '../userQuestionnaire';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:object;
  identifiantUser:number;
  ques:Object;
  identifiant:number;
  constructor(public router:Router ,private questionnaire:QuestionnaireService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.identifiant = this.activatedRoute.snapshot.params['name'];
    this.identifiantUser= this.activatedRoute.snapshot.params['id'];
    this.afficherUser();

    this.afficherQuestionnaire();
  }
afficherQuestionnaire(){
  this.questionnaire.getQuestionnaireParId(this.identifiant).subscribe(Response=>{
    this.ques=Response
  })
}
afficherUser(){
  this.questionnaire.getUserParId(this.identifiantUser).subscribe(Response=>{
    this.user=Response;
  })
}
editUser(t){
  this.questionnaire.repondUser(t).subscribe(Response=>{
    this.afficherUser();
  });
  this.router.navigate(['userQuestionnaireListe',this.identifiantUser]);
}
checkChange(event:Event,a:number,b:string,c:string){
  let s=<HTMLInputElement> event.target;
  let aa=true;
  let bb=true;
  let cc=true;
  let f= new Answer(<string>s.value);
  let d= new UserQuestion(c,[f]);
  let e= new UserSection(b,[d]);
  let g= new UserQuestionnaire(a,[e]);
  if (s.checked == true){
    for (let x of this.user['questionnaireListe']){
      for(let y of x.questionnaire){
        if (y.id == a){
          cc=false;
          for(let z of y.section){
            if(z.sectionName == b){
              bb=false;
              for (let u of z.question){
                if(u.questionName == c){
                  aa=false;
                  u.answer.push(f);
                  break;
                }
              }
              if(aa == true) {
                z.question.push(d);           
                aa=false;       
                break;
              }
            }
          }
          if(bb == true){
            y.section.push(e);
            bb=false;
            break;
          }
        }
      }
      if(cc == true) {
        x.questionnaire.push(g); 
        cc =false;
        break;
      }
      }
    }
    else{
      for (let x of this.user['questionnaireListe']){
        for(let y of x.questionnaire){
          if (y.id == a ){
            for(let z of y.section){
              if(z.sectionName == b ){
                for (let u of z.question){
                  if(u.questionName == c && u['answer'].length >= 2){
                    let y= u.answer.indexOf(f);
                    u.answer.splice(y,1);
                  }
                  else if(u.questionName == c && u['answer'].length == 1){
                    let xx= z.question.indexOf(d);
                    z.question.splice(xx,1);
                    
                  }
                }
              }
              // else if (z.sectionName == b && z['question'].length == 2){
              //   let k= y.section.indexOf(e);
              //   y.section.splice(k,1); 
              //   break;
              // }
            }
          }
          // else if (y.id == a && y['section'].length == 2 && dd == true){
          //   let hh= x.questionnaire.indexOf(g);
          //   x.questionnaire.splice(hh,1);
          //   console.log(a);
          //   break;
          // }
      }
    }
  }
}
}