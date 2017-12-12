import { Component } from '@angular/core';
import { Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  private apiUrl ='http://localhost:3000/'
  data
  data1
  name
  country
  id
  detail
  nameupdate
  countryupdate
  detailupdate
  constructor(public http: Http){
    this.getData()
    this.getContacts()
    setInterval(function(){ this.getContacts(); }, 3000);
  }


  update(){
    return this.http.post('http://localhost:3000/Update/'+this.id,({name:this.nameupdate,country:this.countryupdate,detail:this.detailupdate})).subscribe((result)=>{
    console.log('result',result);
    this.getContacts()
    })
  }

  updateid(name,country,detail,inputid){
    this.id = inputid
    this.nameupdate = name
    this.countryupdate = country
    this.detailupdate = detail
  }

  delete(inputid){
    return this.http.get('http://localhost:3000/Delete/'+inputid).subscribe(()=>{
      this.getContacts()
    })
  }
  

  add(){
   
    return this.http.post('http://localhost:3000/Create/',({name:this.name,country:this.country,detail:this.detail})
    
    ).subscribe((result)=>{
       console.log('result',result);
       this.getContacts()
    })
    
  }

  getData(){
    return this.http.get(this.apiUrl).map((res:Response)=>res.json())
  }

  getContacts(){
    this.getData().subscribe(data=>{
      console.log(data)
      this.data = data
      this.getData()
    })
  }
}
