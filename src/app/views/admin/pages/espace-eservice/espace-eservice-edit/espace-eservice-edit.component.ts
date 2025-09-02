import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { RequeteService } from 'src/app/core/services/requete.service';
import { ResponseService } from 'src/app/core/services/response.service';
import { LocalStorageService } from 'src/app/core/utils/local-stoarge-service';

@Component({
  selector: 'app-espace-eservice-edit',
  templateUrl: './espace-eservice-edit.component.html',
  styleUrls: ['./espace-eservice-edit.component.css']
})
export class EspaceEserviceEditComponent implements OnInit {
  hasPermission:any
  loading=false
  code:any
  data:any


  constructor(
    private reqService:RequeteService,
    private responseService:ResponseService,
    private toastrService:ToastrService,
    config: NgbModalConfig,
    private lsService:LocalStorageService,
    private router:Router,
  private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.code=this.activatedRoute.snapshot.paramMap.get('code')
    this.init()
  }

  init(){
    this.reqService.get(this.code).subscribe((res:any)=>{
      this.data=res

    },
    (err:any)=>{

    })
  }
  store(value:any){
    value.id=this.data.id
    switch (value.hasPermission) {
      case "0":
         this.responseService.needCorrection(value).subscribe((res:any)=>{
          this.router.navigate(['/admin/requetes/pending'])

            },
            (err:any)=>{

            })
        break;

      case "1":
        this.responseService.validate(value).subscribe((res:any)=>{
          this.router.navigate(['/admin/requetes/validated'])
        },
        (err:any)=>{

        })
        break;

      case "2":
        this.responseService.decline(value).subscribe((res:any)=>{
          this.router.navigate(['/admin/requetes/finished'])

        },
        (err:any)=>{

        })
        break;
    
      default:
        break;
    }
  }
}
