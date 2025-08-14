import { HAddExpSeleDTO } from "./addexpaccgroupselection.dto";
import { CustomerAccountSelectionDto } from "./custaccselection.dto";
import { FormLinkingDto } from "./formlinking.dto";
import { SalesAccountSelectionDto } from "./salesaccselection.dto";
import { TblAuthorizerDto } from "./tblauthorizer.dto";
import { TbldConfDocuCo } from "./TbldConfDocuCo.dto";
import { TblDigdUserDetailDto } from "./tbldigiuserdetail.dto";
import { TbldTranDigiLock } from "./TbldTranDigiLock.dto";
import { TblFieldMasterDto } from "./tblfieldmaster.dto";
import { TblHMidCostCent } from "./TblHAllMasters.dto";
import { TblHAppAlert } from "./TblHAppAlert.dto";
import { TblHAppEmpl } from "./TblHAppEmpl.dto";
import { TblHDocManage } from "./TblHDocManage.dto";
import { TblHDocStartNo } from "./TblHDocStartNo.dto";
import { TblHMAppDate } from "./TblHMAppDate.dto";
import { TblHMBAccCr } from "./TblHMBAccCr.dto";
import { TblHMBAccDr } from "./TblHMBAccDr.dto";
import { TblHMBilledto } from "./TblHMBilledto.dto";
import { TblHMBPAccCr } from "./TblHMBPAccCr.dto";
import { TblHMBPAccDr } from "./TblHMBPAccDr.dto";
import { TblHMCurrMast } from "./TblHMCurrMast.dto";
import { TblHMDocuMaster } from "./TblHMDocuMaster.dto";
import { TblHMEmp } from "./TblHMEmp.dto";
import { TblHMidAccCus } from "./TblHMidAccCus.dto";
import { TblHMidAccFirst } from "./TblHMidAccFirst.dto";
import { TblHMidAccSec } from "./TblHMidAccSec.dto";
import { TblHMidAccVen } from "./TblHMidAccVen.dto";
import { TblHMidConfCopDoc } from "./TblHMidConfCopDoc.dto";
import { TblHMidConfCorpTax } from "./TblHMidConfCorpTax.dto";
import { TblHMidConfInterCo } from "./TblHMidConfInterCo.dto";
import { TblHMidConfPCustList } from "./TblHMidConfPCustList.dto";
import { TblHMidConfPdcBank } from "./TblHMidConfPdcBank.dto";
import { TblHMidConfPrint } from "./TblHMidConfPrint.dto";
import { TblHMidConfProGSele } from "./TblHMidConfProGSele.dto";
import { TblHMidConfPTerms } from "./TblHMidConfPTerms.dto";
import { TblHMidConfPUnit } from "./TblHMidConfPUnit.dto";
import { TblHMidConfPVenList } from "./TblHMidConfPVenList.dto";
import { TblHMidConfVtype } from "./TblHMidConfVtype.dto";
import { TblHMidDept } from "./TblHMidDept.dto";
import { TblHMidDistChanel } from "./TblHMidDistChanel.dto";
import { TblHMidDivision } from "./TblHMidDivision.dto";
import { TblHMidExpCust } from "./TblHMidExpCust.dto";
import { TblHMidExpVen } from "./TblHMidExpVen.dto";
import { TblHMidJurisd } from "./TblHMidJurisd.dto";
import { TblHMidLandCost } from "./TblHMidLandCost.dto";
import { TblHMidMidJob } from "./TblHMidMidJob.dto";
import { TblHMidOthCentre } from "./TblHMidOthCentre.dto";
import { TblHMidPlaceSupply } from "./TblHMidPlaceSupply.dto";
import { TblHMidProfCent } from "./TblHMidProfCent.dto";
import { TblHMidSalesOrg } from "./TblHMidSalesOrg.dto";
import { TblHMidSalGroup } from "./TblHMidSalGroup.dto";
import { TblHMidSman } from "./TblHMidSman.dto";
import { TblHMidSoffice } from "./TblHMidSoffice.dto";
import { TblHMidTaxOne } from "./TblHMidTaxOne.dto";
import { TblHMidTaxThree } from "./TblHMidTaxThree.dto";
import { TblHMidTaxTwo } from "./TblHMidTaxTwo.dto";
import { TblHMidWhOne } from "./TblHMidWhOne.dto";
import { TblHMidWhTwo } from "./TblHMidWhTwo.dto";
import { TblHMInco } from "./TblHMInco.dto";
import { TblHMJouCr } from "./TblHMJouCr.dto";
import { TblHMJouDr } from "./TblHMJouDr.dto";
import { TblHMNarration } from "./TblHMNarration.dto";
import { TblHMPettyCr } from "./TblHMPettyCr.dto";
import { TblHMPettyDr } from "./TblHMPettyDr.dto";
import { TblHMProdMast } from "./TblHMProdMast.dto";
import { TblHMProdModu } from "./TblHMProdModu.dto";
import { TblHMShippedto } from "./TblHMShippedto.dto";
import { TblHMTaxAcc } from "./TblHMTaxAcc.dto";
import { TblHPterm } from "./TblHPterm.dto";
import { TblHRemark } from "./TblHRemark.dto";
import { TblHTabHDDto } from "./tblhtabhd.dto";
import { TblHTaxGroup } from "./TblHTaxGroup.dto";
import { TblTrasCriteria } from "./TblTrasCriteria.dto";
import { TblProjTransDetail } from "./transaction-header-detail-singleco/TblProjTransDetail.dto";

