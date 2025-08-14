/*
    Created By  : Arun Joy
    Created On  : 06-01-2020
    Created For : For creating dto for pending bills
*/

export class PendingBillDto{

    acCode: string;

    interBrCode: string;

    billNo: string;

    dueDate: Date;

    allocate: number;

    signInt: number;

    toAllocate: number;

    toAllocateSignInt: number;

    acAmt: number;

    curCode: string;

    curRate: number;

    fAcAmt: number;

    fSignInt:number;

    fAllocate: number;

    fToAllocate: number;

    fToAllocateSignInt: number;

    billDate: Date;

    refCo: string;

    refDv: string;

    refBr: string;

    refInt: string;

    refVrNo: number;

    iadetailIndex?: number;

}