import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as JSZip from 'jszip';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/core/services/department.service';
import { EServiceService } from 'src/app/core/services/eservice.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { TargetService } from 'src/app/core/services/target.service';
import { TypeDataService } from 'src/app/core/services/TypeDataService';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import * as Sg from "slug" 
import { ActivatedRoute, Router } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/core/utils/config-service';
import * as $ from "jquery"
import { FileService } from 'src/app/core/services/file.service';
import { IgxStep, IgxStepper, IStepChangingEventArgs } from 'igniteui-angular';
import { IgxStepperService } from 'igniteui-angular/lib/stepper/stepper.service';
import { RequestForm } from 'src/app/core/Interfaces/request-form.interface';
import { NaturePromotorService } from 'src/app/core/services/nature-promotor.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  data:any[]=[];
  data2:any;
  municipalities:any[]=[];
  districts:any[]=[];
  tds:any[]=[];
  nps:any[]=[];
  targets:any[]=[];
  fileInput:any
  fileInputs:any[]=[]
  dropdownList:any = [];
  selectedItems :any[]= [];
  dropdownSettings = {};
  formData= new FormData()
  values:{[k: string]: any} = {};
  loading=false
  code:any
  token:any
  url:SafeResourceUrl | undefined 
  imageSrc!: string | SafeResourceUrl | undefined ;
  requiredFiles:any[]=[];
  myRequestForm!:RequestForm
  public innerWidth: any;
  type:string  | null  ="cape"

  constructor(
    private departmentService:DepartmentService,
    private eService:EServiceService,
    private tdService:TypeDataService,
    private targetService:TargetService,
    private toastrService:ToastrService,
    private router:Router,
    private fileService:FileService,
    private activatedRoute:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    private npService:NaturePromotorService,
    configOffCanvas: NgbOffcanvasConfig, private offcanvasService: NgbOffcanvas
  ) {
    configOffCanvas.position = 'end';
		configOffCanvas.backdropClass = 'bg-dark';
		configOffCanvas.keyboard = false;

    $('#myCanvas').css('width','90vw')
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

  ngOnInit(): void {
    //this.innerWidth = window.innerWidth;
    this.innerWidth = '1000';
    this.token=this.activatedRoute.snapshot.paramMap.get('token')
    this.code=this.activatedRoute.snapshot.paramMap.get('code')

    
      if(this.code!=undefined){
        this.type = this.code.split('-')[0].toLowerCase()
        console.log(this.type)

      }
    this.activatedRoute.paramMap.subscribe(params => {
      if(this.code==undefined){
      this.type=this.activatedRoute.snapshot.paramMap.get('type')
      }
     
    })

   
    this.getDepartmentWithRelations()
    this.getTargets()
    this.getTypeData()
    this.getNaturePromotors()
    

   /* this.dropdownSettings = { 
      singleSelection: false, 
      text:"Sélectionnez les cibles",
      selectAllText:'Tous cochés',
      unSelectAllText:'Décochez tous',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };   */ 
    this.dropdownSettings = { 
      width:'1000',
      multiple: true,
      tags: true
    };    
  }

  getDepartmentWithRelations(){
    this.departmentService.getDepartmentWithRelation().subscribe((res:any)=>{
      this.data=res.data
      if (this.token!=undefined && this.code!=undefined) {
        this.eService.get(this.token,this.code).subscribe((res:any)=>{
          this.data2=res.data
          this.selectedItems= JSON.parse(this.data2.target)
          this.municipalities=this.data.find((el:any)=>el.id ==this.data2.district.municipality.department.id).municipalities
          this.districts=this.municipalities.find((el:any)=>el.id ==this.data2.district.municipality.id).districts
  
          res.data.files.forEach((element:any) => this.requiredFiles.push({
            name:element.file.name,
            file:element.filename,
            hasFilename:true,
            file_id:element.file.id,
            isRequired:element.file.is_required,
            description:element.file.description,
            isSetted:element.filename ?true:false
          }) );
        },
        (err:any)=>{
    
        })
      }else{
      //  this.getFiles()
  
      }
    },
    (err:any)=>{

    })
  }
  getTypeData(){
    this.tdService.getAll2().subscribe((res:any)=>{
      this.tds=res.data
    },
    (err:any)=>{

    })
  }
  getFiles(){
    this.fileService.getAll(this.type).subscribe((res:any)=>{
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
  getNaturePromotors(){
    this.npService.getAll2().subscribe((res:any)=>{
      this.nps=res.data

    },
    (err:any)=>{

    })
  }


  loadMunicipalities(event:any){
    console.log(event)
  this.municipalities=  this.data.find((el:any)=>el.id == event.target.value).municipalities
  }
  loadDistricts(event:any){
  this.districts=  this.municipalities.find((el:any)=>el.id == event.target.value).districts
  }

  upload(event:any, index:any){
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
      let current =this.requiredFiles[index];
         current.file=this.fileInput
         current.isSetted=true
         current.hasFilename=false
        this.requiredFiles.slice(index,current)
        console.log(this.requiredFiles)
    }
  } 

  addFile(value:any,form:NgForm){
    this.fileInputs.push({
      file_id:value.file_id,
      reference:value.reference,
      file:this.fileInput
    })
    form.resetForm()
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

  store(){
    if (this.token!=undefined && this.code!=undefined) {
      this.formData.append('code',this.code)
    }

   for (const key in this.values) {
      if (Object.prototype.hasOwnProperty.call(this.values, key)) {
        const element = this.values[key];
        if (key == "selectedItems") {
          this.formData.append('targets',JSON.stringify(this.selectedItems))

        }else{
          this.formData.append(key,element)
        }
      }
    }
   if (this.requiredFiles.findIndex((el:any)=>el.isSetted==false) != -1) {
      AppSweetAlert.simpleAlert("error","Document Joint","Toutes les pièces sont requises !")
      return;
   }


   let recupFiles=this.requiredFiles.filter((el:any)=>el.hasFilename==false);

    if (recupFiles.length>0) {
      const zip = new JSZip();
      console.log(this.fileInputs)
      recupFiles.forEach((el:any)=>{
        console.log(el.file)
  
        zip.file(Sg(el.name)+".pdf",el.file, {base64: true});
      })
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
    
            AppSweetAlert.simpleAlert("error","Inscription",err.error.message)
        })
      });
    }else{
      this.eService.store(this.formData).subscribe((res:any)=>{
        this.loading=false
  
          this.toastrService.success(res.message)
        this.router.navigate(['/'])
      },
      (err:any)=>{
        this.loading=false
  
          AppSweetAlert.simpleAlert("error","Inscription",err.error.message)
      })
    }




  }

  storeOne(value:any, stepper:any){

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
       this.values[key]=element
      }
    }

    stepper.next()
  }

  getTCName(id:any){
    this.tds.find((el:any) => el.id == id)?.name
  }

  
  showFile(filename:any){

    let url=ConfigService.toFile("docs/"+this.data2.code+"/"+filename);
    this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
 }
 readURL(file: File): void {
      const reader = new FileReader();
      reader.onload = e =>{
       let src = reader.result as string
        this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(src)

      };
      reader.readAsDataURL(file);
  
}

  
trackByFn(index:any, item:any) {
  return item.isSetted; 
}

public handleActiveStepChanging(event: any) {
  console.log(event)
 }
 

 @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = window.innerWidth;
   
  }

}



