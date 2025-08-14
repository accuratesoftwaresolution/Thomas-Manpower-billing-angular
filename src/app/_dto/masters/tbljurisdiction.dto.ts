import { TbldJurisdCoDto } from "./tbldJurisdCo.dto";

export class JurisdictionDto {
    HJurisdiction_SysID: string; // Unique identifier for the jurisdiction
    HJurisdiction_Code: string; // Code representing the jurisdiction
    HJurisdiction_Name: string; // Name of the jurisdiction
    tbldJurisdCo ?: TbldJurisdCoDto[];
}
