import { TbldPCreatorCo } from "./TbldPCreatorCo.dto";

export class TblHPCreator {

    HPCreator_SysID: number;
    HPCreator_Code: string = null;
    HPCreator_Name: string = null;
    HPCreator_AcDe_Yn: string = "N";
    HPCreator_AcDe_SysID: number;
    HPCreator_AcDe_Code: string = null;
    HPCreator_AcDe_Name: string = null;

    TbldPCreatorCo: TbldPCreatorCo[] = []
}