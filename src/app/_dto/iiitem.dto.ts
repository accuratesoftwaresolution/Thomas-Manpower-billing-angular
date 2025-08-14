/*
    Created By  : Arun Joy
    Created On  : 08-01-2020
    Created For : For creating dto for iiitem
*/

import { AiitembrDto } from "./aiitembr.dto";
import { AiitemunitDto } from "./aiitemunit.dto";

export class IiitemDto {

    coCode: string;

    dvCode: string;

    itemCode: string;

    itemName: string;

    itemShort: string | null;

    barCode: string | null;

    oldCode: string | null;

    spedCode: string | null;

    baseUnit: string | null;

    grp1: string | null;

    grp2: string | null;

    grp3: string | null;

    grp4: string | null;

    binNo: string | null;

    specification: string | null;

    maxQty: number;

    minQty: number;

    reOrderQty: number;

    leadDays: number;

    defSupplier: string | null;

    saleRate1: number;

    saleRate2: number;

    saleRate3: number;

    saleRate4: number;

    costRate: number;

    invYn: string;

    costingYn: string;

    j3Code: string | null;

    jobHead: string | null;

    hscSac: string | null;

    taxType: number | null;

    status: string;

    sysuser: string;

    sysdate: Date;

    modUser: string;

    modDate: Date;

    partNo: string | null;

    size: string | null;

    colour: string | null;

    criticalItem: string | null;

    batch: string;

    grp5: string | null;

    grp6: string | null;

    grp7: string | null;

    grp8: string | null;

    itemNameA: string | null;

    vatPerc: number | null;

    iiitemunit?: AiitemunitDto[];

    iiitembr?: AiitembrDto[];

}
