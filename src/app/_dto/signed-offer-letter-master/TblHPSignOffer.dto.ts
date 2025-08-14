import { TbldPSignOffer } from "./TbldPSignOffer.dto";

export class TblHPSignOffer {

    HPSignOffer_SysID: number;
    HPSignOffer_Code: string = null;
    HPSignOffer_Name: string = null;
    HPSignOffer_AcDe_Yn: string = null;
    HPSignOffer_AcDe_SysID: number = 0;
    HPSignOffer_AcDe_Code: string = null;
    HPSignOffer_AcDe_Name: string = null;

    TbldPSignOffer: TbldPSignOffer[] = []
}