import { IgissueDetailDto } from "./igissue-detail.dto";

export class IgissueSummaryDto {
    code: number;
    summary: string;
    name: string;
    issueType: string;
    source: string;
    identifiedBy: string;
    identifiedDate: Date;
    relatedProject: string;
    assignedTo: number;
    status: string;
    priority: string;
    targetResolutionDate: Date;
    progress: string;
    actualResolutionDate: Date;
    resolutionSummary: string;
    identifiedByEmail: string;
    unreadCount: number;
    igissueDetailDto?: IgissueDetailDto[];
    hold?:string
}