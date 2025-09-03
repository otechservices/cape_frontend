import { Component, OnInit, ViewChild } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RequestForm } from 'src/app/core/Interfaces/request-form.interface';
import { CapeService } from 'src/app/core/services/cape.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { TargetService } from 'src/app/core/services/target.service';
import { TypeFileService } from 'src/app/core/services/type-file.service';
import { TypeDataService } from 'src/app/core/services/TypeDataService';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-validation-aggrement',
  templateUrl: './validation-aggrement.component.html',
  styleUrls: ['./validation-aggrement.component.css']
})
export class ValidationAggrementComponent implements OnInit {
  myRequestForm:RequestForm={
    name: undefined,
    name_chief: undefined,
    name_pomoter: undefined,
    firstname_pomoter: undefined,
    phone_pomoter: undefined,
    phone: undefined,
    email: undefined,
    type_cape_id: undefined,
    capacity: undefined,
    targets: undefined,
    firstname_chief: undefined,
    district_id: undefined,
    address: undefined,
    phone_chief: undefined,
    requiredFiles: undefined,
    chief_is_directeor: false,
    department_id: undefined,
    municipality_id: undefined,
    has_aggrement: false,
    aggreement_reference: undefined,
    email_pomoter: undefined,
    email_chief: undefined,
    town: undefined,
    coords: undefined,
    has_consent: undefined,
    nature_promotor_id: undefined,
    aggreement_year: undefined,
    registered_number: undefined,
    registered_date: undefined,
    head_office: undefined,
    social_reason: undefined,
    registered_phone:undefined,
    type_garderies:undefined

  };



 


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  tfs:any[] =[]
  tds:any[] =[]
  selectedItems :any[]= [];
  municipalities:any[] =[]
  dropdownSettings = {};
  districts:any[] =[]
  departments:any[] =[]
  targets:any[]=[];
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  fileInput:any
  role:any
  user:any
  url:SafeResourceUrl | undefined
  showPreview=false
  dropdownList:any = [];

  constructor(
    private departmentService:DepartmentService,
    private requeteService:RequeteService,
    private capeService:CapeService,
    private tfService:TypeFileService,    
    private tdService:TypeDataService,
    private targetService:TargetService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private _sanitizationService: DomSanitizer,

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
    this.dropdownSettings = { 
      width: '1000',
      multiple: true,
      tags: true
    };    
  }

  init(){
    this.getAll()
    this.getTargets()
    this.getTypeData()
    this.getDepartmentWithRelations()
  }


  getTypeData(){
    this.tdService.getAll2().subscribe((res:any)=>{
      this.tds=res.data
    },
    (err:any)=>{

    })
  }

  getDepartmentWithRelations(){
    this.departmentService.getDepartmentWithRelation().subscribe((res:any)=>{
      this.departments=res.data
    },
    (err:any)=>{

    })
  }
 
  getAll(){
    this.requeteService.getPendingValidation().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }
  show2(content:any){
    this.modalService.open(content,{size:'lg'});
  }
  
