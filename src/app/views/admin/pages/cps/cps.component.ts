import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CpsService } from 'src/app/core/services/cps.service';
import { DistrictService } from 'src/app/core/services/district.service';
import { MunicipalityService } from 'src/app/core/services/municipality.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { ConfigService } from 'src/app/core/utils/config-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-cps',
  templateUrl: './cps.component.html',
  styleUrls: ['./cps.component.css']
})
export class CpsComponent implements OnInit {


 


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  municipalities:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false

  role:any
  user:any
  districts:any = [];
  dropdownList:any = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(
    private cpsService:CpsService,
    private dsService:DistrictService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
      private municipalityService:MunicipalityService,
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
      singleSelection: false, 
      text:"Selectionnez les arrondissement",
      selectAllText:'Tous cochés',
      unSelectAllText:'Décochez tous',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };    
  }

  init(){
    this.getAll()
    this.getDistricts()
    this.getMunicipalities()
  }

 
 
  getAll(){
    this.cpsService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.modalService.dismissAll()
      
    },
    (err:any)=>{

    })
  }
  getMunicipalities(){
    this.municipalityService.getAll().subscribe((res:any)=>{
      this.municipalities=res.data
  
    },
    (err:any)=>{

    })
  }
   
  getDistricts(){
    this.dsService.getAll().subscribe((res:any)=>{
      this.districts=res.data
    },
    (err:any)=>{

    })
  }


  store(value:any){
    this.loading=true
    value.collector_id=this.user.collector_id
    this.cpsService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()

    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","CPS",err.error.message)
    })
  }
  update(value:any){
    this.loading=true

    this.cpsService.update(this.selected_data.id,value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      this.loading=false

      console.log(err)
        AppSweetAlert.simpleAlert("error","CPS",err.error.message)
    })
  }
  delete(){
    if(!this.verifyIfElementChecked()) return ;
    let confirmed=AppSweetAlert.confirmBox('info','Suppression','Voulez vous vraiment retirer cet élément?',);
    confirmed.then((result:any)=>{
       if (result.isConfirmed) {
    this.cpsService.delete(this.selected_data.id).subscribe((res:any)=>{
        this.toastrService.success(res.message)
        this.getAll()
    },
    (err:any)=>{
      console.log(err)
        AppSweetAlert.simpleAlert("error","CPS",err.error.message)
    })
  }
})
  }
  checked(el?:any){
    if (el.municipality_id == null) {
      this.toastrService.warning('Veuillez rajouter une commune au cps')
    }
    this.selected_data=el;
    this.is_active=el.is_active
    let fDistricts= this.districts.filter((e:any) =>  e.municipality_id == el.municipality_id)
    console.log(fDistricts)
    fDistricts.forEach((element:any) =>  this.dropdownList.push({id:element.id,itemName:element.name}));

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
  
        this.cpsService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","CPS",err.error.message)
      })
  }
  storeDistricts(value:any){

    this.toastrService.warning("Opération en cours")
  
        this.cpsService.storeDistricts({
          id:this.selected_data.id,
          items: JSON.stringify(this.selectedItems)
        }).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.getAll()
          this.dropdownList=[]
      },
      (err:any)=>{
        console.log(err)
          AppSweetAlert.simpleAlert("error","CPS",err.error.message)
      })
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any) {
    console.log(items);
}
onDeSelectAll(items: any) {
    console.log(items);
}


exportPDF(){
  window.open(ConfigService.toApiUrl('cps/exports/pdf'),'_blank')
}

}
