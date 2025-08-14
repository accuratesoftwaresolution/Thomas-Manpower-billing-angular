import { LovDto } from '@accurate/dto';
import { ErrorTranslateService } from '@accurate/providers';
import { ActionService, FormService, ICTFormPageBean,  MenuService, Toast } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { IgenMenuDto } from 'src/app/_dto/igen-menu.dto';
import { IuserDto } from 'src/app/_dto/iuser.dto';
import { IusermenurightsDto } from 'src/app/_dto/iusermenurights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';

@Component({
  selector: 'app-menu-rights',
  templateUrl: './menu-rights.component.html',
  styleUrls: ['./menu-rights.component.scss']
})
export class MenuRightsComponent extends ICTFormPageBean implements OnInit {

  menuTreeData: TreeNode[] = [];
  selectedTreeMenu: TreeNode;
  DIALOG_TITLE = "Menu Rights";
  userId: string = "";
  userListLov: LovDto[] = [];
  menuRightsList = new Map();
  otherRightsAll: string = "";
  accessRightsAll: string = "";


  selectedRights: any;
  userListData: any;
  menuWithRights: IgenMenuDto;

  constructor(
    public service: FormService,
    public actionService: ActionService,
    private menuService: MenuService,
    private popUpLovService: PopUpLovService,
    private _messageService: MessageService,
    private _errorTanslateService: ErrorTranslateService,
  ) {
    super(service, actionService);
    this.actionService.currentComponent = this;
    this.actionService.toolbarButton.createInsert = false;
    this.actionService.toolbarButton.delete = false;
    this.actionService.toolbarButton.save = false;
    this.actionService.toolbarButton.search = false;

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
      if (row.menuEnabled == "N")
        continue;
      const dataToFormat: TreeNode = { label: row.description, data: row, children: row.menuType == "2" ? [] : [{}], expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder" };
      convertedData.push(dataToFormat);
    }
    return convertedData;
  }

  async postCancel(): Promise<void> {
    await this.initialize();
    this.selectedTreeMenu = this.menuTreeData[0];
    this.userId = "";
    this.otherRightsAll = "";
    this.accessRightsAll = "";
    this.selectedRights = null;
    this.menuRightsList.clear();
  }

  async initialize(): Promise<void> {
    const rootMenus = await this.menuService.getMenuWithFilter("where[parentMenuId]=root&where[");
    this.menuTreeData[0].children = await this.getNodeCompactable(rootMenus);
    const userList: IuserDto[] = await this.popUpLovService.getUserIdLov();
    await this.popUpLovService.getUserIdLov().then((res: any) => {
      this.userListData = res.data;
      // let selectRow = { userId: "Please Select a user", userName: '' };
      // this.userListData = [selectRow].concat(res.data);
    })
    this.userListLov = [];
    this.userListLov.push({ label: "", value: "" });
    this.userListData.forEach((row) => {
      this.userListLov.push({ label: row.userId + " (" + row.userName + ")", value: row.userId });
    });
  }

  async nodePreSelect(event){
    this.accessRightsAll="";
    this.otherRightsAll="";
    this.selectedRights = null;
    if (event.node.data.menuId == "root") {
      await this._messageService.add({ severity: 'info', summary: 'User Rights', detail: this._errorTanslateService.translate("youcan'tsetrighttoRoot") });
      return;
    }
    if (!this.userId) {
      await this._messageService.add({ severity: 'info', summary: 'User Rights', detail: this._errorTanslateService.translate("pleaseselectoneuser") });
      return;
    }

    const existUserRight = this.menuRightsList.get(event.node.data.menuId + this.userId);
    if (existUserRight) {
      if (existUserRight.rights)
        this.selectedRights = existUserRight.rights.rightsGiven.split("");
      return;
    }

    this.menuWithRights = await this.menuService.getMenuWithRights(this.userId, event.node.data.menuId);
    this.menuRightsList.set(this.menuWithRights.menuId + this.userId, this.menuWithRights);
  }

