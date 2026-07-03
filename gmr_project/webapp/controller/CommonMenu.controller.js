sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("gmrproject.controller.CommonMenu", {
        onInit: function () {

            window.addEventListener("beforeunload", this._handleCloseDialog.bind(this));


            const oData = {
                menuItems: [
                    {
                        id: "studioItem",
                        route: "studio",
                        icon: "C",
                        title: "PPA Configuration Studio",
                        subText: "setup",
                        badge: "",
                        active: true,
                        isMainMenu: true,


                        subMenus: [
                            {
                                id: "subView1",
                                route: "subView1",
                                icon: "C",
                                title: "Sub View1",
                                subText: "subView1",
                                badge: "",
                                active: true,
                            },
                            {
                                id: "subView2",
                                route: "subView2",
                                icon: "C",
                                title: "Sub View2",
                                subText: "subView2",
                                badge: "",
                                active: true,
                            }
                        ]

                    },
                    {
                        id: "inputItem",
                        route: "input",
                        icon: "I",
                        title: "Input for Calculation",
                        subText: "DC • SE • Screen",
                        badge: "1",
                        active: false,
                        isMainMenu: true,
                        subMenus: []
                    },
                    {
                        id: "outputItem",
                        route: "output",
                        icon: "O",
                        title: "Output Center",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: true,
                        subMenus: []
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: true,
                        subMenus: []
                    },


                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: true,
                        subMenus: []
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: true,
                        subMenus: []
                    },
                    {
                        id: "onCustomChartItem",
                        route: "CustomChart",
                        icon: "N",
                        title: "Custom Chart",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: true,
                        subMenus: []
                    },
                    {
                        id: "onpdfItem",
                        route: "pdf",
                        icon: "N",
                        title: "PDF Viewer",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: false,
                        subMenus: []
                    },
                    {
                        id: "onsmartTableItem",
                        route: "smartTable",
                        icon: "N",
                        title: "Smart Table",
                        subText: "smartTable",
                        badge: "0",
                        active: false,
                        isMainMenu: false,
                        subMenus: []
                    },
                    {
                        id: "onplanningCalendarItem",
                        route: "planningCalendar",
                        icon: "N",
                        title: "Planning Calendar",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: false,
                        subMenus: []
                    },
                    {
                        id: "onmultipleFileItem",
                        route: "multipleFile",
                        icon: "N",
                        title: "Multiple File",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: false,
                        subMenus: []
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu: false,
                        subMenus: []
                    },
                ],

                selectedMenu: {
                    subMenus: []
                }

            };

            const oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "menu");

            /* default submenu load */
            oModel.setProperty(
                "/selectedMenu/subMenus",
                oData.menuItems[0].subMenus
            );



        },

        _resetMenu: function () {
            var oMenu = this.byId("studio");
            if (oMenu) {
                oMenu.setSelectedKey("");
            }
        },

        _handleCloseDialog: function () {
            var oDialog = this.byId("myDialog");
            if (oDialog) {
                oDialog.close();
            }
        }
        ,



        onAfterRendering: function () {

            const oContainer = this.byId("menuContainer12");
            const aItems = oContainer.getItems();

            aItems.forEach(function (oItem) {

                // ✅ remove old binding (avoid duplicate)
                oItem.detachBrowserEvent("click");

                oItem.attachBrowserEvent("click", (oEvent) => {

                    const oContext = oItem.getBindingContext("menu");
                    const sRoute = oContext.getProperty("route");

                    const oModel = this.getView().getModel("menu");
                    const data = oModel.getData();


                    const aSubMenus = data.menuItems.filter(x => x.route === sRoute)[0].subMenus;

                    this.getView()
                        .getModel("menu")
                        .setProperty("/selectedMenu/subMenus", aSubMenus);


                    // ✅ update active state
                    data.menuItems.forEach(item => item.active = false);
                    oContext.getObject().active = true;

                    oModel.refresh();

                    // ✅ navigation
                    sap.ui.core.UIComponent
                        .getRouterFor(this)
                        .navTo(sRoute);
                                        


                });



            }.bind(this));
            this.onOpenDialog();
            this.submenuClick();
        },


submenuClick:function(){
      const oContainer = this.byId("menuContainer1212");
            const aItems = oContainer.getItems();

            aItems.forEach(function (oItem) {

                // ✅ remove old binding (avoid duplicate)
                oItem.detachBrowserEvent("click");

                oItem.attachBrowserEvent("click", (oEvent) => {

                    const oContext = oItem.getBindingContext("menu");
                    const sRoute = oContext.getProperty("route");

                    const oModel = this.getView().getModel("menu");
                    const data = oModel.getData();


                  console.log(sRoute);
                  

                    // ✅ update active state
                    data.menuItems.forEach(item => item.active = false);
                    oContext.getObject().active = true;

                    oModel.refresh();

                    // ✅ navigation
                    sap.ui.core.UIComponent
                        .getRouterFor(this)
                        .navTo(sRoute);

                });

            }.bind(this));
            this.onOpenDialog();
},


        onAfterOpenDialog: function () {

            const aItems = this.byId("menuContainer122").getItems();

            aItems.forEach((oItem) => {

                oItem.detachBrowserEvent("click");

                oItem.attachBrowserEvent("click", async () => {

                    const oContext = oItem.getBindingContext("menu");
                    const sRoute = oContext.getProperty("route");

                    const oModel = this.getView().getModel("menu");
                    const data = oModel.getData();

                    // ✅ active state
                    data.menuItems.forEach(item => item.active = false);
                    oContext.getObject().active = true;
                    oModel.refresh();

                    // ✅ ONLY update content area
                    const oContainer = this.byId("viewContainer");
                    oContainer.removeAllItems();

                    // ✅ LOAD VIEW (THIS IS CORRECT FOR DIALOG)
                    const oView = await sap.ui.core.mvc.XMLView.create({
                        viewName: this._getViewNameFromRoute(sRoute)
                    });

                    this.getView().addDependent(oView);

                    oContainer.addItem(oView);

                });

            });
        }

        ,

        _getViewNameFromRoute: function (sRoute) {

            const mRoutes = {
                "onboard": "gmrproject.view.Onboard",
                "multipleFile": "gmrproject.view.multipleFile",
                "planningCalendar": "gmrproject.view.PlanningCalendar",
                "smartTable": "gmrproject.view.smartTable",
                "pdf": "gmrproject.view.PDF"
            };

            return mRoutes[sRoute] || "gmrproject.view.Default";
        },


        onOpenDialog: function () {

            const oPlus = this.byId("plusIconBtn");

            if (oPlus) {
                oPlus.detachBrowserEvent("click");

                oPlus.attachBrowserEvent("click", () => {

                    // ✅ Open dialog
                    this.byId("myDialog").open();

                    this.onAfterOpenDialog(); // ✅ important

                    // OR navigation
                    // sap.ui.core.UIComponent.getRouterFor(this).navTo("more");

                });
            }

        },
        onCloseDialog: function () {
            this.byId("myDialog").close();
        },




    });
});