export class TblHConfDocu {
    HCDocu_Midd_SysID: number;
    HCDocu_MiddValid_SysID: number = 0;
    HCDocu_MiddValid_Code: string = null
    HCDocu_MiddValid_Name: string = null
    // HCDocu_MiddleMenu_SysID: number= 0;
    // HCDocu_MiddleMenu_Code: string=null
    // HCDocu_MiddleMenu_Name: string=null

    HCDocu_TransMenu_SysID: number = 0;
    HCDocu_TransMenu_Code: string = null
    HCDocu_TransMenu_Name: string = null

    HCDocu_ScreLimit_Approv: string = "N";
    HCDocu_load_BaseDoc: string = "N";
    HCDocu_load_NotExced: string = "N";
    HCDocu_Prev_CanotEdit: string = "N";
    HCDocu_Noload_CloseLink: string = "N";
    HCDocu_Link_Account: string = "N";
    HCDocu_Link_Product: string = "N";
    HCDocu_Link_ByQty: string = "N";
    HCDocu_Screen_QaQc: string = "N";
    HCDocu_Fin_Posting: string = "N";
    HCDocu_InvenIn_Posting: string = "N";
    HCDocu_Invenout_Posting: string = "N";
    HCDocu_InvenPosting_Na: string = "N";

    // HCDocu_Insert_Statement: string;
    // HCDocu_Update_Statement: string;
    // HCDocu_Delete_Statement: string;
    //Select query tab
    HCDocu_SelectHeadOne_State: string;
    HCDocu_SelectHeadTwo_State: string;
    HCDocu_SelectHeadThree_State: string;
    HCDocu_SelectHeadFour_State: string;
    HCDocu_SelectHeadFive_State: string;
    HCDocu_SelectHeadSix_State: string;
    HCDocu_SelectHeadSeven_State: string;
    HCDocu_SelectHeadEight_State: string;
    HCDocu_SelectDetailOne_State: string;
    HCDocu_SelectDetailTwo_State: string;
    HCDocu_SelectDetailThree_State: string;
    HCDocu_SelectDetailFour_State: string;
    HCDocu_SelectDetailFive_State: string;
    HCDocu_SelectFin_State: string;
    HCDocu_SelectStock_State: string;





    //Insert query tab

    HCDocu_InsertHeadOne_State: string;
    HCDocu_InsertHeadTwo_State: string;
    HCDocu_InsertHeadThree_State: string;
    HCDocu_InsertHeadFour_State: string;
    HCDocu_InsertHeadFive_State: string;
    HCDocu_InsertHeadSix_State: string;
    HCDocu_InsertHeadSeven_State: string;
    HCDocu_InsertHeadEight_State: string;

    HCDocu_InsertDetailOne_State: string;
    HCDocu_InsertDetailTwo_State: string;
    HCDocu_InsertDetailThree_State: string;
    HCDocu_InsertDetailFour_State: string;
    HCDocu_InsertDetailFive_State: string;


    HCDocu_InsertFin_State: string;
    HCDocu_InsertStock_State: string;



    //Update query tab



    HCDocu_UpdateHeadOne_State: string;
    HCDocu_UpdateHeadTwo_State: string;
    HCDocu_UpdateHeadThree_State: string;
    HCDocu_UpdateHeadFour_State: string;
    HCDocu_UpdateHeadFive_State: string;
    HCDocu_UpdateHeadSix_State: string;
    HCDocu_UpdateHeadSeven_State: string;
    HCDocu_UpdateHeadEight_State: string;

