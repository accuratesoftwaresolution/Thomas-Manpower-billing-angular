import { TbldPlaceSupplyCoDto } from "./tbldPlaceSupplyCo.dto";

export class PlaceOfSupplyDto {
    HPlaceOfSupply_SysID: string; // Unique identifier for the place of supply
    HPlaceOfSupply_Code: string; // Code representing the place of supply
    HPlaceOfSupply_Name: string; // Name of the place of supply
    tbldPlaceSupplyCo ?: TbldPlaceSupplyCoDto[];
}
