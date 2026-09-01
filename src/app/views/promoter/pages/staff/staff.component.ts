import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RequeteService } from 'src/app/core/services/requete.service';
import { StaffService } from 'src/app/core/services/staff.service';
import { TargetService } from 'src/app/core/services/target.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {



 


  buttonsPermission :any|undefined;
  centres:any[] =[]
  structures:any[] =[]
  data:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false

  role:any
  user:any

  // Pagination et recherche
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  
  // Données filtrées (pour le comptage)
  get filteredData(): any[] {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      return this.data;
    }
    const term = this.searchTerm.toLowerCase();
    return this.data.filter(item => 
      Object.values(item).some(val => 
        String(val).toLowerCase().includes(term)
      )
    );
  }


  /**
   * Centres dont l'agrément est validé : les seuls sur lesquels du personnel
   * peut être déclaré, l'API refusant les autres.
   */
  get centresAgrees(): any[] {
    return this.centres.filter(c => c?.is_agree);
  }

  /** Aucun centre agréé : la saisie est impossible, il faut le dire. */
  get agrementManquant(): boolean {
    return this.centresAgrees.length === 0;
  }

  constructor(
    private staffService:StaffService,
    private requeteService:RequeteService,
    private toastrService:ToastrService,
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
    this.getCentres()
  }

  getCentres(){
    this.requeteService.getForPromoter(this.user?.promoter_id).subscribe((res:any)=>{
      this.centres=res.data ?? []
    },
    (err:any)=>{

    })
  }

 
 
  getAll(){
    this.staffService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }


  store(value:any){
    this.loading=true
    value.collector_id=this.user.collector_id
    this.staffService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Personnel",err.error.message)
    })
  }
  update(value:any){
    this.loading=true

    this.staffService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Personnel",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.staffService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Personnel",err.error.message)
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
  
        this.staffService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Personnel",err.error.message)
      })
  }



}
