sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    'sap/m/MessagePopover',
    'sap/m/MessagePopoverItem'
], (Controller, MessageBox, MessageToast, JSONModel, Device, MessagePopover, MessagePopoverItem) => {
    "use strict";

     var oMessageTemplate = new MessagePopoverItem({
        type: '{T}',
        title: '{S}',
    });
    var oMessagePopover = new MessagePopover({
        items: {
            path: '/',
            template: oMessageTemplate
        }
    });


    return Controller.extend("gmrproject.controller.subView1", {
        onInit: function () {
              var that = this;
            var pop_msgModel = new sap.ui.model.json.JSONModel({
                "messagesLength": "",
                "type": "Default"
            });
            this.getView().setModel(pop_msgModel, "popoverModel");
            var popModel = new sap.ui.model.json.JSONModel({});
            oMessagePopover.setModel(popModel);
        },
         onSuccess: function () {
            var that = this;
            var message = "This is a success message!";
            var w_data = [];
            w_data.push({
                T: "Success",
                S: message
            });
            var previous = oMessagePopover.getModel().getData();
            if (previous.length === undefined)
                previous = [];
            var updated = previous !== "" ? previous.concat(w_data) : w_data
            oMessagePopover.getModel().setData(updated);
            oMessagePopover.getModel().refresh(true);
            that.getView().getModel("popoverModel").getData().messagesLength = updated.length;
            that.getView().getModel("popoverModel").getData().type = "Emphasized";
            that.getView().getModel("popoverModel").refresh(true);
        },
        onError: function () {
            var that = this;
            var message = "This is an error message!";
            var w_data = [];
            w_data.push({
                T: "Error",
                S: message
            });
            var previous = oMessagePopover.getModel().getData();
            if (previous.length === undefined)
                previous = [];
            var updated = previous !== "" ? previous.concat(w_data) : w_data
            oMessagePopover.getModel().setData(updated);
            oMessagePopover.getModel().refresh(true);
            that.getView().getModel("popoverModel").getData().messagesLength = updated.length;
            that.getView().getModel("popoverModel").getData().type = "Emphasized";
            that.getView().getModel("popoverModel").refresh(true);
        },
        handleMessagePopoverPress: function (oEvent) {
            oMessagePopover.toggle(oEvent.getSource());
        }
    })
})