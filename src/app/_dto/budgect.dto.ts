export class IabudgetDto {
 
  coCode: string;
 
  dvCode: string;
 
  brCode: string;
  
  intCode: string;
  
  vrNo: number;
  
  acCode: string;
  
  srNo: number;
 
  vrDate: Date = new Date();
 
  acAmt: number = 0;
 
  signInt: number = 1;
  
  remark: string | null;
  
  sysuser1: string;
  
  sysdate1: Date;

  acName?: string;

  yearLabel?: any;
}