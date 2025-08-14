// import { Iaexphead } from "./Iaexphead";
// import { Iaexpsubgroup } from "./Iaexpsubgroup";
import { IaexpheadDto } from "./iaexphead.dto";
import { IaexpsubgroupDto } from "./iaexpsubgroup.dto";

export class IaexpgroupDto {

  coCode: string;

  code: string;

  name: string;

  status: string;

  sysuser1: string | null;

  sysdate1: Date | null;

  modiuser: string | null;

  modidate: Date | null;

  iaexpheads: IaexpheadDto[];

  iaexpsubgroups: IaexpsubgroupDto[];
}
