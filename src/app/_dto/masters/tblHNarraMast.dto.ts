import { TbldNarraMastCoDto } from "./tbldNarraMastCo.dto";

export class TblHNarraMastDto {

    HNarraMast_SysID :number;
    HNarraMast_Code: string;
    HNarraMast_Name: string;
    tbldNarraMastCo ?: TbldNarraMastCoDto[];
}