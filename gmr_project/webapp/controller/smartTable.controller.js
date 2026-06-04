sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/m/p13n/Engine',
    'sap/m/p13n/SelectionController',
    'sap/m/p13n/MetadataHelper',
    'sap/ui/core/library',
    "sap/m/MessageToast"
], function (Controller, JSONModel, Engine, SelectionController, MetadataHelper, coreLibrary, MessageToast) {
    "use strict";

    return Controller.extend("gmrproject.controller.smartTable", {
        onInit: function () {

        },

        onSearch: function () {
            this.byId("smartTable").rebindTable();
        },
     onDelete: function () {
    var oSmartTable = this.byId("smartTable");
    var oTable = oSmartTable.getTable();
    var oModel = this.getView().getModel();

    var aSelectedItems = oTable.getSelectedItems();

    if (aSelectedItems.length === 0) {
        sap.m.MessageToast.show("Please select at least one item.");
        return;
    }

    // ✅ Confirmation popup
    sap.m.MessageBox.confirm("Are you sure you want to delete selected record(s)?", {
        title: "Confirm",
        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
        emphasizedAction: sap.m.MessageBox.Action.OK,

        onClose: function (oAction) {
            if (oAction === sap.m.MessageBox.Action.OK) {

                aSelectedItems.forEach(function (oItem) {
                    var oContext = oItem.getBindingContext();
                    var sPath = oContext.getPath(); // ✅ OData path

                    oModel.remove(sPath, {
                        success: function () {
                            sap.m.MessageToast.show("Deleted successfully");
                            oSmartTable.rebindTable(); // refresh
                        },
                        error: function () {
                            sap.m.MessageToast.show("Delete failed");
                        }
                    });
                });

            }
        }
    });
},
onAdd: function () {
    var oModel = this.getView().getModel();
    var oSmartTable = this.byId("smartTable");

    // ✅ New record
    var oNewData = {
        ID: Date.now().toString(),
        Name: "New Name",
        City: "New City",
        Age: "25"
    };

    // ✅ Create via OData
    oModel.create("/YourEntitySet", oNewData, {
        success: function () {
            sap.m.MessageToast.show("Record added successfully");
            oSmartTable.rebindTable(); // refresh table
        },
        error: function () {
            sap.m.MessageToast.show("Error while adding");
        }
    });
},
onEdit: function () {
    var oTable = this.byId("smartTable").getTable();
    var aSelectedItems = oTable.getSelectedItems();

    if (aSelectedItems.length !== 1) {
        sap.m.MessageToast.show("Select one row");
        return;
    }

    var oContext = aSelectedItems[0].getBindingContext();
    var oPath = oContext.getPath();   // ✅ OData path
    var oOriginalData = oContext.getObject();

    // Clone data
    var oData = JSON.parse(JSON.stringify(oOriginalData));

    var oDialog = new sap.m.Dialog({
        title: "Edit Record",

        content: [
            new sap.m.Input({
                value: oData.Name,
                placeholder: "Name",
                liveChange: function (oEvent) {
                    oData.Name = oEvent.getParameter("value");
                }
            }),
            new sap.m.Input({
                value: oData.City,
                placeholder: "City",
                liveChange: function (oEvent) {
                    oData.City = oEvent.getParameter("value");
                }
            })
        ],

        beginButton: new sap.m.Button({
            text: "Save",
            press: function () {

                var oModel = this.getView().getModel();

                // ✅ UPDATE via OData
                oModel.update(oPath, oData, {
                    success: function () {
                        sap.m.MessageToast.show("Updated successfully");
                        this.byId("smartTable").rebindTable();
                    }.bind(this),

                    error: function () {
                        sap.m.MessageToast.show("Update failed");
                    }
                });

                oDialog.close();
            }.bind(this)
        }),

        endButton: new sap.m.Button({
            text: "Cancel",
            press: function () {
                oDialog.close();
            }
        })
    });

    oDialog.open();
}




    })
});