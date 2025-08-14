/*
    Created By  : Aswathy Prasad T P
    Created On  : 07-01-2020
    Created For : For creating dto for igenconfig
*/

export class IgenConfigDto {

    keyName: string;

    keyDefault: string;

    keyValue: string;

    keyDescription: string;

    passwordYn: string = "N";

    checkRowStatus?: number;
}
