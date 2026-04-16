import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Fragment from "sap/ui/core/Fragment";
import Input from "sap/m/Input";
import ListBinding from "sap/ui/model/ListBinding";

export default class BaseController extends Controller {

    public onSuggest(oEvent: any): void {
        const sValue = oEvent.getParameter("suggestValue");
        const oBinding = oEvent.getSource().getBinding("suggestionItems");

        if (oBinding) {
            const aFilters = sValue
                ? [new Filter("name", FilterOperator.Contains, sValue)]
                : [];

            oBinding.filter(aFilters);
        }
    }

    public onSuggestionSelected(oEvent: any): void {
        const oItem = oEvent.getParameter("selectedItem");

        if (oItem) {
            const oInput = oEvent.getSource();
            oInput.setValue(oItem.getText());
        }
    }

}