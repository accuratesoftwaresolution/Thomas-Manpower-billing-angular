import { TbldLandCostCoDto } from "./tbldLandCostCo.dto";

export class TblHLandCostDto {
    HLandCost_SysID :number ;
    
    HLandCost_Code: string;
    HLandCost_Name: string;
    
    HLandCost_Email: string;
    tbldLandCostCo ?: TbldLandCostCoDto[];
}
