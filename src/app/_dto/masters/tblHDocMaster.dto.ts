import { TbldDocMasterCoDto } from "./tbldDocMasterCo.dto";

export class TblHDocMasterDto {
    HDocMaster_SysID: number;
    HDocMaster_Code: string = null;
    HDocMaster_Name: string = null;
    HDocMaster_AcDe_Yn: string = "N";
    HDocMaster_AcDe_SysID: number = 0;
    HDocMaster_AcDe_Code: string = null;
    HDocMaster_AcDe_Name: string = null;

    TbldDocMasterCo:TbldDocMasterCoDto[] = []
}