    HCDocu_UpdateDetailOne_State: string;
    HCDocu_UpdateDetailTwo_State: string;
    HCDocu_UpdateDetailThree_State: string;
    HCDocu_UpdateDetailFour_State: string;
    HCDocu_UpdateDetailFive_State: string;


    HCDocu_UpdateFin_State: string;
    HCDocu_UpdateStock_State: string;


    //Delete query tab
    HCDocu_DeleteHeadOne_State: string;
    HCDocu_DeleteHeadTwo_State: string;
    HCDocu_DeleteHeadThree_State: string;
    HCDocu_DeleteHeadFour_State: string;
    HCDocu_DeleteHeadFive_State: string;
    HCDocu_DeleteHeadSix_State: string;
    HCDocu_DeleteHeadSeven_State: string;
    HCDocu_DeleteHeadEight_State: string;

    HCDocu_DeleteDetailOne_State: string;
    HCDocu_DeleteDetailTwo_State: string;
    HCDocu_DeleteDetailThree_State: string;
    HCDocu_DeleteDetailFour_State: string;
    HCDocu_DeleteDetailFive_State: string;


    HCDocu_DeleteFin_State: string;
    HCDocu_DeleteStock_State: string;


    applicableCo: TbldConfDocuCo[] = [];
    //Second Tab
    Digilock: TbldTranDigiLock = new TbldTranDigiLock()

    //Third Tab
    tblAuthorizer: TblAuthorizerDto[] = []

    tblFieldMaster: TblFieldMasterDto[] = [new TblFieldMasterDto()]
    formLinking: FormLinkingDto[] = [new FormLinkingDto()]
    tblHTabHD: TblHTabHDDto[] = [new TblHTabHDDto()]



    //Eighth tab
    voucherTypeSelection: TblHMidConfVtype[] = [new TblHMidConfVtype()]
    printFormatSelection: TblHMidConfPrint[] = [new TblHMidConfPrint()]
    productGrpSelection: TblHMidConfProGSele[] = [new TblHMidConfProGSele()]
    interCompanySelection: TblHMidConfInterCo[] = [new TblHMidConfInterCo()]
    copyDocFromSelection: TblHMidConfCopDoc[] = [new TblHMidConfCopDoc()]

    PDCbankDetails: TblHMidConfPdcBank[] = [new TblHMidConfPdcBank()]
    CorporateTax: TblHMidConfCorpTax[] = [new TblHMidConfCorpTax()]
    PaymentTermsSelection: TblHMidConfPTerms[] = [new TblHMidConfPTerms()]
    productUnitGroupSelection: TblHMidConfPUnit[] = [new TblHMidConfPUnit()]
    currencySelection: TblHMCurrMast[] = [new TblHMCurrMast()]

    salesRateAgreementSelection: TblHMidConfPCustList[] = [new TblHMidConfPCustList()]
    purchaseRateAgreementSelection: TblHMidConfPVenList[] = [new TblHMidConfPVenList()]

    costCenterSelection: TblHMidCostCent[] = [new TblHMidCostCent()]
    profitCenterSelection: TblHMidProfCent[] = [new TblHMidProfCent()]
    salesmanSelection: TblHMidSman[] = [new TblHMidSman()]
    divisionSelection: TblHMidDivision[] = [new TblHMidDivision()]

    departmentSelection: TblHMidDept[] = [new TblHMidDept()]
    jobSelection: TblHMidMidJob[] = [new TblHMidMidJob()]
    otherCenterSelection: TblHMidOthCentre[] = [new TblHMidOthCentre()]
    salesOrganizationSelection: TblHMidSalesOrg[] = [new TblHMidSalesOrg()]

    distributionChannelSelection: TblHMidDistChanel[] = [new TblHMidDistChanel()]
    salesOfficeSelection: TblHMidSoffice[] = [new TblHMidSoffice()]
    salesGroupSelection: TblHMidSalGroup[] = [new TblHMidSalGroup()]
    placeOfSupplySelection: TblHMidPlaceSupply[] = [new TblHMidPlaceSupply()]

    jurisdictionChannelSelection: TblHMidJurisd[] = [new TblHMidJurisd()]
    warehouseOneSelection: TblHMidWhOne[] = [new TblHMidWhOne()]
    warehouseTwoSelection: TblHMidWhTwo[] = [new TblHMidWhTwo()]

    firstAccGroupSelection: TblHMidAccFirst[] = [new TblHMidAccFirst()]
    secondAccGroupSelection: TblHMidAccSec[] = [new TblHMidAccSec()]

    customerAccGroupSelection: TblHMidAccCus[] = [new TblHMidAccCus()]
    VendorAccGroupSelection: TblHMidAccVen[] = [new TblHMidAccVen()]

