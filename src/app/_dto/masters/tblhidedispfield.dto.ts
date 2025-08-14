import { TbldFieldMasteCoDto } from "./tbldFieldMasteCo.dto";

export class HideOrDisplayDto {
    HFieldMaster_SysID: number;
    HFieldMaster_Code: string;
    HFieldMaster_Name: string;
    HDataField_Name: string;
    HFieldValue_Yn: string;
    HField_Alert_Code: string;
    HField_Alert_Name: string;
    HField_Narration_Code: string;
    HField_Narration_Name: string;
    tbldFieldMasteCo ?: TbldFieldMasteCoDto[];
}
