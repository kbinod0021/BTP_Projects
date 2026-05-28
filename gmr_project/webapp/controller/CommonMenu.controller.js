sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("gmrproject.controller.CommonMenu", {
       onInit: function () {

    this._attachMenuClick();

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


_attachMenuClick: function () {

    var aItems = ["studioItem", "inputItem", "outputItem","OnboardItem", "appsItem"];

    aItems.forEach(function (sId) {

        var oItem = this.byId(sId);

        oItem.addEventDelegate({
            onclick: function () {

                // ✅ remove active from all
                this._removeActive();

                // ✅ set active
                oItem.addStyleClass("active");

                // ✅ get route from DOM attribute
                var sRoute = oItem.data("route");

                // ✅ navigation
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo(sRoute);

            }.bind(this)
        });

    }.bind(this));
},

_removeActive: function () {

    var aItems = ["studioItem", "inputItem", "outputItem","OnboardItem", "appsItem"];

    aItems.forEach(function (sId) {
        this.byId(sId).removeStyleClass("active");
    }.bind(this));
},

        onMenuClick: function (oEvent) {
    var sKey = oEvent.getSource().data("menuKey");

    console.log("Clicked:", sKey);

    // optional navigation
    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

    if (sKey === "studio") {
        oRouter.navTo("main");
    } else if (sKey === "input") {
        oRouter.navTo("input");
    } else if (sKey === "output") {
        oRouter.navTo("output");
    } 
     else if (sKey === "onboard") {
        oRouter.navTo("onboard");
    } 
    else if (sKey === "apps") {
        oRouter.navTo("apps");
    }
},



    });
});