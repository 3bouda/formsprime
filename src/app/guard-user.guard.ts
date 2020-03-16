import { Injectable } from '@angular/core';
import { CanActivate, Router , ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthUserService } from './auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardUserGuard implements CanActivate {
 constructor(private router:Router, private auth:AuthUserService){}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.auth.connected()){
    return true;
  }
  else {
    this.router.navigateByUrl('/signup-user');
    return false;
  }

  }
 
}
