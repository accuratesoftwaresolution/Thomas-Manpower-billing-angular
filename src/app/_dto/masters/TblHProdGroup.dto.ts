import { TblmDocAttach } from "../TblmDocAttach.dto";
import { AccCommDto } from "./tblAccComm.dto";
import { TblDProdUnit } from "./TblDProdUnit.dto";
import { TblHProdMasterDto } from "./TblHProdMaster.dto";
import { TblHProdUnit } from "./TblHProdUnit.dto";

export class TblHProdGroup {

    
    HProdGroup_SysID:number
    HProdGroup_Code: string = null;
    HProdGroup_Short_Name: string = null;
    HProdGroup_Long_Name: string = null;
    HProdGroup_Group1: number = 0;
    HProdGroup_Group2: number = 0;
    HProdGroup_Group3: number = 0;
    HProdGroup_Group4: number = 0;
    HProdGroup_Group5: number = 0;
    HProdGroup_Group6: number = 0;
    HProdGroup_Group7: number = 0;
    HProdGroup_Group8: number = 0;
    HProdGroup_Group9: number = 0;


    TblHProdMaster: TblHProdMasterDto[] = []
    documentTableData: TblmDocAttach[] = []

}

