import { TbldLCNegBankCo } from "./TbldLCNegBankCo.dto";

export class TblHLCNegBank {

    HLCNegBank_SysID: number;
    HLCNegBank_Code: string;
    HLCNegBank_Name: string;
    HLCNegBank_AcDe_Yn: string;
    HLCNegBank_AcDe_SysID: number;
    HLCNegBank_AcDe_Code: string;
    HLCNegBank_AcDe_Name: string;

    TbldLCNegBankCo: TbldLCNegBankCo[] = []
}