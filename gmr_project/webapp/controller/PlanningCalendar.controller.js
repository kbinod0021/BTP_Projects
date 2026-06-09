sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
  "sap/m/MessageToast",

], function (Controller, JSONModel, Fragment, MessageToast) {
  "use strict";

  return Controller.extend("gmrproject.controller.PlanningCalendar", {

    onInit: function () {
      sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
				includeStylesheet("css/planningCalendar.css");
			});
      // var oDate = new Date();
      // oDate.setHours(0, 0, 0, 0);

      // var oModel = new JSONModel({
      //   startDate: oDate,
      //   people: [{
      //     name: "Binod Kumar",
      //     key: "1",
      //     appointments: []
      //   }]
      // });

      // this.getView().setModel(oModel);


      var oStartDate = new Date(2026, 5, 8);

      var oModel = new JSONModel({

        startDate: oStartDate,

        people: [{
          name: "Binod Kumar",

          appointments: [

            {
              start: new Date(2026, 5, 8, 8, 30),
              end: new Date(2026, 5, 8, 9, 30),
              title: "FW: HSCP Bintag Issue",
              info: "Ashish Rohilla",
              type: "Type02"
            },

            {
              start: new Date(2026, 5, 9, 10, 30),
              end: new Date(2026, 5, 9, 11, 0),
              title: "Sync Up",
              info: "",
              type: "Type01"
            }

          ]
        }]
      });

      this.getView().setModel(oModel);

    },

    onToday: function () {
      this.byId("PC1").setStartDate(new Date());
    },

    onOpenDialog: function () {
      var oView = this.getView();

      if (!this._oDialog) {
        Fragment.load({
          id: oView.getId(),
          name: "gmrproject.view.AddAppointment",
          controller: this
        }).then(function (oDialog) {
          this._oDialog = oDialog;
          oView.addDependent(oDialog);
          oDialog.open();
        }.bind(this));
      } else {
        this._oDialog.open();
      }
    },

    onCloseDialog: function () {
      this._oDialog.close();
    },

    onSaveAppointment: function () {

      var sViewId = this.getView().getId();

      var oDate = sap.ui.getCore().byId(sViewId + "--dlgDate").getDateValue();
      var oStart = sap.ui.getCore().byId(sViewId + "--dlgStartTime").getDateValue();
      var oEnd = sap.ui.getCore().byId(sViewId + "--dlgEndTime").getDateValue();
      var sDesc = sap.ui.getCore().byId(sViewId + "--dlgDesc").getValue();

      if (!oDate || !oStart || !oEnd || !sDesc) {
        MessageToast.show("Fill all fields");
        return;
      }

      var startDate = new Date(oDate);
      startDate.setHours(oStart.getHours(), oStart.getMinutes());

      var endDate = new Date(oDate);
      endDate.setHours(oEnd.getHours(), oEnd.getMinutes());

      if (endDate <= startDate) {
        MessageToast.show("End must be after start");
        return;
      }

      var oModel = this.getView().getModel();
      var aPeople = oModel.getProperty("/people");

      aPeople[0].appointments.push({
        title: sDesc,
        description: sDesc,
        start: startDate,
        end: endDate,
        type: "Type01"
      });

      oModel.setProperty("/people", aPeople);
      oModel.refresh(true);

      MessageToast.show("Added ✅");

      this._oDialog.close();
    }

  });
});