import { Injectable } from "@angular/core";
import { AiheaderDto } from "../_dto/aiheader.dto";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { apiUrl } from "../_resources/api-url.properties";

@Injectable({
    providedIn: "root",
})
export class StockTransferService {
    header: AiheaderDto;
    constructor(private http: HttpClient) {}

    async save(body: AiheaderDto): Promise<AiheaderDto> {
        return await this.http
            .post<AiheaderDto>(
                `${environment.apiUrl}/${apiUrl.inventory}`,
                body
            )
            .toPromise();
    }

    search(
        coCode: string,
        dvCode: string,
        brCode: string,
        intCode: string,
        vrNo: number
    ): Promise<AiheaderDto> {
        return this.http
            .get<AiheaderDto>(
                `${environment.apiUrl}/${apiUrl.inventory}/${vrNo}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`
            )
            .toPromise();
    }

    searchList(
        coCode: string,
        dvCode: string,
        brCode: string,
        intCode: string
    ): Promise<AiheaderDto[]> {
        return this.http
            .get<AiheaderDto[]>(
                `${environment.apiUrl}/${apiUrl.inventory}/search-list?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`
            )
            .toPromise();
    }
}
