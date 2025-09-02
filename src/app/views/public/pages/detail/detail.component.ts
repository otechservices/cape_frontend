import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  type:any
  constructor(
    private activatedRoute:ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.type=this.activatedRoute.snapshot.paramMap.get('type')

    })
  }
  download(index:any){
    /* const blob = new Blob(['assets/decret.pdf'], { type: 'application/pdf' });
     const url= window.URL.createObjectURL(blob);*/
     let url="";
     switch (index) {
       case 1:
          url=ConfigService.toFile('decret_cape.pdf')
         break;
       case 2:
          url=ConfigService.toFile('decret_garderie.pdf')
         break;
       case 3:
          url=ConfigService.toFile('consentement.docx')
         break;
       case 4:
          url=ConfigService.toFile('cdc.pdf')
         break;
       case 5:
          url=ConfigService.toFile('guide.pdf')
         break;
       case 6:
          url=ConfigService.toFile('code_enfant.pdf')
         break;
     
       default:
         break;
     }
  
     window.open(url),'_blank';
   }
}
