
// import { Ij4Dto } from "./ij4.dto";
import { IjjobDto } from "./ijjob.dto";
export class IjdetailDto {
    coCode: string;
  
    dvCode: string;
  
    brCode: string;
  
    intCode: string;
  
    vrNo: number;
  
    dsrNo: number;
  
    srNo: number;
  
    acCode: string;
  
    vrDate: Date | null;
  
    qty: number | null;
  
    rate: number | null;
  
    acAmt: number | null;
  
    signInt: number | null;
  
    void: string | null;
  
    interBrCode: string;
  
    // ij: Ij4Dto;
  
    ijjob: IjjobDto;
}