import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {  IStepChangingEventArgs } from 'igniteui-angular';
import * as JSZip from 'jszip';
import { ToastrService } from 'ngx-toastr';
import { Subscription, filter } from 'rxjs';
import { RequestForm } from 'src/app/core/Interfaces/request-form.interface';
import { EServiceService } from 'src/app/core/services/eservice.service';
import { FileService } from 'src/app/core/services/file.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';
import * as Sg from "slug" 
import { TypeService } from 'src/app/core/services/type.service';
import { TypeSousGarderieService } from 'src/app/core/services/type-sous-garderie.service';
import { TypeGarderieService } from 'src/app/core/services/type-garderie.service';
import { FileService as myFileService} from 'src/app/core/utils/file-service';
import * as uuid from 'uuid';


@Component({
  selector: 'app-new-request-garderie',
  templateUrl: './new-request-garderie.component.html',
  styleUrls: ['./new-request-garderie.component.css']
})
export class NewRequestGarderieComponent implements OnInit {

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
    aggreement_year: undefined,
    nature_promotor_id: undefined,
    registered_number: undefined,
    registered_date: undefined,
    head_office: undefined,
    type_garderies: undefined,
    social_reason: undefined,
    registered_phone:undefined

  };
  @Input() tds:any;
 // @Input() nps:any;
  @Input() data:any;
  @Input() dropdownList:any;
  @Input() selectedItems:any;
  @Input() dropdownSettings:any;
  @Input() loading:any;
  @Input() type:any;


  dropdownList2:any[]=[];
  selectedItems2:any

  municipalities:any;
  districts:any;
  imageSrc!: string | SafeResourceUrl | undefined ;
  fileInput:any
  fileInput2:any
  fileInput3:any
  fileInput4:any
  fileInput5:any
  requiredFiles:any[]=[];
  tgs:any[]=[];
  tsgs:any[]=[];
  formData= new FormData()
  last_step=-1;
  service_id:any;
  is_stored=false;

@ViewChild("reqTop") reqTop!: ElementRef<HTMLElement>;
@ViewChild('stepper')stepper!:any
@ViewChild('fileInp')fileInp!:ElementRef
 initCode:any;

subscription: Subscription | undefined;
pageReloading: boolean = false;

