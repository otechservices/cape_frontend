import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/core/services/department.service';
import { EServiceService } from 'src/app/core/services/eservice.service';
import { FileService } from 'src/app/core/services/file.service';
import { NaturePromotorService } from 'src/app/core/services/nature-promotor.service';
import { TargetService } from 'src/app/core/services/target.service';
import { TypeService } from 'src/app/core/services/type.service';
import { TypeDataService } from 'src/app/core/services/TypeDataService';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';
import { FileService as myFileService} from 'src/app/core/utils/file-service';
import { GlobalName } from 'src/app/core/utils/global-name';
import * as uuid from 'uuid';
import { RequeteService } from 'src/app/core/services/requete.service';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-inscription-cape',

  templateUrl: './inscription-cape.component.html',
  styleUrl: './inscription-cape.component.css', 
  encapsulation:ViewEncapsulation.None
})
export class InscriptionCapeComponent  implements OnInit{
  currentStep = 1;
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  requiredFiles:any[]=[];
  imageSrc!: string | SafeResourceUrl | undefined ;
    @ViewChild('previewContent')previewContent:any
  dossier:any
  type:string="cape"
  formData: FormGroup;
    fileInput2:any
    fileInput3:any
  fileInput4:any
  fileInput5:any
  initCode:any;
  user:any
  role:any
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
    values:{[k: string]: any} = {};
    loading=false
    code:any
    token:any
    url:SafeResourceUrl | undefined
    public innerWidth: any;
  service_id:any;
  is_stored=false;
  geoLoading=false;
  geoError:string|null=null;
  imageSiteSrc: string | SafeResourceUrl | undefined;
  steps = [
    { number: 1, title: 'Informations promoteur', icon: 'ri-user-line' },
    { number: 2, title: 'Informations directeur', icon: 'ri-briefcase-line' },
    { number: 3, title: 'Informations centre', icon: 'ri-building-line' },
    { number: 4, title: 'Récapitulatif', icon: 'ri-check-line' }
  ];

