
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

            
var oDatacountries = {
    countries: [
        { key: "0", text: "India" },
        { key: "1", text: "Andora" },
        { key: "2", text: "Argentina" },
        { key: "3", text: "Brazil" },
        { key: "4", text: "Bulgaria" },
        { key: "5", text: "Canada" },
        { key: "6", text: "China" },
        { key: "7", text: "Denmark" },
        { key: "8", text: "Estonia" },
        { key: "9", text: "The United Kingdom of Great Britain and Northern Ireland" },
        { key: "10", text: "Finland" },
        { key: "11", text: "Germany" },
        { key: "12", text: "Hungary" },
        { key: "13", text: "Ireland" },
        { key: "14", text: "Norway" },
        { key: "15", text: "Japan" },
        { key: "16", text: "Korea" },
        { key: "17", text: "Latvia" },
        { key: "18", text: "Independent and Sovereign Republic of Kiribati" },
        { key: "19", text: "Italy" }
    ]
};

var oModel = new JSONModel(oDatacountries);
this.getView().setModel(oModel, "tokenModel");
	this.initRichTextEditor(false);


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
        },
        onTokenDelete: function (oEvent) {
            var aDeletedTokens = oEvent.getParameter("tokens");
            var oTokenizer = this.getView().byId("tokenizerMultiLine");

            aDeletedTokens.forEach(function (oToken) {
                oTokenizer.removeToken(oToken);
            });
        },
        	handleSelect: function (oEvent) {
			var sSelectedKey = oEvent.getParameters().selectedItem.getKey();
			if (this.oRichTextEditor) {
				this.oRichTextEditor.destroy();
			}
			switch (sSelectedKey) {
				case "TinyMCE6":
					this.initRichTextEditor(true);
					break;
				default:
					this.initRichTextEditor(false);
					break;
			}
		},
		initRichTextEditor: function () {
			var that = this,
				sHtmlValue = '<p style="text-align: justify; font-size: 10pt; font-family: Calibri, sans-serif;"><strong><span style="font-size: 10.5pt; font-family: sans-serif;">Lorem ipsum dolor sit amet</span></strong>' +
					'<span style="font-size: 10.5pt; font-family: sans-serif;">, consectetur adipiscing elit. Suspendisse ornare, nibh nec gravida tincidunt, ipsum quam venenatis nisl, vitae venenatis urna sem eget ipsum. Ut cursus auctor leo et vulputate. ' +
					'Curabitur nec pretium odio, sed auctor felis. In vehicula, eros aliquam pharetra mattis, ante mi fermentum massa, nec pharetra arcu massa finibus augue. </span></p> ' +
					'<p style="margin: 0in 0in 11.25pt; text-align: justify; font-size: 10pt; font-family: Calibri, sans-serif;"><img style="float: left; padding-right: 1em;" src="http://monliban.org/images/1473838236_274706_l_srgb_s_gl_465881_large.jpg" width="304" height="181">' +
					'<span style="font-size: 10.5pt; font-family: sans-serif; color: #0070c0;">Phasellus imperdiet metus est, in luctus erat fringilla ut. In commodo magna justo, sit amet ultrices ipsum egestas quis.</span><span style="font-size: 10.5pt; font-family: sans-serif;"> ' +
					'Nullam ac mauris felis. Sed tempor odio diam, nec ullamcorper lacus laoreet vitae. <strong>Aenean quam libero</strong>, varius eu ex eu, aliquet fermentum orci. Donec eget ante sed enim pretium tempus. <strong><em>Aliquam semper neque eu aliquam dictum</em></strong>. ' +
					'Nulla in convallis diam. Fusce molestie risus nec posuere ullamcorper. Fusce ut sodales tortor. <u>Morbi eget odio a augue viverra semper.</u></span></p>' +
					'<p style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif;">Fusce dapibus sodales ornare. ' +
					'Nullam ac mauris felis. Sed tempor odio diam, nec ullamcorper lacus laoreet vitae. Aenean quam libero, varius eu ex eu, aliquet fermentum orci. Donec eget ante sed enim pretium tempus. Nullam laoreet metus ac enim placerat, nec tempor arcu finibus. ' +
					'Curabitur nec pretium odio, sed auctor felis. Nam eu neque faucibus, pharetra purus id, congue elit. Phasellus neque lectus, gravida at cursus at, pretium eu lorem. </span></p>' +
					'<ul>' +
					'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif;">Nulla non elit hendrerit, auctor arcu sit amet, tempor nisl.</span></li>' +
					'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif;">Morbi sed libero pulvinar, maximus orci et, hendrerit orci.</span></li>' +
					'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif;">Phasellus sodales enim nec sapien commodo mattis.</span></li>' +
					'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif;">Integer laoreet eros placerat pharetra euismod.</span></li>' +
					'</ul>' +
					'<p style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #c00000;">Ut vitae commodo ante. Morbi nibh dolor, ullamcorper sed interdum id, molestie vel libero. ' +
					'Proin volutpat dui eget ipsum scelerisque, a ullamcorper ipsum mattis. Cras sed elit sit amet diam convallis vehicula vitae ut nisl. Ut ornare dui ligula, id euismod lectus eleifend at. Nulla facilisi. In pharetra lectus et augue consequat vestibulum.</span></p>' +
					'<ol>' +
					'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif;">Proin id eros vel libero maximus dignissim ac et velit.</span></li>' +
					'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif;">In non odio pharetra, dapibus augue quis, laoreet felis.</span></li>' +
					'</ol>' +
					'<p style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif;">Donec a consectetur libero. Donec ut massa justo. Duis euismod varius odio in rhoncus. Nullam sagittis enim vel massa tempor, ' +
					'ut malesuada libero mollis. Vivamus dictum diam diam, quis rhoncus ex congue vel.</span></p>' +
					'<p style="text-align: center; font-size: 10pt; font-family: Calibri, sans-serif;" align="center"><em><span style="font-family: sans-serif; color: #a6a6a6;">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</span></em></p>' +
					'<p style="text-align: right; font-size: 10pt; font-family: Calibri, sans-serif;" align="right"><span style="font-family: sans-serif; color: #353535;">-</span> <strong><span style="font-family: sans-serif; color: #353535;">Sed in lacus dolor.</span></strong></p>';
			sap.ui.require(["sap/ui/richtexteditor/RichTextEditor", "sap/ui/richtexteditor/library"],
				function (RTE, library) {
					var EditorType = library.EditorType;
					that.oRichTextEditor = new RTE("myRTE", {
						editorType: EditorType.TinyMCE,
						width: "100%",
						height: "600px",
						customToolbar: true,
						showGroupFont: true,
						showGroupLink: true,
						showGroupInsert: true,
						value: sHtmlValue,
						ready: function () {
							this.addButtonGroup("styles").addButtonGroup("table");
						}
					});

					that.getView().byId("idVerticalLayout").addContent(that.oRichTextEditor);
				});
		}
    })
})