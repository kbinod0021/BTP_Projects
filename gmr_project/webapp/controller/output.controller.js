sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    	'sap/m/p13n/Engine',
	'sap/m/p13n/SelectionController',
	'sap/m/p13n/MetadataHelper',
	'sap/ui/core/library'
], function (Controller, JSONModel, Engine, SelectionController, MetadataHelper, coreLibrary) {
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
this._registerForP13n();

        },
      
       
	onExit: function() {
			Engine.getInstance().detachStateChange(this.handleStateChange, this);
		},

		_registerForP13n: function () {
			const oTable = this.byId("persoTable");

			this.oMetadataHelper = new MetadataHelper([{
				key: "id_col",
				label: "ID",
				path: "id"
			},
			{
				key: "firstName_col",
				label: "First Name",
				path: "firstName"
			},
			{
				key: "lastName_col",
				label: "Last Name",
				path: "lastName"
			},
			{
				key: "city_col",
				label: "City",
				path: "city"
			},
			{
				key: "size_col",
				label: "Size",
				path: "size"
			}
			]);

			const _oMetadataHelperRows = new MetadataHelper([{
				key: "P1",
				label: "Peter Müller",
				path: "id"
			},
			{
				key: "P2",
				label: "Petra Maier",
				path: "id"
			},
			{
				key: "P3",
				label: "Thomas Smith",
				path: "id"
			},
			{
				key: "P4",
				label: "John Williams",
				path: "id"
			},
			{
				key: "P5",
				label: "Maria Jones",
				path: "id"
			}
			]);

			Engine.getInstance().register(oTable, {
				helper: this.oMetadataHelper,
				controller: {
					Columns: new SelectionController({
						targetAggregation: "columns",
						control: oTable,
						persistenceIdentifier: "selection-columns"
					}),
					Rows: new SelectionController({
						targetAggregation: "items",
						helper: _oMetadataHelperRows,
						control: oTable,
						persistenceIdentifier: "selection-items",
						enableReorder: false
					})
				}
			});

			Engine.getInstance().attachStateChange(this.handleStateChange, this);
		},

		openPersoDialog: function (oEvt) {
			const oTable = this.byId("persoTable");

			Engine.getInstance().show(oTable, ["Columns"], {
				contentHeight: "35rem",
				contentWidth: "32rem",
				source: oEvt.getSource()
			});
		},

		openPersoDialogPeople: function (oEvt) {
			const oTable = this.byId("persoTable");

			Engine.getInstance().show(oTable, ["Rows"], {
				contentHeight: "35rem",
				contentWidth: "32rem",
				source: oEvt.getSource()
			});
		},

		_getKey: function (oControl) {
			return oControl.data("p13nKey");
		},

		handleStateChange: function (oEvt) {
			const oTable = this.byId("persoTable");
			const oState = oEvt.getParameter("state");

			if (!oState) {
				return;
			}

			oTable.getColumns().forEach(function (oColumn, iIndex) {
				oColumn.setVisible(false);
				oColumn.setSortIndicator(coreLibrary.SortOrder.None);
				oColumn.data("grouped", false);
			});

			oState.Columns.forEach(function (oProp, iIndex) {
				const oCol = this.byId("persoTable").getColumns().find((oColumn) => oColumn.data("p13nKey") === oProp.key);
				if (oCol) {
					oCol.setVisible(true);

					oTable.removeColumn(oCol);
					oTable.insertColumn(oCol, iIndex);
				}
			}.bind(this));

			oTable.getItems().forEach(function (oItem, iIndex) {
				oItem.setVisible(false);
			});

			oState.Rows.forEach(function (oProp, iIndex) {
				const aItems = this.byId("persoTable").getItems();
				// var oRelevantCol = aItems[0].getCells().find((cell) => true);

				// find index of cell with "id", that can be used later
				const oFoundItem = aItems.find((oItem) => oItem.getCells()[0].getText() == oProp.key);

				oFoundItem.setVisible(true);

				oTable.removeItem(oFoundItem);
				oTable.insertItem(oFoundItem, iIndex);
			}.bind(this));
		},

		onColumnMove: function (oEvt) {
			const oDraggedColumn = oEvt.getParameter("draggedControl");
			const oDroppedColumn = oEvt.getParameter("droppedControl");

			if (oDraggedColumn === oDroppedColumn) {
				return;
			}

			const oTable = this.byId("persoTable");
			const sDropPosition = oEvt.getParameter("dropPosition");
			const iDraggedIndex = oTable.indexOfColumn(oDraggedColumn);
			const iDroppedIndex = oTable.indexOfColumn(oDroppedColumn);
			const iNewPos = iDroppedIndex + (sDropPosition == "Before" ? 0 : 1) + (iDraggedIndex < iDroppedIndex ? -1 : 0);
			const sKey = this._getKey(oDraggedColumn);

			Engine.getInstance().retrieveState(oTable).then(function (oState) {

				const oCol = oState.Columns.find(function (oColumn) {
					return oColumn.data("p13nKey") === sKey;
				}) || {
					key: sKey
				};
				oCol.position = iNewPos;

				Engine.getInstance().applyState(oTable, {
					Columns: [oCol]
				});
			});
		},
