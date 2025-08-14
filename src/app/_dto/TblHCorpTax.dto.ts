import { TbldCorpTaxCo } from "./TbldCorpTaxCo.dto";

export class TblHCorpTax {

    HCorpTax_SysID: number;
    HCorpTax_Code: string = null;
    HCorpTax_Name: string = null;
    HCorpTax_AcDe_Yn: string = "N";
    HCorpTax_AcDe_SysID: number  = 0;
    HCorpTax_AcDe_Code: string = null;
    HCorpTax_AcDe_Name: string = null;

    TbldCorpTaxCo :TbldCorpTaxCo[] = []

}