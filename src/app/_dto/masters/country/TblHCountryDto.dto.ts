import { TbldCountryCoDto } from "./TbldCountryCoDto.dto";

export class TblHCountryDto {
    HCountry_SysID: number;       // Country SysID
    HCountry_Code: string = null;        // Country Code
    HCountry_Name: string = null;        // Country Name
    HCountry_AcDe_Yn: string = "N";    // Activation & Deactivation (Y/N)
    HCountry_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
    HCountry_AcDe_Code: string = null;   // Activation & Deactivation Code
    HCountry_AcDe_Name: string = null;   // Activation & Deactivation Name

    TbldCountryCo:TbldCountryCoDto[]=[]
  }
  