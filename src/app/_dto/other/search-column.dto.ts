export class SearchColumnDto{
    field: string;
    
    header: string;
    
    style: {};
    
    pip: string;
    
    type: Type;
    
    exp: Expression;
}

export enum Type {
    DATE="date",

    TEXT="text"
}

export class Expression{
    val: string;

    then: string;

    els: string;
}