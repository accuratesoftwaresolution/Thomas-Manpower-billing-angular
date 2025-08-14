import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { ActionService, FormService, ICTFormPageBean, Toast } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { Iac1Dto } from 'src/app/_dto/iac1.dto';
import { Iac2Dto } from 'src/app/_dto/iac2.dto';
import { Iac3Dto } from 'src/app/_dto/iac3.dto';
import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { IccountryDto } from 'src/app/_dto/iccountry.dto';
import { IcsalesmanDto } from 'src/app/_dto/icsalesman.dto';
import { IacatLovDto } from 'src/app/_dto/lov/iacat-lov.dto';
import { IcareaLovDto } from 'src/app/_dto/lov/icarea-lov.dto';
import { IccityLovDto } from 'src/app/_dto/lov/iccity-lov.dto';
import { IcdebtcollectorLovDto } from 'src/app/_dto/lov/icdebtcollector-lov.dto';
import { IcterritoryLovDto } from 'src/app/_dto/lov/icterritory-lov.dto';
import { IdeptLovDto } from 'src/app/_dto/lov/idept-lov.dto';
import { IjjobLovDto } from 'src/app/_dto/lov/ijjob-lov.dto';
import { LovDto } from 'src/app/_dto/lov/lov.dto';
import { AccountsService } from 'src/app/_providers/accounts.service';
import { IccurrencyService } from 'src/app/_providers/iccurrency.service';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-account-master',
  templateUrl: './account-master.component.html',
  styleUrls: ['./account-master.component.scss']
})
export class AccountMasterComponent extends ICTFormPageBean implements OnInit {

  selectedFile: TreeNode;
  level1: Iac1Dto;
  level2: Iac2Dto;
  level3: Iac3Dto;
  level4: Iac4Dto;
  accountsData: TreeNode[] = [];

  yesNoLovData: LovDto[] = [
    { label: this._lang.first("yes"), value: 'Y' },
    { label: this._lang.first("no"), value: 'N' }
  ];

  subLedgerLovDate: LovDto[] = [
    { label: this._lang.first("na"), value: 'N' },
    { label: this._lang.first("debtor"), value: 'D' },
    { label: this._lang.first("creditor"), value: 'C' },
    { label: this._lang.first("asset"), value: 'A' },
    { label: this._lang.first("employee"), value: 'E' },
  ];

  statusLovData: LovDto[] = [
    { label: this._lang.first("active"), value: 'A' },
    { label: this._lang.first("inactive"), value: 'I' },
  ];

  ijjobLovData: IjjobLovDto[] = [];
  ijjobLovCols = [
    { field: 'jobCode', header: 'Job Code', width: '20%' },
    { field: 'jobName', header: 'Job Name', width: '  60%' },
    { field: 'mJobCode', header: 'M Job Name', width: '20%' },
  ];

  accountsCatLovData: IacatLovDto[] = [];
  accountsCatLovCols = [
    { field: 'code', header: 'Code', width: '30%' },
    { field: 'name', header: 'Category Name', width: '40%' },
    { field: 'groupCode', header: 'Group Code', width: '30%' },
  ];

  areaLovData: IcareaLovDto[] = [];
  areaLovCols = [
    { field: 'code', header: ' Code', width: '40%' },
    { field: 'name', header: ' Name', width: '  60%' },
  ];

  icsalesmanLovData: IcsalesmanDto[] = [];
  icsalesmanLovCols = [
    { field: 'code', header: ' Code', width: '30%' },
    { field: 'name', header: ' Name', width: '50%' },
    { field: 'status', header: ' Status', width: '20%' }
  ];

  iccountryLovData: IccountryDto[] = [];
  iccountryLovCols = [
    { field: 'code', header: ' Code', width: '50%' },
    { field: 'name', header: ' Name', width: '50%' }
  ];

  icterritoryLovData: IcterritoryLovDto[] = [];
  icterritoryLovCols = [
    { field: 'code', header: ' Code', width: '50%' },
    { field: 'name', header: ' Name', width: '50%' }
  ];

