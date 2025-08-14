/*
    Created By  : Arun Joy
    Created On  : 07-01-2020
    Created For : For creating dto for iac4
*/

import { IacDto } from "./iac.dto";

export class Iac4Dto {

    coCode: string | null;

    ac1Code: string = "";

    ac2Code: string = "";

    ac3Code: string | null;

    alphabet: string = "";

    acCode: string = "";

    acName: string = "";

    acCat: string | null;

    curCode: string = "";

    expGrpCode: string | null;

    expHead: string | null;

    sysuser: string;

    sysdate: Date | null;

    slYn: string = "N";

    jointAcCode: string | null;

    jointAcDesc: string | null;

    add1: string | null;

    add2: string | null;

    add3: string | null;

    add4: string | null;

    tel: string | null;

    fax: string | null;

    contact1: string | null;

    contact2: string | null;

    contact1Gsm: string | null;

    contact2Gsm: string | null;

    email: string | null;

    website: string | null;

    countryCode: string | null;

    areaCode: string | null;

    cityCode: string | null;

    territoryCode: string | null;

    crPeriod: number = 0;

    crLimit: number = 0;

    crNo: string | null;

    crDate: Date | null;

    crApplNo: string | null;

    remarks: string | null;

    status: string = "A";

    statusRemarks: string | null;

    acCatFromAc3: string | null;

    jobHead: string | null;

    salesman: string | null;

    debtCollector: string | null;

    deptCode: string | null;

    saleRate: string | null;

    sysAc: string | null;

    acNameAr: string | null;

    add1Ar: string | null;

    add2Ar: string | null;

    add3Ar: string | null;

    add4Ar: string | null;

    contact1Ar: string | null;

    contact2Ar: string | null;

    vatRegNo: string | null;

    jobHdName?: string = "";

    areaName?: string = "";

    territoryName?: string = "";

    countryName?: string = "";

    debtCollectorName?: string = "";

    deptName?: string = "";

    salesmanName?: string = "";

    cityName?: string = "";

    billDetail?: string;

    iac?: IacDto;


}