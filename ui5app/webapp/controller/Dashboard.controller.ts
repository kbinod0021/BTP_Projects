import Controller from "sap/ui/core/mvc/Controller";
import BusyDialog from "sap/m/BusyDialog";

import JSONModel from "sap/ui/model/json/JSONModel";

import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";
import Text from "sap/m/Text";
import UIComponent from "sap/ui/core/UIComponent";
import Fragment from "sap/ui/core/Fragment";
import MessageToast from "sap/m/MessageToast";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import ListBinding from "sap/ui/model/ListBinding";

import ComboBox from "sap/m/ComboBox";
import DatePicker from "sap/m/DatePicker";
import DateRangeSelection from "sap/m/DateRangeSelection";
import { ValueState } from "sap/ui/core/library";


/**
 * @namespace ui5.myui5app.controller
 */
export default class Dashboard extends BaseController {

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


        const oData = {
            countries: [
                { name: "India", code: "IN" },
                { name: "Indonesia", code: "ID" },
                { name: "Ireland", code: "IE" },
                { name: "Italy", code: "IT" },
                { name: "Australia", code: "AU" }
            ],

        };

        const oModel = new JSONModel(oData);
        this.getView()?.setModel(oModel);





        const oDummyData = {
            selectedCountry: "",
            selectedState: "",

            stateEnabled: false,
            cityEnabled: false,

            countries: [
                { code: "IN", name: "India" },
                { code: "US", name: "United States" }
            ],

            states: [
                { code: "KA", name: "Karnataka", countryCode: "IN" },
                { code: "MH", name: "Maharashtra", countryCode: "IN" },
                { code: "CA", name: "California", countryCode: "US" },
                { code: "TX", name: "Texas", countryCode: "US" }
            ],

            cities: [
                { code: "BLR", name: "Bengaluru", stateCode: "KA" },
                { code: "MYS", name: "Mysuru", stateCode: "KA" },
                { code: "MUM", name: "Mumbai", stateCode: "MH" },
                { code: "PUN", name: "Pune", stateCode: "MH" },
                { code: "LA", name: "Los Angeles", stateCode: "CA" },
                { code: "SF", name: "San Francisco", stateCode: "CA" },
                { code: "DAL", name: "Dallas", stateCode: "TX" },
                { code: "AUS", name: "Austin", stateCode: "TX" }
            ],

            filteredStates: [],
            filteredCities: []
        };

        const oDummyModel = new JSONModel(oDummyData);
        this.getView()!.setModel(oDummyModel);




    }



    private resetFragmentControls1(): void {

        const oView = this.getView();
        if (!oView) {
            return;
        }

        const oModel = oView.getModel() as JSONModel;
        if (!oModel) {
            return;
        }

        // ✅ Reset Model Data
        oModel.setData({
            selectedDate: null,
            selectedCountry: "",
            selectedState: "",
            stateEnabled: false,
            cityEnabled: false,
            filteredStates: [],
            filteredCities: []
        }, true);

        // ✅ Reset Inputs
        (oView.byId("vendorId") as Input)?.setValue("");
        (oView.byId("vendorName") as Input)?.setValue("");
        (oView.byId("email") as Input)?.setValue("");
        (oView.byId("phone") as Input)?.setValue("");

        // ✅ Reset Date controls
        (oView.byId("dpDate") as DatePicker)?.setDateValue(null);
        (oView.byId("drsDate") as DateRangeSelection)?.setDateValue(null);

        // ✅ Reset AutoComplete Input (Country Input)
        (oView.byId("countryInput") as Input)?.setValue("");
        (oView.byId("countryInput") as Input)?.destroySuggestionItems();

        // ✅ Reset ComboBoxes
        (oView.byId("countryCombo") as ComboBox)?.setSelectedKey("");
        (oView.byId("stateCombo") as ComboBox)?.setSelectedKey("");
        (oView.byId("cityCombo") as ComboBox)?.setSelectedKey("");
    }

