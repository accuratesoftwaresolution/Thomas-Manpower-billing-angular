import { IusermenurightsDto } from "./iusermenurights.dto";

/*
    Created By  : Arun Joy
    Created On  : 07-01-2020
    Created For : For creating dto for igenmenu
*/

export class IgenMenuDto {

    menuId: string;

    description: string;

    definition: string;

    parentMenuId: string;

    menuType: string = "1";

    displaySeq: number;

    interfaceYn: string = "N";

    coCode: string;

    tableName: string;

    openMultipleTab: string = "N";

    tableDesc: string;

    menuEnabled: string = "N";

    rights?: IusermenurightsDto;

    submenu?: IgenMenuDto[];

    rightsGiven? : any;

    icon?: string;
}