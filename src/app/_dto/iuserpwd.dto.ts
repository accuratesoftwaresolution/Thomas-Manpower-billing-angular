/*
    Created By  : Aswathy Prasad
    Created On  : 19-05-2020
    Created For : For creating dto for iuserpwd
*/
export class IuserpwdDto {

    coCode: string;

    userId: string;

    pwdChangedDate: Date;

    oldPwd?: string;

    newPwd?: string;

    sysuser: string;
}
