import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


   // some fields to store our state so we can display it in the UI
   idleState = "NOT_STARTED";
   countdown?: any = null;
   lastPing?: any = null;
 
   // add parameters for Idle and Keepalive (if using) so Angular will inject them from the module
   constructor(
    
    private authService:AuthService,
    private router: Router,
    private lsService:LocalStorageService,
    private idle: Idle, 
    keepalive: Keepalive, 
    cd: ChangeDetectorRef,
    private toastrService:ToastrService) {
     // set idle parameters
     idle.setIdle(600); // how long can they be inactive before considered idle, in seconds
     idle.setTimeout(120); // how long can they be idle before considered timed out, in seconds
     idle.setInterrupts(DEFAULT_INTERRUPTSOURCES); // provide sources that will "interrupt" aka provide events indicating the user is active
 
     // do something when the user becomes idle
     idle.onIdleStart.subscribe(() => {
      this.toastrService.warning('Vous serez déconecté dans 30s si aucune activité détectée')
     });
     // do something when the user is no longer idle
     idle.onIdleEnd.subscribe(() => {
     
       cd.detectChanges(); // how do i avoid this kludge?
     });
     // do something when the user has timed out
     idle.onTimeout.subscribe(() => this.logout());
     // do something as the timeout countdown does its thing
     //idle.onTimeoutWarning.subscribe(seconds => this.countdown = seconds);
 
     // set keepalive parameters, omit if not using keepalive
     //keepalive.interval(30); // will ping at this interval while not idle, in seconds
     //keepalive.onPing.subscribe(() => alert()); // do something when it pings
   }
 
   reset() {
     // we'll call this method when we want to start/reset the idle process
     // reset any component state and be sure to call idle.watch()
     this.idle.watch();
     this.idleState = "NOT_IDLE";
     this.countdown = null;
     this.lastPing = null;
   }
 
   ngOnInit(): void {
     // right when the component initializes, start reset state and start watching
     this.reset();
   }

   logout(){
    this.authService.logout().subscribe((res:any)=>{
      this.lsService.remove(GlobalName.tokenName)
      this.lsService.remove(GlobalName.refreshTokenName)
      this.lsService.remove(GlobalName.expireIn)
      this.lsService.remove(GlobalName.userName)
      this.lsService.remove(GlobalName.exercice)
      this.router.navigate(['/admin/auth/login'])
      this.toastrService.success('Déconnexion réussie', 'Connexion');
    }),
    ((err:any)=>{
      console.log(err)
      this.toastrService.success('Déconnexion échouée', 'Connexion');

    });
  }

}
