import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DepartmentService } from 'src/app/core/services/department.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { SanctionService } from 'src/app/core/services/sanction.service';
import { TypeSanctionService } from 'src/app/core/services/type-sanction.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-sanction',
  templateUrl: './sanction.component.html',
  styleUrls: ['./sanction.component.css']
})
export class SanctionComponent implements OnInit {
  url:SafeResourceUrl | undefined
  showPreview=false

 


 


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  ts:any[] =[]
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
    private tsService:TypeSanctionService,
    private reqService:RequeteService,
    private sanctionService:SanctionService,
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
    this.getTypeSanction()
  }

 
 
  getAll(){
    this.sanctionService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }
  getTypeSanction(){
    this.tsService.getAll().subscribe((res:any)=>{
      this.ts=res.data
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
    let formData= new FormData()

    
    let d2 = formatDate(value.closed_date,'yyyy-MM-dd','en_US');
    let d1 =formatDate(new Date(),'yyyy-MM-dd','en_US');
    
     if(d1 < d2){
       this.toastrService.error(`La date fin ne peut être antérieur à la date début `)
       return ;
     }

    if (this.fileInput == undefined) {
      this.toastrService.error(`Veuillez charger la décision de clôture`)
      return
     }else{
      formData.append('file',this.fileInput)
     }

     for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        formData.append(key,element)

      }
     }
    this.loading=true
    this.sanctionService.store(formData).subscribe((res:any)=>{
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
    let formData= new FormData()

    let d2 = formatDate(value.closed_date,'yyyy-MM-dd','en_US');
    let d1 =formatDate(new Date(),'yyyy-MM-dd','en_US');
    
     if(d1 < d2){
       this.toastrService.error(`La date fin ne peut être antérieur à la date début `)
       return ;
     }

    if (this.fileInput != undefined) {

      formData.append('file',this.fileInput)
     }

     for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        formData.append(key,element)

      }
     }
     this.loading=true
    this.sanctionService.update(this.selected_data.id,formData).subscribe((res:any)=>{
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
    this.sanctionService.delete(this.selected_data.id).subscribe((res:any)=>{
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


  showFile(filename:any,code:any){
    
    let url=ConfigService.toFile("docs/"+code+"/"+filename);
    this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)

    this.modalService.dismissAll()
    this.showPreview=true
  // window.location=url 
 }

 back(){
  this.showPreview=false
  this.getAll()
}


setStatus(value:any){

  this.toastrService.warning("Opération en cours")

      this.sanctionService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Département",err.error.message)
    })
}

}
