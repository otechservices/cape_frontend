import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RequeteService } from 'src/app/core/services/requete.service';
import { ResidentService } from 'src/app/core/services/resident.service';
import { TargetService } from 'src/app/core/services/target.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css'],
    encapsulation:ViewEncapsulation.None
  
})
export class ResidentComponent implements OnInit {


  url:SafeResourceUrl | undefined
  @ViewChild('previewContent')previewContent:any


   centres:any[]=[]


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
fileInput:any
  role:any
  user:any

  // Pagination et recherche
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  
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


  constructor(
    private residentService:ResidentService,
    private toastrService:ToastrService,
        private requeteService:RequeteService,
    private _sanitizationService: DomSanitizer,
                   private offcanvasService: NgbOffcanvas,
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
    this.getRequetes()
  }


    getRequetes(){
    this.requeteService.getForPromoter(this.user?.promoter_id).subscribe((res:any)=>{
      this.centres=res.data
    },
    (err:any)=>{

    })
  }

 
 
  getAll(){
    this.residentService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }


  upload(ev:any){
    if (ev.target.files.length!=0) {
      this.fileInput=ev.target.files[0];
    }
  }

  store(value:any){
    this.loading=true
    this.residentService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Pensionnaire",err.error.message)
    })
  }
  update(value:any){
    this.loading=true

    this.residentService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Pensionnaire",err.error.message)
    })
  }

  abandon(){
    this.loading=true

    if(this.fileInput==undefined){
      this.toastrService.warning('La preuve de déclaration d\'abandon est requise')
      return ;
    }

    let formData = new FormData()
        formData.append('abandon_file',this.fileInput)

    this.residentService.abandon(this.selected_data.id,formData).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Pensionnaire",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.residentService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Pensionnaire",err.error.message)
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
  
        this.residentService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Pensionnaire",err.error.message)
      })
  }



      showFile(filename:any){
         this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(ConfigService.toFile(`docs/${filename}`))
         console.log(this.url)  
         this.offcanvasService.open(this.previewContent,{  panelClass: 'details-panel', position: 'start'  });
      }
}