  async nodeSelect(event): Promise<void> {
    await this.nodePreSelect(event);
    if(this.menuWithRights){
      if (this.menuWithRights.rightsGiven)
      this.selectedRights = this.menuWithRights.rightsGiven.split("");
    if (this.menuWithRights.rightsGiven.includes("CEMDRP")) {
      this.accessRightsAll = "true";
    }
    if (this.menuWithRights.rightsGiven.includes("QILVO")) {
      this.otherRightsAll = "true";
    }
    }
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

  async setAllMenuRights(): Promise<void> {
    if (!this.userId) {
      await this._messageService.add({ severity: 'info', summary: 'User Rights', detail: this._errorTanslateService.translate("pleaseselectoneuser") });
      return;
    }

    const rightsGiven = await this.getRights();
    const menuRights: IusermenurightsDto = { coCode: "", menucode: "All", rightsGiven: rightsGiven, userId: this.userId, viewflag: "Y" };;
    // const body = this.selectedTreeMenu.data;
    const body: any = { menuId: "All" };
    body["rights"] = menuRights;
    await this.menuService.setAllMenuRights(body);
    await this.cancel();
    await this._messageService.add({ severity: 'success', summary: 'Menu Rights', detail: this._errorTanslateService.translate("rightsgivensuccessfull") });

  }

  async setRights(): Promise<void> {
    if (!this.userId) {
      await this._messageService.add({ severity: 'info', summary: 'User Rights', detail: this._errorTanslateService.translate("pleaseselectoneuser") });
      return;
    }
    if (!this.selectedTreeMenu) {
      await this._messageService.add({ severity: 'info', summary: 'User Rights', detail: this._errorTanslateService.translate("pleaseselectonemenu") });
      return;
    }
    if (this.selectedTreeMenu.data.menuId == "root") {
      await this._messageService.add({ severity: 'info', summary: 'User Rights', detail: this._errorTanslateService.translate("youcan'tsetrighttoRoot") });
      this.selectedRights = null;
      return;
    }

    const rightsGiven = await this.getRights();
    const menuRights: IusermenurightsDto = { coCode: this.selectedTreeMenu.data.coCode, menucode: this.selectedTreeMenu.data.menuId, rightsGiven: rightsGiven, userId: this.userId, viewflag: "Y" };;
    const body = this.selectedTreeMenu.data;
    body["rights"] = menuRights;
    const menuWithRights = await this.menuService.setMenuRights(body);//save method result;
    this.actionService.showToast(Toast.SUCESS, "Menu Rights", "Rights given successfull")
    this.menuRightsList.set(menuWithRights.menuId + this.userId, menuWithRights);
    this.menuRightsList.clear();

  }

  async getRights(): Promise<string> {
    let rights = "";
    if (!this.selectedRights || this.selectedRights.length <= 0)
      return "";
    for (let right of ("CEMDRPQILVO".split(""))) {
      if (this.selectedRights.indexOf(right) != -1)
        rights = rights + right;
    }
    return rights;
  }

  async userChange(event): Promise<void> {
    this.selectedRights = null;
    if (!this.userId)
      return;

    if (this.selectedTreeMenu) {
      const menuWithRights = await this.menuService.getMenuWithRights(this.userId, this.selectedTreeMenu.data.menuId);
      this.menuRightsList.set(menuWithRights.menuId + this.userId, menuWithRights);
      if (menuWithRights.rights)
        this.selectedRights = menuWithRights.rights.rightsGiven.split("");
    }

  }

  async selectAllAccessRights(event) {
    if (!this.selectedRights) this.selectedRights = [];
    if (event.checked)
      this.selectedRights = this.selectedRights.concat(["C", "E", "M", "D", "R", "P"]);
    else {
      let currentRights = [].concat(this.selectedRights);
      this.selectedRights = [];
      for (let right of currentRights) {
        if (!(["C", "E", "M", "D", "R", "P"].includes(right))) {
          this.selectedRights.push(right);
        }
      }

    }
  }

  async selectAllOtherRights(event) {
    if (!this.selectedRights) this.selectedRights = [];
    if (event.checked)
      this.selectedRights = this.selectedRights.concat(["Q", "I", "L", "V", "O"]);
    else {
      let currentRights = [].concat(this.selectedRights);
      this.selectedRights = [];
      for (let right of currentRights) {
        if (!(["Q", "I", "L", "V", "O"].includes(right))) {
          this.selectedRights.push(right);
        }
      }
    }
  }

  async onClose(): Promise<void> {
    await this.exit();
  }

}
