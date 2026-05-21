sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("gmrproject.controller.CommonMenu", {
       onInit: function () {

   
 sap.ui.require(["sap/ui/dom/includeStylesheet"], function(includeStylesheet) {
        includeStylesheet("css/custom_studio.css");
    });


}
    });
});