sap.ui.define([], function () {
    "use strict";

    return {
        onAfterRender: function (oEvent) {

            var oControl = oEvent.getSource();
            var oCtx = oControl.getBindingContext("tileModel");

            if (!oCtx) return;

            var sStatus = oCtx.getProperty("statusColor");

            if (sStatus) {
                oControl.addStyleClass(sStatus); // ✅ adds green / orange
            }
        }
    };
});
