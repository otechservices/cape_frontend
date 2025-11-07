import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/core/services/message.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  loading=false
  lat = 51.678418;
  lng = 7.809007;
  key="AIzaSyBMBaI8yBuueVyDmb576sE0yuhZXSikX5I"
  markers:any[]=[]
  zoom = 18;
  center!: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8,
  };


    activeTab: 'contact' | 'information' = 'contact';
  
  contactForm: FormGroup;
  informationForm: FormGroup;

  isSubmitting = false;
  submitStatus: 'success' | 'error' | null = null;
 

  constructor(
    private fb: FormBuilder,
    private messageService:MessageService,
    private toastrService:ToastrService,
    private router:Router
  ) {

     this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      sujet: ['', Validators.required],
      observation: ['', [Validators.required, Validators.maxLength(500)]],
      conditions: [false, [Validators.required]]

    });

    this.informationForm = this.fb.group({
      name: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      sujet: ['', Validators.required],
      observation: ['', [Validators.required, Validators.maxLength(500)]]
    });
   }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      // this.center = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // };
      
      this.center = {
           lat: 6.349562,
           lng: 2.398695,
         };
      this.addMarker()
    });
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'red',
        text: 'MASM',
      },
      title: 'Ministère des Affaires Sociales et de la Microfinance',
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }

    setActiveTab(tab: 'contact' | 'information') {
    this.activeTab = tab;
    this.submitStatus = null;
  }


  sendContact(value:any){
    this.messageService.store(value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
      this.router.navigate(['/'])
    },
    (err:any)=>{
      this.loading=false

        AppSweetAlert.simpleAlert("error","Contact",err.error.message)
    })
  }

  async handleContactSubmit() {
    if (this.contactForm.invalid) return;
    this.isSubmitting = true;
    this.submitStatus = null;

    try {
      this.messageService.store(this.contactForm.value).subscribe((res:any)=>{
      this.loading=false

        this.toastrService.success(res.message)
       this.submitStatus = 'success';
      this.contactForm.reset();
    
    },
    (err:any)=>{
      this.loading=false

        AppSweetAlert.simpleAlert("error","Contact",err.error.message)
    })
     
    } catch (error) {
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }

  async handleInformationSubmit() {
    if (this.informationForm.invalid) return;
    this.isSubmitting = true;
    this.submitStatus = null;

    try {
      // Ici, ajoute ton appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.submitStatus = 'success';
      this.informationForm.reset();
    } catch (error) {
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }

}
