import { TbldPLTypeCo } from "./TbldPLTypeCo.dto";

export class TblHPLTypeMaster {

    HPLType_SysID: number ;
    HPLType_Code: string = null;
    HPLType_Name: string = null;
    HPLType_AcDe_Yn: string = "N";
    HPLType_AcDe_SysID: number = 0;
    HPLType_AcDe_Code: string = null;
    HPLType_AcDe_Name: string = null;

    TbldPLTypeCo: TbldPLTypeCo[] = []
}