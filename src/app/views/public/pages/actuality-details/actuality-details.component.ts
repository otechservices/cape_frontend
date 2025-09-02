import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActualityService } from 'src/app/core/services/actuality.service';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-actuality-details',
  templateUrl: './actuality-details.component.html',
  styleUrls: ['./actuality-details.component.css']
})
export class ActualityDetailsComponent implements OnInit {

  @ViewChild('img') img: ElementRef | undefined
  
  data:any
  id:any

  constructor(
    private actualityService:ActualityService,
    private route:ActivatedRoute,
    private toastrService:ToastrService,
    private renderer: Renderer2

  ) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.paramMap.get('id')
    if( this.id!= undefined) this.get()
  }

  get(){
    this.actualityService.get(this.id).subscribe((res:any)=>{
      this.data=res.data
      this.renderer.setStyle(this.img!.nativeElement, 'background-image',this.getLink(this.data.big_photo));
    },
    (err:any)=>{

    })
  }


  getLink(name:any){

    return ConfigService.toFile(`storage/actualities/${name}`)
  }

}
