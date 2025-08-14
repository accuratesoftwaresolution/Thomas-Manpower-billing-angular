import { MessageService } from "primeng/api";
import { FormAlignerDto, SelectItem } from "@accurate/dto";
import { ActionService } from "@accurate/toolbar";
import { Component, OnInit } from "@angular/core";
import { IapodetailDto } from "src/app/_dto/iapodetail.dto";
import { IccurrencyDto } from "src/app/_dto/iccurrency.dto";
import { Iac4LovDto } from "src/app/_dto/lov/iac4-lov.dto";
import { IccurrencyService } from "src/app/_providers/iccurrency.service";
import { apiUrl } from "src/app/_resources/api-url.properties";
import {
    ErrorTranslateService,
    LangaugeTranslateService,
    MasterService,
} from "@accurate/providers";
import { UiService } from "@accurate/ui";
import { Iac4Dto } from "src/app/_dto/iac4.dto";
import {
    BranchSelectionComponent,
    BranchSelectionService,
} from "@accurate/branch-selection";

@Component({
    selector: "app-iapoheader",
    templateUrl: "./iapoheader.component.html",
    styleUrls: ["./iapoheader.component.scss"],
})
export class IapoheaderComponent implements OnInit {
    service = this.actionService.currentComponent.service;

    columnMetaData: FormAlignerDto[] = [];
    contact: FormAlignerDto[] = [];
    statusLovData: SelectItem[];
    jobLovData: SelectItem[] = [];
    paymentLovData: SelectItem[] = [];
    allAccountData: Iac4Dto[] = [];
    jobAllData: any;
    iac4LovData: SelectItem[];
    iac4LovSelected: Iac4LovDto;
    iitermsLovData: SelectItem[] = [];
    currencyLovData: SelectItem[] = [];
    allCurrencyData: any;
    isStock: boolean = false;

    constructor(
        protected branchSelection: BranchSelectionService,
        public iccurrencyService: IccurrencyService,
        private _uiService: UiService,
        private _lang: LangaugeTranslateService,
        private _masterService: MasterService,
        private actionService: ActionService,
        private messageService: MessageService,
        private _errorTranslateService: ErrorTranslateService
    ) {
        this.getColumn();
    }

    ngOnInit(): void {
        if (this.branchSelection.iintValues.intLogic.trim() == "DN") {
            this.isStock = true;
        }
        this.getAllLovData();
    }

    onCurCodeChange() {
        this.allCurrencyData.forEach((data) => {
            if (
                this.service.header.curCode &&
                this.service.header.curCode == data.code
            ) {
                this.service.header.curRate = data.curRate;
            }
        });
    }

    onHeaderDiscount(flag: string) {
        let detailTotAmt = 0;
        if (
            !this.service.header.iapodetail ||
            (this.service.header.iapodetail &&
                this.service.header.iapodetail.length <= 0)
        )
            return;
        detailTotAmt = this.getTotalAmount();
        if (flag == "P") {
            this.service.header.discAmt = this.actionService.round(
                (detailTotAmt * this.service.header.discPer) / 100,
                this.service.amtDecPts
            );
        } else if (flag == "A" && detailTotAmt > 0) {
            this.service.header.discPer = this.actionService.round(
                (this.service.header.discAmt * 100) / detailTotAmt,
                this.service.amtDecPts
            );
        }

        this.service.header.iapodetail.forEach((row: IapodetailDto) => {
            row.discPer = this.service.header.discPer;
            row.discAmt = (row.qty * row.rate * row.discPer) / 100;
        });
    }

    getTotalAmount(): number {
        if (
            this.service.header.iapodetail &&
            this.service.header.iapodetail.length > 0
        ) {
            const total = this.service.header.iapodetail.reduce(
                (sum, current) =>
                    parseFloat(sum.toString()) +
                    parseFloat((current.qty * current.rate).toString()),
                0
            );
            return total;
        }
        return 0;
    }

    acCodeValueChange() {
        if (this.service.header.acCode) {
            this.allAccountData.forEach((res) => {
                if (res.acCode == this.service.header.acCode) {
                    this.service.header.acName = res.acName;
                    this.service.header.curCode = res.curCode;
                }
            });
        } else {
            this.service.header.acName = "";
            this.service.header.curCode = "";
        }
    }

