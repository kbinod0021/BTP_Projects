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
            "isSelected": true,
            "title": "GRIDCO — Configuration Studio",
            "subtitle": "Kamalanga · GKEL · Section 62 · Pricing Proc: ZKELGR",
            "plant": "Kamalanga",
            "active": "5/10",
            "saved": "0/3"
          },
          {
            "code": "BI",
            "name": "Bihar",
            "location": "Kamalanga - GKEL",
            "section": "S63",
            "count": "5/10",
            "statusColor": "purple",
            "isSelected": false,
            "title": "Bihar — Configuration Studio",
            "subtitle": "Kamalanga · GKEL · Section 63 · Pricing Proc: ZKELBH",
            "plant": "Kamalanga",
            "active": "5/10",
            "saved": "0/3"
          },
          {
            "code": "HR",
            "name": "Haryana PTC",
            "location": "Kamalanga - GETL",
            "section": "S63",
            "count": "5/10",
            "statusColor": "Haryana",
            "isSelected": false,
            "title": "Haryana PTC — Configuration Studio",
            "subtitle": "Kamalanga · GETL + GKEL (2-leg) · Section 63 · Pricing Proc: ZETLHR",
            "plant": "Kamalanga",
            "active": "5/10",
            "saved": "0/3"
          },
          {
            "code": "MH",
            "name": "Maharashtra",
            "location": "Warora - GWEL",
            "section": "S63",
            "count": "5/10",
            "statusColor": "Maharashtra",
            "isSelected": false,
            "title": "Maharashtra — Configuration Studio",
            "subtitle": "Warora · GWEL · Section 63 · Pricing Proc: ZWELMH",
            "plant": "Warora",
            "active": "5/10",
            "saved": "0/3"
          },
          {
            "code": "TN",
            "name": "TANGEDCO",
            "location": "Warora - GETL",
            "section": "S63",
            "count": "5/10",
            "statusColor": "orange",
            "isSelected": false,
            "title": "TANGEDCO — Configuration Studio",
            "subtitle": "Warora · GETL + GWEL (2-leg) · Section 63 · Pricing Proc: ZETLTN",
            "plant": "Warora",
            "active": "5/10",
            "saved": "0/3"
          }
        ]
      }

      var oModel = new sap.ui.model.json.JSONModel(tileJson);
      this.getView().setModel(oModel, "tileModel");

      this.bindtiles();

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



      var items = this.byId("dataUploadFlexboxid").getItems();

      items.forEach(function (item) {
        var ctx = item.getBindingContext("fileUpload");
        if (ctx) {
          var data = ctx.getObject();

          var textControl = item.getItems()[0].getItems()[0]; // navigate to Text
          textControl.addStyleClass("tileIcon " + data.icon.color);


          var badgeText = item.getItems()[0].getItems()[1];

          if (data.state === "ready") {
            badgeText.setText("✓Saved");
            badgeText.addStyleClass("badgeSuccess");
          } else {
            badgeText.setText("Sub-config required");
            badgeText.addStyleClass("badgeWarning");
          }

          var badgeContainer = item.getItems()[3]; // HBox of chips

          badgeContainer.removeAllItems();

          data.badges.forEach(function (badge) {
            var oText = new sap.m.Text({
              text: badge
            });

            if (badge === "popup needed") {
              oText.addStyleClass("bottomSection chipWarning");
            } else {
              oText.addStyleClass("bottomSection chip");
            }

            badgeContainer.addItem(oText);
          });

        }
      });
      this.addClassforCalculationTiles();
      this.addClassforMasterInputTiles();
      this.addClassforRatesTiles();
      this.addClassforoutputTiles();
      this.onAfterUploadFlexRendering();

    },
    addClassforCalculationTiles: function () {
      var items = this.byId("CalculationFlexboxid").getItems();

      items.forEach(function (item) {
        var ctx = item.getBindingContext("calculation");
        if (ctx) {
          var data = ctx.getObject();

          var textControl = item.getItems()[0].getItems()[0]; // navigate to Text
          textControl.addStyleClass("tileIcon " + data.icon.color);


          var badgeText = item.getItems()[0].getItems()[1];

          if (data.state === "ready") {
            badgeText.setText("✓Saved");
            badgeText.addStyleClass("badgeSuccess");
          } else {
            badgeText.setText("Sub-config required");
            badgeText.addStyleClass("badgeWarning");
          }

          var badgeContainer = item.getItems()[3]; // HBox of chips

          badgeContainer.removeAllItems();

          data.badges.forEach(function (badge) {
            var oText = new sap.m.Text({
              text: badge
            });

            if (badge === "popup needed") {
              oText.addStyleClass("bottomSection chipWarning");
            } else {
              oText.addStyleClass("bottomSection chip");
            }

            badgeContainer.addItem(oText);
          });

        }
      });


    },

    addClassforMasterInputTiles: function () {
      var items = this.byId("MasterInputsFlexboxid").getItems();

      items.forEach(function (item) {
        var ctx = item.getBindingContext("masterInput");
        if (ctx) {
          var data = ctx.getObject();

          var textControl = item.getItems()[0].getItems()[0]; // navigate to Text
          textControl.addStyleClass("tileIcon " + data.icon.color);


          var badgeText = item.getItems()[0].getItems()[1];

          if (data.state === "ready") {
            badgeText.setText("✓Saved");
            badgeText.addStyleClass("badgeSuccess");
          } else {
            badgeText.setText("Sub-config required");
            badgeText.addStyleClass("badgeWarning");
          }

          var badgeContainer = item.getItems()[3]; // HBox of chips

          badgeContainer.removeAllItems();

          data.badges.forEach(function (badge) {
            var oText = new sap.m.Text({
              text: badge
            });

            if (badge === "popup needed") {
              oText.addStyleClass("bottomSection chipWarning");
            } else {
              oText.addStyleClass("bottomSection chip");
            }

            badgeContainer.addItem(oText);
          });

        }
      });


    },
    addClassforoutputTiles: function () {
      var items = this.byId("OutputFlexboxid").getItems();

      items.forEach(function (item) {
        var ctx = item.getBindingContext("output");
        if (ctx) {
          var data = ctx.getObject();

          var textControl = item.getItems()[0].getItems()[0]; // navigate to Text
          textControl.addStyleClass("tileIcon " + data.icon.color);


          var badgeText = item.getItems()[0].getItems()[1];

          if (data.state === "ready") {
            badgeText.setText("✓Saved");
            badgeText.addStyleClass("badgeSuccess");
          } else {
            badgeText.setText("Sub-config required");
            badgeText.addStyleClass("badgeWarning");
          }

          var badgeContainer = item.getItems()[3]; // HBox of chips

          badgeContainer.removeAllItems();

          data.badges.forEach(function (badge) {
            var oText = new sap.m.Text({
              text: badge
            });

            if (badge === "popup needed") {
              oText.addStyleClass("bottomSection chipWarning");
            } else {
              oText.addStyleClass("bottomSection chip");
            }

            badgeContainer.addItem(oText);
          });

        }
      });


    },

    addClassforRatesTiles: function () {
      var items = this.byId("ratesFlexboxid").getItems();

      items.forEach(function (item) {
        var ctx = item.getBindingContext("rates");
        if (ctx) {
          var data = ctx.getObject();

          var textControl = item.getItems()[0].getItems()[0]; // navigate to Text
          textControl.addStyleClass("tileIcon " + data.icon.color);


          var badgeText = item.getItems()[0].getItems()[1];

          if (data.state === "ready") {
            badgeText.setText("✓Saved");
            badgeText.addStyleClass("badgeSuccess");
          } else {
            badgeText.setText("Sub-config required");
            badgeText.addStyleClass("badgeWarning");
          }

          var badgeContainer = item.getItems()[3]; // HBox of chips

          badgeContainer.removeAllItems();

          data.badges.forEach(function (badge) {
            var oText = new sap.m.Text({
              text: badge
            });

            if (badge === "popup needed") {
              oText.addStyleClass("bottomSection chipWarning");
            } else {
              oText.addStyleClass("bottomSection chip");
            }

            badgeContainer.addItem(oText);
          });

        }
      });


    },

    onItemPress: function (oEvent) {
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


      const oView = this.getView();

      // ✅ Update header fields using IDs
      oView.byId("code").setText(oData.code);
      oView.byId("title").setText(oData.title);
      oView.byId("subtitle").setText(oData.subtitle);
      oView.byId("section").setText(oData.section);
      oView.byId("plant").setText(oData.plant);
      oView.byId("active").setText(oData.active);
      oView.byId("saved").setText(oData.saved);

      this.bindtiles();

    },

    bindtiles: function () {
      let fileUpload = {
        "title": "Data Upload",
        "count": 4,
        "tiles": [
          {
            "id": "dc",
            "status": "on",
            "state": "ready",
            "icon": { "text": "DC", "color": "green" },
            "name": "DC Upload",
            "description": "Declared Capacity · plant ops manual upload (96 blocks × N days).",
            "badges": ["MAIN"]
          },
          {
            "id": "se",
            "status": "on",
            "state": "ready",
            "icon": { "text": "SE", "color": "green" },
            "name": "SE Upload (auto)",
            "description": "Scheduled Energy · auto-fetched from SLDC WBES API (D-1 nightly).",
            "badges": ["MAIN"]
          },
          {
            "id": "coal",
            "status": "on",
            "state": "needs",
            "icon": { "text": "F15", "color": "orange" },
            "name": "Form-15 Coal",
            "description": "Monthly coal cost from FI/MM close. Sources, GCV, landed price.",
            "badges": ["MAIN", "popup needed"]
          },
          {
            "id": "oil",
            "status": "on",
            "state": "needs",
            "icon": { "text": "F15", "color": "orange" },
            "name": "Form-15 Oil",
            "description": "Monthly oil cost (LDO/HFO). Density, CV, freight, duty.",
            "badges": ["MAIN", "popup needed"]
          }
        ]
      }

      var ofileUpload = new sap.ui.model.json.JSONModel(fileUpload);
      this.getView().setModel(ofileUpload, "fileUpload");

      let calculationJson = {
        "title": "Calculation",
        "count": 3,
        "tiles": [
          {
            "id": "cum",
            "status": "off",
            "icon": { "text": "fx", "color": "blue" },
            "name": "Cumulative Availability",
            "description": "PAFM = ΣDC ÷ ΣIC × 100. Auto-calculated from DC each period.",
            "badges": ["fx DEP"]
          },
          {
            "id": "ecr",
            "status": "off",
            "icon": { "text": "fx", "color": "purple" },
            "name": "ECR (Energy Charge Rate)",
            "description": "Section 62 only — Form-15 Coal+Oil → ECR via routine 940.",
            "badges": ["fx DEP"]
          },
          {
            "id": "inc",
            "status": "off",
            "icon": { "text": "fx", "color": "teal" },
            "name": "Incentive",
            "description": "PAFM > NAPAF × incentive rate. FY cap tracking.",
            "badges": ["fx DEP"]
          },
          {
            "id": "penalty",
            "status": "na",
            "icon": { "text": "fx", "color": "gray" },
            "name": "Penalty",
            "description": "PAFM < threshold. Not applicable to GRIDCO.",
            "badges": ["fx DEP", "N/A"]
          }
        ]
      }

      var oCalculationModel = new sap.ui.model.json.JSONModel(calculationJson);
      this.getView().setModel(oCalculationModel, "calculation");


      let masterInputJson = {
        "title": "Master Inputs",
        "count": 1,
        "tiles": [
          {
            "id": "fixedInputs",
            "status": "on",
            "state": "needs",
            "icon": { "text": "★", "color": "purple" },
            "name": "Fixed Calculation Inputs",
            "description": "FY-Fixed (AFC · NAPAF · Heat Rate · APC) and 5-Year fixed (SFC · Peak hrs · Incentive rates) — set once, used everywhere.",
            "badges": ["MAIN", "popup needed"]
          }
        ]
      }

      var oMasterInputModel = new sap.ui.model.json.JSONModel(masterInputJson);
      this.getView().setModel(oMasterInputModel, "masterInput");

      let ratesJson = {
        "title": "Rates",
        "count": 0,
        "tiles": [
          {
            "id": "escalation",
            "status": "na",
            "icon": { "text": "↗", "color": "orange" },
            "name": "Escalation Charges",
            "description": "CERC 6-monthly index · Energy + Inland Transport (≤500 km) + Capacity escalation in one popup.",
            "badges": ["MAIN", "N/A"]
          },
          {
            "id": "nonEsc",
            "status": "na",
            "icon": { "text": "₹", "color": "gray" },
            "name": "Non-Escalable Fixed Charges",
            "description": "PPA-wise & FY-wise non-escalable fixed rate · Energy (ZFXE) + Capacity (ZFXC) in one popup.",
            "badges": ["MAIN", "N/A"]
          }
        ]
      }

      var oRatesModel = new sap.ui.model.json.JSONModel(ratesJson);
      this.getView().setModel(oRatesModel, "rates");

      let outputJson = {
        "title": "Output",
        "count": 2,
        "tiles": [
          {
            "id": "bos",
            "status": "off",
            "icon": { "text": "fx", "color": "blue" },
            "name": "Bill of Supply",
            "description": "Composite output. Adobe Forms PDF. Auto-built from Cum.Avail + ECR/Esc.",
            "badges": ["fx DEP"]
          },
          {
            "id": "annexure",
            "status": "off",
            "icon": { "text": "fx", "color": "blue" },
            "name": "Annexure Pack",
            "description": "5-6 annexures consolidated PDF.",
            "badges": ["fx DEP"]
          }
        ]
      }

      var oOutputModel = new sap.ui.model.json.JSONModel(outputJson);
      this.getView().setModel(oOutputModel, "output");

    },


    onAfterUploadFlexRendering: function () {
      var items = this.byId("dataUploadFlexboxid").getItems();
      var that = this;

      items.forEach(function (item) {
        item.$().css("cursor", "pointer"); // pointer UI

        item.$().off("click"); // avoid duplicate binding
        item.$().on("click", function () {
          var ctx = item.getBindingContext("fileUpload");
          if (ctx) {
            var data = ctx.getObject();
            that.onTileClick(data);
          }
        });
      });
    },
onTileClick: function (data) {
    console.log(data);

    if (data.id === "dc") {
        this.onOpenDialog();
    }
    
},
openGenericDialog: function (data) {
    if (!this._oDialog) {
        this._oDialog = new sap.m.Dialog({
            title: data.name,
            content: new sap.m.Text({ text: "Content for " + data.name }),
            beginButton: new sap.m.Button({
                text: "Close",
                press: () => this._oDialog.close()
            })
        });
    }

    this._oDialog.open();
},


onOpenDialog: function () {
    var that = this;

    if (!this._oDialog) {
        sap.ui.core.Fragment.load({
            id: this.getView().getId(),
            name: "gmrproject.view.Form15Coal", // ✅ your correct path
            controller: this
        }).then(function (oDialog) {
            that._oDialog = oDialog;
            that.getView().addDependent(that._oDialog);
            that._oDialog.open(); // ✅ works now
        });
    } else {
        this._oDialog.open();
    }
},

onCloseDialog: function () {
    if (this._oDialog) {
        this._oDialog.close();
    }
},

onSaveCoal: function () {
    sap.m.MessageToast.show("Saved successfully");
}





  });
});