  iccityLovData: IccityLovDto[] = [];
  iccityLovCols = [
    { field: 'code', header: ' Code', width: '50%' },
    { field: 'name', header: ' Name', width: '50%' }
  ];

  icdebtcollectorLovData: IcdebtcollectorLovDto[] = [];
  icdebtcollectorLovCols = [
    { field: 'code', header: ' Code', width: '50%' },
    { field: 'name', header: ' Name', width: '50%' }
  ];

  ideptLovData: IdeptLovDto[] = [];
  ideptLovCols = [
    { field: 'code', header: ' Code', width: '50%' },
    { field: 'name', header: ' Name', width: '50%' }
  ];

  currencyLovData: LovDto[] = [];
  alphabetLovData: LovDto[] = [];

  isDisabled: boolean = false;
  isDisabled2: boolean = false;
  isDisabled3: boolean = false;
  isDisabled4: boolean = false;

  isRac: boolean = true;

  DIALOG_TITLE = "Account Master"
  API_END_URL = apiUrl.iac4;
  PRIMARY_KEYS = ["coCode", "acCode"];
  key = "acCode";
  pagination: boolean = true;
  searchPopupColumns = [
    { field: 'acCode', header: 'Ac Code.', width: '4em' },
    { field: 'acName', header: 'Ac Name', width: '6em' },
    // { field: 'brCode', header: 'BR.', width: '2em' },
    // { field: 'brName', header: 'Branch Name', width: '6em' },
    // { field: 'brShrtName', header: 'Short Name', width: '4em' },
  ];

  constructor(
    public service: FormService,
    private _actionService: ActionService,
    private _service: AccountsService,
    private _popUpLovService: PopUpLovService,
    private _currencyService: IccurrencyService,
    private _messageService: MessageService,
    private _errorTanslateService: ErrorTranslateService,
    private _lang: LangaugeTranslateService
  ) {
    super(service, _actionService);
    this.actionService.currentComponent = this;
    _actionService.headerDto = Iac4Dto;
  }

  async ngOnInit(): Promise<void> {
    this.accountsData = [];
    await this.initialize();
    await this._service.getAccountsLevel1().then((res) => {
      this.accountsData.push({
        label: 'Account Master', data: { level: 0 },
        expanded: true,
        children: this.getNodeCompactable(res, ["ac1Code", "ac1Name"], 1),
        expandedIcon: "ui-icon-folder-open",
        collapsedIcon: "ui-icon-folder"
      });
      // this.accountsData = this.getNodeCompactable(res, ["ac1Code", "ac1Name"], 1);
    }, (err) => {
      //  console.warn("==err==", err);
    });

  }