    AdditionalExpenseCustomer: TblHMidExpCust[] = [new TblHMidExpCust()]
    TblHMidLandCost: TblHMidLandCost[] = [new TblHMidLandCost()]
    TblHMShippedto: TblHMShippedto[] = [new TblHMShippedto()]
    TblHMBilledto: TblHMBilledto[] = [new TblHMBilledto()]

    AdditionalExpenseVendor: TblHMidExpVen[] = [new TblHMidExpVen()]

    TaxOne: TblHMidTaxOne[] = [new TblHMidTaxOne()]
    TaxTwo: TblHMidTaxTwo[] = [new TblHMidTaxTwo()]
    TaxThree: TblHMidTaxThree[] = [new TblHMidTaxThree()]
    TaxAccount:TblHMTaxAcc[]=[new TblHMTaxAcc()]

    DocumentStartingNumber: TblHDocStartNo[] = [new TblHDocStartNo()]
    TblHMDocuMaster:TblHMDocuMaster[] = [new TblHMDocuMaster()]

    TblHMProdModu: TblHMProdModu[] = [new TblHMProdModu()]
    TblHMNarration: TblHMNarration[] = [new TblHMNarration()]
    TblHMProdMast: TblHMProdMast[] = [new TblHMProdMast()]
    TblHMInco: TblHMInco[] = [new TblHMInco()]
    TblHMAppDate: TblHMAppDate[] = [new TblHMAppDate()]
    TblHMEmp:TblHMEmp[] = [new TblHMEmp()]


    TblHMBAccDr: TblHMBAccDr[] = [new TblHMBAccDr()]
    TblHMBAccCr: TblHMBAccCr[] = [new TblHMBAccCr()]
    TblHMBPAccDr: TblHMBPAccDr[] = [new TblHMBPAccDr()]
    TblHMBPAccCr: TblHMBPAccCr[] = [new TblHMBPAccCr()]
    TblHMPettyDr: TblHMPettyDr[] = [new TblHMPettyDr()]
    TblHMPettyCr: TblHMPettyCr[] = [new TblHMPettyCr()]
    TblHMJouDr: TblHMJouDr[] = [new TblHMJouDr()]
    TblHMJouCr: TblHMJouCr[] = [new TblHMJouCr()]

    TblProjTransDetail:TblProjTransDetail[] = [new TblProjTransDetail()]



    //--------------------------------------------
    // screenValidData: TblHMSalScreen[] = [new TblHMSalScreen()]
    //---------------------------------------------------


    //   TblHMAppDate: TblHMAppDate[] = [new TblHMAppDate()]
    //   TblHRemark: TblHRemark[] = [new TblHRemark()]
    //   TblHPterm: TblHPterm[] = [new TblHPterm()]
    //   TblHDocManage: TblHDocManage[] = [new TblHDocManage()]
    //   TblHAppAlert: TblHAppAlert[] = [new TblHAppAlert()]
    //   TblHAppEmpl: TblHAppEmpl[] = [new TblHAppEmpl()]
    //   TblHMProdModu: TblHMProdModu[] = [new TblHMProdModu()]
    //   TblHMNarration: TblHMNarration[] = [new TblHMNarration()]



    //   salesAccSelection: SalesAccountSelectionDto[] = [new SalesAccountSelectionDto()]
    //   customerAccSelection: CustomerAccountSelectionDto[] = [new CustomerAccountSelectionDto()]
    //   AddExpAccGroupSelection: HAddExpSeleDTO[] = [new HAddExpSeleDTO()]



    //   
    //   addExpenseGroupSelection: any[] = []
    //   expAddToCustSupplierGroupSelection: any[] = []
    //   interCompanyGroupSelection: any[] = []
    //   directExpenseAccGroupSelection: any[] = []
    //   indirectExpenseGroupSelection: any[] = []
    //   customerAccGroupSelection: TblHMidAccCus[] = [new TblHMidAccCus()]
    //   VendorAccGroupSelection: TblHMidAccVen[] = [new TblHMidAccVen()]
    //   taxGroupSelection: TblHTaxGroup[] = [new TblHTaxGroup()]
    //   additionalTaxGroupOneSelection: TblHTaxGroup[] = [new TblHTaxGroup()]
    //   additionalTaxGroupTwoSelection: TblHTaxGroup[] = [new TblHTaxGroup()]
    //   taxAccGroupSelection: any[] = []
    //   taxAccGroupOneSelection: any[] = []
    //   taxAccGroupTwoSelection: any[] = []



}