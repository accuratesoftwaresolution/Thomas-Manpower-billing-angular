import { TbldCityCoDto } from "./TbldCityCo.dto";

export class TblHCityDto {
    HCity_SysID: number;       // City SysID
    HCity_Code: string = null;        // City Code
    HCity_Name: string = null;        // City Name
    HCity_AcDe_Yn: string = "N";    // Activation & Deactivation (Y/N)
    HCity_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
    Hcity_AcDe_Code: string = null;   // Activation & Deactivation Code
    Hcity_AcDe_Name: string = null;   // Activation & Deactivation Name

    TbldCityCo : TbldCityCoDto[] = []
  }
  