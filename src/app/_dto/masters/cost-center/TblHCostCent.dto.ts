import { TbldCostCentCo } from "./TbldCostCentCo.dto";

export class TblHCostCent {
    HCostCent_SysID: number;      
    HCostCent_Code: string=null;        
    HCostCent_Name: string=null;       
    HCostCent_AcDe_Yn: string='N';    
    HCostCent_AcDe_SysID: number=0; 
    HCostCent_AcDe_Code: string=null;   
    HCostCent_AcDe_Name: string=null;   

    TbldCostCentCo:TbldCostCentCo[] = []
  }
  