import Controller from "sap/ui/core/mvc/Controller";
import Device from "sap/ui/Device";
import UIComponent from "sap/ui/core/UIComponent";
import Event from "sap/ui/base/Event";
import SideNavigation from "sap/tnt/SideNavigation";
import NavigationListItem from "sap/tnt/NavigationListItem";
import JSONModel from "sap/ui/model/json/JSONModel";

import NavigationListItemBase from "sap/tnt/NavigationListItemBase";

/**
 * @namespace ui5app.controller
 */
export default class App extends Controller {

    public onInit(): void {

        // ✅ Create menu model
        const oMenuModel = new JSONModel({
            menu: [
                {
                    key: "Dashboard",
                    text: "Dashboard",
                    icon: "sap-icon://home"
                },
                {
                    key: "fg",
                    text: "FG Master",
                    icon: "sap-icon://factory",
                    items: [
                        {
                            key: "fgCreate",
                            text: "Create FG",
                            icon: "sap-icon://add"
                        },
                        {
                            key: "fgDisplay",
                            text: "Display FG",
                            icon: "sap-icon://display"
                        }
                    ]
                }
                // ,
                //  {
                //     key: "vendorList",
                //     text: "Vendor List",
                //     icon: "sap-icon://home"
                // }
            ]
        });

        // ✅ Set model on the VIEW (Controller-safe)
        this.getView()?.setModel(oMenuModel, "menu");
    }

 


public onItemSelect(oEvent: Event): void {

    // ✅ Get clicked menu item correctly
  
    const oItem = (oEvent as any).getParameter("item") as NavigationListItem;


    const sKey = oItem.getKey();
    const oRouter = (this.getOwnerComponent() as UIComponent).getRouter();

    const oSideNav = this.byId("sideNav") as SideNavigation;
    const aItems = oSideNav.getItem().getItems(); // top‑level items

    // ✅ Collapse all parent menus
    aItems.forEach((oNavItem: NavigationListItemBase) => {
        if (
            oNavItem instanceof NavigationListItem &&
            oNavItem.getItems().length > 0
        ) {
            oNavItem.setExpanded(false);
        }
    });

    // ✅ If parent menu clicked → expand only
    if (oItem.getItems().length > 0) {
        oItem.setExpanded(true);
        return; // no navigation
    }

    // ✅ Navigate for leaf items
    oRouter.navTo(sKey);

    // ✅ Auto‑collapse on phone
    if (Device.system.phone) {
        oSideNav.setExpanded(false);
    }
}


    public onToggleSideNav(): void {
        const oSideNav = this.byId("sideNav") as SideNavigation;
        oSideNav?.setExpanded(!oSideNav.getExpanded());
    }
}