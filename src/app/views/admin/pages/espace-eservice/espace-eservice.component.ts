import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DepartmentService } from 'src/app/core/services/department.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { TypeService } from 'src/app/core/services/type.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-espace-eservice',
  templateUrl: './espace-eservice.component.html',
  styleUrls: ['./espace-eservice.component.css']
})
export class EspaceEserviceComponent implements OnInit {



  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  parcours:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  service_id:any;
  type:any;
  role:any
  user:any
  state:any

  constructor(
    private typeService:TypeService,
    private reqService:RequeteService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
      private router:Router,
      private spinner: NgxSpinnerService,
    private activatedRoute:ActivatedRoute,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.role= this.user.roles[0].name
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
    this.activatedRoute.paramMap.subscribe(params => {
      this.selected_data=null
      this.data=[]
      this.service_id=undefined
       this.state =this.activatedRoute.snapshot.paramMap.get('state')
       this.type =this.activatedRoute.snapshot.paramMap.get('service')
       console.log(this.role, this.state)
       this.setServiceId()
      //  if(this.role=='dfea' && this.state=="finished"){
      //   this.getAll()
      //  }else{
      //   this.setServiceId()
      //  }
      
       

     });  

  }

  setServiceId(){
    this.typeService.getAll2().subscribe((res:any)=>{
      res.data.forEach((element:any) => {

        if(element.name.toLowerCase().includes(this.type.toLowerCase()))this.service_id=element.id
      });
      console.log(this.service_id)
      if (this.service_id!=undefined) {
        this.getAll()
      }else{
        this.toastrService.info('Impossible de charger les données, service non reconnue','Requêtes')
      }
      
    })

  }

  getAll(){
    if (this.state != undefined && this.state!=null) {
      this.spinner.show();
      this.reqService.getByInstance(this.state, this.service_id).subscribe((res:any)=>{
        this.spinner.hide()
          this.data=res
       // 
     
      },
      (err:any)=>{
        this.spinner.hide()
      })
    }else{
      this.spinner.show();
      this.reqService.getAll(this.service_id).subscribe((res:any)=>{
        this.spinner.hide()
        this.data=res
        

      },
      (err:any)=>{
        this.spinner.hide()
      })
    }
  }
 
   
  checked(el?:any){
    this.selected_data=el;
    this.is_active=el.is_active
  }

  getJson(value:any){
    if (value==undefined) {
      return []
    } else {
      return JSON.parse(value)

    }
    
  }
  getJson2(value:any){
    if (value==undefined) {
      return []
    } else {
      return JSON.parse(value)

    }
    
  }

  goToShow(){
    this.router.navigate(['/admin/requetes/show/'+this.selected_data.code+'/'+this.type])
  }

  getColor(status:any){

    if (status==0) {
      return "secondary"
    }
    if (status==1 || status==3) {
      return "warning"
    }
    if (status==2 || status==3) {
      return "danger"
    }

    if (status>=4) {
      return "success"
    }
    return "light"
  }
  getText(status:any){
    switch (status) {
      case 0:
        return 'Nouveau dossier';
        break;
    
      case 1:
        return 'Dossier mise en attente';

        break;
    
      case 2:
        return 'Dossier rejeté';

        break;
    
      case 3:
        return 'Dossier corrigé';

        break;
    
      case 4:
        return 'Invitation envoyé';

        break;
      case 5:
        return 'Dossier transmis au DD';

        break;
    
      case 6:
        return 'En attente d\'approbation DDASM';

        break;
      case 7:
        return 'En attente d\'inscription à la session';

        break;
    
      default:
        return 'non défini';

        break;
    }

    return "";
  }
  add(content:any){
    if (this.selected_data==undefined) {
      return ;
    }
    this.modalService.open(content,{size:'lg'});
      this.parcours=this.selected_data.parcours;
  }

/*
  store(value:any){
    this.loading=true
    value.collector_id=this.user.collector_id
    this.reqService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Inscription",err.error.message)
    })
  }
  update(value:any){
    this.loading=true

    this.reqService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Inscription",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.reqService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Inscription",err.error.message)
    })
  }
})
  }
  checked(el?:any){
    this.selected_data=el;
    this.is_active=el.is_active
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
  
        this.reqService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Réception Dossier",err.error.message)
      })
  }

*/


delete(){

  if(this.selected_data== undefined){

    return;
  }
  let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet enregistrement?',);
  confirmed.then((result:any)=>{
     if (result.isConfirmed) {
      this.toastrService.warning("Opération en cours")
      console.log(this.selected_data)
      this.reqService.delete(this.selected_data.id).subscribe((res:any)=>{
            this.toastrService.success(res.message)
            this.ngOnInit()
        },
        (err:any)=>{
          console.log(err)
            AppSweetAlert.simpleAlert("error","Requête",err.error.message)
        })
}
})


  
}
}
