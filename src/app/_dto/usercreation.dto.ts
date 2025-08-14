import { TbldUserHeadCoDto } from "./TbldUserHeadCo.dto";
import { TblDVouType } from "./TblDVouType.dto";
import { TblDCostCentDto } from "./user-creation/TblDCostCentDto.dto";
import { TblDdepartDto } from "./user-creation/TblDdepartDto.dto";
import { TblDdisChanelDto } from "./user-creation/TblDdisChanelDto.dto";
import { TblDdivsionDto } from "./user-creation/TblDdivsionDto.dto";
import { TblDJobDto } from "./user-creation/TblDJobDto.dto";
import { TblDLoginRetsriDto } from "./user-creation/TblDLoginRetsriDto.dto";
import { TblDOtherCentDto } from "./user-creation/TblDOtherCentDto.dto";
import { TblDProfCentDto } from "./user-creation/TblDProfCentDto.dto";
import { TblDResAccDto } from "./user-creation/TblDResAccDto.dto";
import { TblDRetsriDto } from "./user-creation/TblDRetsriDto.dto";
import { TblDSalesGroupDto } from "./user-creation/TblDSalesGroupDto.dto";
import { TblDSalesOfficeDto } from "./user-creation/TblDSalesOfficeDto.dto";
import { TblDSalesOrgDto } from "./user-creation/TblDSalesOrgDto.dto";

export class UserCreationDto {
    HUser_SysID: number = 0;
    HUser_Code: string = null;
    HUser_Name: string = null;

    HUser_Role_SysID: number = 0;
    HUser_Role_Code: string  = null;
    HUser_Role_Name:  string  = null;
    HUser_Pasword_Enter:  string  = null;
    HUser_Pasword_ReEnter:  string  = null;
    HUser_Desig:  string  = null;
    HUser_Email:  string  = null;
    HUser_MbileNo:  string  = null;
    HUser_MobID:  string  = null;
    HUser_Fax:  string  = null;
    HUser_Defaults:  string  = null;

    HUser_Lang_SysID:  number = 0;
    HUser_Lang_Code:  string  = null;
    HUser_Lang_Name:  string  = null;

    HUser_Emp_SysID:  number = 0;
    HUser_Emp_Code:  string  = null;
    HUser_Emp_Name:  string  = null;
    HUser_AcDe_Yn:  string  = null;
    HUser_AcDe_SysID: number = null;
    HUser_AcDe_Code:  string  = null;
    HUser_AcDe_Name:  string  = null;

    applicableCo: TbldUserHeadCoDto[] = []

    AccountSelection: TblDResAccDto[] = []
    costCenterSelection: TblDCostCentDto[] = []
    profitCenterSelection: TblDProfCentDto[] = []
    divisionSelection: TblDdivsionDto[] = []
    departmentSelection: TblDdepartDto[] = []
    jobSelection: TblDJobDto[] = []
    otherCenterSelection: TblDOtherCentDto[] = []
    salesOrganizationSelection: TblDSalesOrgDto[] = []
    distributionChannelSelection: TblDdisChanelDto[] = []
    salesOfficeSelection: TblDSalesOfficeDto[] = []
    salesGroupSelection: TblDSalesGroupDto[] = []
    VoucherTypeRestriction: TblDVouType[] = []


    TblDLoginRetsri: TblDLoginRetsriDto = new TblDLoginRetsriDto()
    TblDRetstrict: TblDRetsriDto = new TblDRetsriDto()


}
