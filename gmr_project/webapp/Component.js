sap.ui.define([
    "sap/ui/core/UIComponent",
    "gmrproject/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("gmrproject.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

     this.getRouter().navTo("Routemain", {}, true); // true = replace history






//  if (window.location.hash) {
//         this.getRouter().navTo("main", {}, true); // replace history
//     }


        }
    });
});