private resetFragmentControls(): void {

    const oView = this.getView();
    if (!oView) {
        return;
    }

    const oModel = oView.getModel() as JSONModel;
    if (!oModel) {
        return;
    }

    // ✅ Reset Model Data
    oModel.setData({
        selectedDate: null,
        selectedCountry: "",
        selectedState: "",
        stateEnabled: false,
        cityEnabled: false,
        filteredStates: [],
        filteredCities: []
    }, true);

    // ✅ Reset Inputs
    (oView.byId("vendorId") as Input)?.setValue("");
    (oView.byId("vendorName") as Input)?.setValue("");
    (oView.byId("email") as Input)?.setValue("");
    (oView.byId("phone") as Input)?.setValue("");

    // ✅ Reset Date controls
    (oView.byId("dpDate") as DatePicker)?.setDateValue(null);
    (oView.byId("drsDate") as DateRangeSelection)?.setDateValue(null);

    // ✅ Reset AutoComplete Input
    (oView.byId("countryInput") as Input)?.setValue("");
    (oView.byId("countryInput") as Input)?.destroySuggestionItems();

    // ✅ Reset ComboBoxes
    (oView.byId("countryCombo") as ComboBox)?.setSelectedKey("");
    (oView.byId("stateCombo") as ComboBox)?.setSelectedKey("");
    (oView.byId("cityCombo") as ComboBox)?.setSelectedKey("");

    // ✅ ✅ RESET ALL MANDATORY ERROR STATES (IMPORTANT)
    const aMandatoryControls = [
        "vendorId",
        "vendorName",
        "email",
        "phone",
        "dpDate",
        "drsDate",
        "countryInput",
        "countryCombo",
        "stateCombo",
        "cityCombo"
    ];

    aMandatoryControls.forEach((sId) => {
        const oControl = oView.byId(sId) as any;
        if (oControl) {
            oControl.setValueState(ValueState.None);
            oControl.setValueStateText("");
        }
    });
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
        this._oVendorDialog.attachAfterOpen(() => {

            const oDP = Fragment.byId(
                this.getView()!.getId(),
                "dpDate"
            ) as any;

            if (oDP) {
                oDP.setMinDate(new Date(2020, 0, 1));
                oDP.setMaxDate(new Date(2030, 11, 31));
            }
        });
        this.resetFragmentControls();
        this._oVendorDialog.open();
    }


    public onVendorSave1(): void {


        MessageToast.show("Vendor information saved successfully");
        this._oVendorDialog?.close();
    }


