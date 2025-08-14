import { ConfirmationService, MessageService } from 'primeng/api';
import { ReportConfigurationService } from './../../../_providers/report-configuration.service';
import { Component, OnInit } from '@angular/core';
import { IrepparamDto } from 'src/app/_dto/irepparam.dto';
import { SelectItem, FormAlignerDto } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { UiService } from '@accurate/ui';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-reprt-configuration',
  templateUrl: './reprt-configuration.component.html',
  styleUrls: ['./reprt-configuration.component.scss']
})
export class ReprtConfigurationComponent implements OnInit {

  selectedReportConfig = new IrepparamDto();
  menuIdList: SelectItem[] = [];
  visibilityLov: SelectItem[] = [];
  optionTypeLov: SelectItem[] = [];
  configMetaData: FormAlignerDto[] = [];
  allConfigData: IrepparamDto[] = [];
  totalRecords: number;
  take: number = 10;
  searchTimer: any;
  meuId: string = '';
  configDialog: boolean = false;
  isUpdate: boolean;
  titleCode: string = 'reportConfiguration';
  helpCode: string = 'reportConfigurationHelp'

  constructor(
    private _reportConfigService: ReportConfigurationService,
    public _lang: LangaugeTranslateService,
    private _errorTranslateService: ErrorTranslateService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _uiService: UiService
  ) {
    this.getColumnMetaData();
  }

  async ngOnInit(): Promise<void> {
    this.selectedReportConfig = new IrepparamDto();
    await this._reportConfigService.getDataInLovFormat2(apiUrl.reportMenuId, 2, null, { codeFeilds: 'menuId', labelFeild: 'menuId' }).then(res => {
      this.menuIdList = res;
    }, (err) => {
      this._uiService.handleError(err.error.message);
    })
  }

  async loadData(event, where, skip: number, take: number, order) {
    await this._reportConfigService.getDataInLovFormat2(apiUrl.reportMenuId, 2, null, { codeFeilds: 'menuId', labelFeild: 'menuId' }).then(res => {
      this.menuIdList = res;
    }, (err) => {
      this._uiService.handleError(err.error.message);
    })
    if (this.meuId) {
      await this._reportConfigService.getMasterData(`${apiUrl.reportParam}?${where ? (where + "&") : ""}skip=${skip}&take=${this.take}`).then(res => {
        this.allConfigData = res;
        this.totalRecords = res.length;
      }, (err) => {
        this._uiService.handleError(err.error.message);
      })
    } else {
      this.allConfigData = [];
    }

  }


  getTypLabel(type: string) {
    const typeLabel = this.optionTypeLov.find((row) => row.value == type);
    if (typeLabel)
      return typeLabel.label;
  }

  getTrueFalsebel(type: string) {
    const trueFalseLabel = this.visibilityLov.find((row) => row.value == type);
    if (trueFalseLabel)
      return trueFalseLabel.label;
  }

  searchTimeOut() {
    if (this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.updateResults(null)
    }, 1000);
  }

  async updateResults(event) {
    let skip
    if (!event || event == null) {
      skip = 0;
      this.take;
    }
    else
      skip = event.first;
    let where
    let order
    if (this.meuId) {
      if (where)
        where = `&where[${'menuId'}]=${this.meuId}`
      else
        where = `where[${'menuId'}]=${this.meuId}`
    }

    this.loadData(null, where, skip, this.take, order)
  }


  addNew() {
    this.configDialog = true;
    this.isUpdate = false;
    this.selectedReportConfig = new IrepparamDto();
    if (this.meuId) {
      this.selectedReportConfig.menuId = this.meuId;
    }
  }

  editConfig(data: IrepparamDto) {
    this.isUpdate = true;
    this.configDialog = true;
    this.selectedReportConfig = data;
  }


  hideDialog() {
    this.configDialog = false;
  }


  async preSave(): Promise<boolean> {
    if (!this.selectedReportConfig.menuId || this.selectedReportConfig.menuId == '') {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('menuIdNotNull') });
      return false;
    }
    if (!this.selectedReportConfig.optionName || this.selectedReportConfig.optionName == '') {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('optionNameNotNull') });
      return false;
    }

    return true;
  }


  async saveConfig() {
    if (!(await this.preSave())) {
      return
    }
    if (this.isUpdate == true) {
      this._reportConfigService.updateConfigData(`${apiUrl.reportParam}/${this.selectedReportConfig.optionName}?where[menuId]=${this.selectedReportConfig.menuId}`, this.selectedReportConfig).then(res => {
        this.configDialog = false;
        this.searchTimeOut();
        setTimeout(async () => {
          await this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate('updateSuccess') });
        }, 1000);
      }, (err) => {
        // console.warn("===err===", err);
        this._uiService.handleError(err.error.message);
      })
    }
    else if (this.isUpdate == false) {
      this._reportConfigService.saveConfigData(apiUrl.reportParam, this.selectedReportConfig).then(res => {
        this.configDialog = false;
        this.searchTimeOut();
        setTimeout(async () => {
          await this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate('saveSuccess') });
        }, 1000);
      }, (err) => {
        // console.warn("===err===", err);
        this._uiService.handleError(err.error.message);
      })
    }
  }


  async delete(data: IrepparamDto) {
    this._confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this._reportConfigService.deleteConfig(`${apiUrl.reportParam}/${data.optionName}?where[menuId]=${data.menuId}`).then(async (res) => {
          this.searchTimeOut();
          setTimeout(async () => {
            await this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate('deleteSuccess') });
          }, 1000);
        }, (err) => {
          // console.warn("==er===", err);
          this._uiService.handleError(err.error.message);
        }
        );
      }
    });
  }


  getColumnMetaData() {
    this.configMetaData = [
      {
        type: 'group', size: 12, label: '', groupColumnMetaData: [
          { columnName: 'menuId', size: 6, labelCode: 'menuId', maxlength: 30, mandatory: true, },
          { columnName: 'optionName', size: 6, labelCode: 'optionName', maxlength: 500, mandatory: true, disableExpression: () => this.isUpdate },
          { columnName: 'optionLabel', size: 6, labelCode: 'optionLabel', maxlength: 2000 },
          { columnName: 'optionValue', size: 6, labelCode: 'optionValue', maxlength: 200 },
          { columnName: 'defaultValue', size: 6, labelCode: 'defaultValue', maxlength: 200 },
          { columnName: 'optionTitle', size: 6, labelCode: 'optionTitle', maxlength: 100 },
          { columnName: 'visibility', size: 6, labelCode: 'visibility', maxlength: 5, type: 'dropdown', data: () => this.visibilityLov },
          { columnName: 'optionType', size: 6, labelCode: 'optionType', maxlength: 30, type: 'dropdown', data: () => this.optionTypeLov },
          { columnName: 'criteria', size: 6, labelCode: 'criteria', maxlength: 200 },
          { columnName: 'optionId', size: 6, labelCode: 'optionId', maxlength: 30 },
          { columnName: 'reportFile', size: 12, labelCode: 'reportFile', maxlength: 500 },
        ]
      }
    ]

    this.visibilityLov = [
      { label: 'True', value: 'true' },
      { label: 'False', value: 'false' },
    ]

    this.optionTypeLov = [
      { label: 'Select Type', value: '' },
      { label: 'Tab', value: 'tab' },
      { label: 'Check Box', value: 'checkbox' },
      { label: 'Radio', value: 'radio' },
      { label: 'Date', value: 'date' },
      { label: 'Age', value: 'agefield' },
      { label: 'File', value: 'file'}
    ]
  }

  paginateScrollUp(event) {
    window.scrollTo(0, 0);
  }


}
