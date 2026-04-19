sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ui5demo.controller.main", {
        onInit() {
        },
        
onMenuToggle: function () {
    var oSideNav = this.byId("sideNav");
    oSideNav.setExpanded(!oSideNav.getExpanded());
},

onItemSelect: function (oEvent) {
    var sKey = oEvent.getParameter("item").getKey();

    switch (sKey) {
        case "dashboard":
            // this.getRouter().navTo("dashboard");
            break;

        case "poCreate":
            // this.getRouter().navTo("poCreate");
            break;

        case "poStatus":
            // this.getRouter().navTo("poStatus");
            break;

        case "invCreate":
            // this.getRouter().navTo("invCreate");
            break;

        case "invHistory":
            // this.getRouter().navTo("invHistory");
            break;

        case "settings":
            // this.getRouter().navTo("settings");
            break;
    }
}


    });
});