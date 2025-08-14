import { MessageService } from "primeng/api";
import { FormAlignerDto, SelectItem } from "@accurate/dto";
import { ActionService } from "@accurate/toolbar";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
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
import { BranchSelectionService } from "@accurate/branch-selection";
import { PopUpLovService } from "src/app/_providers/pop-up-lov.service";
import { IcsalesmanDto } from "src/app/_dto/icsalesman.dto";
//import { type } from 'os';
import { InterfaceObjectService } from "src/app/_providers/interface-object.service";
import { style } from "@angular/animations";
import { PurchaseService } from "src/app/_providers/purchase.service";
import { PurchaseOrderService } from "src/app/_providers/purchase-order.service";
import { IipodetailDto } from "src/app/_dto/iipodetail.dto"
@Component({
    selector: "app-aiheader",
    templateUrl: "./aiheader.component.html",
    styleUrls: ["./aiheader.component.scss"],
})
export class AiheaderComponent implements OnInit {
    service = this.actionService.currentComponent.service;

    @Output() changeData = new EventEmitter<any>();

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
    brList: SelectItem[] = [];

    isStock: boolean = false;

    salesManLovData: any[] = [];
    isTrue: boolean = false;
    isTrueDp: boolean = false;
    visible: boolean;
    searchTerm: any;
    dataCp: any;
    newData: any;
    selectedNumber: string;
    value2: any;
    decimalSearch: any;

    constructor(
        public iccurrencyService: IccurrencyService,
        public _popUpLovService: PopUpLovService,
        private _uiService: UiService,
        private _lang: LangaugeTranslateService,
        private _masterService: MasterService,
        private actionService: ActionService,
        private messageService: MessageService,
        private _errorTranslateService: ErrorTranslateService,
        private _interfaceObjectService: InterfaceObjectService,
        protected branchSelection: BranchSelectionService,
        protected _service: PurchaseService,
        protected _purchaseOrderService: PurchaseOrderService,
    ) {
        this.isTrue = this.branchSelection.iintValues.intLogic == "SA";
        this.isTrueDp = this.branchSelection.iintValues.intCode == "DP";

        if (this.branchSelection.iintValues.intLogic == "ST" || this.branchSelection.iintValues.intLogic == "STI") {
            this.isStock = true
        }
        this.getColumn();
    }

