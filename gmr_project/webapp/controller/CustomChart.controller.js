sap.ui.define([
	"sap/ui/core/mvc/Controller"
], (Controller) => {
	"use strict";
	return Controller.extend("gmrproject.controller.CustomChart", {


		onInit: function () {


			sap.ui.require([
				"gmrproject/libs/chart.min"
			], function () {
				console.log(window.Chart);
			});



			var oData = {
				labels: ['January', 'February', 'March', 'April', 'May'],
				values: [65, 59, 80, 81, 56]
			};
			var oModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oModel, "chartData");


			var oData1 = {
				labels: ['January', 'February', 'March', 'April', 'May'],
				datasets: [
					{
						label: 'Domestic',
						data: [65, 59, 80, 81, 56],
						backgroundColor: '#36A2EB'
					},
					{
						label: 'International',
						data: [28, 48, 40, 19, 86],
						backgroundColor: '#FF6384'
					},
					{
						label: 'Cargo',
						data: [15, 25, 30, 35, 20],
						backgroundColor: '#4BC0C0'
					}
				]
			};

			var oModel1 = new sap.ui.model.json.JSONModel(oData1);
			this.getView().setModel(oModel1, "chartData1");



			
var oData11 = {
    labels: [
        'Domestic',
        'International',
        'Cargo',
        'Transit'
    ],
    values: [300, 150, 80, 50]
};

var oModel11 = new sap.ui.model.json.JSONModel(oData11);
this.getView().setModel(oModel11, "chartData11");


		},
		onAfterRendering1: function () {
			var oModelData = this.getView().getModel("chartData").getData();

			var ctx = document.getElementById("myChart");

			if (this.oChartInstance) {
				this.oChartInstance.destroy();
			}

			this.oChartInstance = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: oModelData.labels,
					datasets: oModelData.datasets
				},
				options: {
					responsive: true,
					plugins: {
						title: {
							display: true,
							text: 'Monthly Sales - Stacked Chart'
						}
					},
					scales: {
						x: {
							stacked: true
						},
						y: {
							stacked: true,
							beginAtZero: true
						}
					}
				}
			});
		},
		onAfterRendering: function () {
			// Fetch data from the SAPUI5 model
			var oModelData = this.getView().getModel("chartData").getData();

			// Get the HTML canvas DOM reference safely
			var ctx = document.getElementById("myChart");

			// Prevent re-initialization errors if the view rerenders
			if (this.oChartInstance) {
				this.oChartInstance.destroy();
			}

			// Initialize Chart.js (Window global reference)
			this.oChartInstance = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: oModelData.labels,
					datasets: [{
						label: 'Monthly Sales',
						data: oModelData.values,
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1
					}]
				},
				options: {
					responsive: true,
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});



			var oModelData1 = this.getView().getModel("chartData1").getData();

			var ctx1 = document.getElementById("myChart1");

			if (this.oChartInstance1) {
				this.oChartInstance1.destroy();
			}

			this.oChartInstance1 = new Chart(ctx1, {
				type: 'bar',
				data: {
					labels: oModelData1.labels,
					datasets: oModelData1.datasets
				},
				options: {
					responsive: true,
					plugins: {
						title: {
							display: true,
							text: 'Monthly Sales - Stacked Chart'
						}
					},
					scales: {
						x: {
							stacked: true
						},
						y: {
							stacked: true,
							beginAtZero: true
						}
					}
				}
			});




			
    var oModelData11 = this.getView().getModel("chartData11").getData();

    var ctx11 = document.getElementById("myChart11");

    if (this.oChartInstance11) {
        this.oChartInstance11.destroy();
    }

    this.oChartInstance11 = new Chart(ctx11, {
        type: 'doughnut',
        data: {
            labels: oModelData11.labels,
            datasets: [{
                data: oModelData11.values,
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#4BC0C0',
                    '#FFCE56'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Passenger Distribution'
                }
            }
        }
    });





		},

		onExit: function () {
			// Clean up the chart object to prevent memory leaks
			if (this.oChartInstance) {
				this.oChartInstance.destroy();
			}
		}


	});
});