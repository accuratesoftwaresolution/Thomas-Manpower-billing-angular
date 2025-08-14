import { AtaxdetailDto } from "./ataxdetail.dto";

export class AtaxDto  {
    
    id:             number;

    tax_type_code:  string;

    tax_type_name:  string;

    tax_percentage: number;

    taxDetail :AtaxdetailDto;
}