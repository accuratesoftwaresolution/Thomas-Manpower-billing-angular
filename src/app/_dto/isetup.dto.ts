export class IsetupDto {

    coCode: string;
    dvCode: string;
    brCode: string;
    shortName: string;
    name: string | null;
    acCode: string;
    remarks: string | null;
    purpose: string = 'CASH/BANK';
    jobHead: string | null;
    module: string | null;
    overDraft: number | null;
    bankName: string | null;
    bankAddress: string | null;
    contactPerson: string | null;
    contactDesignation: string | null;
    // ibr ?: Ibr;
}
