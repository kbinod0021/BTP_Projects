sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("gmrproject.controller.Form15", {
        onInit: function () {

            // sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
            //     includeStylesheet("css/custom_studio.css");
            // });
            // sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
            //     includeStylesheet("css/form15.css");
            // });
            sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
                includeStylesheet(sap.ui.require.toUrl("gmrproject/css/custom_studio.css"));
                includeStylesheet(sap.ui.require.toUrl("gmrproject/css/form15.css"));
            });

            var oData = {
                sources: [
                    {
                        source: "Shakti",
                        share: "38.9",
                        mt: "52803",
                        gcv: "3600",
                        landed: "1895"
                    },
                    {
                        source: "MCL Rail",
                        share: "29.6",
                        mt: "40184",
                        gcv: "3750",
                        landed: "1720"
                    },
                    {
                        source: "IB Valley",
                        share: "31.5",
                        mt: "42904",
                        gcv: "3610",
                        landed: "1860"
                    }
                ]
            };

            var oModel = new sap.ui.model.json.JSONModel(oData);
            this.getView().setModel(oModel, "coal");
        },
        onDeleteRow: function (oEvent) {
    var oContext = oEvent.getSource().getBindingContext("coal");
    var sPath = oContext.getPath(); // "/sources/1"

    var index = parseInt(sPath.split("/")[2]);

    var oModel = this.getView().getModel("coal");
    var data = oModel.getData();

    data.sources.splice(index, 1);

    oModel.setData(data);
},
onAddRow: function () {
    var oModel = this.getView().getModel("coal");
    var data = oModel.getData();

    data.sources.push({
        source: "",
        share: "",
        mt: "",
        gcv: "",
        landed: ""
    });

    oModel.setData(data);
}


    });
});