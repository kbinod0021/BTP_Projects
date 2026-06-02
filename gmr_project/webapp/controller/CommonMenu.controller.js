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
                        isMainMenu:true
                    },
                    {
                        id: "inputItem",
                        route: "input",
                        icon: "I",
                        title: "Input for Calculation",
                        subText: "DC • SE • Screen",
                        badge: "1",
                        active: false,
                        isMainMenu:true
                    },
                    {
                        id: "outputItem",
                        route: "output",
                        icon: "O",
                        title: "Output Center",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:true
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:true
                    },

                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:true
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:true
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:true
                    },
                    {
                        id: "onpdfItem",
                        route: "pdf",
                        icon: "N",
                        title: "PDF Viewer",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:false
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:false
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:false
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:false
                    },
                    {
                        id: "onboardItem",
                        route: "onboard",
                        icon: "N",
                        title: "Onboard New PPA",
                        subText: "documents",
                        badge: "0",
                        active: false,
                        isMainMenu:false
                    },
                ]
            };

            const oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "menu");

            // setTimeout(() => {
            //     this._attachMenuClick();


            // }, 1000);
            // this._resetMenu();

            //   var oRouter = this.getOwnerComponent().getRouter();

            //     oRouter.getRoute("Routemain").attachPatternMatched(function () {
            //         oRouter.navTo("studio", {}, true); // ✅ redirect to studio
            //     });

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
        "input": "gmrproject.view.Input",
        "output": "gmrproject.view.Output",
        "studio": "gmrproject.view.Studio",
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