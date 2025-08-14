// import { OutputType } from "src/app/_modules/dashboard/framework/enum/output-type.enum";

import { OutputType } from "@accurate/toolbar";

export class ReportParamDto{
    
    type:  OutputType;
    
    reportName: string;

    reportParams: {name: string; value: [string | number | Date]}[];
}