export class TblMReqDto {
    voucherSysId: number;
    voucherType: string
    voucherNumber: string;
    wareHouseCode: string;
    wareHouseName: string;
    balanceQuantity: number;
    stockDate: Date;
    salesQuantity: number;
    reservationQuantity: number;
    hardReservationQuantity: number;
    softReservationQuantity: number;
}