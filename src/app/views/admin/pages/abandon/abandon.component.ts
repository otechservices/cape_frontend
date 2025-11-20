import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ResidentService } from 'src/app/core/services/resident.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-abandon',
  templateUrl: './abandon.component.html',
  styleUrl: './abandon.component.css',
      encapsulation:ViewEncapsulation.None
  
})
export class AbandonComponent {


 
   url:SafeResourceUrl | undefined
   @ViewChild('previewContent')previewContent:any
 


  buttonsPermission :any|undefined;
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
  }

 
 
  getAll(){
    this.residentService.getAbandons().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }

  export(){
        this.residentService.getExport().subscribe((res:any)=>{
      this.showFile(res.data)
      
    },
    (err:any)=>{

    })
  }

  store(value:any){
    this.loading=true
    value.collector_id=this.user.collector_id
    this.residentService.store(value).subscribe((res:any)=>{
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

    this.residentService.update(this.selected_data.id,value).subscribe((res:any)=>{
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
    this.residentService.delete(this.selected_data.id).subscribe((res:any)=>{
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
           this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(ConfigService.toFile(`${filename}`))
           console.log(this.url)  
           this.offcanvasService.open(this.previewContent,{  panelClass: 'details-panel', position: 'start'  });
        }

}