onToggleExpand: function (oEvent) {

    const oCtx = oEvent.getSource().getBindingContext();
    const oModel = oCtx.getModel();
    const sPath = oCtx.getPath();

    const current = oModel.getProperty(sPath + "/expanded");

    // ✅ collapse all rows first (optional but clean UX)
    oModel.getProperty("/data").forEach(function (row) {
        row.expanded = false;
    });

    // ✅ expand only clicked
    oModel.setProperty(sPath + "/expanded", !current);
}
,

onToggleExpand: function (oEvent) {

    var oCtx = oEvent.getSource().getBindingContext();
    var oModel = oCtx.getModel();

    var path = oCtx.getPath();   // /data/0
    var index = parseInt(path.split("/")[2]);

    var aData = oModel.getProperty("/data");

    // toggle main row
    aData[index].expanded = !aData[index].expanded;

    // next item = detail row
    aData[index + 1].visible = aData[index].expanded;

    oModel.setProperty("/data", aData);
},

rowFactory: function (sId, oContext) {

    var bExpanded = oContext.getProperty("expanded");

    // -------- MAIN ROW --------
    var oMain = new sap.m.ColumnListItem({
        cells: [
            new sap.m.Text({ text: "{TAG}" }),
            new sap.m.Text({ text: "{ANNEXURE}" }),
            new sap.m.Text({ text: "{FORM_ID}" }),
            new sap.m.Text({ text: "{SOURCE}" }),
            new sap.m.ObjectNumber({ number: "{PAGES}" }),
            new sap.m.ObjectStatus({ text: "{STATUS}", state: "Success" }),
            new sap.m.Button({
                type: "Transparent",
                icon: {
                    path: "expanded",
                    formatter: function (b) {
                        return b
                            ? "sap-icon://navigation-down-arrow"
                            : "sap-icon://navigation-right-arrow";
                    }
                },
                press: this.onToggleExpand.bind(this)
            })
        ]
    });

    // -------- DETAIL ROW --------
    var oDetail = new sap.m.ColumnListItem({
        visible: "{expanded}",
        cells: [
            new sap.m.VBox({
                width: "100%",
                items: [
                    new sap.m.Text({
                        text: "What's inside",
                        design: "Bold"
                    }),
                    new sap.m.Text({
                        text: "Block-by-block (15-min) declared vs scheduled energy for every day..."
                    }),

                    new sap.m.Text({
                        text: "Content layout",
                        design: "Bold"
                    }),
                    new sap.m.Text({
                        text: "Page 1 summary, pages 2–7..."
                    })
                ]
            })
        ]
    });

    // ✅ return BOTH rows
    return new sap.ui.core.Control({
        aggregations: {
            items: [oMain, oDetail]
        }
    });
},



    });
});