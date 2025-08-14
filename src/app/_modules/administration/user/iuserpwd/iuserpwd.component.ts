import { FormService } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { IuserpwdDto } from 'src/app/_dto/iuserpwd.dto';


@Component({
  selector: 'app-iuserpwd',
  templateUrl: './iuserpwd.component.html',
  styleUrls: ['./iuserpwd.component.scss']
})
export class IuserpwdComponent implements OnInit {
  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserpwdDto;

  constructor(
    public service: FormService 
  ) { }

  ngOnInit(): void {
  }

}
