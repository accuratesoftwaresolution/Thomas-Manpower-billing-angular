import { TbldDistChanelCo } from "./TbldDistChanelCo.dto";

export class TblHDistChanel {
    HDistChanel_SysID: number;       // Distribution Channel SysID
    HDistChanel_Code: string = null;        // Distribution Channel Code
    HDistChanel_Name: string = null;        // Distribution Channel Name
    HDistChanel_AcDe_Yn: string="N";    // Activation & Deactivation (Y/N)
    HDistChanel_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
    HDistChanel_AcDe_Code: string = null;   // Activation & Deactivation Code
    HDistChanel_AcDe_Name: string = null;   // Activation & Deactivation Name
    TbldDistChanelCo:TbldDistChanelCo[] = []
  }
  