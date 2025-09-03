import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ControlService } from 'src/app/core/services/control.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { SanctionService } from 'src/app/core/services/sanction.service';
import { TypeControlService } from 'src/app/core/services/type-control.service';
import { TypeSanctionService } from 'src/app/core/services/type-sanction.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {


 


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  tc:any[] =[]
  capes:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  fileInput:any

  role:any
  user:any


  constructor(
    private tcService:TypeControlService,
    private reqService:RequeteService,
    private controlService:ControlService,
    private toastrService:ToastrService,
    private _sanitizationService: DomSanitizer,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.init()
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  }

  init(){
    this.getAll()
    this.getCapes()
    this.getTypeControl()
  }

 
 
  getAll(){
    this.controlService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }
  getTypeControl(){
    this.tcService.getAll().subscribe((res:any)=>{
      this.tc=res.data
    },
    (err:any)=>{

    })
  }
  getCapes(){
    this.reqService.getListForPublic(1).subscribe((res:any)=>{
      this.capes=res
    },
    (err:any)=>{

    })
  }


  upload(event:any){
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
    }
  } 

  store(value:any){
    let d2 = formatDate(value.date_control,'yyyy-MM-dd','en_US');
    let d1 =formatDate(new Date(),'yyyy-MM-dd','en_US');
    
     if(d1 < d2){
       this.toastrService.error(`La date fin ne peut être antérieur à la date début `)
       return ;
     }
    this.loading=true
    this.controlService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Sanctions",err.error.message)
    })
  }
  update(value:any){
    let d2 = formatDate(value.date_control,'yyyy-MM-dd','en_US');
    let d1 =formatDate(new Date(),'yyyy-MM-dd','en_US');
    
     if(d1 < d2){
       this.toastrService.error(`La date fin ne peut être antérieur à la date début `)
       return ;
     }

     this.loading=true
    this.controlService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Sanctions",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.controlService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Sanctions",err.error.message)
    })
  }
})
  }
  checked(el?:any){
    this.selected_data=el;
    this.is_active=el.status
  }
  verifyIfElementChecked(){
    console.log(this.selected_data)
    if (this.selected_data==null) {
      this.toastrService.warning("Aucun élément selectionné");
      return false;
    }
    return true;
  }



  
  dismiss(){
    this.modalService.dismissAll()
  }

  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalOption={centered:false,size:"lg"}
    this.modalService.open(content,{size:'lg'});
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalService.open(content,{size:'lg'});

  }


setStatus(value:any){

  this.toastrService.warning("Opération en cours")

      this.controlService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Département",err.error.message)
    })
}


}
