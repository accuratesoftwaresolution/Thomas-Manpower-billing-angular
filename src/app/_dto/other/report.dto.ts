export class GroupDataDto {
    label: string;
    
    value: string | boolean | Date;
    
    name?:string;
    
    disabled?: boolean;

    valueChange?: any;
}