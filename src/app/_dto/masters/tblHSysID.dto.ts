import { TbldSysIDCoDto } from "./tbldSysIDCo.dto";

export class TblHSysIDDto {
    HSysID_SysID : number ;

    HSysID_Code: string;

    HSysID_Name: string;

    HSysID_CoMaster_SysID: number ;

    HSysID_CoTrans_SysID: number ;

    tbldSysIdCo ?: TbldSysIDCoDto[];

}