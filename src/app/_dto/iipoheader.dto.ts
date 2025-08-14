
import { IipodetailDto } from "./iipodetail.dto";
import { IiposupexpDto } from "./iiposupexp.dto";

/*
    Created By  : Aswathy Prasad T P
    Created On  : 04-03-2020
    Created For : For creating dto for iipoheader
*/

export class IipoheaderDto {

    coCode: string = "";

    dvCode: string = "";

    brCode: string = "";

    intCode: string = "";

    vrNo: number = 0;

    revisionNo: number | null = 0;

    vrDate: Date = new Date();

    refNo: string | null = "";

    acCode: string | null = "";

    acName: string | null = "";

    contact: string | null = "";

    tel: string | null = "";

    fax: string | null = "";

    gsm: string | null = "";

    email: string | null = "";

    add1: string | null = "";

    add2: string | null = "";

    add3: string | null = "";

    add4: string | null = "";

    creditPeriod: number | null = 0;

    paymentTerms: string | null = "";

    shippingTerms: string | null = "";

    edd: Date | null = new Date();;

    jobCode: string | null = "";

    discPer: number = 0;

    discAmt: number = 0;

    remarks: string | null = "";

    modeOfShip: string | null = "";

    deliveryTerms: string | null = "";

    curCode: string | null = "";

    curRate: number | null = 1;

    status: string = "A";

    sysuser: string = "";

    sysdate: Date = new Date();

    modiuser: string | null = "";

    modidate: Date | null = new Date();;

    verified: string | null = "Y";

    verifieddate: Date | null = new Date();;

    verifieduser: string | null = "";

    void: string = "N";

    voiddate: Date | null ;

    voiduser: string | null = "";

    discType: string | null = "";

    sign1Name: string | null = "";

    sign1Desi: string | null = "";

    sign2Name: string | null = "";

    sign2Desi: string | null = "";

    sign3Name: string | null = "";

    sign3Desi: string | null = "";

    consigneeAdd: string | null = "";

    shippingAdd: string | null = "";

    vat: string | null = "";

    vatPer: number | null = 0;

    vatAmt: number | null = 0;

    iipodetail?: IipodetailDto[] = []

    iiposupexp?: IiposupexpDto[] = []
}