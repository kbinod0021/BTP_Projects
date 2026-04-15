import Controller from "sap/ui/core/mvc/Controller";
import BusyDialog from "sap/m/BusyDialog";

import JSONModel from "sap/ui/model/json/JSONModel";

import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";
import Text from "sap/m/Text";
import UIComponent from "sap/ui/core/UIComponent";
import Fragment from "sap/ui/core/Fragment";
import MessageToast from "sap/m/MessageToast";



/**
 * @namespace ui5.myui5app.controller
 */
export default class Dashboard extends Controller {

    private _oBusyDialog!: BusyDialog;

    public onInit(): void {

        // ✅ Create loader
    //     this._oBusyDialog = new BusyDialog({
    //         title: "Loading",
    //         text: "Please wait..."
    //     });

    //     // ✅ Show loader
    //     this._oBusyDialog.open();

    //     // ✅ Simulate API / data loading
    //     setTimeout(() => {
    //         this._oBusyDialog.close();
    //     }, 2000); // 2 
    
    
 const oViewModel = new JSONModel({
            busy: true
        });

        this.getView()!.setModel(oViewModel, "view");

        // ✅ Simulate API call
        setTimeout(() => {
            oViewModel.setProperty("/busy", false);
        }, 1000);

     }
     

private _oVendorDialog?: Dialog;

   
public async onVendorInfo(): Promise<void> {

    if (!this._oVendorDialog) {
        this._oVendorDialog = await Fragment.load({
            id: this.getView()!.getId(),
            name: "ui5app.view.VendorDialog",   // ✅ FIXED
            controller: this
        }) as Dialog;

        this.getView()!.addDependent(this._oVendorDialog);
    }

    this._oVendorDialog.open();
}


public onVendorSave(): void {


        MessageToast.show("Vendor information saved successfully");
        this._oVendorDialog?.close();
    }

    /* ========================================================= */
    /* Close Vendor Dialog (Cancel button)                        */
    /* ========================================================= */
    public onVendorClose(): void {
        this._oVendorDialog?.close();
    }


    
/* ===== VENDOR NAVIGATION ===== */
    public onVendorNav(): void {
        const oRouter = (this.getOwnerComponent() as UIComponent).getRouter();
        oRouter.navTo("vendorList"); // ensure route exists
    }


}