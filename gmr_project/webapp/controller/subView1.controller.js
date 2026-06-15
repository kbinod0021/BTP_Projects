sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    'sap/m/MessagePopover',
    'sap/m/MessagePopoverItem',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/comp/smartvariants/PersonalizableInfo'

], (Controller, MessageBox, MessageToast, JSONModel, Device, MessagePopover, MessagePopoverItem,
     Label, Filter, FilterOperator, PersonalizableInfo
) => {
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
            //   var that = this;
            // var pop_msgModel = new sap.ui.model.json.JSONModel({
            //     "messagesLength": "",
            //     "type": "Default"
            // });
            // this.getView().setModel(pop_msgModel, "popoverModel");
            // var popModel = new sap.ui.model.json.JSONModel({});
            // oMessagePopover.setModel(popModel);


           

    this.oModel = new sap.ui.model.json.JSONModel();

    // ✅ Set model FIRST
    this.getView().setModel(this.oModel);

    // ✅ THEN load data
this.oModel.loadData(this.getOwnerComponent().getManifestObject().resolveUri("model/model.json"));
    // ✅ OPTIONAL: ensure UI updates after load
    this.oModel.attachRequestCompleted(function () {
        this.oModel.refresh(true);
    }.bind(this));

    // ---------------------------
    // Existing code (unchanged)
    // ---------------------------
    this.oSmartVariantManagement = this.byId("svm");
    this.oExpandedLabel = this.byId("expandedLabel");
    this.oSnappedLabel = this.byId("snappedLabel");
    this.oFilterBar = this.byId("filterbar");
    this.oTable = this.byId("table");

    this.oFilterBar.registerFetchData(this.fetchData.bind(this));
    this.oFilterBar.registerApplyData(this.applyData.bind(this));
    this.oFilterBar.registerGetFiltersWithValues(this.getFiltersWithValues.bind(this));

    var oPersInfo = new sap.ui.comp.smartvariants.PersonalizableInfo({
        type: "filterBar",
        keyName: "persistencyKey",
        control: this.oFilterBar
    });

    this.oSmartVariantManagement.addPersonalizableControl(oPersInfo);
    this.oSmartVariantManagement.initialise(function () {}, this.oFilterBar);

this.oModel.attachRequestCompleted(function () {
    console.log("DATA:", this.oModel.getData());
}.bind(this));



        },

	onExit: function() {
			this.oModel = null;
			this.oSmartVariantManagement = null;
			this.oExpandedLabel = null;
			this.oSnappedLabel = null;
			this.oFilterBar = null;
			this.oTable = null;
		},

		fetchData: function () {
			var aData = this.oFilterBar.getAllFilterItems().reduce(function (aResult, oFilterItem) {
				aResult.push({
					groupName: oFilterItem.getGroupName(),
					fieldName: oFilterItem.getName(),
					fieldData: oFilterItem.getControl().getSelectedKeys()
				});

				return aResult;
			}, []);

			return aData;
		},

		applyData: function (aData) {
			aData.forEach(function (oDataObject) {
				var oControl = this.oFilterBar.determineControlByName(oDataObject.fieldName, oDataObject.groupName);
				oControl.setSelectedKeys(oDataObject.fieldData);
			}, this);
		},

		getFiltersWithValues: function () {
			var aFiltersWithValue = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl();

				if (oControl && oControl.getSelectedKeys && oControl.getSelectedKeys().length > 0) {
					aResult.push(oFilterGroupItem);
				}

				return aResult;
			}, []);

			return aFiltersWithValue;
		},

		onSelectionChange: function (oEvent) {
			this.oSmartVariantManagement.currentVariantSetModified(true);
			this.oFilterBar.fireFilterChange(oEvent);
		},

		onSearch: function () {
			var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl(),
					aSelectedKeys = oControl.getSelectedKeys(),
					aFilters = aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: FilterOperator.Contains,
							value1: sSelectedKey
						});
					});

				if (aSelectedKeys.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}

				return aResult;
			}, []);

			this.oTable.getBinding("items").filter(aTableFilters);
			this.oTable.setShowOverlay(false);
		},

		onFilterChange: function () {
			this._updateLabelsAndTable();
		},

		onAfterVariantLoad: function () {
			this._updateLabelsAndTable();
		},

		getFormattedSummaryText: function() {
			var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

			if (aFiltersWithValues.length === 0) {
				return "No filters active";
			}

			if (aFiltersWithValues.length === 1) {
				return aFiltersWithValues.length + " filter active: " + aFiltersWithValues.join(", ");
			}

			return aFiltersWithValues.length + " filters active: " + aFiltersWithValues.join(", ");
		},

		getFormattedSummaryTextExpanded: function() {
			var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

			if (aFiltersWithValues.length === 0) {
				return "No filters active";
			}

			var sText = aFiltersWithValues.length + " filters active",
				aNonVisibleFiltersWithValues = this.oFilterBar.retrieveNonVisibleFiltersWithValues();

			if (aFiltersWithValues.length === 1) {
				sText = aFiltersWithValues.length + " filter active";
			}

			if (aNonVisibleFiltersWithValues && aNonVisibleFiltersWithValues.length > 0) {
				sText += " (" + aNonVisibleFiltersWithValues.length + " hidden)";
			}

			return sText;
		},

		_updateLabelsAndTable: function () {
			this.oExpandedLabel.setText(this.getFormattedSummaryTextExpanded());
			this.oSnappedLabel.setText(this.getFormattedSummaryText());
			this.oTable.setShowOverlay(true);
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
        },
         handleWhatsAppPress: function () {
            var number = this.byId("idNumber").getValue();
            var text = this.byId("idText").getValue();
            // for Mobile Phone
            // var url = 'https:' + '//wa.me/' + number + '?text=' + text;
            // for Web Whatsapp
            var url = 'https:' + '//web.whatsapp.com/send/?phone=' + number + '&text=' + text + '&type=phone_number&app_absent=0';
            sap.m.URLHelper.redirect(url, true);
            // eg. +917070022222
        }
    })
})