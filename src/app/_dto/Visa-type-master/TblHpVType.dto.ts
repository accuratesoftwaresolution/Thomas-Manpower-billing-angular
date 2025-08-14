import { TbldPVTypeCo } from "./TbldPVTypeCo.dto";

export class TblHpVType {

    HPVType_SysID: number;
    HPVType_Code: string = null;
    HPVType_Name: string = null;
    HPVType_AcDe_Yn: string = "N";
    HPVType_AcDe_SysID: number = 0;
    HPVType_AcDe_Code: string = null;
    HPVType_AcDe_Name: string = null;

    TbldPVTypeCo: TbldPVTypeCo[] = [];

}