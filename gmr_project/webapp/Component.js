sap.ui.define([
    "sap/ui/core/UIComponent",
    "gmrproject/model/models",

    "sap/ui/core/util/MockServer"

], (UIComponent, models, MockServer) => {
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


//             var oDeviceModel = new sap.ui.model.json.JSONModel(sap.ui.Device);
//             oDeviceModel.setDefaultBindingMode("OneWay");
//             this.setModel(oDeviceModel, "device");

// console.log('oDeviceModel',sap.ui.Device.system);


            //  sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
            //                 includeStylesheet("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
            //             });


            sap.ui.require([
                "gmrproject/libs/chart.min"
            ], function () {
                console.log(window.Chart);
            });




            // enable routing
            this.getRouter().initialize();
            this.setModel(new sap.ui.model.json.JSONModel(models.createAppConfigData()), "appConfigModel");

            this.getRouter().navTo("studio", {}, true); // true = replace history




            var oMockServer = new MockServer({
                rootUri: "/odata/"
            });

            oMockServer.simulate("localService/metadata.xml", {
                sMockdataBaseUrl: "localService/mockdata",
                bGenerateMissingMockData: true
            });



            oMockServer.start();

            var oModel = new sap.ui.model.odata.v2.ODataModel("/odata/");
            this.setModel(oModel);


            window.addEventListener("beforeunload", this._handleCloseDialog.bind(this));


            //  if (window.location.hash) {
            //         this.getRouter().navTo("main", {}, true); // replace history
            //     }


        },
        _handleCloseDialog: function () {
            var oDialog = this.byId("myDialog");
            if (oDialog) {
                oDialog.close();
            }
        }

    });
});