    vatValueChange(event) {
        if (event && event.checked) {
            this.service.header.vat = "Y";
        } else this.service.header.vat = "N";
    }

    phoneValueChange(event, colName) {
        if (
            this.service.header.tel &&
            colName == "tel" &&
            !this._uiService.getPhoneRegex().test(this.service.header.tel)
        ) {
            this.messageService.add({
                severity: "info",
                summary: "Info",
                detail: this._errorTranslateService.translate(
                    "EnterValidTelephone"
                ),
            });
            this.service.header.tel = null;
        } else if (
            this.service.header.gsm &&
            colName == "gsm" &&
            !this._uiService.getPhoneRegex().test(this.service.header.gsm)
        ) {
            this.messageService.add({
                severity: "info",
                summary: "Info",
                detail: this._errorTranslateService.translate("EnterValidGsm"),
            });
            this.service.header.gsm = null;
        } else if (
            this.service.header.contact &&
            colName == "contact" &&
            !this._uiService.getPhoneRegex().test(this.service.header.contact)
        ) {
            this.messageService.add({
                severity: "info",
                summary: "Info",
                detail: this._errorTranslateService.translate(
                    "EnterValidContact"
                ),
            });
            this.service.header.contact = null;
        }
        if (
            this.service.header.fax &&
            colName == "fax" &&
            !this._uiService.getPhoneRegex().test(this.service.header.fax)
        ) {
            this.messageService.add({
                severity: "info",
                summary: "Info",
                detail: this._errorTranslateService.translate("EnterValidFax"),
            });
            this.service.header.fax = null;
        }

        if (
            this.service.header.email &&
            colName == "email" &&
            !this._uiService.getEmailRegex().test(this.service.header.email)
        ) {
            this.messageService.add({
                severity: "info",
                summary: "Info",
                detail: this._errorTranslateService.translate(
                    "EnterValidEmail"
                ),
            });
            this.service.header.email = null;
        }
    }

