import Controller from "sap/ui/core/mvc/Controller";
import BusyDialog from "sap/m/BusyDialog";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import Dialog from "sap/m/Dialog";
import Table from "sap/m/Table";
import Sorter from "sap/ui/model/Sorter";
import Button from "sap/m/Button";
import UI5Event from "sap/ui/base/Event";
import ListBinding from "sap/ui/model/ListBinding";
import Spreadsheet from "sap/ui/export/Spreadsheet";
// import type { SpreadsheetSettings } from "sap/ui/export/Spreadsheet";
import MessageToast from "sap/m/MessageToast";
import Icon from "sap/ui/core/Icon";


/**
 * @namespace ui5.myui5app.controller
 */
export default class vendorList extends Controller {

    private _oBusyDialog!: BusyDialog;

   onInit(): void {

        // ✅ View Model
        const oViewModel = new JSONModel({
            busy: false,
            businessDivision: [
                { key: "SPD", text: "SPD-4W" },
                { key: "OTH", text: "SPD-2W" }
            ],
            selectedBU: "SPD"
        });
        this.getView()!.setModel(oViewModel, "view");

         const oViewModel1 = new JSONModel({
        sortState: {
            hcilLocation: "none" // none | asc | desc
        }
    });

    this.getView()!.setModel(oViewModel1, "view");


        // ✅ Table Model (IMPORTANT)
        const oTableModel = new JSONModel({
            data: []
        });
        this.getView()!.setModel(oTableModel, "table");

        // ✅ Load Data
        this._loadDummyData();
    }

    private _loadDummyData(): void {

        const oTableModel = this.getView()!.getModel("table") as JSONModel;

        const aData = [
            {
                hcilLocation: "GREATER NOIDA",
                deliveryDate: "12/06/2025",
                pcNumber: "GNU10282000035",
                pcLine: "00002",
                seqNo: "0001",
                pcType: "Normal",
                partNumber: "81235TVD2",
                partName: "PART XYZ",
                scheduledQty: 30,
                pendingQty: 30,
                status: "Pending",
                statusState: "Warning"
            },
            {
                hcilLocation: "MANESAR",
                deliveryDate: "13/06/2025",
                pcNumber: "GNU10282000036",
                pcLine: "00003",
                seqNo: "0002",
                pcType: "Urgent",
                partNumber: "99999ABC",
                partName: "PART ABC",
                scheduledQty: 50,
                pendingQty: 20,
                status: "In Progress",
                statusState: "Information"
            }
        ];

        oTableModel.setData({ data: aData }); // ✅ IMPORTANT (better than setProperty)
    }
    

public onBUChange(oEvent: Event): void {
    const sKey = (oEvent as any).getParameter("key");

    const oViewModel = this.getView()!.getModel("view") as JSONModel;
    oViewModel.setProperty("/selectedBU", sKey);
}


    onDateChange() { }


    public onNavBack(): void {
        const oRouter = (this.getOwnerComponent() as UIComponent).getRouter();
        oRouter.navTo("Dashboard");   // route name
    }

    public onOpenDialog(): void {
        const oDialog = this.byId("filterDialog") as Dialog;
        oDialog.open();
    }
    public onCloseDialog(): void {
        const oDialog = this.byId("filterDialog") as Dialog;
        oDialog.close();
    }
        private _sortState: Record<string, boolean> = {};

 public onSort1(oEvent: UI5Event): void {

        const oTable = this.byId("myTable") as Table;

        // ✅ Cast to ListBinding
        const oBinding = oTable.getBinding("items") as ListBinding;

        // ✅ Correct event source typing
        const oButton = oEvent.getSource() as Button;

        const sField = oButton.data("field") as string;

        if (!sField) {
            return;
        }

        // toggle sort state
        const bDesc = this._sortState[sField] = !this._sortState[sField];

        const oSorter = new Sorter(sField, bDesc);

        // ✅ Now TypeScript knows sort() exists
        oBinding.sort(oSorter);

        // update arrow indicator
        let sText = oButton.getText() || "";
        sText = sText.replace(" ↑", "").replace(" ↓", "");
        oButton.setText(`${sText} ${bDesc ? "↓" : "↑"}`);
    }


public onSort(oEvent: UI5Event): void {

    const oIcon = oEvent.getSource() as Icon;
    const sField = oIcon.data("field") as string;

    const oViewModel = this.getView()!.getModel("view") as JSONModel;
    const oTable = this.byId("myTable") as Table;
    const oBinding = oTable.getBinding("items") as ListBinding;

    let sState = oViewModel.getProperty(`/sortState/${sField}`);

    // 🔁 Toggle states
    if (sState === "none") {
        sState = "desc";   // 1st click
    } else if (sState === "desc") {
        sState = "asc";    // 2nd click
    } else {
        sState = "desc";   // 3rd click (optional reset)
    }

    // Reset all other columns (single sort behavior)
    oViewModel.setProperty("/sortState", {
        hcilLocation: "none"
    });

    // Set current column state
    oViewModel.setProperty(`/sortState/${sField}`, sState);

    // Apply sorting
    if (sState === "none") {
        oBinding.sort(undefined); // reset sorting
    } else {
        const bDesc = sState === "desc";
        oBinding.sort(new Sorter(sField, bDesc));
    }
}
    
   public onDownloadExcel(): void {

        const oModel = this.getView()!.getModel("table") as JSONModel | null;

        if (!oModel) {
            MessageToast.show("No model found");
            return;
        }

        const aData = oModel.getProperty("/data") as any[];

        if (!aData || aData.length === 0) {
            MessageToast.show("No data to export");
            return;
        }

        // ✅ Column config
        const aColumns = [
            { label: "HCIL Location", property: "hcilLocation" },
            { label: "Delivery Date", property: "deliveryDate" },
            { label: "PC No", property: "pcNumber" },
            { label: "Line No", property: "pcLine" },
            { label: "Seq No", property: "seqNo" },
            { label: "PC Type", property: "pcType" },
            { label: "Part No", property: "partNumber" },
            { label: "Part Name", property: "partName" },
            { label: "Scheduled Qty", property: "scheduledQty", type: "number" },
            { label: "Pending Qty", property: "pendingQty", type: "number" },
            { label: "Status", property: "status" }
        ];

        // ✅ Settings (use any)
        const oSettings: any = {
            workbook: {
                columns: aColumns
            },
            dataSource: aData,
            fileName: "Table_Export.xlsx"
        };

        const oSpreadsheet = new Spreadsheet(oSettings);

        oSpreadsheet.build()
            .then(() => {
                MessageToast.show("Download completed");
            })
            .finally(() => {
                oSpreadsheet.destroy();
            });
    }
}