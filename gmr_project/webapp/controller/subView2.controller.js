
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/table/Column",
    "sap/m/Text",
    "sap/m/Label",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",

], function (
    Controller,
    JSONModel,
    Column,
    Text,
    Label,
    MessageToast,
    MessageBox,
    Fragment
) {

    "use strict";


    return Controller.extend("gmrproject.controller.subView2", {

        onInit: function () {
            


            sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
                includeStylesheet("css/subView2.css");
            });
            // JSON Data

            var oData = {
                customers: [
                    {
                        name: "John Doe",
                        address: "123 Main St",
                        email: "john.doe@example.com"
                    },
                    {
                        name: "Jane Doe",
                        address: "456 Oak Ave",
                        email: "jane.doe@example.com"
                    }
                ]
            };

            var oModel = new JSONModel(oData);

            this.getView().setModel(oModel, "customerModel");


        },


      

        handleDelete: function () {

            var oTable = this.byId("customerTable");

            var iIndex = oTable.getSelectedIndex();

            if (iIndex === -1) {

                MessageToast.show("Please select a row");

                return;
            }

            var oModel = this.getView().getModel("customerModel");

            var aCustomers = oModel.getProperty("/customers");

            aCustomers.splice(iIndex, 1);

            oModel.setProperty("/customers", aCustomers);

            MessageToast.show("Row deleted");

        },
        onHelpPress1: function () {

            var sUserId = "TEST_USER";
            var sFullName = "Test User";

            // Check FLP availability
            if (typeof sap !== "undefined" &&
                sap.ushell &&
                sap.ushell.Container) {

                var oUserInfo = sap.ushell.Container.getService("UserInfo");

                sUserId = oUserInfo.getId();
                sFullName = oUserInfo.getUser().getFullName();
            }





            // Selected text
            var selectedData = window.getSelection().focusNode.nodeValue;
            var getSelectedField = window.getSelection().anchorNode.nodeValue;
            if (!selectedData) {

                sap.m.MessageBox.error(
                    "Please highlight text first"
                );

                return;
            }

            sap.m.URLHelper.triggerEmail("binod.kumar@in.ey.com", "RUDE LABS: Data Issue for Customer " + selectedData, "Hello " + "Team" +
                ", \n\n" +
                "Kindly look into the Address with the following details: \n" +
                "Customer name: " + selectedData + "\n" +
                "Current Address: " + getSelectedField + "\n" +
                "Hello Team,\n\n" +
                "Reporter ID: " + sUserId + "\n\n" +
                "Regards,\n" +
                sFullName
            );
        },
        onHelpPress: function () {
            // Get data from selection on screen
            if (window.getSelection().baseNode === null) {
                MessageBox.error(
                    "Please highlight the field and value for which you want to report issue!"
                );
            } else {
                var selectedData = window.getSelection().focusNode.nodeValue;
                var getSelectedField = window.getSelection().anchorNode.nodeValue;



                var oTable = this.byId("customerTable");

                var iIndex = oTable.getSelectedIndex();

                if (iIndex === -1) {

                    sap.m.MessageToast.show("Please select a row");
                    return;
                }

                // Get selected row context
                var oContext = oTable.getContextByIndex(iIndex);

                // Get row data
                var oSelectedData = oContext.getObject();


                // Check if there was any selection
                // if (selectedData === null || getSelectedField === null) {
                if (oSelectedData === null) {
                    MessageBox.error(
                        "Please highlight the field and value for which you want to report issue!"
                    );
                } else {

                    var sUserId = "TEST_USER";
                    var sFullName = "Test User";

                    // Check FLP availability
                    if (typeof sap !== "undefined" &&
                        sap.ushell &&
                        sap.ushell.Container) {

                        var oUserInfo = sap.ushell.Container.getService("UserInfo");

                        sUserId = oUserInfo.getId();
                        sFullName = oUserInfo.getUser().getFullName();
                    }

                    // Trigger email with custom email data
                    sap.m.URLHelper.triggerEmail("binod.kumar@in.ey.com,akash.gupta@in.ey.com", "RUDE LABS: Data Issue for Customer " + oSelectedData.name, "Hello " + "Team" +
                        ", \n\n" +
                        "Kindly look into the Address with the following details: \n" +
                        "Customer name: " + oSelectedData.name + "\n" +
                        "Current Address: " + oSelectedData.address + "\n" +
                        "Reporter User ID: " + sUserId + "\n\n\n\n" +
                        "Thanks & Regards," + "\n" +
                        sFullName
                    );
                }
            }
        },
        onOpenDialog: function () {
            var oView = this.getView();

            if (!this._oDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "gmrproject.view.AddUser",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                    var oNameInput = this.byId("inputName");
                    var oEmailInput = this.byId("inputEmail");

                    oNameInput.setValueState("None");
                    oEmailInput.setValueState("None");
                       this.byId("btnSave").setText("Add");

                }.bind(this));
            } else {
                this._oDialog.open();
                var oNameInput = this.byId("inputName");
                var oEmailInput = this.byId("inputEmail");

                oNameInput.setValueState("None");
                oEmailInput.setValueState("None");
   this.byId("btnSave").setText("Add");
            }

 


        },
        onEdit: function () {
            var oTable = this.byId("customerTable");

            var iIndex = oTable.getSelectedIndex();

            if (iIndex === -1) {

                sap.m.MessageToast.show("Please select a row");
                return;
            }

            // Get selected row context
            var oContext = oTable.getContextByIndex(iIndex);

            // Get row data
            var oSelectedData = oContext.getObject();

            var oView = this.getView();

            if (!this._oDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "gmrproject.view.AddUser",
                    controller: this
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    oView.addDependent(oDialog);
                    oDialog.open();
                    this.byId("inputName").setValue(oSelectedData.name);
                    this.byId("inputEmail").setValue(oSelectedData.email);
                    this.byId("dlgAddress").setValue(oSelectedData.address);

                }.bind(this));
            } else {
                this._oDialog.open();
                this.byId("inputName").setValue(oSelectedData.name);
                this.byId("inputEmail").setValue(oSelectedData.email);
                this.byId("dlgAddress").setValue(oSelectedData.address);

            }

    this.byId("btnSave").setText("Update");

        },
        onDelete: function () {
            // var oModel = this.getView().getModel("customerModel");

            // // Get existing data
            // var oData = oModel.getData();

            // // Find existing record
            // var oData = oData.customers.filter(function (oItem) {
            //     return oItem.email !== oEmail; // unique check
            // });
            // oModel.setData(oData);
            // oModel.refresh(); // ensure UI updates

            var oTable = this.byId("customerTable");
            var iSelectedIndex = oTable.getSelectedIndex();

            // Check if a row is selected
            if (iSelectedIndex === -1) {
                sap.m.MessageToast.show("Please select a record to delete");
                return;
            }

            // Confirmation popup
            sap.m.MessageBox.confirm("Are you sure you want to delete this record?", {
                title: "Confirm",
                actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.YES) {

                        var oModel = this.getView().getModel("customerModel");
                        var oData = oModel.getData();

                        // Remove selected item
                        oData.customers.splice(iSelectedIndex, 1);

                        // Update model
                        oModel.setData(oData);
                        oModel.refresh();

                        sap.m.MessageToast.show("Record deleted successfully");
                    }
                }.bind(this) // important
            });


        },
        onCloseDialog: function () {
            this._oDialog.close();
        },
        onSaveUser: function () {
            var sViewId = this.getView().getId();

            var oNameInput = this.byId("inputName");
            var oName = this.byId("inputName").getValue();

            var oEmailInput = this.byId("inputEmail");

            var oEmail = this.byId("inputEmail").getValue();
            var oAddess = this.byId("dlgAddress").getValue();

            let validationData = {
                oNameInput,
                oName,
                oEmailInput,
                oEmail
            }

            let bValid = this.validationField(validationData)
            if (!bValid) {
                return;
            }

            var oModel = this.getView().getModel("customerModel");

            // Get existing data
            var oData = oModel.getData();

            // Find existing record
            var iIndex = oData.customers.findIndex(function (oItem) {
                return oItem.email === oEmail; // unique check
            });

            if (iIndex !== -1) {
                // ✅ Update existing record
                oData.customers[iIndex].name = oName;
                oData.customers[iIndex].address = oAddess;

            } else {
                // ✅ Add new record
                oData.customers.push({
                    name: oName,
                    email: oEmail,
                    address: oAddess
                });
            }

            // oData.customers.push({ name: oName, email: oEmail, address: oAddess })

            // Update model
            oModel.setData(oData);
            oModel.refresh(); // ensure UI updates

            this.byId("inputName").setValue("");
            this.byId("inputEmail").setValue("");
            this.byId("dlgAddress").setValue("");
            this._oDialog.close();
        },
        validationField: function (validationData) {

            var bValid = true;

            // -------- Name Validation --------
            if (!validationData.oName) {
                validationData.oNameInput.setValueState("Error");
                validationData.oNameInput.setValueStateText("Name is required");
                bValid = false;
            } else {
                validationData.oNameInput.setValueState("None");
            }

            // -------- Email Validation --------
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!validationData.oEmail) {
                validationData.oEmailInput.setValueState("Error");
                validationData.oEmailInput.setValueStateText("Email is required");
                bValid = false;
            } else if (!emailRegex.test(validationData.oEmail)) {
                validationData.oEmailInput.setValueState("Error");
                validationData.oEmailInput.setValueStateText("Enter valid email format");
                bValid = false;
            } else {
                validationData.oEmailInput.setValueState("None");
            }


            return bValid

        },
        onEmailLiveChange: function (oEvent) {
            var oInput = oEvent.getSource();
            var sValue = oInput.getValue();

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (sValue && !emailRegex.test(sValue)) {
                oInput.setValueState("Error");
                oInput.setValueStateText("Invalid email format");
            } else {
                oInput.setValueState("None");
            }
        }
    })
})