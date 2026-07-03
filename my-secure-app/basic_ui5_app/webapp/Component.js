sap.ui.define([
    "sap/ui/core/UIComponent",
    "basicui5app/model/models"
], function (UIComponent, models) {
    "use strict";

    return UIComponent.extend("basicui5app.Component", {

        metadata: {
            manifest: "json"
        },

        async init() {
            UIComponent.prototype.init.apply(this, arguments);

            if (sap.ushell && sap.ushell.Container) {
                const oUserInfo = await sap.ushell.Container.getServiceAsync("UserInfo");
                console.log("User:", oUserInfo);

                
console.log("User ID:", oUserInfo.getId());
    console.log("Full Name:", oUserInfo.getFullName());
    console.log("First Name:", oUserInfo.getFirstName());
    console.log("Last Name:", oUserInfo.getLastName());
    console.log("Email:", oUserInfo.getEmail());

            }

            this.setModel(models.createDeviceModel(), "device");
            this.getRouter().initialize();
        }
    });
});