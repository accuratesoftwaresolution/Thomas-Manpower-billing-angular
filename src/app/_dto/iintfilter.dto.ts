
export class IintfilterDto {

  coCode: string;

  intUser: string = "INT";

  intCode: string;

  filterSet: string = "H";

  // acCode: string;

  sysuser: string | null;

  sysdate: Date | null;

  accounts: string[] = [];

  view?: string;

  select?: string;
}
