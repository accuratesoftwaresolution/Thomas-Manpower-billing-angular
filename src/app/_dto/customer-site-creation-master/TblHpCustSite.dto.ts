import { TbldPCustSiteCo } from "./TbldPCustSiteCo.dto";

export class TblHpCustSite {

    HPCustSite_SysID: number;
    HPCustSite_Code: string;
    HPCustSite_Name: string;
    HPCustSite_CreaDate: Date;
    HPCustSite_AcDe_Yn: string = "N";
    HPCustSite_AcDe_SysID: number;
    HPCustSite_AcDe_Code: string;
    HPCustSite_AcDe_Name: string;
    HPCustSite_QRCode  : string = null;
    HPCustSite_BarCode  :string = null;

    TbldPCustSiteCo: TbldPCustSiteCo[] = [];

}