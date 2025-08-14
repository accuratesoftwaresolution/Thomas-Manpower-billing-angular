import { HTransLCostDto } from "./HTransLCostDto.dto";
import { TblLandedExpDto } from "./TblCusVenExp.dto";
import { TblDigiHeadDto } from "./tbldigihead.dto";
import { TblDocAttachDto } from "./tbldocattch.dto";
import { TblExpDto } from "./tblexp.dto";
import { TblFieldMasterDto } from "./tblfieldmaster.dto";
import { TblFirstTransHeadDto } from "./tblFirstTransHeadDto.dto";
import { TblHTabHDDto } from "./tblhtabhd.dto";
import { TblIncoDto } from "./tblinc.dto";
import { TblInspeDto } from "./tblInspe.dto";
import { TblLCDetailsDto } from "./tbllcdetails.dto";
import { TblLCMasterDto } from "./tbllcmaster.dto";
import { TblMReqDto } from "./tblmreq.dto";
import { TblMResDto } from "./tblmres.dto";
import { TblPoDetailDto } from "./tblpodetail.dto";
import { TblPTermDto } from "./tblpterm.dto";
import { TblQAQCDto } from "./tblqaqc.dto";
import { TblSecTransDetailDto } from "./TblSecTransDetailDto.dto";
import { TblSecTransHeadDto } from "./tblSecTransHeadDto.dto";
import { TbltaxDto } from "./tbltax.dto";
import { TbltaxAddDto } from "./tbltaxadd.dto";
import { tblTaxDetailDto } from "./tbltaxdetail.dto";
import { TblTransDetailDto } from "./tbltransdetail.dto";
import { TblVesBookDto } from "./tblvesbook.dto";
import { TblVesContDtChangeDto } from "./tblvescontdtchange.dto";
import { TblVesDetailDto } from "./tblvesdetail.dto";
import { TblVesDocAttachDto } from "./tblvesdocattach.dto";
import { TblShippCostDto } from "./tblvesshipcost.dto";
import { TblWhMDto } from "./tblwhm.dto";
import { TblWhMDetailDto } from "./tblwhmdetail.dto";

export class TblTransHeadDto {


    tblTransHead?: TblFirstTransHeadDto
    tblSecTransHead?: TblSecTransHeadDto

    tblTransDetail?: TblTransDetailDto[] = [];
    tblSecTransDetail?: TblSecTransDetailDto[] = [];


    tblExp: TblExpDto[] = [];
    TblPTerm: TblPTermDto[] = [];
    TblPoDetail: TblPoDetailDto[] = []
    TblInco: TblIncoDto[] = []

    tblTax: TbltaxDto[] = [];
    tblTaxAdd: TbltaxAddDto[] = [];
    tblTaxDetail: tblTaxDetailDto[] = [];


    tblVesBook?: TblVesBookDto[];
    tblVesDetail?: TblVesDetailDto[];
    tblShipCost?: TblShippCostDto[];
    tblVesContDtChange?: TblVesContDtChangeDto[];
    tblVesDocAttach?: TblVesDocAttachDto[]

    tblQaQC?: TblQAQCDto[];
    tblInspe: TblInspeDto[] = []
    tblQaQcDocAttach?: TblDocAttachDto[]

    tblWhM: TblWhMDto[] = []
    tblWhMDetail: TblWhMDetailDto[] = []
    tblWhDocAttach?: TblDocAttachDto[]

    tblDocAttach: TblDocAttachDto[] = [];


    tblLCMaster: TblLCMasterDto = new TblLCMasterDto();
    tblLCDetails: TblLCDetailsDto[] = [];


    tblLandedCost: HTransLCostDto[] = []
    tblLandedExp: TblLandedExpDto[] = [];


    tblDigiHead?: TblDigiHeadDto[] = [];


    //Not Using Below Now

    tblFieldMaster: TblFieldMasterDto[] = [];
    tblHTabHD: TblHTabHDDto[] = [];




}