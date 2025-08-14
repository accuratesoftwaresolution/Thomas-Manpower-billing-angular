import { TbldHMastDigiLock } from "./TbldHMastDigiLock.dto";
import { TblDMastDigiLock } from "./TblDMastDigiLock.dto";

export class TblHConfMastDocu {

    HCMastDocu_Midd_SysID: number  = null;
    HCMastDocu_MiddValid_SysID: number = 0;
    HCMastDocu_MiddValid_Code: string = null;
    HCMastDocu_MiddValid_Name: string= null;
    HCMastDocu_TransMenu_SysID: number = 0;
    HCMastDocu_TransMenu_Code: string = null;
    HCMastDocu_TransMenu_Name: string = null;
    HCMastDocu_FirstMast_SysID: number = 0;

    //Select

    HCMast_SelectHeadOne_State: string = null;
    HCMast_SelectHeadTwo_State: string = null;
    HCMast_SelectHeadThree_State: string = null;
    HCMast_SelectHeadFour_State: string = null;
    HCMast_SelectHeadFive_State: string = null;
    HCMast_SelectDetailOne_State: string = null;
    HCMast_SelectDetailTwo_State: string = null;
    HCMast_SelectDetailThree_State: string = null;
    HCMast_SelectDetailFour_State: string = null;
    HCMast_SelectDetailFive_State: string = null;
    HCMast_SelectApplCom_State: string = null;

    //Insert

    HCMast_InsertHeadOne_State: string = null;
    HCMast_InsertHeadTwo_State: string = null;
    HCMast_InsertHeadThree_State: string = null;
    HCMast_InsertHeadFour_State: string = null;
    HCMast_InsertHeadFive_State: string = null;
    HCMast_InsertDetailOne_State: string = null;
    HCMast_InsertDetailTwo_State: string = null;
    HCMast_InsertDetailThree_State: string = null;
    HCMast_InsertDetailFour_State: string = null;
    HCMast_InsertDetailFive_State: string = null;
    CDocu_InsertApplCom_State: string = null;
    HCMast_InsertApplCom_State:string = null;

    //update

    HCMast_UpdateHeadOne_State: string = null;
    HCMast_UpdateHeadTwo_State: string = null;
    HCMast_UpdateHeadThree_State: string = null;
    HCMast_UpdateHeadFour_State: string = null;
    HCMast_UpdateHeadFive_State: string = null;
    HCMast_UpdateDetailOne_State: string = null;
    HCMast_UpdateDetailTwo_State: string = null;
    HCMast_UpdateDetailThree_State: string = null;
    HCMast_UpdateDetailFour_State: string = null;
    HCMast_UpdateDetailFive_State: string = null;
    HCMast_UpdateApplCom_State: string = null;

    //Delete

    HCMast_DeleteHeadOne_State: string = null;
    HCMast_DeleteHeadTwo_State: string = null;
    HCMast_DeleteHeadThree_State: string = null;
    HCMast_DeleteHeadFour_State: string = null;
    HCMast_DeleteHeadFive_State: string = null;
    HCMast_DeleteHeadSix_State: string = null;
    HCMast_DeleteHeadSeven_State: string = null;
    HCMast_DeleteHeadEight_State: string = null;
    HCMast_DeleteDetailOne_State: string = null;
    HCMast_DeleteDetailTwo_State: string = null;
    HCMast_DeleteDetailThree_State: string = null;
    HCMast_DeleteDetailFour_State: string = null;
    HCMast_DeleteDetailFive_State: string = null;
    HCMast_DeleteApplCom_State: string = null;


    TbldHMastDigiLock: TbldHMastDigiLock[] = []
    TblDMastDigiLock: TblDMastDigiLock[] = []
}