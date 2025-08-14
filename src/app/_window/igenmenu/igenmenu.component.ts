import { IgenMenuDto } from '@accurate/dto';
import { MenuService } from '@accurate/providers';
import { ActionService, FormService } from '@accurate/toolbar';
import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { LovDto } from 'src/app/_dto/lov/lov.dto';
// import { IgenMenuDto } from 'src/app/_dto/igen-menu.dto';

@Component({
  selector: 'app-igenmenu',
  templateUrl: './igenmenu.component.html',
  styleUrls: ['./igenmenu.component.scss']
})
export class IgenmenuComponent implements OnInit {

  @Input('service') mainService: any;
  menuTreeData: TreeNode[] = [];
  selectedTreeMenu: TreeNode;

  parentMenuListLov: LovDto[] = [];

  constructor(

    public service: FormService,
    public actionService: ActionService,
    private menuService: MenuService
  ) {
    this.menuTreeData.push({
      label: 'Menu Tree', data: { menuId: "root", description: "root", menuType: 1 },
      expanded: true,
      children: [],
      expandedIcon: "ui-icon-folder-open",
      collapsedIcon: "ui-icon-folder"
    });
  }

  async ngOnInit(): Promise<void> {
    await this.initialize();
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

  async getNodeCompactable(data: IgenMenuDto[]): Promise<TreeNode[]> {
    let convertedData = [];
    for (let row of data) {
      const dataToFormat: TreeNode = { label: row.description, data: row, children: row.menuType == "2" ? [] : [{}], expandedIcon: "ui-icon-folder-open", collapsedIcon: "ui-icon-folder" };
      convertedData.push(dataToFormat);
    }
    return convertedData;
  }


  async nodeSelect(event): Promise<void> {
    this.service.header.sortOrder = event.node.data.displaySeq;
    if (event.node.data.menuType == "2") {
      this.service.header.menuLevel1 = event.node.data.parentMenuId.trim();
    }
    else {
      this.service.header.menuLevel1 = event.node.data.menuId.trim();
    }
  }

  async nodeUnselect(event): Promise<void> {

  }

  async nodeExpand(event): Promise<void> {
    if (event.node) {
      if (event.node.children && (event.node.children.length > 1 || event.node.children.length == 0 || (event.node.children.length == 1 && (event.node.children[0].label))))
        return;
      const childMenus = await this.menuService.getMenuWithFilter(`where[parentMenuId]=${event.node.data.menuId}`);
      event.node.children = await this.getNodeCompactable(childMenus);
    }
  }

}