  showFile(code:any,filename:any){

    let url=ConfigService.toFile("docs/"+code+"/"+filename);
    this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview=true
  // window.location=url 
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



  
  

  setStatus(value:any){

    this.toastrService.warning("Opération en cours")
  
        this.requeteService.setStatus({
          decision:value==0?null:value,
          id:this.selected_data.id
        }).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","Document à joindre",err.error.message)
      })
  }


  back(){
    this.showPreview=false
    this.getAll()
  }


  import(value:any){
    
    let formData= new FormData();
    formData.append('file',this.fileInput)
    this.toastrService.warning("Opération en cours")
    this.loading=true
    this.capeService.import(formData).subscribe((res:any)=>{
      this.loading=false
  
      this.toastrService.success(res.message)
      this.getAll()
  },
  (err:any)=>{
    this.loading=false
  
    console.log(err)
      AppSweetAlert.simpleAlert("error","Donnée",err.error.message)
  })
  
  
  }
  
  
  download(){
    window.open(`${ConfigService.toApiUrl('download-cape-import-file')}`, "_blank");
  }


  upload(file:any){
    console.log(file.target.files);
    if(file.target.files.length>0){
      this.fileInput=file.target.files[0]
    }
  }



  store(value:any){
    this.loading=true
    value.targets=JSON.stringify(this.selectedItems)
    this.capeService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.initForm()
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Enregistrement de CAPE",err.error.message)
    })
  }
  update(value:any){
    this.loading=true

    this.capeService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","Enregistrement de CAPE",err.error.message)
    })
  }

  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.capeService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","Département",err.error.message)
    })
  }
})
  }

  add(content:any){
    this.modalService.open(content,{size:'xl'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalOption={centered:false,size:"lg"}
    this.modalService.open(content,{size:'lg'});
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.municipalities=  this.departments.find((el:any)=>el.id == this.selected_data.district.municipality?.department_id).municipalities
    this.districts=  this.municipalities.find((el:any)=>el.id == this.selected_data.district.municipality_id).districts

    this.myRequestForm.address=this.selected_data.address
    this.myRequestForm.name=this.selected_data.name
    this.myRequestForm.firstname_chief=this.selected_data.firstname_chief
    this.myRequestForm.firstname_pomoter=this.selected_data.firstname_pomoter
    this.myRequestForm.email_pomoter=this.selected_data.email_pomoter
    this.myRequestForm.email_chief=this.selected_data.email_chief
    this.myRequestForm.name_chief=this.selected_data.name_chief
    this.myRequestForm.name_pomoter=this.selected_data.name_pomoter
    this.myRequestForm.capacity=this.selected_data.capacity
    this.myRequestForm.coords=this.selected_data.coords
    this.myRequestForm.email=this.selected_data.email
    this.myRequestForm.phone=this.selected_data.phone
    this.myRequestForm.phone_chief=this.selected_data.phone_chief
    this.myRequestForm.phone_pomoter=this.selected_data.phone
    this.myRequestForm.department_id=this.selected_data.district.municipality?.department_id
    this.myRequestForm.municipality_id=this.selected_data.district.municipality_id
    this.myRequestForm.district_id=this.selected_data.district_id
    this.myRequestForm.type_cape_id=this.selected_data.type_cape_id

    this.modalService.open(content,{size:'xl'});

  }

  getTargets(){
    this.targetService.getAll2().subscribe((res:any)=>{
      this.targets=res.data
      res.data.forEach((element:any) => {
        //this.dropdownList.push({id:element.id,itemName:element.name})
        this.dropdownList.push({id:element.name,text:element.name})
      });
    },
    (err:any)=>{

    })
  }
  loadMunicipalities(event:any){
    console.log(event)
  this.municipalities=  this.departments.find((el:any)=>el.id == event.target.value).municipalities
  }
  loadDistricts(event:any){
  this.districts=  this.municipalities.find((el:any)=>el.id == event.target.value).districts
  }

  initForm(){
    this.myRequestForm={
      name: undefined,
      name_chief: undefined,
      name_pomoter: undefined,
      firstname_pomoter: undefined,
      phone_pomoter: undefined,
      phone: undefined,
      email: undefined,
      type_cape_id: undefined,
      capacity: undefined,
      targets: undefined,
      firstname_chief: undefined,
      district_id: undefined,
      address: undefined,
      phone_chief: undefined,
      requiredFiles: undefined,
      chief_is_directeor: false,
      department_id: undefined,
      municipality_id: undefined,
      has_aggrement: false,
      aggreement_reference: undefined,
      email_pomoter: undefined,
      email_chief: undefined,
      town: undefined,
      coords: undefined,
      has_consent: undefined,
      nature_promotor_id: undefined,
      aggreement_year: undefined,
      registered_number:undefined,
      registered_date:undefined,
      head_office:undefined,
      social_reason:undefined,
      registered_phone:undefined,
      type_garderies:undefined

    };
  }
}
