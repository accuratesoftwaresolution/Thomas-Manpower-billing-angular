import { IusercorightsDto } from "./iusercorights.dto";
import { IuserotherrightsDto } from "./iuserotherrights.dto";
import { IuserpwdDto } from "./iuserpwd.dto";

/*
    Created By  : Aswathy Prasad
    Created On  : 30-04-2020
    Created For : For creating dto for iuser
    Modified By  :Aswathy
    Modified for :(07/12/2021)to set default value 

*/

export class IuserDto {

    coCode: string;

    userId: string;

    userName: string = "";

    groupOrUser: string = "U";

    pass: string | null = null;

    userGroupYn: string | null = "N";

    userGroup: string | null = null;

    designation: string | null = null;

    corRestYn: string | null = "N";

    corDay: number | null = null;

    backEntRestYn: string | null = "N";

    backEntDay: number | null = null;

    userMode: string = "M";

    crLimit: string | null = null;

    canVrEdit: string | null = "N";

    vrDtAllowed: string = "A";

    showCost: string = "Y";

    negativeIssue: string | null = "N";

    saleRate: string = "1";

    acFilter: string | null = "N";

    duplicateItem: string | null = "Y";

    messageOnQuit: string | null = "Y";

    acRight: string | null = "A";

    secuLevel: string = "N";

    approvingUserid: string | null = null;

    finalizationYn: string | null = "";

    otherPrivilages: string | null = "N";

    windowstate: string = "";

    salVisible: string = "N";

    pwdExpDays: number = 0;

    msgCloseDelay: number = 60;

    allBrRight: string = "Y";

    belowCost: string = "Y";

    verifiedVrEdit: string = "Y";

    allCoRight: string = "N";

    // skinFamily:string;

    allSalesman: string = "Y";

    allGrp1: string = "Y";

    allGrp2: string = "Y";

    allGrp3: string = "Y";

    allGrp4: string = "Y";

    allGrp5: string = "Y";

    allGrp6: string = "Y";

    allGrp7: string = "Y";

    allGrp8: string = "Y";

    // crLmtEcxeed:string;

    // userImage:Buffer;

    // tabLimit:number;

    // logoutMandatory:string;

    // userType:string;

    refreshtoken: string = "";

    mUserYn: string = "N";

    confirmPass?: string = "";

    blankPassYn?: string = "";

    iusercorights?: IusercorightsDto[] = [];

    iuserotherrights?: IuserotherrightsDto[] = [];

    iuserpwd?: IuserpwdDto[] = [];

    password?: string | null = null;

}