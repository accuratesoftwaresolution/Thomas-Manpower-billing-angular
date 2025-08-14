import { IintvrnoDto } from "./iintvrno.dto";
import { IintacconfigDto } from "./iintacconfig.dto";
import { IntrpttitleDto } from "./iintrpttitle.dto";
// import { IgenMenuDto } from "./igen-menu.dto";

/*
    Created By  : Aswathy Prasad T P
    Created On  : 25-05-2020
    Created For : For creating dto for IintDto
    Modified By : Aswathy Prasad
    Modified for :(07/12/2021)to set default value refred by PB
*/


export class IintDto {

    coCode: string;

    intCode: string;

    intName: string | null;

    abrv: string | null;

    windowName: string | null;

    intLogic: string | null;

    printSave: string | null = 'N';

    newmodeSave: string | null = 'Y';

    newmodeDelete: string | null = 'N';

    intMode: string | null = 'U';

    narrationH: string | null = 'N';

    narrationHDef: string | null;

    narrationD: string | null = 'N';

    narrationDDef: string | null;

    sortOrder: string | null;

    acCodeH: string | null;

    acCodeD: string | null;

    drCr: number | null = 1;

    editDrCr: string | null = 'Y';

    invSign: number | null = 1;

    acVisible: string | null = 'A';

    invCost: string | null;

    intCloseDate: Date | null;

    repeatDate: string | null = 'D';

    billAuto: string;

    salesmanMandatory: string | null;

    chqNo: string | null = "N";

    chqDate: string | null = "N";

    chqBank: string | null = "N";

    chqMandatory: string | null = "N";

    reportTitle: string | null;

    listTitle: string | null;

    registerTitle: string | null;

    vrPrint: string | null;

    layoutPrint: string | null;

    vrPrint2: string | null;

    layoutPrint2: string | null;

    print2Title: string | null;

    vrList: string | null;

    layoutList: string | null;

    vrReg: string | null;

    layoutReg: string | null;

    printHead: string = 'A';

    print2Head: string = 'A';

    listHead: string = 'A';

    regHead: string = 'A';

    auth1: string | null;

    auth2: string | null;

    auth3: string | null;

    intVisible: string | null = 'Y';

    isprintYn: number | null = -1;

    menuLevel1: string | null;

    menuLevel2: string | null;

    menuLevel3: string | null;

    menuLevel4: string | null;

    readonly: string | null = 'N';

    layout: string | null;

    sysdate: Date | null;

    refInt: string | null;

    refIntMandatory: string | null = "N";

    refTable: string | null;

    verifyYn: string = 'Y';

    notifyYn: string = 'N';

    acFilter: string;

    rptLogic: string;

    curType: string = 'A';

    overrideDateChk: string = "N";

    objectDescription?: string;

    acCodeHName?: string;

    acCodeDName?: string;

    intLogicName?: string;

    rptLogicName?: string;

    iintvrno?: IintvrnoDto[] = [];

    iintacconfig?: IintacconfigDto[] = [];

    iintrpttitle?: IntrpttitleDto[] = [];

    // igenmenu?: IgenMenuDto[] = [];
}
