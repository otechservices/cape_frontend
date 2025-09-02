import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { IgxStepper, IStepChangingEventArgs } from 'igniteui-angular';
import * as JSZip from 'jszip';
import { ToastrService } from 'ngx-toastr';
import { RequestForm } from 'src/app/core/Interfaces/request-form.interface';
import { EServiceService } from 'src/app/core/services/eservice.service';
import { FileService } from 'src/app/core/services/file.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import * as Sg from "slug" 
import { ConfigService } from 'src/app/core/utils/config-service';
import { TypeService } from 'src/app/core/services/type.service';


@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {

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
    type_garderies: undefined,
    social_reason: undefined,
    registered_phone:undefined

  };

  fileInput2:any
  fileInput3:any
  @Input() type:any;

  @Input() tds:any;
  @Input() data:any;
  @Input() data2:any;
  @Input() dropdownList:any;
  @Input() selectedItems:any;
  @Input() dropdownSettings:any;
  municipalities:any;
  districts:any;
  @Input() loading:any;
  imageSrc!: string | SafeResourceUrl | undefined ;
  fileInput:any
  requiredFiles:any[]=[];
  formData= new FormData()
  
@ViewChild('stepper')stepper!:IgxStepper
@ViewChild('fileInp')fileInp!:ElementRef


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
    private typeService:TypeService,
    private eService:EServiceService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    configOffCanvas: NgbOffcanvasConfig,
     private offcanvasService: NgbOffcanvas,
     private toastrService: ToastrService,
     private fileService:FileService,
    // private igxStepperServer:IgxStepper
  ) {
    configOffCanvas.position = 'end';
		configOffCanvas.backdropClass = 'bg-dark';
		configOffCanvas.keyboard = false;

   }

  ngOnInit(): void {
    console.log(this.data2)
    this.municipalities=  this.data.find((el:any)=>el.id == this.data2.district.municipality?.department_id).municipalities
    this.districts=  this.municipalities.find((el:any)=>el.id == this.data2.district.municipality_id).districts

    this.myRequestForm.address=this.data2.address
    this.myRequestForm.name=this.data2.name
    this.myRequestForm.firstname_chief=this.data2.firstname_chief
    this.myRequestForm.firstname_pomoter=this.data2.firstname_pomoter
    this.myRequestForm.name_chief=this.data2.name_chief
    this.myRequestForm.name_pomoter=this.data2.name_pomoter
    this.myRequestForm.chief_is_directeor=this.data2.pomoter_is_director
    this.myRequestForm.capacity=this.data2.capacity
    this.myRequestForm.coords=this.data2.coords
    this.myRequestForm.email_pomoter=this.data2.email_pomoter
    this.myRequestForm.email_chief=this.data2.email_chief
    this.myRequestForm.town=this.data2.town
    this.myRequestForm.email=this.data2.email
    this.myRequestForm.phone=this.data2.phone
    this.myRequestForm.phone_chief=this.data2.phone_chief
    this.myRequestForm.phone_pomoter=this.data2.phone
    this.myRequestForm.department_id=this.data2.district.municipality?.department_id
    this.myRequestForm.municipality_id=this.data2.district.municipality_id
    this.myRequestForm.district_id=this.data2.district_id
    this.myRequestForm.type_cape_id=this.data2.type_cape_id
    this.data2.files.forEach((element:any) => this.requiredFiles.push({
      type:element.file.type_file?.code,
      name:element.file.name,
      file:element.filename,
      hasFilename:true,
      file_id:element.file.id,
      isRequired:element.file.is_required,
      description:element.file.description,
      isSetted:element.filename ?true:false
    }) );

   console.log(this.requiredFiles)
  }
  open(content:any, index:any) {
    if (this.requiredFiles[index].hasFilename) {
      let url =ConfigService.toFile("docs/"+this.data2.code+"/"+this.requiredFiles[index].file);
      console.log(url);

      this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    }else{
      this.readURL(this.requiredFiles[index].file)
    }
		this.offcanvasService.open(content);
	}

  store(){

    this.formData.append("data",JSON.stringify(this.myRequestForm))
    this.formData.append('code',this.data2.code)
  
    let recupFiles=this.requiredFiles.filter((el:any)=>el.hasFilename==false);
      const zip = new JSZip();

      console.log(recupFiles)
      recupFiles.forEach((el:any)=>{
        console.log(el.file)
  
        zip.file(Sg(el.name)+".pdf",el.file, {base64: true});
      })

      if (recupFiles.length > 0) {
        this.formData.append('fileInputs',JSON.stringify(recupFiles))
        zip.generateAsync({type:"blob"}).then((content:any)=>{
          this.formData.append('files',content)
          
          this.loading=true
          this.eService.store(this.formData).subscribe((res:any)=>{
            this.loading=false
      
              this.toastrService.success(res.message)
            this.router.navigate(['/'])
          },
          (err:any)=>{
            this.loading=false
      
              AppSweetAlert.simpleAlert("error","Mise à jour inscription",err.error.message)
          })
        });
      } else {
        this.loading=true
        this.eService.store(this.formData).subscribe((res:any)=>{
          this.loading=false
    
            this.toastrService.success(res.message)
          this.router.navigate(['/'])
        },
        (err:any)=>{
          this.loading=false
    
            AppSweetAlert.simpleAlert("error","Mise à jour inscription",err.error.message)
        })
      }
    
  }
  getFiles(){
    this.fileService.getAll().subscribe((res:any)=>{
      res.data.forEach((element:any) => this.requiredFiles.push({
        name:element.name,
        file:"",
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
  

  loadMunicipalities(event:any){
    console.log(event)
  this.municipalities=  this.data.find((el:any)=>el.id == event.target.value).municipalities
  }
  loadDistricts(event:any){
  this.districts=  this.municipalities.find((el:any)=>el.id == event.target.value).districts
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

upload(event:any, index:any,form1?:NgForm){
  if(event.target.files.length>0){
    this.fileInput=event.target.files[0]
    let current =this.requiredFiles[index];
       current.file=this.fileInput
       current.isSetted=true
       current.hasFilename=false
      this.requiredFiles.slice(index,current)
      console.log(this.requiredFiles)
    //  this.fileInp.nativeElement.resetForm()
  }
} 


  next(){
    this.stepper.activeStepChanging.subscribe((res:any)=>{
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
    console.log(this.stepper)
    this.stepper.next()
   // this.igxStepperServer
  }

  prev(){
    this.stepper.prev()
  }

  verifyStepper1(res:any){

      if (
        this.myRequestForm.name_pomoter == undefined ||
        this.myRequestForm.firstname_pomoter == undefined ||
        this.myRequestForm.phone_pomoter == undefined ||
        this.myRequestForm.email == undefined ||
        this.myRequestForm.phone == undefined
      ) {
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Information du promoteur')

      }else{
        res.cancel=false
      }
  }
  verifyStepper2(res:any){
    if (
      this.myRequestForm.type_cape_id == undefined ||
      this.myRequestForm.name == undefined ||
      this.myRequestForm.capacity == undefined ||
      this.myRequestForm.coords == undefined ||
      this.myRequestForm.name_chief == undefined ||
      this.myRequestForm.firstname_chief == undefined ||
      this.myRequestForm.phone_chief == undefined ||
      this.selectedItems.length ==0
    ) {
      res.cancel=true
      this.toastrService.warning('Veuillez remplir tous les champes requis','Information du promoteur')

    }else{
      this.myRequestForm.targets=this.selectedItems
      res.cancel=false
    }
  }
  verifyStepper3(res:any){
    if (
      this.myRequestForm.address == undefined  ||
      this.myRequestForm.district_id == undefined 
    ) {
      res.cancel=true
      this.toastrService.warning('Veuillez remplir tous les champes requis','Information du promoteur')

    }else{
      this.myRequestForm.targets=this.selectedItems
      res.cancel=false
    }
  }
  verifyStepper4(res:any){
    if (this.requiredFiles.findIndex((el:any)=>el.isSetted==false) != -1) {
      this.toastrService.warning('Toutes les pièces sont requises !','Document Joint')

      res.cancel=true
   }else{
    res.cancel=false

   }

    if (
      this.myRequestForm.address == undefined  ||
      this.myRequestForm.district_id == undefined 
    ) {
      res.cancel=true
      this.toastrService.warning('Veuillez remplir tous les champes requis','Information du promoteur')

    }else{
      this.myRequestForm.targets=this.selectedItems
      res.cancel=false
    }
  }

  changed(avent:any){
    if (this.myRequestForm.chief_is_directeor) {
        this.myRequestForm.name_chief=this.myRequestForm.name_pomoter
        this.myRequestForm.firstname_chief=this.myRequestForm.firstname_pomoter
    }else{

    }
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

  changed2(event:any){
 
  }
  upload2(event:any){
    this.fileInput2=event.target.files[0]
  
  }
  
  upload3(event:any){
    if(event.target.files.length>0){
      this.fileInput3=event.target.files[0]
    }
  }

  filterByType(type:any){
    return this.requiredFiles.filter((el:any) => el.type==type)
  }



  getImageUrl(){
    let url=ConfigService.toFile("docs/"+this.data2.code+"/"+this.data2.zone_file);
    return url
  }
}
