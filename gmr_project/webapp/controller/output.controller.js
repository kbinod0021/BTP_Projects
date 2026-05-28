sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("gmrproject.controller.output", {
        onInit: function () {
            sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
                includeStylesheet("css/output.css");
            });
            var oModel = new JSONModel({
                currentStep: 1,
                totalSteps: 8,
                progressValue: 12.5,
                step1: true,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false,
                step7: false,
                step8: false,
                step1Class: "stepItem active",
                step2Class: "stepItem pending",
                step3Class: "stepItem pending",
                step4Class: "stepItem pending",
                step5Class: "stepItem pending",
                step6Class: "stepItem pending",
                step7Class: "stepItem pending",
                step8Class: "stepItem pending"
            });
            this.getView().setModel(oModel, "stepper");
            this._setStep(1);
        },

        _setStep: function (iStep) {
            var oModel = this.getView().getModel("stepper");
            if (!oModel) {
                return;
            }

            var iTotal = oModel.getProperty("/totalSteps") || 8;
            var fPct = (iStep / iTotal) * 100;

            oModel.setProperty("/currentStep", iStep);
            oModel.setProperty("/progressValue", parseFloat(fPct.toFixed(1)));

            for (var i = 1; i <= iTotal; i++) {
                oModel.setProperty("/step" + i, i === iStep);

                var oStepItem = this.byId("step" + i + "Item");
                if (oStepItem) {
                    oStepItem.removeStyleClass("done");
                    oStepItem.removeStyleClass("active");
                    oStepItem.removeStyleClass("pending");

                    var sState = i < iStep ? "done" : i === iStep ? "active" : "pending";
                    oStepItem.addStyleClass("stepItem");
                    oStepItem.addStyleClass(sState);
                }
            }
        },

        onNext: function () {
            var oModel = this.getView().getModel("stepper");
            if (!oModel) {
                return;
            }

            var iStep = oModel.getProperty("/currentStep") || 1;
            var iTotal = oModel.getProperty("/totalSteps") || 8;

            if (iStep < iTotal) {
                this._setStep(iStep + 1);
            }
        },
        onNex1: function () {
            var oModel = this.getView().getModel("stepper");
            var step = oModel.getProperty("/currentStep");

            if (step < 8) {
                step++;

                oModel.setProperty("/currentStep", step);

                // Update visibility
                for (let i = 1; i <= 8; i++) {
                    oModel.setProperty("/step" + i, i === step);
                }

                // Update progress
                oModel.setProperty("/progressValue", (step / 8) * 100);
            }
        },

        onBack: function () {
            var oModel = this.getView().getModel("stepper");
            if (!oModel) {
                return;
            }

            var iStep = oModel.getProperty("/currentStep") || 1;

            if (iStep > 1) {
                this._setStep(iStep - 1);
            }
        },
        onBack1: function () {
            var oModel = this.getView().getModel("stepper");
            var step = oModel.getProperty("/currentStep");

            if (step > 1) {
                step--;

                oModel.setProperty("/currentStep", step);

                // Update visibility
                for (let i = 1; i <= 8; i++) {
                    oModel.setProperty("/step" + i, i === step);
                }

                // Update progress
                oModel.setProperty("/progressValue", (step / 8) * 100);
            }
        }


    });
});