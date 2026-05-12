sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("ui5demo.controller.main", {

        onInit: function () {
            this._loadPage("Dashboard");
        },

        onItemSelect: function (oEvent) {
            const sKey = oEvent.getParameter("item").getKey();
            this._loadPage(sKey);
        },

        _loadPage: function (sPage) {
            const oNav = this.byId("mainNav");
            const sViewId = this.getView().getId() + "--" + sPage;

            let oPage = sap.ui.getCore().byId(sViewId);

            if (!oPage) {
                oPage = sap.ui.xmlview({
                    id: sViewId,
                    viewName: "ui5demo.view." + sPage
                });
                oNav.addPage(oPage);
            }

            oNav.to(oPage);
        },

        onMenuToggle: function () {
            const oSideNav = this.byId("sideNav");
            oSideNav.setExpanded(!oSideNav.getExpanded());
        }
    });
});