  async preCreateInsert(): Promise<boolean> {
    if (!this.selectedFile) {
      // this._actionService.showToast(Toast.INFO, 'Account Master', 'Please select any Level');
      return false;
    }
    else {
      if (this.selectedFile.data.level === 4) {
        await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("cannotCreateanySublevel") });
        return false;
      }
      if (this.selectedFile.data.level === 0)
        this._actionService.headerDto = Iac1Dto;
      if (this.selectedFile.data.level === 1)
        this._actionService.headerDto = Iac2Dto;
      if (this.selectedFile.data.level === 2)
        this._actionService.headerDto = Iac3Dto;
      if (this.selectedFile.data.level === 3)
        this._actionService.headerDto = Iac4Dto;

    }

    return true;
  }

  async preSave(): Promise<boolean> {
    if (!this.selectedFile) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("Pleaseselectanyrow") });
      return;
    }
    let level = this.selectedFile.data.level;
    if (level > 0 && !this.level1.ac1Code) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac1Codecan'tbeBlank") });
      return;
    }
    if (level > 0 && this.level1.ac1Code && this.level1.ac1Code.trim().length != 1) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac1CodelengthShouldbe1") });
      return;
    }
    if (level > 0 && !this.level1.ac1Name) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac1Namecan'tbeBlank") });
      return;
    }
    if (level > 1 && !this.level2.ac2Code) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac2Codecan'tbeBlank") });
      return;
    }
    if (level > 1 && this.level2.ac2Code && this.level2.ac2Code.trim().length != 2) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac2CodeShouldbe2") });
      return;
    }
    if (level > 1 && !this.level2.ac2Name) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac2Namecan'tbeBlank") });
      return;
    }
    if (level > 2 && !this.level3.ac3Code) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac3Codecan'tbeBlank") });
      return;
    }
    if (level > 2 && this.level3.ac3Code && this.level3.ac3Code.trim().length != 4) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac3CodelengthShouldbe4") });
      return;
    }
    if (level > 2 && !this.level3.ac3Name) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("ac3Namecan'tbeBlank") });
      return;
    }
    if (level > 3) {
      this.level4.sysuser = "SYSTEM"
    }
    if (level > 3 && !this.level4.acCode) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("acCodecan'tbeBlank") });
      return;
    }
    if (level > 3 && this.level4.acCode.trim().length != 9) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("acCodelengthshouldbe9") });
      return;
    }
    if (level > 3 && !this.level4.acName) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("acNamecan'tbeBlank") });
      return;
    }

    if (level > 3 && this.level3.alphabet == 'Y' && (!this.level4.alphabet || this.level4.alphabet.trim() == "")) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("alphabetcannotbeBlank") });
      return;
    }

    if (level > 3 && !this.level4.curCode) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("currencycannotbeBlank") });
      return;
    }
    if (level > 3 && (!this.level4.acCat || this.level4.acCat.trim() == "")) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("categorycannotbeBlank") });
      return;
    }

    if (level > 3 && this.isDebitorCreditor() && (!this.level4.countryCode || this.level4.countryCode.trim() == "")) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("countrycannotbeBlank") });
      return;
    }

    this.service.header = this.selectedFile.data;
    this.API_END_URL = apiUrl["iac" + level];
    this.key = "ac" + (level == 4 ? "" : level) + "Code";
    this.PRIMARY_KEYS = ["coCode", this.key];

    if (level > 0 && this.level1.ac1Name) {
      this.level1.ac1Name = this.level1.ac1Name.trim().toUpperCase();
    }
    if (level > 1 && this.level2.ac2Name) {
      this.level2.ac2Name = this.level2.ac2Name.trim().toUpperCase();
    }
    if (level > 2 && this.level3.ac3Name) {
      this.level3.ac3Name = this.level3.ac3Name.trim().toUpperCase();
    }
    if (level > 3 && this.level4.acName) {
      this.level4.acName = this.level4.acName.trim().toUpperCase();
    }
    if (level > 3 && this.level4.curCode) {
      this.level4.curCode = this.level4.curCode.trim();
    }

    return true;
  }

  async preDelete(): Promise<boolean> {
    if (!this.selectedFile) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("pleaseselectanyrow") });
      return;
    }
    await this.nodeExpand({ node: this.selectedFile });
    if (this.selectedFile.children.length > 0) {
      await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("childrenExist") });
      return;
    }
    this.service.header = this.selectedFile.data;
    let level = this.selectedFile.data.level;
    this.API_END_URL = apiUrl["iac" + level];
    this.key = "ac" + (level == 4 ? "" : level) + "Code";
    this.PRIMARY_KEYS = ["coCode", this.key];

    return true;
  }
  //Modified by Ajith A Pradeep
  //Modified For account number series
  //Modified on 14/12/2021
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
        label: this.level1.ac1Code, data: this.level1, children: [], parent: this.selectedFile,
        expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder"
      };
      this.isDisabled = false;
      if (this.selectedFile.children.length > 0) {
        this.level1.ac1Code = (parseFloat(this.selectedFile.children[this.selectedFile.children.length - 1].data.ac1Code) + 1).toString()
      }
    }

    if (this.selectedFile.data.level === 1) {
      this.service.header.ac1Code = this.selectedFile.data.ac1Code;
      this.level2 = this.service.header;
      newRow = {
        label: this.level2.ac2Code, data: this.level2, children: [], parent: this.selectedFile,
        expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder"
      }
      this.isDisabled2 = false;
      // if (this.selectedFile.children[this.selectedFile.children.length - 1].data) {
      if (this.selectedFile.children.length > 0) {
        this.level2.ac2Code = (parseFloat(this.selectedFile.children[this.selectedFile.children.length - 1].data.ac2Code) + 1).toString()
      }
      else {
        this.level2.ac2Code = this.level2.ac1Code + "00"
      }
    }

    if (this.selectedFile.data.level === 2) {
      this.service.header.ac1Code = this.selectedFile.data.ac1Code;
      this.service.header.ac2Code = this.selectedFile.data.ac2Code;
      this.level3 = this.service.header;
      newRow = {
        label: this.level3.ac3Code, data: this.level3, children: [], parent: this.selectedFile,
        expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder"
      }
      this.isDisabled3 = false;
      this.isDisabled4 = false;
      
      
      if (this.selectedFile.children.length > 0) {
        this.level3.ac3Code = (parseFloat(this.selectedFile.children[this.selectedFile.children.length - 1].data.ac3Code) + 1).toString()
      }
      else {
        this.level3.ac3Code = this.level3.ac2Code + "00"
      }
    }

    if (this.selectedFile.data.level === 3) {
      this.service.header.ac1Code = this.selectedFile.data.ac1Code;
      this.service.header.ac2Code = this.selectedFile.data.ac2Code;
      this.service.header.ac3Code = this.selectedFile.data.ac3Code;
      this.level4 = this.service.header;

      if (this.selectedFile.data.acCat && this.selectedFile.data.acCat.trim() != "") {
        this.service.header.acCat = this.selectedFile.data.acCat.trim();
      }
      newRow = {
        label: this.level4.acCode, data: this.level4, children: [], parent: this.selectedFile,
        expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder"
      }
      this.isDisabled4 = false;
      if (this.selectedFile.children.length > 0) {
        this.level4.acCode = (parseFloat(this.selectedFile.children[this.selectedFile.children.length - 1].data.acCode) + 1).toString()
      }
      else {
        if(this.level3.alphabet.trim() == 'Y')
        this.level4.acCode = this.level3.ac2Code + this.level3.alphabet + "00000"
        else
        this.level4.acCode = this.level3.ac2Code +  "00000"
      }
    }

    this.selectedFile.children.push(newRow);
    this.selectedFile = newRow;
    event.node = this.selectedFile;
    // this.nodeSelect(event);
  }

  async postSearch(): Promise<void> {
    const event = { node: {} };

    /* for getting level 2 data of selected iac4 data */
    this.accountsData[0].children.forEach(async (row) => {
      if (row.data.coCode == this.service.header.coCode && row.data.ac1Code == this.service.header.ac1Code) {
       
        this.accountsData[0].expanded = true;
        row.parent = this.accountsData[0];
        row.expanded = true;
        event.node = row;
        await this.nodeExpand(event);
        /* for getting level 3 data of selected iac4 data */
        if (row.children && row.children.length > 0) {
          row.children.forEach(async (row1) => {
            if (row1.data.coCode == this.service.header.coCode && row1.data.ac2Code == this.service.header.ac2Code) {
             
              row1.parent = row;
              row1.expanded = true;
              event.node = row1;
              await this.nodeExpand(event);

              /* for getting level 4 data of selected iac4 data */

              if (row1.children && row1.children.length > 0) {
                row1.children.forEach(async (row2) => {
                  if (row2.data.coCode == this.service.header.coCode && row2.data.ac3Code == this.service.header.ac3Code) {
                  
                    row2.parent = row1;
                    row2.expanded = true;
                    event.node = row2;
                    await this.nodeExpand(event);

                    /* setting the selected iac4 data as selecetd */
                    if (row2.children && row2.children.length > 0) {
                      row2.children.forEach(async (row3) => {
                        if (row3.data.coCode == this.service.header.coCode && row3.data.acCode == this.service.header.acCode) {
                         
                          row3.parent = row2;
                          event.node = row3;
                          this.nodeSelect(event);
                          this.selectedFile = row3;

                         
                        }
                      });
                    } //close if iac4
                  }//close if iac3
                });//loop of iac3
              }//close if iac2
            }
          });// close loop of iac2
        }
      } else {
        row.expanded = false;
      }
    })//close loop of iac1

  }

  async postSave(): Promise<void> {
    this.selectedFile = this.selectedFile.parent;
    this.selectedFile.children = [{}];
    this.API_END_URL = apiUrl.iac4;
    this.PRIMARY_KEYS = ["coCode", "acCode"];
    this.key = "acCode";
    if (this.selectedFile.data.level === 0)
      this.ngOnInit();
    else
      await this.nodeExpand({ node: this.selectedFile })
  }

  async postDelete(): Promise<void> {
    this.selectedFile = this.selectedFile.parent;
    this.selectedFile.children = [{}];
    
    this.API_END_URL = apiUrl.iac4;
    this.PRIMARY_KEYS = ["coCode", "acCode"];
    this.key = "acCode";
    if (this.selectedFile.data.level === 0)
      this.ngOnInit();
    else
      await this.nodeExpand({ node: this.selectedFile })
  }

  async postCancel(): Promise<void> {
    this.accountsData = [];
    await this.ngOnInit();
    this.selectedFile = this.accountsData[0];
  }

  isDebitorCreditor(): boolean {
    if (this.level3.slYn == "D" || this.level3.slYn == "C") {
      return true;
    }
    return false;
  }

  nodeSelect(event) {
    if (this.selectedFile) {
      if (this.selectedFile.data.level === 1) {
        this.isDisabled = true;
      }
      else if (this.selectedFile.data.level === 2) {
        this.isDisabled = true;
        this.isDisabled2 = true;
      }
      else if (this.selectedFile.data.level === 3) {
        this.isDisabled = true;
        this.isDisabled2 = true;
        this.isDisabled3 = true;
      }
      else if (this.selectedFile.data.level === 4) {
        this.isDisabled = true;
        this.isDisabled2 = true;
        this.isDisabled3 = true;
        this.isDisabled4 = true;
        this.selectedFile.data.curCode = this.selectedFile.data.curCode.trim();
      }
    }
    this.setLevelData(event.node);
  }

  setLevelData(node: any) {
    if (node.data.level == 0) return
    if (node.data.level == 1)
      this.level1 = node.data;
    if (node.data.level == 2)
      this.level2 = node.data;
    if (node.data.level == 3)
      this.level3 = node.data;
    if (node.data.level == 4) {
      this.level4 = node.data;

      this.ijjobLovData.forEach((jobData) => {
        if (this.level4.jobHead && (this.level4.jobHead.trim() == jobData.jobCode.trim()))
          this.level4.jobHdName = jobData.jobName;
        return;
      })

      this.areaLovData.forEach((areaData) => {
        if (this.level4.areaCode && (this.level4.areaCode.trim() == areaData.code.trim()))
          this.level4.areaName = areaData.name;
        return;
      })

      this.icterritoryLovData.forEach((terriData) => {
        if (this.level4.territoryCode && (this.level4.territoryCode.trim() == terriData.code.trim()))
          this.level4.territoryName = terriData.name;
        return;
      })

      this.ideptLovData.forEach((deptData) => {
        if (this.level4.deptCode && (this.level4.deptCode.trim() == deptData.code.trim()))
          this.level4.deptName = deptData.name;
        return;
      })

      this.icsalesmanLovData.forEach((salesmanData) => {
        if (this.level4.salesman && (this.level4.salesman.trim() == salesmanData.code.trim()))
          this.level4.salesmanName = salesmanData.name;
        return;
      })

      this.iccountryLovData.forEach((countryData) => {
        if (this.level4.countryCode && (this.level4.countryCode.trim() == countryData.code.trim()))
          this.level4.countryName = countryData.name;
        return;
      })

      this.iccityLovData.forEach((cityData) => {
        if (this.level4.cityCode && (this.level4.cityCode.trim() == cityData.code.trim()))
          this.level4.cityName = cityData.name;
        return;
      })

      this.icdebtcollectorLovData.forEach((debtData) => {
        if (this.level4.debtCollector && (this.level4.debtCollector.trim() == debtData.code.trim()))
          this.level4.debtCollectorName = debtData.name;
        return;
      })

    }
    if (node.data.level != 0)
      this.setLevelData(node.parent);

  }

  async nodeUnselect(event) {
    // this._actionService.showToast(Toast.INFO, 'Node Unselected', event.node.label);
    await this._messageService.add({ severity: 'info', summary: 'Account Master', detail: this._errorTanslateService.translate("userConfirmPasswordcannotbeBlank") });
  }

  async nodeExpand(event) {
    // this._actionService.showToast(Toast.INFO, 'Node Expand', event.node.label);
    if (event.node) {
      if (event.node.children && (event.node.children.length > 1 || event.node.children.length == 0 || (event.node.children.length == 1 && (event.node.children[0].level))))
        return;

      if (event.node.data.level == 1)
        await this._service.getAccountsLevel2(event.node.data.ac1Code).then((res) => {
          event.node.children = this.getNodeCompactable(res, ["ac2Code", "ac2Name"], 2);
        }, (err) => {
          // console.warn("==err==", err);
        });
      else if (event.node.data.level == 2)
        await this._service.getAccountsLevel3(event.node.data.ac2Code).then((res) => {
          event.node.children = this.getNodeCompactable(res, ["ac3Code", "ac3Name"], 3);
        }, (err) => {
          // console.warn("==err==", err);
        });
      else
        await this._service.getAccountsLevel4(event.node.data.ac3Code).then((res) => {
          event.node.children = this.getNodeCompactable(res, ["acCode", "acName"], 4);
        }, (err) => {
          // console.warn("==err==", err);
        });
    }
  }

  getNodeCompactable(data: any[], labelColumnNames: string[], level: number): TreeNode[] {
    let demo: TreeNode[] = [];
    data.forEach((row) => {
      let label1 = "";
      // labelColumnNames.forEach((columnName)=>{ (label?"   ":"") + label + row[columnName] });
      label1 = labelColumnNames.reduce((sum, current) => sum + (sum ? " " : "") + row[current], "");

      row["level"] = level;
      demo.push({
        label: label1, data: row, children: level == 4 ? [] : [{}], expandedIcon: "ui-icon-folder-open",
        collapsedIcon: "ui-icon-folder"
      });
    });
    return demo;
  }

  async initialize() {
    await this._popUpLovService.getJobLov().then(data => {
      this.ijjobLovData = data.data;
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });

    await this._currencyService.getCurrency().then((res) => {
      if (res && res.count > 0) {
        this.currencyLovData.push({ label: "Please Select From List", value: null });
        res.data.forEach((row) => { this.currencyLovData.push({ label: row.name, value: row.code }) })
      }
  
    }, (err) => {
      // console.warn("==er==r,currency=", err);
    });

    await this._popUpLovService.getAreaLov().then(data => {
      this.areaLovData = data.data;
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });

    await this._popUpLovService.getTerritoryLov().then(data => {
      this.icterritoryLovData = data.data;
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });

    await this._popUpLovService.getDepartmentLov().then(data => {
      this.ideptLovData = data.data;
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });

    await this._popUpLovService.getSalesmanLov().then(data => {
      this.icsalesmanLovData = data.data;
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });

    await this._popUpLovService.getCountryLov().then(data => {
      this.iccountryLovData = data.data;
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });

    await this._popUpLovService.getCompanyTypeLov().then(data => {
      this.iccityLovData = data.data;
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });

    await this._popUpLovService.getDebtColllectorLov().then(data => {
      this.icdebtcollectorLovData = data.data
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });

    this.alphabetLovData.push({ label: "Please Select From List", value: "" });
    for (let i = 65; i <= 90; i++) {
      this.alphabetLovData.push({ label: String.fromCharCode(i), value: String.fromCharCode(i) });
    }
  }

  async onJobCodeLov() {
    const ref = this.actionService.showPopUp(this.ijjobLovData, this.ijjobLovCols);
    ref.onClose.subscribe((selectedRow: IjjobLovDto) => {
      if (selectedRow) {
        this.level4.jobHead = selectedRow.jobCode.trim();
        this.level4.jobHdName = selectedRow.jobName.trim();
      }
    });
  }

  async onCategoryLov(levelVal: string) {
    await this._popUpLovService.getAccountsCategory().then(data => {
      this.accountsCatLovData = data.data
    }, (err) => {
      // console.warn("==errr===", err.error.message);
    });
    const ref = this.actionService.showPopUp(this.accountsCatLovData, this.accountsCatLovCols);
    ref.onClose.subscribe((selectedRow: IacatLovDto) => {
      if (selectedRow) {
        if (levelVal == 'level3')
          this.level3.acCat = selectedRow.code.trim();
        // this.level4.jobHdName = selectedRow.jobName;
        if (levelVal == 'level4')
          this.level4.acCat = selectedRow.code.trim();
      }
    });
  }

  async onAreaLov() {
    const ref = this.actionService.showPopUp(this.areaLovData, this.areaLovCols);
    ref.onClose.subscribe((selectedRow: IcareaLovDto) => {
      if (selectedRow) {
        this.level4.areaCode = selectedRow.code.trim();
        this.level4.areaName = selectedRow.name.trim();
      }
    });
  }

  async onSalesmanLov() {
    const ref = this.actionService.showPopUp(this.icsalesmanLovData, this.icsalesmanLovCols);
    ref.onClose.subscribe((selectedRow: IcsalesmanDto) => {
      if (selectedRow) {
        this.level4.salesman = selectedRow.code.trim();
        this.level4.salesmanName = selectedRow.name.trim();
      }
    });
  }

  async onCountryLov() {
    const ref = this.actionService.showPopUp(this.iccountryLovData, this.iccountryLovCols);
    ref.onClose.subscribe((selectedRow: IccountryDto) => {
      if (selectedRow) {
        this.level4.countryCode = selectedRow.code.trim();
        this.level4.countryName = selectedRow.name.trim();
      }
    });
  }

  async onTerritoryLov() {
    const ref = this.actionService.showPopUp(this.icterritoryLovData, this.icterritoryLovCols);
    ref.onClose.subscribe((selectedRow: IcterritoryLovDto) => {
      if (selectedRow) {
        this.level4.territoryCode = selectedRow.code.trim();
        this.level4.territoryName = selectedRow.name.trim();
      }
    });
  }

  async onCityCodeLov() {
    const ref = this.actionService.showPopUp(this.iccityLovData, this.iccityLovCols);
    ref.onClose.subscribe((selectedRow: IccityLovDto) => {
      if (selectedRow) {
        this.level4.cityCode = selectedRow.code.trim();
        this.level4.cityName = selectedRow.name.trim();
      }
    });
  }

  async onDebtCollectorLov() {
    const ref = this.actionService.showPopUp(this.icdebtcollectorLovData, this.icdebtcollectorLovCols);
    ref.onClose.subscribe((selectedRow: IcdebtcollectorLovDto) => {
      if (selectedRow) {
        this.level4.debtCollector = selectedRow.code.trim();
        this.level4.debtCollectorName = selectedRow.name.trim();
      }
    });
  }

  async onDepartmentLov() {
    const ref = this.actionService.showPopUp(this.icdebtcollectorLovData, this.icdebtcollectorLovCols);
    ref.onClose.subscribe((selectedRow: IcdebtcollectorLovDto) => {
      if (selectedRow) {
        this.level4.deptName = selectedRow.name.trim();
      }
    });
  }

  acCatFromAc3Check(event: any) {
    if (event == true) {
      this.level4.acCatFromAc3 = "Y";
    }
    else
      this.level4.acCatFromAc3 = "N"
  }

  sysAcCheck(event: any) {
    if (event == true) {
      this.level4.sysAc = "Y";
    }
    else
      this.level4.sysAc = "N"
  }
}
