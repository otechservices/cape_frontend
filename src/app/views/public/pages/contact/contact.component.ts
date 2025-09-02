import { Component, OnInit } from '@angular/core';
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
 

  constructor(
    private messageService:MessageService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

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

}
