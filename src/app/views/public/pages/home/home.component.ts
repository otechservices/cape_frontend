import { Component, OnInit } from '@angular/core';
import { ActualityService } from 'src/app/core/services/actuality.service';
import { ConfigService } from 'src/app/core/utils/config-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  active = 'top';
  data:any[]=[]

  constructor(
    private actualityService:ActualityService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }


  
  getAll(){
    this.actualityService.getAll2().subscribe((res:any)=>{
      this.data=res.data
    },
    (err:any)=>{

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
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

getLink(name:any){

  return ConfigService.toFile(`storage/actualities/${name}`)
}
}
