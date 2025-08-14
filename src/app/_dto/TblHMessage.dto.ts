import { TbldMessageCo } from "./TbldMessageCo.dto";

export class TblHMessage {

    HMessage_SysID: number;
    HMessage_Code: string = null;
    HMessage_Name: string = null;
    HMessage_AcDe_Yn: string ="N";
    HMessage_AcDe_SysID: number = 0;
    HMessage_AcDe_Code: string = null;
    HMessage_AcDe_Name: string = null;

    TbldMessageCo :TbldMessageCo[] = []

}