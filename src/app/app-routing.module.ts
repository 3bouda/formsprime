import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireListeComponent } from './questionnaire-liste/questionnaire-liste.component';
import { AffquestionnaireComponent } from './affquestionnaire/affquestionnaire.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { UserComponent } from './user/user.component';
import { UserQuestionnareListComponent } from './user-questionnare-list/user-questionnare-list.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AdminComponent } from './admin/admin.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { GuardAdminGuard } from './guard-admin.guard';
import { GuardUserGuard } from './guard-user.guard';

const routes: Routes = [
  {path:'accueil', component:AccueilComponent},
  {path:'admin', component:AdminComponent},
  {path:'login-user', component:LoginUserComponent},
  {path:'signup-user', component:SignupUserComponent},

  {path:'questionnaireliste', component:QuestionnaireListeComponent,canActivate: [GuardAdminGuard]},
  {path:'questionnaireliste/:id',component:AffquestionnaireComponent,canActivate: [GuardAdminGuard]},
  {path:'ajoutquestionnaire', component:QuestionnaireComponent,canActivate: [GuardAdminGuard]},
  {path:'editquestionnaire/:id',component:EditQuestionnaireComponent,canActivate: [GuardAdminGuard]},
  {path:'userQuestionnaireListe/:id',component:UserQuestionnareListComponent,children:[
    
    {path:'user/:name',component:UserComponent}]
    
    ,canActivate: [GuardUserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

