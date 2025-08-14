import { TbldAmendCoDto } from "./tbldAmendCo.dto";

export class TblHAmendDto {

    HAmend_SysID: number;

    HAmend_Code: string;

    HAmend_Name: string;

    HAmend_AcDe_Yn: string;

    HAmend_AcDe_SysID: number;

    HAmend_AcDe_Name: string;

    HAmend_AcDe_Code: string;

    tbldAmendCo: TbldAmendCoDto[];
}