  constructor(
    private fb: FormBuilder,
      private departmentService:DepartmentService,
      private tdService:TypeDataService,
      private targetService:TargetService,
      private npService:NaturePromotorService,
      private typeService:TypeService,
      private eService:EServiceService,
      private reqService:RequeteService,
      private router:Router,
      private activatedRoute:ActivatedRoute,
      private _sanitizationService: DomSanitizer,
      configOffCanvas: NgbOffcanvasConfig,
       private offcanvasService: NgbOffcanvas,
       private toastrService: ToastrService,
       private fileService:FileService,
       private lsService:LocalStorageService
  ) {
    this.formData = this.fb.group({
      code: [null],
      //Infos promoteur
      nature_promotor_id: [null, Validators.required],
      social_reason: [''],
      head_office: [''],
      registered_phone: [''],
      registered_number: [''],
      registered_date: [''],
      name_pomoter: ['', Validators.required],
      firstname_pomoter: ['', Validators.required],
      email_pomoter: ['', [Validators.required, Validators.email]],
      phone_pomoter: ['', Validators.required],
      chief_is_directeor: [false],
      has_aggrement:[false],
      aggreement_reference:[''],
      aggreement_year:[''],
      has_consent: [false, Validators.requiredTrue],



      name_chief: ['', [Validators.required, Validators.maxLength(100)]],
      firstname_chief: ['', [Validators.required, Validators.maxLength(100)]],
      phone_chief: ['', [Validators.required, Validators.maxLength(20)]],
      email_chief: ['', [Validators.required, Validators.email]],
      consentFile: [null, Validators.required],


            type_cape_id: [null, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      capacity: [null, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      targets: [[], Validators.required], // Multiselect

      // Localisation
      department_id: [null, Validators.required],
      municipality_id: [null, Validators.required],
      district_id: [null, Validators.required],
      town: ['', [Validators.required, Validators.maxLength(255)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      coords: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  
    this.user=this.lsService.get(GlobalName.userName)
    this.role=this.user.roles[0]?.name
                    console.log(this.user)

    this.token=this.activatedRoute.snapshot.paramMap.get('token')
    this.code=this.activatedRoute.snapshot.paramMap.get('code')

      if(this.code!=undefined){
        this.type = this.code.split('-')[0].toLowerCase()
        console.log(this.type)
      }


    this.requestGeolocation(true);
        
         // this.formData.has_aggrement=false
          let checkInstance= this.lsService.get(`${GlobalName.reqName}-${this.user.code}`)
       if(checkInstance!=null){
            this.formData=JSON.parse(checkInstance)
            console.log(this.formData)
          }
      
          this.setServiceId()
      
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

           this.activatedRoute.paramMap.subscribe(params => {
                  
                  this.formData.patchValue({
                name_pomoter: this?.user?.promoter?.lastname,
                firstname_pomoter: this?.user?.promoter?.firstname,
                email_pomoter: this?.user?.promoter?.email,
                phone_pomoter:this?.user?.promoter?.phone
              });
            if(this.initCode!=undefined){
              this.getDepartmentWithRelations()
              this.getTargets()
              this.getTypeData()
              this.getNaturePromotors()
              this.getFiles()
                }
              
              })
 


  }


  get(){
    this.reqService.get(this.code).subscribe((res:any)=>{
      this.dossier=res
      this.loadMunicipalities(res.district?.municipality?.department_id)
      this.loadDistricts(res.district?.municipality_id)

      let parsedTargets: any[] = []
      try {
        if (Array.isArray(res.target)) {
          parsedTargets = res.target
        } else if (res.target) {
          parsedTargets = JSON.parse(res.target)
        }
      } catch { parsedTargets = [] }

      this.formData.patchValue({
        code: this.code,
        // Infos promoteur
        nature_promotor_id: res.nature_promotor_id,
        social_reason: res.social_reason,
        head_office: res.head_office,
        registered_phone: res.registered_phone,
        registered_number: res.registered_number,
        registered_date: res.registered_date,

        name_pomoter: res.name_pomoter,
        firstname_pomoter: res.firstname_pomoter,
        email_pomoter: res.email_pomoter,
        phone_pomoter: res.phone_pomoter,

        chief_is_directeor: (res.name_pomoter == res.name_chief && res.firstname_pomoter == res.firstname_chief),
        has_aggrement: res.has_agreemant == 1 || res.has_agreemant === true,
        aggreement_reference: res.aggreement_reference,
        aggreement_year: res.aggreement_year,
        has_consent: res.has_consent == 1 || res.has_consent === true,

        name_chief: res.name_chief,
        firstname_chief: res.firstname_chief,
        phone_chief: res.phone_chief,
        email_chief: res.email_chief,

        consentFile: null,

        // Infos CAPE
        type_cape_id: res.type_cape_id,
        name: res.name,
        capacity: res.capacity,
        email: res.email,
        phone: res.phone,
        targets: parsedTargets,

        // Localisation
        department_id: res.district?.municipality?.department_id,
        municipality_id: res.district?.municipality_id,
        district_id: res.district_id,
        town: res.town,
        address: res.address,
        coords: res.coords
      });
    },
    (err:any)=>{})
  }

  upload2(event:any){
  this.fileInput2=event.target.files[0]

}

    getDepartmentWithRelations(){
    this.departmentService.getDepartmentWithRelation().subscribe((res:any)=>{
      this.data=res.data
      if (this.token != null && this.token != undefined && this.code != null && this.code != undefined) {
        this.eService.get(this.token,this.code).subscribe((res:any)=>{
          this.data2=res.data
          this.selectedItems= JSON.parse(this.data2.target)
          this.municipalities=this.data.find((el:any)=>el.id ==this.data2.district.municipality.department.id)?.municipalities ?? []
          this.districts=this.municipalities.find((el:any)=>el.id ==this.data2.district.municipality.id)?.districts ?? []

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
        (err:any)=>{})
      } else {
        // Mode MAJ direct depuis mes-dossiers : déclencher get() ici,
        // après que this.data est prêt, pour éviter la race condition
        if (this.code != null && this.code != undefined) {
          this.get()
        }
      }
    },
    (err:any)=>{})
  }


  upload3(event:any){
    if(event.target.files.length>0){
      this.fileInput3=event.target.files[0]
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSiteSrc = this._sanitizationService.bypassSecurityTrustResourceUrl(reader.result as string);
      };
      reader.readAsDataURL(this.fileInput3);
    }
  }

  loadMunicipalities(event:any){
    const dept = this.data.find((el:any)=>el.id == event)
    this.municipalities = dept?.municipalities ?? []
  }
  loadDistricts(event:any){
    const mun = this.municipalities.find((el:any)=>el.id == event)
    this.districts = mun?.districts ?? []
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


  getTypeData(){
    this.tdService.getAll2().subscribe((res:any)=>{
      this.tds=res.data
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


  

validateStep(step: number): boolean {
  switch (step) {
    case 1:

    if (this.formData.get('chief_is_directeor')?.value === true) {
      this.formData.patchValue({
        name_chief: this.formData.get('name_pomoter')?.value,
        firstname_chief: this.formData.get('firstname_pomoter')?.value,
        phone_chief: this.formData.get('phone_pomoter')?.value,
        email_chief: this.formData.get('email_pomoter')?.value
      });
    }
      // Informations promoteur
      return this.formData.get('nature_promotor_id')?.valid &&
             this.formData.get('name_pomoter')?.valid &&
             this.formData.get('firstname_pomoter')?.valid &&
             this.formData.get('email_pomoter')?.valid &&
             this.formData.get('phone_pomoter')?.valid &&
             (this.formData.get('nature_promotor_id')?.value != 2 || (
                this.formData.get('social_reason')?.valid &&
                this.formData.get('head_office')?.valid &&
                this.formData.get('registered_phone')?.valid &&
                this.formData.get('registered_number')?.valid &&
                this.formData.get('registered_date')?.valid
             )) ? true : false;

    case 2:
      // Informations directeur
      return this.formData.get('name_chief')?.valid &&
             this.formData.get('firstname_chief')?.valid &&
             this.formData.get('phone_chief')?.valid &&
             this.formData.get('email_chief')?.valid ? true : false;

    case 3:
      // Informations du centre
      return this.formData.get('type_cape_id')?.valid &&
             this.formData.get('name')?.valid &&
             this.formData.get('capacity')?.valid &&
             this.formData.get('email')?.valid &&
             this.formData.get('phone')?.valid &&
             this.formData.get('targets')?.valid &&
             this.formData.get('department_id')?.valid &&
             this.formData.get('municipality_id')?.valid &&
             this.formData.get('district_id')?.valid &&
             this.formData.get('town')?.valid &&
             this.formData.get('address')?.valid &&
             this.formData.get('coords')?.valid ? true : false;

    case 4:
      // Consentement et fichiers (optionnel : tu peux ajouter la vérification de has_consent si nécessaire)
      return this.formData.get('has_consent')?.valid ? true : false;

    default:
      return true;
  }
}


  nextStep() {
    if (this.validateStep(this.currentStep)) {
      this.currentStep = Math.min(this.currentStep + 1, 4);
    } else {
      this.markCurrentStepTouched();
      AppSweetAlert.simpleAlert('warning', 'Formulaire incomplet', 'Veuillez corriger les champs invalides avant de continuer.');
    }
  }

  private markCurrentStepTouched() {
    const fieldsByStep: { [k: number]: string[] } = {
      1: ['nature_promotor_id', 'name_pomoter', 'firstname_pomoter', 'email_pomoter', 'phone_pomoter',
          'social_reason', 'head_office', 'registered_phone', 'registered_number', 'registered_date'],
      2: ['name_chief', 'firstname_chief', 'phone_chief', 'email_chief'],
      3: ['type_cape_id', 'name', 'capacity', 'email', 'phone', 'targets',
          'department_id', 'municipality_id', 'district_id', 'town', 'address', 'coords'],
      4: ['has_consent']
    };
    (fieldsByStep[this.currentStep] || []).forEach(field => {
      this.formData.get(field)?.markAsTouched();
    });
  }

  prevStep() {
    this.currentStep = Math.max(this.currentStep - 1, 1);
  }

  async onSubmit() {
    if (!this.validateStep(4) && this.code==undefined) {
      AppSweetAlert.simpleAlert('warning', 'Formulaire incomplet', 'Veuillez remplir tous les champs requis.');
      return;
    }

    // L'agrément déclaré raccourcit le circuit : sa référence et son scan sont
    // les seules pièces sur lesquelles la DFEA pourra statuer.
    if (this.formData.get('has_aggrement')?.value) {
      if (!this.formData.get('aggreement_reference')?.value?.trim()) {
        AppSweetAlert.simpleAlert('warning', 'Agrément incomplet', "Renseignez la référence de l'agrément que vous déclarez détenir.");
        return;
      }
      if (!this.fileInput2 && this.code == undefined) {
        AppSweetAlert.simpleAlert('warning', 'Agrément incomplet', "Joignez le scan de l'agrément que vous déclarez détenir.");
        return;
      }
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';
    let formData2= new FormData()


      // Vérifie si l'accord est coché et ajoute le fichier correspondant
  // L'agrément déclaré conditionne l'envoi de son scan — pas le consentement,
  // qui n'a rien à voir avec ce fichier.
  if (this.formData.get('has_aggrement')?.value && this.fileInput2) {
    formData2.append("file_aggreement", this.fileInput2);
  }

  // Récupération des fichiers chargés
  const recupFiles = this.requiredFiles.filter((el: any) => el.isSetted === true);
  if (recupFiles.length === 0 && this.code==undefined) {
    this.toastrService.warning('Aucun fichier chargé');
    return;
  }

  // Ajout des fichiers spécifiques s'ils existent
  if (this.fileInput3) {
    formData2.append('zone_file', this.fileInput3);
  }
  if (this.fileInput4) {
    formData2.append('consent_file', this.fileInput4);
  }
  if (this.fileInput5) {
    formData2.append('registered_proof', this.fileInput5);
  }

  // Ajout des données principales
  formData2.append("data", JSON.stringify(this.formData.value));
  formData2.append('service_id', this.service_id);
  formData2.append('init_code', this.initCode);

  // Ajout des fichiers du formulaire (promoteur, directeur, centre, etc.)
  recupFiles.forEach((fileObj: any, index: number) => {
    if (fileObj.file) {
      formData2.append(`file_${fileObj.type}_${index}`, fileObj.file);
    }
  });

  console.log('Fichiers envoyés:', recupFiles);
  console.log('Code initial:', this.initCode);

  this.loading = true;

  this.eService.store(formData2).subscribe(
    (res: any) => {
      this.loading = false;

    this.isSubmitting = false;
    this.submitStatus = 'idle';
      this.toastrService.success(res.message);
      this.lsService.remove(GlobalName.reqName);
      this.is_stored = true;
            this.eService.purgeFile({init_code:this.initCode}).subscribe((res:any)=>{ },)
      this.router.navigate(['promoter/mes-dossiers']);
    },
    (err: any) => {

    this.isSubmitting = false;
    this.submitStatus = 'idle';
      this.loading = false;
      AppSweetAlert.simpleAlert("error", "Nouvelle inscription", err.error.message);
    }
  );

  }



  resetForm() {
    this.formData.reset();
    this.currentStep = 1;
    this.submitStatus = 'idle';
  }

  requestGeolocation(silent=false) {
    if (!('geolocation' in navigator)) {
      if (!silent) this.geoError = 'La géolocalisation n\'est pas prise en charge par ce navigateur.';
      return;
    }
    this.geoLoading = true;
    this.geoError = null;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        this.formData.patchValue({ coords });
        this.geoLoading = false;
        this.geoError = null;
      },
      (error) => {
        this.geoLoading = false;
        if (!silent) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.geoError = 'Accès à la localisation refusé. Veuillez l\'autoriser dans les paramètres de votre navigateur.';
              break;
            case error.POSITION_UNAVAILABLE:
              this.geoError = 'Position indisponible. Vérifiez que la localisation est activée sur votre appareil.';
              break;
            case error.TIMEOUT:
              this.geoError = 'La récupération de la position a expiré. Réessayez.';
              break;
            default:
              this.geoError = 'Impossible de récupérer votre position.';
          }
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
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


  
    getFiles(){
    this.fileService.getAll(this.type,1).subscribe((res:any)=>{
      res.data.forEach((element:any) => this.requiredFiles.push({
        id:element.id,
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
    open(content:any, index:any) {
    this.readURL(this.requiredFiles[index].file)
		this.offcanvasService.open(content);
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
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
      let current =this.requiredFiles[index];
         current.file=this.fileInput
         current.isSetted=true
         current.file64=await myFileService.fromArrayBufferToBase64(await myFileService.readFileAsync(this.fileInput))
         current.hasFilename=false
      //  this.fileInp.nativeElement.resetForm()
      let formData= new FormData()
      formData.append('reference',current.name)
      formData.append('file_id',current.file_id)
      formData.append('file',this.fileInput)
      formData.append('init_code',this.initCode)
      this.eService.addFile(formData).subscribe((res:any)=>{  this.requiredFiles.slice(index,current)},)
    }
  } 


  filterByType(type:any){
    return this.requiredFiles.filter((el:any) => el.type==type && el.isRequired == true)
  }

  
    readURL(file: File): void {
    const reader = new FileReader();
    reader.onload = e =>{
     let src = reader.result as string
      this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(src)

    };
    reader.readAsDataURL(file);

}


upload4(event:any){
  if(event.target.files.length>0){
    this.fileInput4=event.target.files[0]
  }
}
upload5(event:any){
  if(event.target.files.length>0){
    this.fileInput5=event.target.files[0]
  }
}
  


  ngOnDestroy(): void {
    if (this.formData.get('nature_promotor_id') != null && !this.is_stored) {
          AppSweetAlert.confirmBox2('warning','Enregistrement de CAPE','Vous étiez en train d\'enregistrer des données, voulez vous concerver les données saisies?').then((result:any)=>{
      if(result.value){
        this.lsService.set(`${GlobalName.reqName}-${this.user.code}`,JSON.stringify(this.formData))
      }else{
        this.lsService.remove(`${GlobalName.reqName}-${this.user.code}`)
      this.eService.purgeFile({init_code:this.initCode}).subscribe((res:any)=>{ },)
      }
    })
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

   showFile(file:any){
    let filename= this.dossier?.files.find((el:any)=>el.file_id==file?.id)?.filename
         this.url=this._sanitizationService.bypassSecurityTrustResourceUrl(ConfigService.toFile("docs/"+this.dossier?.code+"/"+filename))
         this.offcanvasService.open(this.previewContent,{  panelClass: 'details-panel', position: 'start'  });
      }

}