    ngOnInit(): void {
        if (this.isStock) {
            this._interfaceObjectService.getDataInLovFormat1("ibr", 2, null, { labelFeild: "brName", codeFeilds: "brCode", }).then((res) => {
                for (let element of res) {
                    if (element.value.trim() != this.branchSelection.ibrValues.brCode.trim()) {
                        this.brList.push(element)
                    }
                }
            });
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
                    this.onCurCodeChange();
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
        if (this.isStock) {
            {
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
                                size: 4,
                                maxlength: 11,
                                type: "number",
                            },
                            {
                                columnName: "vrDate",
                                labelCode: "vrDate",
                                mandatory: true,
                                size: 4,
                                type: "date",
                            },
                            //{ columnName: 'refNo', labelCode: 'refNo', size: 3, maxlength: 30 },
                            //{ columnName: 'refDate', labelCode: 'refDate', size: 3, type: 'date' },
                            {
                                columnName: "status",
                                size: 4,
                                labelCode: "status",
                                type: "dropdown",
                                data: () => this.statusLovData,
                            },
                            {
                                columnName: "transferBr",
                                size: 4,
                                labelCode: "brCode",
                                type: "dropdown",
                                data: () => this.brList,



                            },

                            //{ columnName: 'acCode', size: 3, labelCode: 'acCode', type: 'dropdown', data: () => this.iac4LovData, valueChange: (event) => this.acCodeValueChange() },
                            //{ columnName: 'acName', size: 3, labelCode: 'acName', isDisabled: true, maxlength: 50 },
                            //{ columnName: 'billNo', labelCode: 'billNo', mandatory: true, size: 3, maxlength: 11, type: 'number' },
                            //{ columnName: 'billDate', size: 3, labelCode: 'billDate',mandatory: true, type: 'date', maxlength: 4 },
                            //{ columnName: 'lpoNo', labelCode: 'LPONo.', size: 3, maxlength: 11, type: 'number' },
                            //{ columnName: 'lpoDate', size: 3, labelCode: 'LPODate', type: 'date', maxlength: 4 },
                            {
                                columnName: "narration",
                                size: 8,
                                labelCode: "narration",
                                maxlength: 3000,
                            },
                            //{ columnName: 'crPeriod', labelCode: 'crPeriod', size: 3, maxlength: 11, type: 'number' },
                            //{ columnName: 'discPer', size: 3, labelCode: 'discPer', valueChange: (event) => this.onHeaderDiscount('P'), type: 'currency', minFractionDigits: this.service.amtDecPts, maxFractionDigits: this.service.amtDecPts },
                            //{ columnName: 'discAmt', size: 3, labelCode: 'discAmt', valueChange: (event) => this.onHeaderDiscount('A'), type: 'currency', minFractionDigits: this.service.amtDecPts, maxFractionDigits: this.service.amtDecPts },
                            //{ columnName: 'curCode', size: 3, labelCode: 'curCode', type: 'dropdown', data: () => this.currencyLovData, valueChange: (event) => this.onCurCodeChange(), maxlength: 5 },
                            //{ columnName: 'curRate', size: 3, labelCode: 'curRate', maxlength: 11 },
                            //{ columnName: 'vat', labelCode: 'vat', size: 3, maxlength: 50, type: 'check', valueChange: (event) => this.vatValueChange(event) },
                            //{ columnName: 'vatAmt', labelCode: 'vatAmt', size: 3, type: 'currency', maxlength: 18 },
                            //{ columnName: 'deliveryTerms', size: 3, labelCode: 'deliveryTerms', type: 'dropdown', data: () => this.iitermsLovData, maxlength: 3000 },
                            //{ columnName: 'paymentTerms', size: 3, labelCode: 'paymentTerms', type: 'dropdown', data: () => this.paymentLovData, maxlength: 3000 },
                        ],
                    },
                ];
            }
        } else if (this.isTrue) {
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
                            columnName: "acCode",
                            size: 3,
                            labelCode: "acCode",
                            type: "dropdown",
                            data: () => this.iac4LovData,
                            valueChange: (event) => this.acCodeValueChange(),
                        },
                        {
                            columnName: "acName",
                            size: 3,
                            labelCode: "acName",
                            isDisabled: true,
                            maxlength: 50,
                        },
                        {
                            columnName: "Narration",
                            labelCode: "Narration",
                            size: 6,
                            type: "text",
                            maxlength: 30,
                        },
                    ],
                },
            ];
        } else if (this.branchSelection.iintValues.intLogic.trim() == "SAS") {
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
                        // { columnName: 'refNo', labelCode: 'refNo', size: 3, maxlength: 30 },
                        {
                            columnName: "salesman",
                            size: 3,
                            labelCode: "salesman",
                            type: "dropdown",
                            data: () => this.salesManLovData,
                        },
                        {
                            columnName: "status",
                            size: 3,
                            labelCode: "status",
                            type: "dropdown",
                            data: () => this.statusLovData,
                        },
                        {
                            columnName: "acCode",
                            size: 3,
                            labelCode: "acCode",
                            type: "dropdown",
                            data: () => this.iac4LovData,
                            valueChange: (event) => this.acCodeValueChange(),
                        },
                        {
                            columnName: "acName",
                            size: 3,
                            labelCode: "acName",
                            isDisabled: true,
                            maxlength: 50,
                        },
                        {
                            columnName: "billNo",
                            labelCode: "billNo",
                            mandatory: true,
                            size: 3,
                            maxlength: 11,
                            type: "number",
                        },
                        {
                            columnName: "billDate",
                            size: 3,
                            labelCode: "billDate",
                            mandatory: true,
                            type: "date",
                            maxlength: 4,
                        },
                        {
                            columnName: "lpoNo",
                            labelCode: "LPONo.",
                            size: 3,
                            maxlength: 11,
                            type: "number",
                        },
                        {
                            columnName: "lpoDate",
                            size: 3,
                            labelCode: "LPODate",
                            type: "date",
                            maxlength: 4,
                        },
                        {
                            columnName: "narration",
                            size: 9,
                            labelCode: "narration",
                            maxlength: 3000,
                        },
                        {
                            columnName: "crPeriod",
                            labelCode: "crPeriod",
                            size: 3,
                            maxlength: 11,
                            type: "number",
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
                            columnName: "curCode",
                            size: 3,
                            labelCode: "curCode",
                            type: "dropdown",
                            data: () => this.currencyLovData,
                            valueChange: (event) => this.onCurCodeChange(),
                            maxlength: 5,
                        },
                        {
                            columnName: "curRate",
                            size: 3,
                            labelCode: "curRate",
                            maxlength: 11,
                        },

                        // { columnName: 'vat', labelCode: 'vat', size: 3, maxlength: 50, type: 'check', valueChange: (event) => this.vatValueChange(event) },
                        // { columnName: 'vatAmt', labelCode: 'vatAmt', size: 3, type: 'currency', maxlength: 18 },
                        // { columnName: 'deliveryTerms', size: 3, labelCode: 'deliveryTerms', type: 'dropdown', data: () => this.iitermsLovData, maxlength: 3000 },
                        // { columnName: 'paymentTerms', size: 3, labelCode: 'paymentTerms', type: 'dropdown', data: () => this.paymentLovData, maxlength: 3000 },
                    ],
                },
            ];
        } else {
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
                        // { columnName: 'refNo', labelCode: 'refNo', size: 3, maxlength: 30 },
                        // { columnName: 'refDate', labelCode: 'refDate', size: 3, type: 'date' },
                        {
                            columnName: "status",
                            size: 3,
                            labelCode: "status",
                            type: "dropdown",
                            data: () => this.statusLovData,
                        },
                        {
                            columnName: "acCode",
                            size: 3,
                            labelCode: "acCode",
                            type: "dropdown",
                            data: () => this.iac4LovData,
                            valueChange: (event) => this.acCodeValueChange(),
                        },
                        {
                            columnName: "acName",
                            size: 3,
                            labelCode: "acName",
                            isDisabled: true,
                            maxlength: 50,
                        },
                        {
                            columnName: "billNo",
                            labelCode: "billNo",
                            mandatory: true,
                            size: 3,
                            maxlength: 11,
                            type: "number",
                        },
                        {
                            columnName: "billDate",
                            size: 3,
                            labelCode: "billDate",
                            mandatory: true,
                            type: "date",
                            maxlength: 4,
                        },
                        {
                            columnName: "lpoNo",
                            labelCode: "LPONo.",
                            size: 3,
                            maxlength: 11,
                            type: "number",
                        },
                        {
                            columnName: "lpoDate",
                            size: 3,
                            labelCode: "LPODate",
                            type: "date",
                            maxlength: 4,
                        },
                        {
                            columnName: "narration",
                            size: 9,
                            labelCode: "narration",
                            maxlength: 3000,
                        },
                        {
                            columnName: "crPeriod",
                            labelCode: "crPeriod",
                            size: 3,
                            maxlength: 11,
                            type: "number",
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
                            columnName: "curCode",
                            size: 3,
                            labelCode: "curCode",
                            type: "dropdown",
                            data: () => this.currencyLovData,
                            valueChange: (event) => this.onCurCodeChange(),
                            maxlength: 5,
                        },
                        {
                            columnName: "curRate",
                            size: 3,
                            labelCode: "curRate",
                            maxlength: 11,
                        },

                        // { columnName: 'vat', labelCode: 'vat', size: 3, maxlength: 50, type: 'check', valueChange: (event) => this.vatValueChange(event) },
                        // { columnName: 'vatAmt', labelCode: 'vatAmt', size: 3, type: 'currency', maxlength: 18 },
                        // { columnName: 'deliveryTerms', size: 3, labelCode: 'deliveryTerms', type: 'dropdown', data: () => this.iitermsLovData, maxlength: 3000 },
                        // { columnName: 'paymentTerms', size: 3, labelCode: 'paymentTerms', type: 'dropdown', data: () => this.paymentLovData, maxlength: 3000 },
                    ],
                },
            ];
        }

        if (!this.isTrue) {
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
        await this._uiService.getDataInLovFormat(apiUrl.iac4,2,null,{ labelFeild: "acCode", codeFeilds: "acCode" },true).then((res) => {
                this.iac4LovData = res;
            });

            await this._uiService.getDataInLovFormat(apiUrl.salesman,2,null,{ labelFeild: "name", codeFeilds: "code" },true).then((res) => {
            this.salesManLovData = res;
            
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


    selectedProduct: any = ''
    products: any = ''
    showDialog() {

        this.visible = true;

        this._purchaseOrderService.searchList(this.branchSelection.icoValues.coCode, this.branchSelection.idvValues.dvCode, this.branchSelection.ibrValues.brCode, this.branchSelection.iintValues.refInt).then(res => {
            this.products = res;
            this.dataCp = res['data'];
        })
    }

    product = [];

    onChangeNo(value) {
        this.products.data = this.dataCp
        this.product = this.products.data;
        this.products.data = this.product.filter(item => item.vrNo.toLowerCase().includes(value.toLowerCase()));
    }
    onChangeDate(value) {
        this.products.data = this.dataCp
        this.product = this.products.data;
        this.products.data = this.product.filter(item => item.vrDate.toLowerCase().includes(value.toLowerCase()));
    }
    onChangeAcc(value) {
        this.products.data = this.dataCp
        this.product = this.products.data;
        this.products.data = this.product.filter(item => item.acName.toLowerCase().includes(value.toLowerCase()));
    }
    globalSearch(value) {
        this.products.data = this.dataCp
        this.product = this.products.data;
        this.products.data = this.product.filter(item => {
            return item.acName.toLowerCase().includes(value.toLowerCase()) ||
                item.vrDate.toLowerCase().includes(value.toLowerCase()) ||
                item.vrNo.toLowerCase().includes(value.toLowerCase());
        });
    }
    async onRowClick(product) {
        this.visible = false;
        await this._purchaseOrderService.search(product.coCode, product.dvCode, product.brCode, product.intCode, parseFloat(product.vrNo)).then(async res => {
            this.service.header.aidetail = await res.iipodetail;
            for (let i = 0; i < this.service.header.aidetail.length; i++) {
                this.service.header.aidetail[i].interBrCode = res.iipodetail[i].brCode;
                this.service.header.aidetail[i].storeCode = res.iipodetail[i].srNo;
                this.service.header.vrNo = res.iipodetail[i].vrNo;
                this.service.header.acName = res.acName
                this.service.header.acCode = res.acCode
                this.service.header.aidetail[i].itemDesc = res.iipodetail[i].itemName;
            }
        })
    }

    async decSearch(event: any) {
        this.decimalSearch = event.target.value;
        await this._service.search(this.branchSelection?.icoValues?.coCode, this.branchSelection?.idvValues?.dvCode, this.branchSelection?.ibrValues?.brCode, this.branchSelection?.iintValues?.intCode, this.decimalSearch).then(async res => {
            this.service.header = await res;
            if (!Boolean(res)) {
                await this.messageService.add({ severity: 'error', summary: 'Error', detail: this._errorTranslateService.translate("vrNoNotFound") });
            }
        }, err => {
            // console.warn("err========", err);
        });

    }

}