nps=[
  {
    id:1,
    name:'Personne physique'
  },
  {
    id:2,
    name:'Personne morale'
  }
]




  constructor(
    private tgService:TypeGarderieService,
    private typeService:TypeService,
    private eService:EServiceService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    configOffCanvas: NgbOffcanvasConfig,
     private offcanvasService: NgbOffcanvas,
     private toastrService: ToastrService,
     private fileService:FileService,
     private lsService:LocalStorageService
    // private igxStepperServer:IgxStepper
  ) {
    configOffCanvas.position = 'end';
		configOffCanvas.backdropClass = 'bg-dark';
		configOffCanvas.keyboard = false;

    
		router.events
    .pipe(
      filter(
        ( event: any ) => {
            alert()
          return( event instanceof NavigationStart );

        }
      )
    )
   }
   setServiceId(){
    this.typeService.getAll2().subscribe((res:any)=>{
      res.data.forEach((element:any) => {
        console.log(this.type)
        console.log(element)
        if(element.name.toLowerCase().includes(this.type.toLowerCase()))this.service_id=element.id
      });
      console.log(this.service_id)

    })

  }


  getTypeGarderies(){
    this.tgService.getAll2().subscribe((res:any)=>{
      this.tgs=res.data
      this.tgs.forEach((el:any)=>{
        this.dropdownList2.push({
          id:el.id,
          itemName:el.name
        })
      })
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] != undefined) {
      if (changes['data'].currentValue.length !=0) {
           if(this.myRequestForm.department_id != undefined)  this.municipalities=  this.data.find((el:any)=>el.id == parseInt(this.myRequestForm.department_id)).municipalities
          if(this.myRequestForm.municipality_id != undefined)   this.districts=  this.municipalities.find((el:any)=>el.id == this.myRequestForm.municipality_id).districts

      }
    }
  }
  ngOnDestroy(): void {
    if (this.myRequestForm.nature_promotor_id != undefined && !this.is_stored) {
          AppSweetAlert.confirmBox2('warning','Enregistrement de CAPE','Vous étiez en train d\'enregistrer des données, voulez vous concerver les données saisies?').then((result:any)=>{
      if(result.value){
        this.lsService.set(GlobalName.reqName,JSON.stringify(this.myRequestForm))
      }else{
        this.lsService.remove(GlobalName.reqName)

      }
    })
    }

    this.eService.purgeFile({init_code:this.initCode}).subscribe((res:any)=>{ },)

  }

  ngOnInit(): void {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
     this.myRequestForm.coords=`${position.coords.latitude},${position.coords.longitude}` 
    });
  }

  
    this.myRequestForm.has_aggrement=false
    this.getFiles()
    let checkInstance= this.lsService.get(GlobalName.reqName)
 if(checkInstance!=null){
      this.myRequestForm=JSON.parse(checkInstance)
      console.log(this.myRequestForm)

   
    }
    this.setServiceId()
    this.getTypeGarderies()
    if (this.initCode==undefined) {
      this.initCode=uuid.v4()
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams: { initCode:this.initCode},
          queryParamsHandling: 'merge'
        }
      );
    }
  }



  store(){
    if (this.myRequestForm.has_aggrement) {
      this.formData.append("file_aggreement",this.fileInput2)

    }

    // if(this.selectedItems2.length != 0){
    //   this.formData.append('type_garderies',JSON.stringify(this.selectedItems2))
    // }

    this.formData.append("data",JSON.stringify(this.myRequestForm))
    this.formData.append('service_id',this.service_id)
    let recupFiles=this.requiredFiles.filter((el:any)=>el.isSetted==true);
    console.log(recupFiles)
      // const zip = new JSZip();
      // recupFiles.forEach((el:any)=>{
      //   console.log(el.file)
  
      //   zip.file(Sg(el.name)+".pdf",el.file, {base64: true});
      // })

      if (this.fileInput3 != undefined) {
        this.formData.append('zone_file',this.fileInput3)
      }
      if (this.fileInput4 != undefined) {
        this.formData.append('consent_file',this.fileInput4)
      }
      if (this.fileInput5 != undefined) {
        this.formData.append('registered_proof',this.fileInput5)
      }
     // this.formData.append('fileInputs',JSON.stringify(recupFiles))
    //  zip.generateAsync({type:"blob"}).then((content:any)=>{
     //   this.formData.append('files',JSON.stringify(recupFiles))
     this.formData.append('init_code',this.initCode)

        this.loading=true
        this.eService.store(this.formData).subscribe((res:any)=>{
          this.loading=false
    
            this.toastrService.success(res.message)
            this.lsService.remove(GlobalName.reqName)
            this.is_stored=true
          this.router.navigate(['/'])
        },
        (err:any)=>{
          this.loading=false
    
            AppSweetAlert.simpleAlert("error","Nouvelle inscription",err.error.message)
        })
     // });
  }
  getFiles(){
    this.fileService.getAll(this.type).subscribe((res:any)=>{
      res.data.forEach((element:any) => this.requiredFiles.push({
        type:element.type_file?.code,
        name:element.name,
        file:"",
        file64:"",
        file_id:element.id,
        isRequired:element.is_required,
        description:element.description,
        isSetted:false,
        hasFilename:false
      }) );
    },
    (err:any)=>{

    })
  }


  trackByFn(index:any, item:any) {
    console.log(index,item)
    return item.isSetted; 
  }
  

  loadMunicipalities(event:any,id?:any){
    console.log(event)
  this.municipalities=  this.data.find((el:any)=>el.id == event.target.value).municipalities
  }
  loadDistricts(event:any){
  this.districts=  this.municipalities.find((el:any)=>el.id == event.target.value).districts
  }
  loadTypeSousCategories(event:any){
  this.tsgs=  this.tgs.find((el:any)=>el.id == event.target.value).sg
  }


  
  open(content:any, index:any) {
    this.readURL(this.requiredFiles[index].file)
		this.offcanvasService.open(content);
	}
  open2(content:any, fileId:any) {
    let check =this.requiredFiles.find((el:any)=>el.file_id==fileId)
    if (check== undefined) {
      this.toastrService.error("Impossible d'ouvrir le fichier")
    } else {
      this.readURL(check.file)
		  this.offcanvasService.open(content);
    }
    
	}
  readURL(file: File): void {
    const reader = new FileReader();
    reader.onload = e =>{
     let src = reader.result as string
      this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(src)

    };
    reader.readAsDataURL(file);

}

