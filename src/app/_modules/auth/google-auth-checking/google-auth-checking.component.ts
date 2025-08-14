import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

/*
    Created By  : Arun Joy
    Created On  : 03-01-2020
    Created For : For handing the google social signin. ie checking that social sign in is complted or not.
*/

@Component({
  selector: 'app-google-auth-checking',
  templateUrl: './google-auth-checking.component.html',
  styleUrls: ['./google-auth-checking.component.scss']
})
export class GoogleAuthCheckingComponent implements OnInit {

  constructor(
    private router: ActivatedRoute
  ) { }

  async ngOnInit() {

    await this.router.queryParamMap.subscribe((param: ParamMap)=>{

      const at=param.get('jwt');
      const rt=param.get('rt');
      localStorage.setItem("authtoken", at);
      localStorage.setItem("refreshtoken", rt);
      localStorage.setItem("media","G");
    });

    window.close();
  }

}
