import { ProdComm } from "../ProdComm.dto";
import { TblmDocAttach } from "../TblmDocAttach.dto";
import { AccCommDto } from "./tblAccComm.dto";
import { TbldProdMasterCo } from "./TbldProdMasterCo.dto";
import { TblDProdUnit } from "./TblDProdUnit.dto";
import { TblHProdUnit } from "./TblHProdUnit.dto";

export class TblHProdMasterDto {

    HProd_SysID: number;
    HProd_Code: string = null;
    HProd_Short_Name: string = null;
    HProd_Long_Name: string = null;

    HProd_Menu_SysID: number = 0;
    HProd_Menu_Code: string = null;
    HProd_Menu_Name: string = null;

    HProd_Group_SysID: number = 0;
    HProd_Group_Code: string = null;
    HProd_Group_Name: number = 0;

    HProd_CostMeth_SysID: number = 0;
    HProd_CostMeth_Code: string = null;
    HProd_CostMeth_Name: string = null;

    HProd_Module_SysID: number = 0;
    HProd_Module_Code: string = null;
    HProd_Module_Name: string = null;

    HProd_Type_SysID: number = 0;
    HProd_Type_Code: string = null;
    HProd_Type_Name: string = null;

    HProd_BOMModu_SysID: number = 0;
    HProd_BOMModu_Code: string = null;
    HProd_BOMModu_Name: string = null;

    HProd_SuplClass_SysID: number = 0;
    HProd_SuplClass_Code: string = null;
    HProd_SuplClass_Name: string = null;

    HProd_ValueWise_SysID: number = 0;
    HProd_ValueWise_Code: string = null;
    HProd_ValueWise_Name: string = null;

    HProd_ProdCate_SysID: number = 0;
    HProd_ProdCate_Code: string = null;
    HProd_ProdCate_Name: string = null;
    HProd_Gross_Weight: number = 0;
    HProd_Net_Weight: number = 0;
    HProd_Creation_Date: Date = null;
    HProd_SafetyStk_Level: number = 0;
    HProd_ReOrd_Qty: number = 0;
    HProd_Min_Qty: number = 0;
    HProd_Max_Qty: number = 0;
    HProd_Lead_Time: Date = null;

    HProd_InvAcc_SysID: number = 0;
    HProd_InvAcc_Code: string = null;
    HProd_InvAcc_Name: string = null;

    HProd_CogsAcc_SysID: number = 0;
    HProd_CogsAcc_Code: string = null;
    HProd_CogsAcc_Name: string = null;

    HProd_SalAcc_SysID: number = 0;
    HProd_SalAcc_Code: string = null;
    HProd_SalAcc_Name: string = null;

    HProd_PurAcc_SysID: number = 0;
    HProd_PurAcc_Code: string = null;
    HProd_PurAcc_Name: string = null;

    HProd_TaxInPut_SysID: number = 0;
    HProd_TaxInPut_Code: string = null;
    HProd_TaxInPut_Name: string = null;


    HProd_TaxOutPut_SysID: number = 0;
    HProd_TaxOutPut_Code: string = null;
    HProd_TaxOutPut_Name: string = null;

    HProd_OtaxInPut_SysID: number = 0;
    HProd_OtaxInPut_Code: string = null;
    HProd_OtaxInPut_Name: string = null;

    HProd_OtaxOutPut_SysID: number = 0;
    HProd_OtaxOutPut_Code: string = null;
    HProd_OtaxOutPut_Name: string = null;

    HProd_TaxAdvPut_SysID: number = 0;
    HProd_TaxAdvPut_Code: string = null;
    HProd_TaxAdvPut_Name: string = null;

    HProd_Group1: number = 0;
    HProd_Group2: number = 0;
    HProd_Group3: number = 0;
    HProd_Group4: number = 0;
    HProd_Group5: number = 0;
    HProd_Group6: number = 0;
    HProd_Group7: number = 0;
    HProd_Group8: number = 0;
    HProd_Group9: number = 0;

    HProd_AcDe_Yn: string = "N";

    HProd_AcDe_SysID: number = 0;
    HProd_AcDe_Code: string = null;
    HProd_AcDe_Name: string = null;


    TblHProdUnit: TblHProdUnit[] = []

    TblDProdUnit: TblDProdUnit[] = []

    applicableSupplierAndCust:ProdComm[] = []

    applicableCustomers:ProdComm[] = []

    applicableCo: TbldProdMasterCo[] = []




}