    getColumn() {
        this.columnMetaData = [
            {
                type: "group",
                size: 12,
                label: "",
                groupColumnMetaData: [
                    {
                        columnName: "vrNo",
                        labelCode: "vrNo",
                        mandatory: true,
                        size: 3,
                        maxlength: 11,
                        type: "number",
                    },
                    {
                        columnName: "vrDate",
                        labelCode: "vrDate",
                        mandatory: true,
                        size: 3,
                        type: "date",
                    },
                    {
                        columnName: "refNo",
                        labelCode: "refNo",
                        size: 3,
                        maxlength: 30,
                    },
                    {
                        columnName: "refDate",
                        labelCode: "refDate",
                        size: 3,
                        type: "date",
                    },
                    // { columnName: 'status', size: 3, labelCode: 'status', type: 'dropdown', data: () => this.statusLovData },
                    // { columnName: 'acCode', size: 3, labelCode: 'acCode', type: 'dropdown', data: () => this.iac4LovData, valueChange: (event) => this.acCodeValueChange() },
                    //{ columnName: 'acName', size: 3, labelCode: 'acName', isDisabled: true, maxlength: 50 },
                    //  { columnName: 'jobCode', size: 3, labelCode: 'jobNoDivision', type: 'dropdown', data: () => this.jobLovData },
                    // { columnName: 'creditPeriod', size: 3, labelCode: 'crPeriod', type: 'number', maxlength: 4 },
                    // { columnName: 'curCode', size: 3, labelCode: 'curCode', type: 'dropdown', data: () => this.currencyLovData, valueChange: (event) => this.onCurCodeChange(), maxlength: 5 },
                    // { columnName: 'discPer', size: 3, labelCode: 'discPer', valueChange: (event) => this.onHeaderDiscount('P'), type: 'currency', minFractionDigits: this.service.amtDecPts, maxFractionDigits: this.service.amtDecPts },
                    {
                        columnName: "discAmt",
                        size: 3,
                        labelCode: "discAmt",
                        valueChange: (event) => this.onHeaderDiscount("A"),
                        type: "currency",
                        minFractionDigits: this.service.amtDecPts,
                        maxFractionDigits: this.service.amtDecPts,
                    },
                    {
                        columnName: "vat",
                        labelCode: "vat",
                        size: 3,
                        maxlength: 50,
                        type: "check",
                        valueChange: (event) => this.vatValueChange(event),
                    },
                    {
                        columnName: "vatAmt",
                        labelCode: "vatAmt",
                        size: 3,
                        type: "currency",
                        maxlength: 18,
                    },
                    {
                        columnName: "deliveryTerms",
                        size: 3,
                        labelCode: "deliveryTerms",
                        type: "dropdown",
                        data: () => this.iitermsLovData,
                        maxlength: 3000,
                    },
                    {
                        columnName: "paymentTerms",
                        size: 3,
                        labelCode: "paymentTerms",
                        type: "dropdown",
                        data: () => this.paymentLovData,
                        maxlength: 3000,
                    },
                    {
                        columnName: "remarks",
                        size: 6,
                        labelCode: "remarks",
                        maxlength: 3000,
                    },
                ],
            },
        ];

        if (!this.isStock) {
            this.columnMetaData = [
                {
                    type: "group",
                    size: 12,
                    label: "",
                    groupColumnMetaData: [
                        {
                            columnName: "vrNo",
                            labelCode: "vrNo",
                            mandatory: true,
                            size: 3,
                            maxlength: 11,
                            type: "number",
                        },
                        {
                            columnName: "vrDate",
                            labelCode: "vrDate",
                            mandatory: true,
                            size: 3,
                            type: "date",
                        },
                        {
                            columnName: "refNo",
                            labelCode: "refNo",
                            size: 3,
                            maxlength: 30,
                        },
                        {
                            columnName: "refDate",
                            labelCode: "refDate",
                            size: 3,
                            type: "date",
                        },
                        {
                            columnName: "status",
                            size: 3,
                            labelCode: "status",
                            type: "dropdown",
                            data: () => this.statusLovData,
                        },
                        // { columnName: 'acCode', size: 3, labelCode: 'acCode', type: 'dropdown', data: () => this.iac4LovData, valueChange: (event) => this.acCodeValueChange() },
                        {
                            columnName: "acName",
                            size: 3,
                            labelCode: "acName",
                            isDisabled: true,
                            maxlength: 50,
                        },
                        {
                            columnName: "jobCode",
                            size: 3,
                            labelCode: "jobNoDivision",
                            type: "dropdown",
                            data: () => this.jobLovData,
                        },
                        {
                            columnName: "creditPeriod",
                            size: 3,
                            labelCode: "crPeriod",
                            type: "number",
                            maxlength: 4,
                        },
                        {
                            columnName: "curCode",
                            size: 3,
                            labelCode: "curCode",
                            type: "dropdown",
                            data: () => this.currencyLovData,
                            valueChange: (event) => this.onCurCodeChange(),
                            maxlength: 5,
                        },
                        {
                            columnName: "discPer",
                            size: 3,
                            labelCode: "discPer",
                            valueChange: (event) => this.onHeaderDiscount("P"),
                            type: "currency",
                            minFractionDigits: this.service.amtDecPts,
                            maxFractionDigits: this.service.amtDecPts,
                        },
                        {
                            columnName: "discAmt",
                            size: 3,
                            labelCode: "discAmt",
                            valueChange: (event) => this.onHeaderDiscount("A"),
                            type: "currency",
                            minFractionDigits: this.service.amtDecPts,
                            maxFractionDigits: this.service.amtDecPts,
                        },
                        {
                            columnName: "vat",
                            labelCode: "vat",
                            size: 3,
                            maxlength: 50,
                            type: "check",
                            valueChange: (event) => this.vatValueChange(event),
                        },
                        {
                            columnName: "vatAmt",
                            labelCode: "vatAmt",
                            size: 3,
                            type: "currency",
                            maxlength: 18,
                        },
                        {
                            columnName: "deliveryTerms",
                            size: 3,
                            labelCode: "deliveryTerms",
                            type: "dropdown",
                            data: () => this.iitermsLovData,
                            maxlength: 3000,
                        },
                        {
                            columnName: "paymentTerms",
                            size: 3,
                            labelCode: "paymentTerms",
                            type: "dropdown",
                            data: () => this.paymentLovData,
                            maxlength: 3000,
                        },
                        {
                            columnName: "remarks",
                            size: 6,
                            labelCode: "remarks",
                            maxlength: 3000,
                        },
                    ],
                },
            ];

            this.contact = [
                {
                    type: "accordion",
                    groupColumnMetaData: [
                        {
                            type: "group",
                            size: 12,
                            label: "Contact",
                            groupColumnMetaData: [
                                {
                                    columnName: "contact",
                                    size: 3,
                                    labelCode: "contact",
                                    maxlength: 40,
                                    valueChange: (event) =>
                                        this.phoneValueChange(event, "contact"),
                                },
                                {
                                    columnName: "tel",
                                    size: 3,
                                    labelCode: "tel",
                                    maxlength: 20,
                                    valueChange: (event) =>
                                        this.phoneValueChange(event, "tel"),
                                },
                                {
                                    columnName: "fax",
                                    size: 3,
                                    labelCode: "fax",
                                    maxlength: 20,
                                    valueChange: (event) =>
                                        this.phoneValueChange(event, "fax"),
                                },
                                {
                                    columnName: "gsm",
                                    size: 3,
                                    labelCode: "gsm",
                                    maxlength: 20,
                                    valueChange: (event) =>
                                        this.phoneValueChange(event, "gsm"),
                                },
                                {
                                    columnName: "email",
                                    size: 3,
                                    labelCode: "email",
                                    maxlength: 50,
                                    valueChange: (event) =>
                                        this.phoneValueChange(event, "email"),
                                },
                                {
                                    columnName: "add1",
                                    size: 3,
                                    labelCode: "add1",
                                    maxlength: 50,
                                },
                                {
                                    columnName: "add2",
                                    size: 3,
                                    labelCode: "add2",
                                    maxlength: 50,
                                },
                                {
                                    columnName: "add3",
                                    size: 3,
                                    labelCode: "add3",
                                    maxlength: 50,
                                },
                                {
                                    columnName: "add4",
                                    size: 3,
                                    labelCode: "add4",
                                    maxlength: 50,
                                },
                            ],
                        },
                    ],
                },
            ];
        }
    }

