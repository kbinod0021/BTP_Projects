sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/ColumnListItem",
    "sap/m/Input",
    "sap/m/ObjectIdentifier",
    "sap/m/ObjectNumber",
    "sap/m/MessageToast"
], function (Controller, JSONModel, ColumnListItem, Input, ObjectIdentifier, ObjectNumber, MessageToast) {
    "use strict";

    return Controller.extend("project.controller.main", {

        onInit: function () {

            let oDataModel = [
                {
                    "Name": "Notebook Basic 15",
                    "ProductId": "HT-1000",
                    "Quantity": 10,
                    "UoM": "PC",
                    "WeightMeasure": 4.2,
                    "WeightUnit": "KG",
                    "Price": 956.00,
                    "CurrencyCode": "EUR"
                },
                {
                    "Name": "Notebook Basic 17",
                    "ProductId": "HT-1001",
                    "Quantity": 20,
                    "UoM": "PC",
                    "WeightMeasure": 4.5,
                    "WeightUnit": "KG",
                    "Price": 1249.00,
                    "CurrencyCode": "EUR"
                }
            ];

            this.oModel = new JSONModel(oDataModel);
            this.getView().setModel(this.oModel);

            // Backup data for cancel
            this._oBackup = JSON.parse(JSON.stringify(oDataModel));

            this._selectedPath = null;   // ✅ store selected row

        },

        /* ✅ EDIT MODE */
        onEdit: function () {
            this.byId("editButton").setVisible(false);
            this.byId("saveButton").setVisible(true);
            this.byId("cancelButton").setVisible(true);

            this._switchToEditMode();
        },
        onEdit1: function () {

            if (!this._selectedPath) {
                sap.m.MessageToast.show("Please select a row");
                return;
            }

            let data = this.oModel.getData();

            // reset all rows first
            data.forEach(item => item.editable = false);

            // enable only selected row
            let index = this._selectedPath.split("/")[1];
            data[index].editable = true;

            this.oModel.refresh();   // ✅ refresh model

            // toggle buttons
            this.byId("editButton").setVisible(false);
            this.byId("saveButton").setVisible(true);
            this.byId("cancelButton").setVisible(true);
            this._switchToEditMode();
        },


        /* ✅ SAVE MODE */
        onSave: function () {
            this.byId("editButton").setVisible(true);
            this.byId("saveButton").setVisible(false);
            this.byId("cancelButton").setVisible(false);

            this._oBackup = JSON.parse(JSON.stringify(this.oModel.getData()));

            this._switchToReadMode();

            MessageToast.show("Data saved successfully");
        },

        /* ✅ CANCEL MODE */
        onCancel: function () {
            this.byId("editButton").setVisible(true);
            this.byId("saveButton").setVisible(false);
            this.byId("cancelButton").setVisible(false);

            this.oModel.setData(JSON.parse(JSON.stringify(this._oBackup)));

            this._switchToReadMode();
        },

        /* ✅ SWITCH TO EDIT MODE */
        _switchToEditMode: function () {
            let oTable = this.byId("idProductsTable");

            let oTemplate = new ColumnListItem({
                cells: [
                    new Input({ value: "{Name}" }),
                    new Input({ value: "{Quantity}" }),
                    new Input({ value: "{WeightMeasure}" }),
                    new Input({ value: "{Price}" })
                ]
            });

            oTable.bindItems({
                path: "/",
                template: oTemplate
            });
        },

        /* ✅ SWITCH TO READ MODE */
        _switchToReadMode: function () {
            let oTable = this.byId("idProductsTable");

            let oTemplate = new ColumnListItem({
                cells: [
                    new ObjectIdentifier({ title: "{Name}", text: "{ProductId}" }),
                    new ObjectNumber({ number: "{Quantity}", unit: "{UoM}" }),
                    new ObjectNumber({ number: "{WeightMeasure}", unit: "{WeightUnit}" }),
                    new ObjectNumber({ number: "{Price}", unit: "{CurrencyCode}" })
                ]
            });

            oTable.bindItems({
                path: "/",
                template: oTemplate
            });
        },
        onRowSelect: function (oEvent) {


            let oItem = oEvent.getParameter("listItem");

            if (oItem) {
                this._selectedPath = oItem.getBindingContext().getPath();
            }

        },
        onToggleMenu: function () {
            var oToolPage = this.getView().byId("toolPage");   // ✅ correct way
            var bExpanded = oToolPage.getSideExpanded();

            oToolPage.setSideExpanded(!bExpanded);
        },
        onMenuItemSelect: function (oEvent) {

            // ✅ Get clicked item
            // let oItem = oEvent.getParameter("item");

            // // ✅ Get values
            // let sText = oItem.getText();
            // let sKey = oItem.getKey();

            // // ✅ Debug
            // console.log("Clicked:", sText, sKey);

            // // ✅ Example actions
            // if (sKey === "Products") {
            //     sap.m.MessageToast.show("Products clicked");
            // }
            // else if (sKey === "Orders") {
            //     sap.m.MessageToast.show("Orders clicked");
            // }
            // else if (sKey === "Reports") {
            //     sap.m.MessageToast.show("Reports clicked");
            // }

            
 let sKey = oEvent.getParameter("item").getKey();

    let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

    oRouter.navTo(sKey); 

        }




    });
});
