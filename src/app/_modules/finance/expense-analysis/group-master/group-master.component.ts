import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { ActionService, FormService, ICTFormPageBean, Toast } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { IaexpgroupDto } from 'src/app/_dto/iaexpgroup.dto';
import { IaexpsubgroupDto } from 'src/app/_dto/iaexpsubgroup.dto';
import { ExpenseGroupService } from 'src/app/_providers/expense-group.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-group-master',
  templateUrl: './group-master.component.html',
  styleUrls: ['./group-master.component.scss']
})
export class GroupMasterComponent extends ICTFormPageBean implements OnInit {

  DIALOG_TITLE = "Expense Group Master"
  API_END_URL = apiUrl.iaexpsubgroup;
  PRIMARY_KEYS = ["coCode", "groupCode", "code"];
  key = "code";
  pagination: boolean = true;
  searchPopupColumns = [
    { field: 'code', header: 'Sub Group Code', width: '4em' },
    { field: 'name', header: 'Sub Group Name', width: '6em' },
  ];

  selectedFile: TreeNode;
  groupMasterData: TreeNode[] = [];

  isDisabled: boolean = false;
  isDisabled2: boolean = false;

  level1: IaexpgroupDto;
  level2: IaexpsubgroupDto;

  columnMetaData: FormAlignerDto[] = [];
  subGroupMetaData: FormAlignerDto[] = [];
  statusList: SelectItem[] = [];
  categoryList: SelectItem[] = [];

  constructor(
    public service: FormService,
    private _actionService: ActionService,
    private _service: ExpenseGroupService,
    private _messageService: MessageService,
    private _errorTanslateService: ErrorTranslateService,
    private _lang: LangaugeTranslateService,
    private _ui: UiService
  ) {
    super(service, _actionService);
    this.actionService.currentComponent = this;
    _actionService.headerDto = IaexpgroupDto;
    this.getLovData();
    this.getColumnInfo();
  }

  async ngOnInit(): Promise<void> {
    this.groupMasterData = [];
    await this._service.getLevel1().then((res) => {

      this.groupMasterData.push({
        label: 'Expense Group Master', data: { level: 0 },
        expanded: true,
        children: this.getNodeCompactable(res, ["code", "name"], 1),
        expandedIcon: "ui-icon-folder-open",
        collapsedIcon: "ui-icon-folder"
      });
    }, (err) => {
      // console.warn("==err==", err);
    });
  }

