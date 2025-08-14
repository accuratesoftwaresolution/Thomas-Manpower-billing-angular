import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { MessageService, TreeNode } from 'primeng/api';
import { ActionService, ICTFormPageBean, IgenMenuDto, MenuService, Toast } from '@accurate/toolbar';
import { LovDto } from '@accurate/dto';
import { FormService } from '@accurate/toolbar';
import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends ICTFormPageBean implements OnInit {

  DIALOG_TITLE = "Menu"
  API_END_URL = apiUrl.igenmenu;
  PRIMARY_KEYS = ["menuId"];
  key = "menuId";
  searchPopupColumns = [
    { field: 'menuId', header: 'Menu ID', width: '3.5em' },
    { field: 'description', header: 'Description', width: '5em' },
    { field: 'parentMenuId', header: 'Parent Menu ID', width: '3.5em' },
    { field: 'displaySeq', header: 'Order', width: '2em' },
  ];
  yesNoLov: LovDto[] = [
    { label: this._lang.first("yes"), value: 'Y' },
    { label: this._lang.first("no"), value: 'N' }
  ];
  menuTypeLov: LovDto[] = [
    { label: this._lang.first("nonExecutable"), value: '1' },
    { label: this._lang.first("executable"), value: '2' },
    { label: this._lang.first("WIPNotDone"), value: '3' }
  ];

  // {
  //   this.statusList = [
  //     { label: this._lang.first("active") + " " + this._lang.second("active"), labelPl: this._lang.first("active"), labelSl: this._lang.second("active"), value: "A" },
  //     { label: this._lang.first("inactive") + " " + this._lang.second("inactive"), labelPl: this._lang.first("inactive"), labelSl: this._lang.second("inactive"), value: "I" },
  //     { label: this._lang.first("sold") + " " + this._lang.second("sold"), labelPl: this._lang.first("sold"), labelSl: this._lang.second("sold"), value: "S" },
  //   ];
  parentMenuListLov: LovDto[] = [];
  dateFields = [];
  isDisabled: boolean = true;

  menuTreeData: TreeNode[] = [];
  selectedTreeMenu: TreeNode;

  constructor(
    public service: FormService,
    public actionService: ActionService,
    private menuService: MenuService,
    private _messageService: MessageService,
    private _lang: LangaugeTranslateService,
    private _errorTanslateService: ErrorTranslateService
  ) {
    super(service, actionService);
    this.actionService.currentComponent = this;
    actionService.headerDto = IgenMenuDto;

    this.menuTreeData.push({
      label: 'Menu Tree', data: { menuId: "root", description: "root", menuType: 1 },
      expanded: true,
      children: [],
      expandedIcon: "ui-icon-folder-open",
      collapsedIcon: "ui-icon-folder"
    });
  }

  async ngOnInit() {
    await this.initialize();
  }

  async getNodeCompactable(data: IgenMenuDto[]): Promise<TreeNode[]> {
    let convertedData = [];
    for (let row of data) {
      const dataToFormat: TreeNode = { label: row.description, data: row, children: row.menuType == "2" ? [] : [{}], expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder" };
      convertedData.push(dataToFormat);
    }
    return convertedData;
  }

  async preSearch(): Promise<boolean> {
    // await this.cancel();
    return true;
  }

  async search(): Promise<void> {
    if (!(await this.preSearch())) return;

    const selectedRow = await this.searchTreeData(this.actionService.searchVrNo.toString());

    this.service.header = Object.assign({}, this.selectedTreeMenu.data);
  }

  async searchTreeData(searchMenuId: string): Promise<any> {
    const searchData: IgenMenuDto = await this.service.search(searchMenuId, this.API_END_URL);
    if (searchData.menuId == "root") {
      this.selectedTreeMenu = this.menuTreeData[0];
      return this.selectedTreeMenu;
    }
    else {
      const result = await this.searchTreeData(searchData.parentMenuId);
      result.children.forEach((row) => {
        if (row.data.menuId == searchData.menuId)
          this.selectedTreeMenu = row;
      });
      if (this.selectedTreeMenu.data.menuId != this.actionService.searchVrNo) {
        await this.nodeExpand({ node: this.selectedTreeMenu });
        this.selectedTreeMenu.expanded = true;
      }
      return this.selectedTreeMenu;
    }
  }

  async preCreateInsert(): Promise<boolean> {
    if (!this.selectedTreeMenu) {
      await this._messageService.add({ severity: 'info', summary: 'Menu', detail: this._errorTanslateService.translate("pleaseselectamenu") });
      return false;
    }
    await this.nodeExpand({ node: this.selectedTreeMenu });
    this.selectedTreeMenu.expanded = true;
    return true;
  }

  async postCreateInsert(): Promise<void> {
    this.isDisabled = false;
    this.service.header.parentMenuId = this.selectedTreeMenu.data.menuId;
    const newMenu = {
      label: this.service.header.description,
      data: this.service.header,
      children: [],
      expandedIcon: "ui-icon-folder-open",
      collapsedIcon: "ui-icon-folder"
    }
    this.selectedTreeMenu.children.push(newMenu);
    this.selectedTreeMenu = newMenu;
  }

  async preSave(): Promise<boolean> {
    if (this.service.header.menuId == "root") {
      await this._messageService.add({ severity: 'info', summary: 'Menu', detail: this._errorTanslateService.translate("can'tmodifytheroot") });
      return false;
    }
    if (this.service.header.menuId == "" || !this.service.header.menuId) {
      await this._messageService.add({ severity: 'info', summary: 'Menu', detail: this._errorTanslateService.translate("menuidCantbeNull") });
      return false;
    }
    if (this.service.header.description == "" || !this.service.header.description) {
      await this._messageService.add({ severity: 'info', summary: 'Menu', detail: this._errorTanslateService.translate("descriptionCantbeNull") });
      return false;
    }
    return true;
  }

  async postSave(): Promise<void> {
    
    this.selectedTreeMenu.data = Object.assign({}, this.service.header);
    this.selectedTreeMenu.label = this.service.header.description;
    this.selectedTreeMenu.parent.children = [{}];
    await this.nodeExpand({ node: this.selectedTreeMenu.parent });
    this.selectedTreeMenu.parent.children.forEach((row) => {
      if (row.data.menuId == this.selectedTreeMenu.data.menuId)
        this.selectedTreeMenu = row;
    })
  }

  async postDelete(): Promise<void> {
    this.selectedTreeMenu.parent.children = [{}];
    await this.nodeExpand({ node: this.selectedTreeMenu.parent });
    this.selectedTreeMenu = this.selectedTreeMenu.parent.children.length == 0 ? this.selectedTreeMenu.parent : this.selectedTreeMenu.parent.children[0];
    this.service.header = Object.assign({}, this.selectedTreeMenu.data);
  }

  async postCancel(): Promise<void> {
    await this.initialize();
    this.selectedTreeMenu = this.menuTreeData[0];
    this.service.header = Object.assign({}, this.selectedTreeMenu.data);
  }

  async initialize(): Promise<void> {
    const rootMenus = await this.menuService.getMenuWithFilter("where[parentMenuId]=root");
    this.menuTreeData[0].children = await this.getNodeCompactable(rootMenus);
    this.parentMenuListLov = [];
    this.parentMenuListLov.push({ label: 'Menu Tree', value: 'root' });
    const parentMenuData = await this.menuService.getMenuWithFilter("where[menuType]=1");
    parentMenuData.forEach((row) => {
      this.parentMenuListLov.push({ label: row.description + " (" + row.menuId + ")", value: row.menuId });
    });
  }

  async nodeSelect(event): Promise<void> {
    this.service.header = Object.assign({}, event.node.data);
    this.isDisabled = true;
  }

  async nodeExpand(event): Promise<void> {
   
    if (event.node) {
      if (event.node.children && (event.node.children.length > 1 || event.node.children.length == 0 || (event.node.children.length == 1 && (event.node.children[0].label))))
        return;
      const childMenus = await this.menuService.getMenuWithFilter(`where[parentMenuId]=${event.node.data.menuId}`);
      event.node.children = await this.getNodeCompactable(childMenus);
    }
  }

  async nodeUnselect(event): Promise<void> {

  }

}
