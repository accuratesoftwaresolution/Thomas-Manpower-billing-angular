import { TbldSalGroupCoDto } from "./tbldSalGroupCo.dto";

export class TblHSalGroupDto {
    HSalGroup_SysID: number;
    HSalGroup_Code: string;
    HSalGroup_Name: string;
    tbldSalGroupCo ?: TbldSalGroupCoDto[];
}