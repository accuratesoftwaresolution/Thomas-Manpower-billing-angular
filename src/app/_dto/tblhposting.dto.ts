export class TblHPostingDto {
    postingHeaderSysId: number; 
    PostingSysId: number;      
    postingHeaderCode: string = '';  
    postingHeaderName: string = '';  
    postingSQLFieldName: string = ''; 
    PostingFormula: string = '';   
    PostingSymbol: string = '';     
    PostingAmount: number;
    debitAccountFirstCode: string = ''; 
    debitAccountFirstName: string = ''; 
    creditAccountSecondCode: string = ''; 
    creditAccountSecondName: string = '';

}