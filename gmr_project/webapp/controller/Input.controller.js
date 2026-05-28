sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("gmrproject.controller.Input", {
        onInit: function () {



            // ✅ PIE DATA
            var oPieModel = new sap.ui.model.json.JSONModel({
                data: [
                    { category: "Coal", value: 40 },
                    { category: "Gas", value: 25 },
                    { category: "Hydro", value: 20 },
                    { category: "Wind", value: 15 },
                    { category: "Nuclear", value: 15 },
                    { category: "Other", value: 15 },
                    { category: "Solar", value: 15 }
                ]
            });

            this.getView().setModel(oPieModel, "pie");


            // ✅ BAR DATA
            var oBarModel = new sap.ui.model.json.JSONModel({
                data: [
                    { month: "Jan", coal: 40, gas: 25, solar: 15 },
                    { month: "Feb", coal: 35, gas: 20, solar: 25 },
                    { month: "Mar", coal: 50, gas: 30, solar: 20 },
                    { month: "Apr", coal: 45, gas: 28, solar: 22 },
                    { month: "MAY", coal: 45, gas: 28, solar: 22 },
                    { month: "Jun", coal: 45, gas: 28, solar: 22 },
                    { month: "Jul", coal: 45, gas: 28, solar: 22 },
                    { month: "Aug", coal: 45, gas: 28, solar: 22 },
                    { month: "Sept", coal: 45, gas: 28, solar: 22 },
                    { month: "Oct", coal: 45, gas: 28, solar: 22 },
                    { month: "Nov", coal: 45, gas: 28, solar: 22 },
                    { month: "Dec", coal: 45, gas: 28, solar: 22 }
                ]
            });

            this.getView().setModel(oBarModel, "bar");


         
var rawData = [
         { month: "Jan", coal: 40, gas: 25, solar: 15 },
                    { month: "Feb", coal: 35, gas: 20, solar: 25 },
                    { month: "Mar", coal: 50, gas: 30, solar: 20 },
                    { month: "Apr", coal: 45, gas: 28, solar: 22 },
                    { month: "MAY", coal: 45, gas: 28, solar: 22 },
                    { month: "Jun", coal: 45, gas: 28, solar: 22 },
                    { month: "Jul", coal: 45, gas: 28, solar: 22 },
                    { month: "Aug", coal: 45, gas: 28, solar: 22 },
                    { month: "Sept", coal: 45, gas: 28, solar: 22 },
                    { month: "Oct", coal: 45, gas: 28, solar: 22 },
                    { month: "Nov", coal: 45, gas: 28, solar: 22 },
                    { month: "Dec", coal: 45, gas: 28, solar: 22 }
    ];

    // ✅ Transform data for stacked chart
    var stackedData = rawData.map(function (item) {
        return {
            name: item.month,
            grey: item.coal,
            red: item.gas,
            yellow: item.solar,
            blue: 100 - (item.coal + item.gas + item.solar) // optional balance
        };
    });

    this.getView().setModel(new sap.ui.model.json.JSONModel({
        data: stackedData
    }), "stack");





            // ✅ PIE CHART SETTINGS
            var oPieChart = this.byId("idPieChart");
            if (oPieChart) {
                oPieChart.setVizProperties({
                    title: {
                        visible: true,
                        text: "Energy Distribution"
                    },
                    plotArea: {
                        dataLabel: {
                            visible: true,
                            type: "valueAndPercentage"
                        }
                    },
                    pie: {
                        innerRadius: "60%"
                    }
                });

                var oPopover = this.byId("idPopover");
                if (oPopover) {
                    oPopover.connect(oPieChart.getVizUid());
                }
            }


            // ✅ BAR CHART SETTINGS
            var oBarChart = this.byId("idBarChart");
            if (oBarChart) {
                oBarChart.setVizProperties({
                    title: {
                        visible: true,
                        text: "Monthly Energy Comparison"
                    },
                    plotArea: {
                        dataLabel: {
                            visible: true
                        }
                    }
                });
            }

            // ================= STACKED =================
           
var oChart = this.byId("idStackedChart");

    if (oChart) {
        oChart.setVizProperties({
            title: {
                visible: true,
                text: "Dynamic Stacked Chart"
            },
            plotArea: {
                dataLabel: {
                    visible: false
                },
                colorPalette: [
                    "#9e9e9e", // grey
                    "#ff0000", // red
                    "#ffff00", // yellow
                    "#0000ff"  // blue
                ],
                referenceLine: {
                    line: [
                        {
                            valueAxis: 30,
                            color: "red",
                            size: 2,
                            label: { text: "30", visible: true }
                        },
                        {
                            valueAxis: 95,
                            color: "red",
                            size: 2,
                            label: { text: "95", visible: true }
                        }
                    ]
                }
            }
        });
    }



        }
    });
});