private validateMandatoryFields(): boolean {
  const oView = this.getView();
  if (!oView) {
    return false;
  }

  let bValid = true;

  const aControls = [
    "vendorId",
    "vendorName",
    "email",
    "phone",
    "dpDate",
    "drsDate",
    "countryCombo",
    "stateCombo",
    "cityCombo"
  ];

  aControls.forEach((sId) => {
    const oControl = oView.byId(sId) as any;
    if (!oControl) {
      return;
    }

    let bEmpty = false;

    if (oControl instanceof Input) {
      bEmpty = !oControl.getValue();
    } else if (oControl instanceof ComboBox) {
      bEmpty = !oControl.getSelectedKey();
    } else if (oControl instanceof DatePicker) {
      bEmpty = !oControl.getDateValue();
    } else if (oControl instanceof DateRangeSelection) {
      bEmpty = !oControl.getDateValue();
    }

    if (bEmpty) {
      oControl.setValueState(ValueState.Error);
      oControl.setValueStateText("This field is required");
      bValid = false;
    } else {
      oControl.setValueState(ValueState.None);
    }
  });

  if (!bValid) {
    MessageToast.show("Please fill all mandatory fields");
  }

  return bValid;
}



    onVendorSave(): void {
        
if (!this.validateMandatoryFields()) {
    return; // ❌ stop submit
  }

        const sViewId = this.getView()!.getId();

        const oVendorId = Fragment.byId(sViewId, "vendorId") as Input;
        const oVendorName = Fragment.byId(sViewId, "vendorName") as Input;
        const oEmail = Fragment.byId(sViewId, "email") as Input;
        const oPhone = Fragment.byId(sViewId, "phone") as Input;
        const oCity = Fragment.byId(sViewId, "city") as Input;
        const oCountry = Fragment.byId(sViewId, "countryInput") as Input;
        const oDate = Fragment.byId(sViewId, "dpDate") as Input;
        const oRange = Fragment.byId(sViewId, "drsDate") as Input;

        if (!oVendorId || !oVendorName) {
            console.error("Controls not found ❌");
            return;
        }

        const data = {
            vendorId: oVendorId.getValue(),
            vendorName: oVendorName.getValue(),
            Email: oEmail.getValue(),
            Phone: oPhone.getValue(),
            City: oCity.getValue(),
            Country: oCountry.getValue(),
            Date: oDate.getValue(),
            Range: oRange.getValue()
        };




        // ✅ Success
        console.log("Ready to submit:", data);

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



    onDateChange(oEvent: any): void {

        const oDatePicker = oEvent.getSource();
        const bValid = oEvent.getParameter("valid");
        const oDate = oDatePicker.getDateValue();

        // ❌ 1. Blank value
        if (!oDatePicker.getValue()) {
            oDatePicker.setValueState("Error");
            oDatePicker.setValueStateText("Date is required");
            return;
        }

        // ❌ 2. Invalid manual input (like 32/13/2025)
        if (!bValid) {
            oDatePicker.setValueState("Error");
            oDatePicker.setValueStateText("Invalid date format");
            return;
        }

        // ❌ 3. Safety check (manual typing bypass)
        const oMinDate = new Date(2020, 0, 1);
        const oMaxDate = new Date(2030, 11, 31);

        if (oDate < oMinDate || oDate > oMaxDate) {
            oDatePicker.setValueState("Error");
            oDatePicker.setValueStateText("Date must be between 01-01-2020 and 31-12-2030");
            return;
        }

        // ✅ All good
        oDatePicker.setValueState("None");
    }

    onDateRangeChange(oEvent: any): void {

        const oControl = oEvent.getSource();
        const bValid = oEvent.getParameter("valid");

        const oFrom = oControl.getDateValue();
        const oTo = oControl.getSecondDateValue();

        // ❌ Invalid format
        if (!bValid) {
            oControl.setValueState("Error");
            oControl.setValueStateText("Invalid date range");
            return;
        }

        // ❌ Required
        if (!oFrom || !oTo) {
            oControl.setValueState("Error");
            oControl.setValueStateText("Both dates are required");
            return;
        }

        // ❌ From > To
        if (oFrom > oTo) {
            oControl.setValueState("Error");
            oControl.setValueStateText("Start date cannot be after End date");
            return;
        }

        // ❌ Max range (example: 30 days)
        const diff = (oTo.getTime() - oFrom.getTime()) / (1000 * 60 * 60 * 24);

        if (diff > 30) {
            oControl.setValueState("Error");
            oControl.setValueStateText("Range cannot exceed 30 days");
            return;
        }

        // ✅ Success
        oControl.setValueState("None");
    }

    onCitySelected(oEvent: any): void {
        const oItem = oEvent.getParameter("selectedItem");

        if (oItem) {
            oEvent.getSource().setValue(oItem.getText());
        }
    }

    onCountrySelected(oEvent: any): void {

        const oItem = oEvent.getParameter("selectedItem");

        if (!oItem) return;

        const sCountryKey = oItem.getKey();
        const sViewId = this.getView()!.getId();

        // Set value
        const oCountryInput = oEvent.getSource();
        oCountryInput.setValue(oItem.getText());



    }
    onStateSelected(oEvent: any): void {

        const oItem = oEvent.getParameter("selectedItem");

        if (!oItem) return;

        const sStateKey = oItem.getKey();
        const sViewId = this.getView()!.getId();

        const oStateInput = oEvent.getSource();
        oStateInput.setValue(oItem.getText());

        const oCity = Fragment.byId(sViewId, "cityInput") as Input;

        oCity.setValue("");

        const oBinding = oCity.getBinding("suggestionItems") as ListBinding;

        oBinding?.filter([
            new Filter("state", FilterOperator.EQ, sStateKey)
        ]);
    }




    public onCountryChange(oEvent: any): void {
        const oCountryCombo = oEvent.getSource() as ComboBox;
        const sCountryCode = oCountryCombo.getSelectedKey();

        const oModel = this.getView()!.getModel() as JSONModel;
        const aStates = oModel.getProperty("/states") as any[];

        const aFilteredStates = aStates.filter(
            state => state.countryCode === sCountryCode
        );

        oModel.setProperty("/filteredStates", aFilteredStates);
        oModel.setProperty("/stateEnabled", aFilteredStates.length > 0);
        oModel.setProperty("/cityEnabled", false);
        oModel.setProperty("/filteredCities", []);

        (this.byId("stateCombo") as ComboBox).setSelectedKey("");
        (this.byId("cityCombo") as ComboBox).setSelectedKey("");
    }

    // ✅ State → City
    public onStateChange(oEvent: any): void {
        const oStateCombo = oEvent.getSource() as ComboBox;
        const sStateCode = oStateCombo.getSelectedKey();

        const oModel = this.getView()!.getModel() as JSONModel;
        const aCities = oModel.getProperty("/cities") as any[];

        const aFilteredCities = aCities.filter(
            city => city.stateCode === sStateCode
        );

        oModel.setProperty("/filteredCities", aFilteredCities);
        oModel.setProperty("/cityEnabled", aFilteredCities.length > 0);

        (this.byId("cityCombo") as ComboBox).setSelectedKey("");
    }


}