removeFile(i:any){
  //this.fileInputs.splice(i,1)
  AppSweetAlert.confirmBox("error","Document joint","Voulez vous retier cette pièce ?").then((result:any)=>{
    if (result.isConfirmed) {
      this.requiredFiles[i].file="",
      this.requiredFiles[i].isSetted=false
    }
  })
 
}

  async upload(event:any, index:any){
    if(this.initCode==undefined || this.initCode==null){
      this.toastrService.warning('Une erreur est survenue. Veuillez recharger la page svp!')
      return;
    }
  if(event.target.files.length>0){
    this.fileInput=event.target.files[0]
    let current =this.requiredFiles[index];
       current.file=this.fileInput
       current.isSetted=true
       current.file64=await myFileService.fromArrayBufferToBase64(await myFileService.readFileAsync(this.fileInput))
       current.hasFilename=false
     // this.requiredFiles.slice(index,current)
     // console.log(this.requiredFiles)
    //  this.fileInp.nativeElement.resetForm()
    let formData= new FormData()
    formData.append('reference',current.name)
    formData.append('file_id',current.file_id)
    formData.append('init_code',this.initCode)
    formData.append('file',this.fileInput)
    this.eService.addFile(formData).subscribe((res:any)=>{  this.requiredFiles.slice(index,current)},)
  }
} 

upload2(event:any){
  this.fileInput2=event.target.files[0]

}

