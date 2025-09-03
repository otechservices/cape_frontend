import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbOffcanvasConfig, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RequeteService } from 'src/app/core/services/requete.service';
import { SessionServiceService } from 'src/app/core/services/session-service.service';
import { GlobalName } from 'src/app/core/utils/global-name';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

 


  buttonsPermission :any|undefined;
  structures:any[] =[]
  data:any[] =[]
  requetes:any[] =[]
  selected_data:any;
  modalOption:any; 
  isDtInitialized:boolean = false
  is_active=null
  loading=false
  state:any
  role:any
  user:any
  title:any
  result:any

  constructor(
    private sessionService:SessionServiceService,
    private reqService:RequeteService,
    private toastrService:ToastrService,
      config: NgbModalConfig,
      private lsService:LocalStorageService,
      configOffCanvas: NgbOffcanvasConfig,
      private offcanvasService: NgbOffcanvas,
      private route:ActivatedRoute,
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
  }

  init(){
    this.getAll()
  }

  

 
 
  getAll(){
    this.sessionService.results().subscribe((res:any)=>{
      this.data=res.data

      
    },
    (err:any)=>{

    })
  }




  
  dismiss(){
    this.modalService.dismissAll()
  }

  checked(el?:any){
    this.selected_data=el;
    this.requetes=el.requetes;
  }

  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }


  verify(value:any,content:any){
    this.reqService.getForResult(value.code).subscribe((res:any)=>{
        this.result=res
        this.modalService.dismissAll()

        this.offcanvasService.open(content);

    },
    (err:any)=>{

    })
  }

}