    async getAllLovData() {
        this.statusLovData = [
            { label: this._lang.first("active"), value: "A" },
            { label: this._lang.first("inactive"), value: "I" },
        ];
        await this._uiService
            .getDataInLovFormat(
                apiUrl.iac4,
                2,
                null,
                { labelFeild: "acCode", codeFeilds: "acCode" },
                true
            )
            .then((res) => {
                this.iac4LovData = res;
            });

        await this._uiService
            .getDataInLovFormat(
                apiUrl.terms,
                2,
                null,
                {
                    labelFeild: "name",
                    codeFeilds: "name",
                    dataFetchExpression: {
                        getMethodExpression: `where[termType]=2`,
                    },
                },
                true
            )
            .then((res) => {
                this.iitermsLovData = res;
            });

        await this._uiService
            .getDataInLovFormat(
                apiUrl.job,
                2,
                null,
                { labelFeild: "jobName", codeFeilds: "jobCode" },
                true
            )
            .then((res) => {
                this.jobLovData = res;
            });

        await this._uiService
            .getDataInLovFormat(
                apiUrl.terms,
                2,
                null,
                {
                    labelFeild: "name",
                    codeFeilds: "name",
                    dataFetchExpression: {
                        getMethodExpression: `where[termType]=3`,
                    },
                },
                true
            )
            .then((res) => {
                this.paymentLovData = res;
            });

        await this._uiService
            .getDataInLovFormat(
                apiUrl.currency,
                2,
                null,
                { labelFeild: "code", codeFeilds: "code" },
                true
            )
            .then((data) => {
                this.currencyLovData = data;
            });

        await this._masterService.getMasterData(apiUrl.iac4).then((data) => {
            this.allAccountData = data["data"];
        });

        await this._masterService.getMasterData(apiUrl.job).then((data) => {
            this.jobAllData = data["data"];
        });

        await this._masterService.getMasterData(apiUrl.currency).then((res) => {
            this.allCurrencyData = res["data"];
        });
    }
}