  async preCreateInsert(): Promise<boolean> {
    if (!this.selectedFile) {
      // this._actionService.showToast(Toast.INFO, 'Expense Group Master', 'Please select any Level');
      return false;
    }
    else {
      if (this.selectedFile.data.level == 2) {
        await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("cannotCreateanySublevel") });
        return false;
      }
      if (this.selectedFile.data.level === 0)
        this._actionService.headerDto = IaexpgroupDto;
      if (this.selectedFile.data.level === 1)
        this._actionService.headerDto = IaexpsubgroupDto;
    }
    return true;
  }


  async postCreateInsert(): Promise<void> {
    const event = { node: {} };
    event.node = this.selectedFile;
    await this.nodeExpand(event);
    this.service.header["level"] = this.selectedFile.data.level + 1;
    this.selectedFile.expanded = true;
    let newRow: any;
    if (this.selectedFile.data.level === 0) {
      this.level1 = this.service.header;
      newRow = {
        label: this.level1.code, data: this.level1, children: [], parent: this.selectedFile,
        expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder"
      };
      this.isDisabled = false;
    }

    if (this.selectedFile.data.level == 1) {
      this.service.header.groupCode = this.selectedFile.data.code;
      this.level2 = this.service.header;
      newRow = {
        label: this.level2.code, data: this.level2, children: [], parent: this.selectedFile,
        expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder"
      }
      this.isDisabled2 = false;
    }
    this.selectedFile.children.push(newRow);
    this.selectedFile = newRow;
    event.node = this.selectedFile;
    // this.nodeSelect(event);
  }

  async preSave() {
    if (!this.selectedFile) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("Pleaseselectanyrow") });
      return;
    }
    let level = this.selectedFile.data.level;
    if (level > 0 && !this.level1.code) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("grpCodeCannotbeBlank") });
      return;
    }
    if (level > 0 && !this.level1.name) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("grpNameCannotbeBlank") });
      return;
    }
    if (level > 0 && !this.level1.status) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("statusCannotbeBlank") });
      return;
    }
    if (level > 1 && !this.level2.code) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("subGrpCodeCannotbeBlank") });
      return;
    }
    if (level > 1 && !this.level2.name) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("subGrpNameCannotbeBlank") });
      return;
    }
    if (level > 1 && !this.level2.status) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("statusCannotbeBlank") });
      return;
    }
    // if (level > 1 && !this.level2.catCode) {
    //   await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("categoryCannotbeBlank") });
    //   return;
    // }

    this.service.header = this.selectedFile.data;
    this.API_END_URL = level == 1 ? apiUrl.iaexpgroup : apiUrl.iaexpsubgroup;
    return true;
  }

  async postSave(): Promise<void> {
    this.selectedFile = this.selectedFile.parent;
    this.selectedFile.children = [{}];
    this.API_END_URL = apiUrl.iaexpsubgroup;
    this.PRIMARY_KEYS = ["coCode", "groupCode", "code"];
    // this.PRIMARY_KEYS = ["coCode", "code"];
    if (this.selectedFile.data.level === 0)
      this.ngOnInit();
    else
      await this.nodeExpand({ node: this.selectedFile })
  }

  async preDelete(): Promise<boolean> {
    if (!this.selectedFile) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("pleaseselectanyrow") });
      return;
    }
    await this.nodeExpand({ node: this.selectedFile });
    if (this.selectedFile.children.length > 0) {
      await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("childrenExist") });
      return;
    }

    this.service.header = this.selectedFile.data;
    let level = this.selectedFile.data.level;
    this.API_END_URL = level == 1 ? apiUrl.iaexpgroup : apiUrl.iaexpsubgroup
    this.key = "code";
    this.PRIMARY_KEYS = level == 1 ? ["coCode", this.key] : ["coCode", "groupCode", this.key];
    return true; return true;
  }

  async postDelete(): Promise<void> {
    this.selectedFile = this.selectedFile.parent;
    this.selectedFile.children = [{}];
    this.API_END_URL = apiUrl.iaexpsubgroup;
    this.PRIMARY_KEYS = ["coCode", "groupCode", "code"];
    this.key = "code";
    if (this.selectedFile.data.level === 0)
      this.ngOnInit();
    else
      await this.nodeExpand({ node: this.selectedFile })
  }

  async postSearch(): Promise<void> {
    const event = { node: {} };
    this.groupMasterData[0].children.forEach(async (row) => {
      if (row.data.coCode == this.service.header.coCode && row.data.code == this.service.header.groupCode) {
        this.groupMasterData[0].expanded = true;
        row.parent = this.groupMasterData[0];
        row.expanded = true;
        event.node = row;
        await this.nodeExpand(event);

        row.children.forEach(async (row2) => {
          if (row2.data.coCode == this.service.header.coCode && row2.data.code == this.service.header.code) {
            row2.parent = row;
            event.node = row2;
            this.nodeSelect(event);
            this.selectedFile = row2;
          }
        });

      } else {
        row.expanded = false;
      }
    })
  }

  nodeSelect(event) {
    if (this.selectedFile) {
      if (this.selectedFile.data.level === 1) {
        this.isDisabled = true;
      }if (this.selectedFile.data.level === 2) {
        this.isDisabled = true;
        this.isDisabled2 = true;
      }
    }
    this.setLevelData(event.node);
  }


  async nodeUnselect(event) {
    // this._actionService.showToast(Toast.INFO, 'Node Unselected', event.node.label);
    await this._messageService.add({ severity: 'info', summary: 'Expense Group Master', detail: this._errorTanslateService.translate("userConfirmPasswordcannotbeBlank") });
  }

  async nodeExpand(event) {
    if (event.node) {
      if (event.node.children && (event.node.children.length > 1 || event.node.children.length == 0
        || (event.node.children.length == 1 && (event.node.children[0].level))))
        return;
      if (event.node.data.level == 1)
        await this._service.getLevel2(event.node.data.code).then((res) => {
          event.node.children = this.getNodeCompactable(res, ["code", "name"], 2);
        }, (err) => {
          // console.warn("==err==", err);
        });
    }
  }

  setLevelData(node: any) {
    if (node.data.level == 0) return
    if (node.data.level == 1)
      this.level1 = node.data;
    if (node.data.level == 2)
      this.level2 = node.data;

    if (node.data.level != 0)
      this.setLevelData(node.parent);
  }

  getNodeCompactable(data: any[], labelColumnNames: string[], level: number): TreeNode[] {
    data = data['data'];
    let demo: TreeNode[] = [];
    if (data)
      data.forEach((row) => {
        let label1 = "";
        label1 = labelColumnNames.reduce((sum, current) => sum + (sum ? " " : "") + row[current], "");
        row["level"] = level;
        demo.push({
          label: label1, data: row, children: level == 2 ? [] : [{}], expandedIcon: "ui-icon-folder-open",
          collapsedIcon: "ui-icon-folder"
        });
      });
    return demo;
  }

  getColumnInfo() {
    this.columnMetaData = [
      {
        type: 'group', size: 12, label: "", groupColumnMetaData: [
          { columnName: 'code', size: 4, labelCode: 'grpCode', mandatory: true, maxlength: 10, disableExpression: () => this.isDisabled },
          { columnName: 'name', mandatory: true, size: 8, labelCode: 'grpName', maxlength: 50 },
          { columnName: 'status', mandatory: true, size: 4, labelCode: 'status', type: 'dropdown', data: () => this.statusList },
        ]
      }
    ]
    this.subGroupMetaData = [
      {
        type: 'group', size: 12, label: "", groupColumnMetaData: [
          { columnName: 'code', size: 4, labelCode: 'subGroupCode', mandatory: true, maxlength: 10, disableExpression: () => this.isDisabled2 },
          { columnName: 'name', mandatory: true, size: 8, labelCode: 'subGroupName', maxlength: 50 },
          { columnName: 'status', mandatory: true, size: 4, labelCode: 'status', type: 'dropdown', data: () => this.statusList },
          // { type: 'skip', size: 2 },
          { columnName: 'catCode', size: 4, labelCode: 'category', type: 'dropdown', data: () => this.categoryList },
        ]
      }
    ]
  }

  async getLovData() {
    this.statusList = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("open"), labelPl: this._lang.first("open"), labelSl: this._lang.second("open"), value: "O" },
      { label: this._lang.first("closed"), labelPl: this._lang.first("closed"), labelSl: this._lang.second("closed"), value: "C" }
    ];

    await this._ui.getDataInLovFormat(apiUrl.iacat, 2, null, null, true).then(res => {
      this.categoryList = res;
    })
  }
}
