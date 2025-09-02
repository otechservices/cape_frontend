import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/core/services/profile.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selected_data:any
  data:any[]=[]
  user:any
  permissions:any[]=[]
  loading=false
  loading2=false
      constructor(
        private locService:LocalStorageService, 
        private profileService:ProfileService,
        private toastrService:ToastrService,
        private dialogService:NgbModal,
        private modalService:NgbModal

        ){
  
      } 
  
    ngOnInit(): void {
      this.all();
      this.user=this.locService.get(GlobalName.user);
      this.permissions=this.user.roles[0].permissions;
      console.log(this.permissions);

    }
  
    all() {
      this.loading2=true;
      this.profileService.getAll().subscribe((res:any)=>{
        this.data=res.roles
        this.permissions=res.permissions
        this.loading2=false;
        
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }
  
    checked(el:any){
      this.selected_data=el
    }
  
    
    open(dialog: TemplateRef<any>,el:any) {
      this.selected_data=el
      this.dialogService.open(
        dialog);
        
    }
  
    store(value:any,ref:any) {
      this.toastrService.info("Profil","Ajout de Opération en cours")

      this.loading=true;
      value.id=this.selected_data.id;
        this.profileService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
            this.modalService.dismissAll()
            this.all();
            this.toastrService.success("Profil","Ajout de droit")

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }
  hasPermission(permission:any){
    var check= this.permissions.find((e:any)=>e.name ==permission)
    if(check) return true;
    return false
  }

  revoke(id:any,id2:any){
    this.loading=true;
    if(confirm("Voulez vous retirer ce droit ?")){
      this.toastrService.info("Profil","Ajout de Opération en cours")
         this.profileService.update({id:id2},id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.all();
          this.toastrService.success("Profil","Retrait de droit")


      },
      (err:any)=>{
          this.loading=false;
      })
    }
   
  }
}