upload3(event:any){
  if(event.target.files.length>0){
    this.fileInput3=event.target.files[0]
  }
}
upload4(event:any){
  if(event.target.files.length>0){
    this.fileInput3=event.target.files[0]
  }
}
upload5(event:any){
  if(event.target.files.length>0){
    this.fileInput5=event.target.files[0]
  }
}
  next(){
    this.stepper.activeStepChanging.subscribe((res:any)=>{
        this.last_step=res.newIndex
      if (res.newIndex >  res.oldIndex) {
       
        switch (res.oldIndex) {

        case 0:
       
            this.verifyStepper1(res)

        
          break;
        case 1:
            this.verifyStepper2(res)
          break;
        case 2:
            this.verifyStepper3(res)
          break;
        case 3:
            this.verifyStepper4(res)
          break;
      
        default:
          this.stepper.navigateTo(0)
          break;
      }
    } 
    })
   // alert(this.last_step);
    if ((this.myRequestForm.chief_is_directeor && this.last_step==-1) ||( this.myRequestForm.nature_promotor_id==2 && this.last_step==-1)) {
      
      this.stepper.navigateTo(2)

    }
    this.stepper.next()
    this.reqTop.nativeElement.scrollIntoView()
  }

  prev(){

    this.stepper.prev()
  }

  verifyStepper1(res:any){


      if (
      (  this.myRequestForm.nature_promotor_id==1 && (
        this.myRequestForm.name_pomoter == undefined ||
        this.myRequestForm.firstname_pomoter == undefined ||
        this.myRequestForm.phone_pomoter == undefined ||
        this.myRequestForm.email_pomoter == undefined ||
        this.verifiedFiles("DP")==false))
        ||
        (  this.myRequestForm.nature_promotor_id==2 && (
          this.myRequestForm.name_pomoter == undefined ||
          this.myRequestForm.social_reason == undefined ||
        this.myRequestForm.firstname_pomoter == undefined ||
        this.myRequestForm.phone_pomoter == undefined ||
        this.myRequestForm.email_pomoter == undefined ||
        this.verifiedFiles("DP")==false||
          this.myRequestForm.name_pomoter == undefined ||
          this.myRequestForm.registered_number == undefined ||
          this.myRequestForm.registered_date == undefined ||
          this.myRequestForm.registered_phone == undefined ||
          this.myRequestForm.head_office == undefined ))
      ) {
       
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Information du promoteur')

      }else{
        if (!this.isValidEmail(this.myRequestForm.email_pomoter)) {
          res.cancel=true
          this.toastrService.warning('Veuillez insérer un email valide','Email validation')
  
        }else{
          if ( this.myRequestForm.has_consent) {
            if (this.myRequestForm.chief_is_directeor || this.myRequestForm.nature_promotor_id==2) {
              this.myRequestForm.name_chief=this.myRequestForm.name_pomoter
              this.myRequestForm.firstname_chief=this.myRequestForm.firstname_pomoter
              this.myRequestForm.phone_chief=this.myRequestForm.phone_pomoter
              this.myRequestForm.email_chief=this.myRequestForm.email_pomoter
          }else{
            this.last_step=-1
          }
         
          res.cancel=false
          } else {
            res.cancel=true
            this.toastrService.warning('Vous devriez donner votre consentement','Information du promoteur')
    
          }
        
        }
      
      }
  }
  verifyStepper2(res:any){
    console.log(
      this.verifiedFiles("DD"))
      if (this.myRequestForm.chief_is_directeor) {
        if (
          this.myRequestForm.name_chief == undefined ||
          this.myRequestForm.firstname_chief == undefined ||
          this.myRequestForm.phone_chief == undefined ||
          this.myRequestForm.email_chief == undefined 
        ) {
          res.cancel=true
          this.toastrService.warning('Veuillez remplir tous les champes requis','Information du promoteur')
    
        }else{
          if ( !this.isValidEmail(this.myRequestForm.email_chief)) {
            res.cancel=true
            this.toastrService.warning('Veuillez insérer un email valide','Email validation')
    
          }else{
          this.myRequestForm.targets=this.selectedItems
          res.cancel=false
          }
        }
      } else {
        if (
          this.myRequestForm.name_chief == undefined ||
          this.myRequestForm.firstname_chief == undefined ||
          this.myRequestForm.phone_chief == undefined ||
          this.myRequestForm.email_chief == undefined ||
          this.verifiedFiles("DD")==false
        ) {
          res.cancel=true
          this.toastrService.warning('Veuillez remplir tous les champes requis','Information du promoteur')
    
        }else{
          if ( !this.isValidEmail(this.myRequestForm.email_chief)) {
            res.cancel=true
            this.toastrService.warning('Veuillez insérer un email valide','Email validation')
    
          }else{
          this.myRequestForm.targets=this.selectedItems
          res.cancel=false
          }
        }
      }
   
  }
  verifyStepper3(res:any){
    console.log(this.selectedItems)
    if (
     
      this.myRequestForm.name == undefined ||
      this.myRequestForm.capacity == undefined ||
      this.myRequestForm.coords == undefined ||
      this.myRequestForm.name == undefined ||
      //this.myRequestForm.firstname_chief == undefined ||
      this.myRequestForm.phone == undefined ||
      this.myRequestForm.email == undefined ||
      this.selectedItems2.length == 0 ||
  
      this.myRequestForm.address == undefined  ||
      this.myRequestForm.district_id == undefined ||
      this.verifiedFiles("DC")==false

    ) {
      res.cancel=true
      this.toastrService.warning('Veuillez remplir tous les champes requis','Information du Centre')

    }else{
      if ( !this.isValidEmail(this.myRequestForm.email)) {
        res.cancel=true
        this.toastrService.warning('Veuillez insérer un email valide','Email validation')

      }else{
      this.myRequestForm.targets=this.selectedItems
      this.myRequestForm.type_garderies=this.selectedItems2
      
      res.cancel=false

      }
    }
  }
  verifyStepper4(res:any){
   /* if (this.requiredFiles.findIndex((el:any)=>el.isSetted==false) != -1) {
      this.toastrService.warning('Toutes les pièces sont requises !','Document Joint')

      res.cancel=true
   }else{
    res.cancel=false

   }*/


  }

  changed(avent:any){
   /* if (this.myRequestForm.chief_is_directeor) {
        this.myRequestForm.name_chief=this.myRequestForm.name_pomoter
        this.myRequestForm.firstname_chief=this.myRequestForm.firstname_pomoter
        this.myRequestForm.phone_chief=this.myRequestForm.phone_pomoter
        this.myRequestForm.email_chief=this.myRequestForm.email_pomoter
    }else{

    }*/
  }

  changed2(event:any){
 
  }


  public handleActiveStepChanging(event: IStepChangingEventArgs) {
    if (event.newIndex >  event.oldIndex) {

    switch (event.oldIndex) {

      case 0:
          this.verifyStepper1(event)
        break;
      case 1:
          this.verifyStepper2(event)
        break;
      case 2:
          this.verifyStepper3(event)
        break;
      case 3:
          this.verifyStepper4(event)
        break;
    
      default:
        this.stepper.navigateTo(0)
        break;
    }
  }
   }

   getTCName(id:any){
    return this.tds.find((el:any) => el.id == id)?.name
  }
   getDepartName(id:any){
    return this.data.find((el:any) => el.id == id)?.name
  }
   getMunicipName(id:any){
    if (this.municipalities != undefined) {
      return this.municipalities!.find((el:any) => el.id == id)?.name

    }else{
      return "";
    }
  }
   getDistrictName(id:any){
    if (this.districts != undefined) {
      return this.districts!.find((el:any) => el.id == id)?.name

    }else{
      return "";
    }
  }


  filterByType(type:any){
    console.log(this.requiredFiles)
    return this.requiredFiles.filter((el:any) => el.type==type && el.isRequired == true)
  }

  verifiedFiles(type:any){
    let files= this.filterByType(type)
    let notSetted= files.filter((el:any)=>el.isSetted==false);

    return notSetted.length >0 ? false:true
  }

  checkControl(){
    //this.dropdownList=this.dropdownList2
  }


  public isValidEmail(emailString: string): boolean {
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      let valid = pattern.test(emailString);
      return valid;
    } catch (TypeError) {
      return false;
    }
  }
}
