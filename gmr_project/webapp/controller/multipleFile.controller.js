sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("gmrproject.controller.multipleFile", {

        onBeforeUploadStarts: function () {

            MessageToast.show("Upload Started");
        },

        onUploadCompleted: function () {

            MessageToast.show("Upload Completed");
        },

        onMultiUploadSubmit: function () {

            var oUploadSet = this.byId("idMultiUploader");

            oUploadSet.upload();
        },

        onChangeEmailUpload: function () {

            console.log("Selection Changed");
        }

    });
});
