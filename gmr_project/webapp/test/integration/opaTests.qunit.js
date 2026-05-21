/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["gmrproject/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
