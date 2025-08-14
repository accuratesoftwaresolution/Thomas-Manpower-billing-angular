import { TbldFirstTaxCo } from "./TbldFirstTaxCo.dto";

export class TblHTax {

    HFirstRateTax_SysID: number;
    HFirstRateTax_Code: string;
    HFirstRateTax_Name: string;
    HFirstCountryTax_SysID: number;
    HFirstCountryTax_Code: string;
    HFirstCountryTax_Name: string;
    HFirstTaxGroup_SysID: number;
    HFirstTaxGroup_Code: string;
    HFirstTaxGroup_Name: string;
    HFirstTax_InputPerc: number;
    HFirstTax_OutputPerc: number;
    HFirstTax_Input_AccSysID: number;
    HFirstTax_Input_AccCode: string;
    HFirstTax_Input_AccName: string;
    HFirstTax_Output_AccSysID: number;
    HFirstTax_Output_AccCode: string;
    HFirstTax_Output_AccName: string;
    HFirstTax_Adv_AccSysID: number;
    HFirstTax_Adv_AccCode: string;
    HFirstTax_Adv_AccName: string;
    HFirstTax_PostingField_No: number;
    HFirstTax_AcDe_Yn: string = "N";
    HFirstTax_AcDe_SysID: number;
    HFirstTax_AcDe_Code: string;
    HFirstTax_AcDe_Name: string;
    HFirstTax_Adv_TabNo:number;

  TbldFirstTaxCo: TbldFirstTaxCo[] = [];


}