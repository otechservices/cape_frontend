import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ReferalControlService } from 'src/app/core/services/referal-control.service';
import { ReferalService } from 'src/app/core/services/referal.service';
import { TargetService } from 'src/app/core/services/target.service';
import { TypeService } from 'src/app/core/services/type.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-referal',
  templateUrl: './referal.component.html',
  styleUrls: ['./referal.component.css']
})
export class ReferalComponent implements OnInit {




 


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  referals:any[] =[]
  selected_data:any;
  selected_data2:any;
  selected_data3:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  controls:any[] =[]
  myControls:any[] =[]
  transmittedControls:any[] =[]
  role:any
  user:any
  service_id:any;
  type:any;

  constructor(
    private typeService:TypeService,
    private activatedRoute:ActivatedRoute,
    private referalControlService:ReferalControlService,
    private referalService:ReferalService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0].name
    this.activatedRoute.paramMap.subscribe(params => {
      this.type =this.activatedRoute.snapshot.paramMap.get('service')
      this.init()
    })
    
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  }

  init(){
   this.setServiceId()
  }


  setServiceId(){
    this.typeService.getAll2().subscribe((res:any)=>{
      res.data.forEach((element:any) => {

        if(element.name.toLowerCase().includes(this.type.toLowerCase()))this.service_id=element.id
      });
      console.log(this.service_id)
      if (this.service_id!=undefined) {
        if(this.role=="cape"){
          this.getAll()
    
        }else{
          this.getAllWithCape()
        }
      }else{
        this.toastrService.info('Impossible de charger les données, service non reconnue','Requêtes')
      }
      
    })

  }


 
 
  getAll(){
    this.referalService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }
  getAllWithCape(){
    this.controls=[];
    this.myControls=[];
    this.transmittedControls=[];
    this.referalService.getAllWithCape(this.service_id).subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }
  


  store(value:any){
    this.loading=true
    value.referal_id=this.selected_data2.id
    this.referalControlService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.modalService.dismissAll()
        this.referals=[]
        if(this.role=="cape"){
          this.getAll()
    
        }else{
          this.getAllWithCape()
        }

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Recommandation",err.error.message)
    })
  }
  update(value:any){
    this.loading=true

    this.referalControlService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        if(this.role=="cape"){
          this.getAll()
    
        }else{
          this.getAllWithCape()
        }
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Recommandation",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.referalControlService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.init()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Recommandation",err.error.message)
    })
  }
})
  }
  checked(el?:any){
    this.selected_data=el;
    this.is_active=el.is_active

    //if(this.role=='ddasm'){
      this.referals=this.selected_data.requete.referals
    //}
  }
  checked3(el?:any){
    this.selected_data3=el;
    this.is_active=el.is_active
  }
  checked2(el?:any){
    this.selected_data2=el;
    
    this.controls=el.controls
    this.myControls=el.my_controls
    this.transmittedControls=el.transmitted_controls
  }
  verifyIfElementChecked(){
    console.log(this.selected_data)
    if (this.selected_data2==null) {
      this.toastrService.warning("Aucun élément selectionné");
      return false;
    }
    return true;
  }



  
  dismiss(){
    this.modalService.dismissAll()
  }

  add(content:any){
     
  if(this.verifyIfElementChecked())  this.modalService.open(content,{size:'lg'});
  }
  add2(content:any,c:any){
    this.selected_data3=c
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
  
        this.referalService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Recommandation",err.error.message)
      })
  }
  transUp(){

    this.toastrService.warning("Opération en cours")
  
        this.referalControlService.transUP(this.selected_data2.id).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAllWithCape()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Suivi de recommendation",err.error.message)
      })
  }

}
