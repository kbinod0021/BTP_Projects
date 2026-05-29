sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/p13n/Engine',
	'sap/m/p13n/SelectionController',
	'sap/m/p13n/MetadataHelper',
	'sap/ui/core/library',
	"sap/m/MessageToast"
], function (Controller, JSONModel, Engine, SelectionController, MetadataHelper, coreLibrary, MessageToast) {
	"use strict";

	return Controller.extend("gmrproject.controller.output", {
		onInit: function () {
			sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
				includeStylesheet("css/output.css");
			});


			// var oData = {
			//         data: [   // ✅ wrap inside object
			//             {
			//                 TAG: "A1",
			//                 ANNEXURE: "SE / DC schedule (96 blocks/day)",
			//                 FORM_ID: "ZSDF_ANX_A1",
			//                 SOURCE: "Auto from DC/SE grid",
			//                 PAGES: 7,
			//                 STATUS: "SEALED",
			//                 expanded: false
			//             },
			//             {
			//                 TAG: "A2",
			//                 ANNEXURE: "Cumulative Availability calculation",
			//                 FORM_ID: "ZSDF_ANX_A2",
			//                 SOURCE: "From DC schedule",
			//                 PAGES: 2,
			//                 STATUS: "SEALED",
			//                 expanded: false
			//             },
			//             {
			//                 TAG: "A3",
			//                 ANNEXURE: "Form-15 Coal sources",
			//                 FORM_ID: "ZSDF_ANX_A3",
			//                 SOURCE: "FI/MM close",
			//                 PAGES: 3,
			//                 STATUS: "SEALED",
			//                 expanded: false
			//             }
			//         ]
			//     };

			//     var oModel = new JSONModel(oData);
			//     this.getView().setModel(oModel);


			var oData = {
				data: [
					{
						TAG: "A1",
						ANNEXURE: "SE / DC schedule (96 blocks/day)",
						FORM_ID: "ZSDF_ANX_A1",
						SOURCE: "Auto from DC/SE grid",
						PAGES: 7,
						STATUS: "SEALED",
						expanded: false
					},
					{
						TAG: "A2",
						ANNEXURE: "Cumulative Availability calculation",
						FORM_ID: "ZSDF_ANX_A2",
						SOURCE: "From DC schedule",
						PAGES: 2,
						STATUS: "SEALED",
						expanded: false
					}
				]
			};

			this.getView().setModel(new JSONModel(oData));




			var oModel = new JSONModel({
				annexures: [
					{
						tag: "A1",
						annexure: "SE / DC schedule (96 blocks/day)",
						formId: "ZSDF_ANX_A1",
						source: "Auto from DC/SE grid",
						pages: "7",
						status: "SEALED",
						expanded: false, // ✅ Initial CLOSED
						description: "Detail A1",
						contentLayout: "Layout A1",
						dataSource: "Source A1",
						date: "01-Dec",
						block: "1-96",
						dc: "DC data",
						se: "SE data",
						time: "Full Day",
						data: [
							{
								"field": "Date",
								"type": "DATE",
								"description": {
									"start": "01-Dec-2025",
									"end": "31-Dec-2025"
								}
							},
							{
								"field": "Block #",
								"type": "INT4",
								"description": {
									"range": "1 to 96",
									"details": "15-min slots"
								}
							},
							{
								"field": "DC (MW)",
								"type": "DEC9.3",
								"description": "Declared capacity per block - from Plant Ops"
							},
							{
								"field": "SE (MW)",
								"type": "DEC9.3",
								"description": "Scheduled energy per block - from SLDC WBES"
							},
							{
								"field": "Time of day",
								"type": "TIME",
								"description": {
									"start": "00:00",
									"end": "23:45"
								}
							},
							{
								"field": "Peak flag",
								"type": "BOOL",
								"description": "TRUE if 17:00–21:00 window"
							}
						]

					},
					{
						tag: "A2",
						annexure: "Cumulative Availability calculation",
						formId: "ZSDF_ANX_A2",
						source: "From DC schedule",
						pages: "2",
						status: "SEALED",
						expanded: false,
						description: "Detail A2",
						contentLayout: "Layout A2",
						dataSource: "Source A2",
						date: "01-Dec",
						block: "1-96",
						dc: "DC data",
						se: "SE data",
						time: "Full Day",

						data: [
							{
								"field": "NTH Month",
								"type": "INT2",
								"description": {
									"range": "1–12",
									"details": "FY position"
								}
							},
							{
								"field": "Period label",
								"type": "CHAR8",
								"description": "e.g. Dec 2025"
							},
							{
								"field": "PAFM Peak %",
								"type": "DEC5.4",
								"description": "Calculated per Routine 925"
							},
							{
								"field": "PAFM Off %",
								"type": "DEC5.4",
								"description": "Calculated per Routine 926"
							},
							{
								"field": "PAFM Total %",
								"type": "DEC5.4",
								"description": "Weighted by hours"
							},
							{
								"field": "Cushion vs NAPAF",
								"type": "DEC5.4",
								"description": "Delta to threshold"
							}
						]

					},
					{
						tag: "A3",
						annexure: "Form-15 Coal sources",
						formId: "ZSDF_ANX_A3",
						source: "FI/MM close",
						pages: "3",
						status: "SEALED",
						expanded: false,
						description: "Detail A3",
						contentLayout: "Layout A3",
						dataSource: "Source A3",
						date: "01-Dec",
						block: "Coal",
						dc: "N/A",
						se: "N/A",
						time: "N/A",

						data: [
							{
								"field": "Source",
								"type": "CHAR40",
								"description": "Shakti · MCL Rail · IB Valley"
							},
							{
								"field": "Qty supplied (MT)",
								"type": "DEC15.3",
								"description": "From MM movement type 309"
							},
							{
								"field": "Share %",
								"type": "DEC5.2",
								"description": "Source / total"
							},
							{
								"field": "GCV (kcal/kg)",
								"type": "INT5",
								"description": "As-received basis"
							},
							{
								"field": "Landed ₹/MT",
								"type": "DEC11.2",
								"description": "Inclusive of freight, royalty, cess"
							},
							{
								"field": "Weighted contribution",
								"type": "DEC11.2",
								"description": "Sum of contribution per kWh"
							}
						]

					},
					{
						tag: "A1",
						annexure: "SE / DC schedule (96 blocks/day)",
						formId: "ZSDF_ANX_A1",
						source: "Auto from DC/SE grid",
						pages: "7",
						status: "SEALED",
						expanded: false, // ✅ Initial CLOSED
						description: "Detail A1",
						contentLayout: "Layout A1",
						dataSource: "Source A1",
						date: "01-Dec",
						block: "1-96",
						dc: "DC data",
						se: "SE data",
						time: "Full Day"
					},
					{
						tag: "A2",
						annexure: "Cumulative Availability calculation",
						formId: "ZSDF_ANX_A2",
						source: "From DC schedule",
						pages: "2",
						status: "SEALED",
						expanded: false,
						description: "Detail A2",
						contentLayout: "Layout A2",
						dataSource: "Source A2",
						date: "01-Dec",
						block: "1-96",
						dc: "DC data",
						se: "SE data",
						time: "Full Day"
					},
					{
						tag: "A3",
						annexure: "Form-15 Coal sources",
						formId: "ZSDF_ANX_A3",
						source: "FI/MM close",
						pages: "3",
						status: "SEALED",
						expanded: false,
						description: "Detail A3",
						contentLayout: "Layout A3",
						dataSource: "Source A3",
						date: "01-Dec",
						block: "Coal",
						dc: "N/A",
						se: "N/A",
						time: "N/A"
					}
				]
			});

			this.getView().setModel(oModel);




		},


		onRowPress: function (oEvent) {
    var sPath = oEvent.getSource().getBindingContext().getPath();
    var iIndex = parseInt(sPath.split("/").pop(), 10);

    var oModel = this.getView().getModel();
    var aData = oModel.getProperty("/annexures");

    // ✅ Check current state
    var bIsAlreadyExpanded = aData[iIndex].expanded;

    // ✅ Collapse all rows first
    aData.forEach(function (item) {
        item.expanded = false;
    });

    // ✅ Toggle logic
    if (!bIsAlreadyExpanded) {
        aData[iIndex].expanded = true;
    }

    oModel.setProperty("/annexures", aData);
    oModel.refresh(true);
},

		onPreviewPdf: function () {
			MessageToast.show("Preview PDF clicked");
		},

		onDownload: function () {
			MessageToast.show("Download clicked");
		},

		onViewTrace: function () {
			MessageToast.show("View Trace clicked");
		},

		onCreateExport: function () {
			MessageToast.show("Create Export clicked");
		},
		formatDescription: function (desc) {
			if (!desc) return "";

			if (typeof desc === "object") {
				if (desc.start && desc.end) {
					return desc.start + " - " + desc.end;
				}
				if (desc.range) {
					return desc.range + (desc.details ? " (" + desc.details + ")" : "");
				}
			}
			return desc;
		},
		onSelectAnnexure: function (oEvent) {

			var oItem = oEvent.getSource(); // clicked row
			var oContext = oItem.getBindingContext();
			var sPath = oContext.getPath();

			// ✅ get table inside this row
			var oTable = oItem.getAggregation("content")[0]   // VBox
				.getItems()[1]                                // Detail VBox
				.getItems()[1]                                // Inner VBox (table container)
				.getItems()[0];                               // Table

			// ✅ safety check
			if (!oTable) {
				console.log("Table not found");
				return;
			}

			// ✅ unbind old
			//oTable.unbindItems();

			// ✅ template
			var oTemplate = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({ text: "{field}" }),
					new sap.m.Text({ text: "{type}" }),
					new sap.m.Text({
						text: {
							path: "description",
							formatter: this.formatDescription.bind(this)
						}
					})
				]
			});

			// ✅ bind correct path
			oTable.bindItems({
				path: sPath + "/data",
				template: oTemplate
			});
		}


	});
});