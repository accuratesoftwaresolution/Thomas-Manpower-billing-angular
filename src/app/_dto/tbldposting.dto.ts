export class TblDPostingDto {
    postingDetailSysId: number;
    PostingSysId: number;     
    postingDetailCode: string = '';  
    postingDetailName: string = '';  
    postingSQLFieldName: string = ''; 
    PostingFormula: string = '';    
    PostingSymbol: string = '';    
    PostingAmount: number;
    debitAccountFirstCode: string = ''; 
    debitAccountFirstName: string = ''; 
    creditAccountSecondCode: string = '';
    creditAccountSecondName: string = '';
}