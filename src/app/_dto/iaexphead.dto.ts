
// import { Iaexp } from "./Iaexp";
// import { Iaexpgroup } from "./Iaexpgroup";

import { IaexpgroupDto } from "./iaexpgroup.dto";

export class IaexpheadDto {

  coCode: string;

  groupCode: string;

  code: string;

  shortName: string | null;

  name: string;

  status: string;

  sysuser1: string | null;

  sysdate1: Date | null;

  modiuser: string | null;

  modidate: Date | null;

  catCode: string | null;

  // iaexps: Iaexp[];

  iaexpgroup: IaexpgroupDto;
}
