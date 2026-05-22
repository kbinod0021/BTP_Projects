sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("gmrproject.controller.CommonMenu", {
    onInit: function () {


      sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
        includeStylesheet("css/custom_studio.css");
      });
      let tileJson = {
        "items": [
          {
            "code": "GR",
            "name": "GRIDCO",
            "location": "Kamalanga - GKEL",
            "section": "S62",
            "count": "5/10",
            "statusColor": "green",
            "isSelected": true
          },
          {
            "code": "BI",
            "name": "Bihar",
            "location": "Kamalanga - GKEL",
            "section": "S63",
            "count": "5/10",
            "statusColor": "purple",
            "isSelected": false
          },
          {
            "code": "HR",
            "name": "Haryana PTC",
            "location": "Kamalanga - GETL",
            "section": "S63",
            "count": "5/10",
            "statusColor": "Haryana",
            "isSelected": false
          },
          {
            "code": "MH",
            "name": "Maharashtra",
            "location": "Warora - GWEL",
            "section": "S63",
            "count": "5/10",
            "statusColor": "Maharashtra",
            "isSelected": false
          },
          {
            "code": "TN",
            "name": "TANGEDCO",
            "location": "Warora - GETL",
            "section": "S63",
            "count": "5/10",
            "statusColor": "orange",
            "isSelected": false
          }
        ]
      }
      var oModel = new sap.ui.model.json.JSONModel(tileJson);
      this.getView().setModel(oModel, "tileModel");

    },
    onAfterRendering: function () {

      var oView = this.getView();

      var aControls = oView.findAggregatedObjects(true, function (oControl) {
        return oControl.isA("sap.m.Text") && oControl.hasStyleClass("circle");
      });

      aControls.forEach(function (oControl) {

        var oCtx = oControl.getBindingContext("tileModel");
        if (!oCtx) return;

        var sStatus = oCtx.getProperty("statusColor");

        // ✅ remove old classes first (important)
        oControl.removeStyleClass("green");
        oControl.removeStyleClass("orange");
        oControl.removeStyleClass("purple");

        if (sStatus) {
          oControl.addStyleClass('tileIcon ' + sStatus); // ✅ APPLY CLASS HERE
        }

      });
    },

   onItemPress: function (oEvent) {
debugger
    const oItem = oEvent.getSource(); // clicked CustomListItem
    const oContext = oItem.getBindingContext("tileModel");
    const oData = oContext.getObject();

    const oList = oItem.getParent(); // ✅ get List control
    const aItems = oList.getItems(); // ✅ all items

    // Remove active class from all items
    aItems.forEach(function (item) {
        const oBox = item.getContent()[0]; // HBox

        if (oBox) {
            // Remove all possible active classes (generic way)
            const aClasses = oBox.aCustomStyleClasses || [];
            aClasses.forEach(function (cls) {
                if (cls.startsWith("active")) {
                    oBox.removeStyleClass(cls);
                }
            });
        }
    });

    // Add active class to clicked item
    const oHBox = oItem.getContent()[0];
    oHBox.addStyleClass("active" + oData.code);

   oContext.setProperty("/selectedCode", oData);
    console.log('hi');
    

}

  });
});