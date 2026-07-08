sap.ui.define([
    "sap/ui/core/mvc/Controller",

    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/ValueState"

], function (
    Controller, MessageToast, MessageBox, ValueState
) {
    "use strict";

    return Controller.extend("gmrproject.controller.CustomView", {
        onInit: function () {



            sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
                includeStylesheet("css/customView.css");
            });



            var oModel = new sap.ui.model.json.JSONModel({
                parts: [
                    { key: "1001", partName: "Motor Assembly" },
                    { key: "1002", partName: "Brake Pad" },
                    { key: "1003", partName: "Oil Filter" },
                    { key: "1004", partName: "Air Filter" }
                ]
            });

            this.getView().setModel(oModel);

        },
        onPartSelected: function (oEvent) {

            var oSelectedItem = oEvent.getParameter("selectedItem");

            if (oSelectedItem) {

                console.log("Part Key :", oSelectedItem.getKey());
                console.log("Part Name :", oSelectedItem.getText());

            }
        },
        onSuggestPart: function (oEvent) {

            var sValue = oEvent.getParameter("suggestValue");
            var oInput = oEvent.getSource();

            var oBinding = oInput.getBinding("suggestionItems");

            console.log(oBinding); // should not be undefined

            if (oBinding) {

                var aFilters = [];

                if (sValue) {
                    aFilters.push(
                        new sap.ui.model.Filter(
                            "partName",
                            sap.ui.model.FilterOperator.Contains,
                            sValue
                        )
                    );
                }

                oBinding.filter(aFilters);


                // Check filtered results
                setTimeout(function () {

                    var iCount = oBinding.getLength();

                    if (sValue && iCount === 0) {
                        sap.m.MessageToast.show("No matching part found");
                    }

                }, 100);


            }
        },


        onRegister: function () {

            var bValid = true;

            // Name
            var oName = this.byId("inpName");



            if (!oName.getValue().trim()) {
                this.byId("txtNameError").setText("Name is required");
                this.byId("txtNameError").setVisible(true);
                bValid = false;
            } else {
                this.byId("txtNameError").setVisible(false);
            }


            // Email
            var oEmail = this.byId("inpEmail");
            var sEmail = oEmail.getValue().trim();
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!sEmail) {
                this.byId("txtEmailError").setText("Email is required");
                this.byId("txtEmailError").setVisible(true);
                bValid = false;
            } else if (!emailPattern.test(sEmail)) {
                this.byId("txtEmailError").setText("Enter valid email");
                this.byId("txtEmailError").setVisible(true);
                bValid = false;
            } else {
                this.byId("txtEmailError").setVisible(false);
            }


            // Password


            var oPassword = this.byId("inpPassword");
            var sPassword = oPassword.getValue().trim();

            var oPwdError = this.byId("txtPasswordError");

            if (!sPassword) {
                oPwdError.setText("Password is required");
                oPwdError.setVisible(true);
                bValid = false;
            }
            else if (sPassword.length < 8) {
                oPwdError.setText("Password must be at least 8 characters long");
                oPwdError.setVisible(true);
                bValid = false;
            }
            else if (!/[A-Z]/.test(sPassword)) {
                oPwdError.setText("Password must contain at least one uppercase letter");
                oPwdError.setVisible(true);
                bValid = false;
            }
            else if (!/[a-z]/.test(sPassword)) {
                oPwdError.setText("Password must contain at least one lowercase letter");
                oPwdError.setVisible(true);
                bValid = false;
            }
            else if (!/[0-9]/.test(sPassword)) {
                oPwdError.setText("Password must contain at least one number");
                oPwdError.setVisible(true);
                bValid = false;
            }
            else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(sPassword)) {
                oPwdError.setText("Password must contain at least one special character");
                oPwdError.setVisible(true);
                bValid = false;
            }
            else {
                oPwdError.setVisible(false);
            }




            var oPhone = this.byId("inpPhone");
            var sPhone = oPhone.getValue().trim();

            // US-style phone pattern (123-456-7890, 1234567890, etc.)
            var phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

            if (!sPhone) {

                this.byId("txtPhoneError").setText("Phone number is required");
                this.byId("txtPhoneError").setVisible(true);
                bValid = false;

            }
            else if (sPhone.replace(/\D/g, "").length !== 10) {
                oPhone.setValueState(ValueState.Error);
                oPhone.setValueStateText("Phone Number must be 10 digits");
                bValid = false;
            }
            else if (!phonePattern.test(sPhone)) {

                this.byId("txtPhoneError").setText("Enter valid 10 digit phone number");
                this.byId("txtPhoneError").setVisible(true);
                bValid = false;

            }
            else {
                oPhone.setValueState(ValueState.None);
            }


            // DatePicker
            var oDate = this.byId("dpDOB");
            if (!oDate.getDateValue()) {
                this.byId("txtDOBError").setText("Date of Birth is required");
                this.byId("txtDOBError").setVisible(true);
                bValid = false;
            } else {
                this.byId("txtDOBError").setVisible(false);
            }

            // if (!oDate.getDateValue()) {
            //     oDate.setValueState(ValueState.Error);
            //     oDate.setValueStateText("Date of Birth is required");
            //     bValid = false;
            // } else {
            //     oDate.setValueState(ValueState.None);
            // }

            // RadioButtonGroup
            var oGender = this.byId("rbgGender");

            if (oGender.getSelectedIndex() === -1) {
                this.byId("txtGenderError").setText("Please select gender");
                this.byId("txtGenderError").setVisible(true);
                bValid = false;
            } else {
                this.byId("txtGenderError").setVisible(false);
            }


            // Select
            var oCountry = this.byId("selCountry");

            if (!oCountry.getSelectedKey()) {
                this.byId("txtCountryError").setText("Country is required");
                this.byId("txtCountryError").setVisible(true);
                bValid = false;
            } else {
                this.byId("txtCountryError").setVisible(false);
            }


            // MultiComboBox
            var oSkills = this.byId("mcbSkills");

            if (oSkills.getSelectedItems().length === 0) {
                this.byId("txtSkillsError").setText("Select at least one skill");
                this.byId("txtSkillsError").setVisible(true);
                bValid = false;
            } else {
                this.byId("txtSkillsError").setVisible(false);
            }


            // TextArea
            var oAddress = this.byId("txtAddress");

            if (!oAddress.getValue().trim()) {
                this.byId("txtAddressError").setText("Address is required");
                this.byId("txtAddressError").setVisible(true);
                bValid = false;
            } else {
                this.byId("txtAddressError").setVisible(false);
            }


            if (!bValid) {
                MessageBox.error("Please correct the highlighted fields.");
                return;
            }

            MessageToast.show("Registration Successful!");
        },
        onEmailLiveChange: function (oEvent) {

            var sEmail = oEvent.getParameter("value").trim();
            var oErrorText = this.byId("txtEmailError");

            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!sEmail) {
                oErrorText.setText("Email is required");
                oErrorText.setVisible(true);
            }
            else if (!emailPattern.test(sEmail)) {
                oErrorText.setText("Invalid email format");
                oErrorText.setVisible(true);
            }
            else {
                oErrorText.setVisible(false);
            }
        },
        onPasswordLiveChange: function (oEvent) {
            var oPassword = oEvent.getParameter("value").trim();
            var sPassword = oPassword;//.getValue().trim();

            var oPwdError = this.byId("txtPasswordError");

            if (!sPassword) {
                oPwdError.setText("Password is required");
                oPwdError.setVisible(true);

            }
            else if (sPassword.length < 8) {
                oPwdError.setText("Password must be at least 8 characters long");
                oPwdError.setVisible(true);

            }
            else if (!/[A-Z]/.test(sPassword)) {
                oPwdError.setText("Password must contain at least one uppercase letter");
                oPwdError.setVisible(true);

            }
            else if (!/[a-z]/.test(sPassword)) {
                oPwdError.setText("Password must contain at least one lowercase letter");
                oPwdError.setVisible(true);

            }
            else if (!/[0-9]/.test(sPassword)) {
                oPwdError.setText("Password must contain at least one number");
                oPwdError.setVisible(true);

            }
            else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(sPassword)) {
                oPwdError.setText("Password must contain at least one special character");
                oPwdError.setVisible(true);

            }
            else {
                oPwdError.setVisible(false);
            }
        },
        onAutoPopulate: function () {

            this.byId("inpName").setValue("Binod Kumar");

            this.byId("inpEmail").setValue("binod.kumar@gmail.com");

            this.byId("inpPassword").setValue("Welcome@123");

            this.byId("inpPhone").setValue("9876543210");

            this.byId("dpDOB").setDateValue(new Date(1995, 5, 15));

            this.byId("rbgGender").setSelectedIndex(0); // Male

            this.byId("selCountry").setSelectedKey("IN");

            this.byId("mcbSkills").setSelectedKeys([
                "UI5",
                "ABAP",
                "Fiori"
            ]);

            this.byId("txtAddress").setValue(
                "Sector 62, Noida, Uttar Pradesh"
            );

            // Clear validation messages
            [
                "txtNameError",
                "txtEmailError",
                "txtPasswordError",
                "txtPhoneError",
                "txtDOBError",
                "txtGenderError",
                "txtCountryError",
                "txtSkillsError",
                "txtAddressError"
            ].forEach(function (sId) {
                this.byId(sId).setVisible(false);
            }.bind(this));

            sap.m.MessageToast.show("Sample data populated");
        }

    });
});