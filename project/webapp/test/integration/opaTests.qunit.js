/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["project/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
