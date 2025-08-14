import { TbldLCIssuBankCo } from "./TbldLCIssuBankCo.dto";

export class TblHLCIssuBank {

    HLCIssuBank_SysID: number;
    HLCIssuBank_Code: string;
    HLCIssuBank_Name: string;
    HLCIssuBank_AcDe_Yn: string;
    HLCIssuBank_AcDe_SysID: number;
    HLCIssuBank_AcDe_Code: string;
    HLCIssuBank_AcDe_Name: string;
    TbldLCIssuBankCo: TbldLCIssuBankCo[] = []
}