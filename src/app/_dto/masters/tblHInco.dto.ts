import { TbldIncoCoDto } from "./tblIncoCo.dto";

export class TblHIncoDto {
    HInco_SysID :number;

    HInco_Code: string;

    HInco_Name: string;

    HInco_Days: string;

    tbldIncoCo ?: TbldIncoCoDto[];
}
