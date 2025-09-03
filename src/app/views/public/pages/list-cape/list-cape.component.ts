import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CapeService } from 'src/app/core/services/cape.service';
import { MessageService } from 'src/app/core/services/message.service';
import { RequeteService } from 'src/app/core/services/requete.service';
import { TypeService } from 'src/app/core/services/type.service';
import { AppSweetAlert } from 'src/app/core/utils/app-sweet-alert';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-list-cape',
  templateUrl: './list-cape.component.html',
  styleUrls: ['./list-cape.component.css']
})
export class ListCapeComponent implements OnInit {


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  state:any
  role:any
  user:any
  title:any
  type:string  | null  ="cape"
  service_id:any

  constructor(
    private reqService:RequeteService,
    private typeService:TypeService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
      private activatedRoute:ActivatedRoute,
      private route:ActivatedRoute,
    private modalService: NgbModal) {
     config.backdrop = 'static';
     config.keyboard = false;
     }


  ngOnInit(): void {
    this.user=this.lsService.get(GlobalName.userName)
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };

    this.activatedRoute.paramMap.subscribe(params => {
      this.type=this.activatedRoute.snapshot.paramMap.get('type')
      this.init()

    })
  }

  init(){
    this.setServiceId()
  }

  setServiceId(){
    this.typeService.getAll2().subscribe((res:any)=>{
      res.data.forEach((element:any) => {
        if(element.name.toLowerCase().includes(this.type?.toLowerCase()))this.service_id=element.id
      });
      console.log(this.service_id)
      this.getAll()
    })

  }
 
  getAll(){
    this.reqService.getListForPublic(this.service_id).subscribe((res:any)=>{
      this.data=res
      
    },
    (err:any)=>{

    })
  }




  
  dismiss(){
    this.modalService.dismissAll()
  }

  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }





}
