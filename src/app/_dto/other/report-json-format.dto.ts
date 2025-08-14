import { PrintColumnGroupByMetaDataDto, PrintColumnMetaDataDto } from "@accurate/dto";

export class ReportJsonFormatDto {
    reportHeading: string;
    detailPrintColumnMetaData: PrintColumnMetaDataDto[];
    groupDataBy: string;
    detail: boolean;
    detailPropertyName: string;
    rptLanguage: string;
    reportId: string;
    printColumnMetaData: PrintColumnMetaDataDto[] | PrintColumnGroupByMetaDataDto;
}