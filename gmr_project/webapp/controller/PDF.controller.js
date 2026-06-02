sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, JSONModel, MessageToast, MessageBox) => {
    "use strict";


    // ✅ Allowed file types
    const ALLOWED_TYPES = ["csv", "pdf", "xlsx"];
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

    return Controller.extend("webapp.controller.Form15Coal", {

        onInit: function () {
            sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
                includeStylesheet("css/pdf.css");
            });
            this.oModel = new JSONModel({
                uploadedFiles: []
            });
            this.getView().setModel(this.oModel);
        },
        formatFilesVisible: function (aFiles) {
            return Array.isArray(aFiles) && aFiles.length > 0;
        },

        // ✅ HANDLE FILE UPLOAD
        onFileSelected: function (oEvent) {
            var oFileUploader = this.byId("fileUploader");
            var aFiles = oEvent.getParameter("files");

            if (aFiles && aFiles.length > 0) {
                var aUploadedFiles = this.oModel.getProperty("/uploadedFiles") || [];

                // Process each selected file
                for (var i = 0; i < aFiles.length; i++) {
                    var oFile = aFiles[i];
                    var oFileObj = this._validateAndCreateFileObject(oFile);

                    if (oFileObj) {
                        aUploadedFiles.push(oFileObj);
                    }
                }

                this.oModel.setProperty("/uploadedFiles", aUploadedFiles);
                // If a single file was uploaded, preview it by default
                if (aFiles.length === 1 && aUploadedFiles.length > 0) {
                    this._showPreview(aUploadedFiles[aUploadedFiles.length - 1]);
                }
                oFileUploader.clear(); // Clear the uploader

            }
        },

        // Show preview for a file object (CSV -> table, PDF -> embedded viewer, XLSX -> not supported)
        _showPreview: function (oFileObj) {
            var sType = oFileObj.fileType;
            var oFile = oFileObj.file;
            var oView = this.getView();
            var oHtml = this.byId("previewHtml");

            // Clean previous content
            oHtml.setContent("");

            // If PDF, use object URL and embed in iframe
            if (sType === "pdf") {
                try {
                    var sUrl = URL.createObjectURL(oFile);
                    // store to revoke later
                    this._lastPreviewUrl = sUrl;
                    var sIframe = '<iframe src="' + sUrl + '" style="width:200vh;height:80vh;border:none"></iframe>';
                    oHtml.setContent(sIframe);
                    this.byId("previewDialog").open();
                } catch (e) {
                    MessageToast.show("Preview not available for this PDF.");
                }
                return;
            }

            // If CSV, read as text and render a small HTML table
            if (sType === "csv") {
                var oReader = new FileReader();
                oReader.onload = function (e) {
                    var sText = e.target.result || "";
                    var aAllLines = sText.split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
                    var iTotalRows = aAllLines.length;
                    var iMaxRows = 5000; // safety cap to avoid freezing the browser
                    var aLines = aAllLines.slice(0, iMaxRows);

                    var sNotice = '';
                    // if (iTotalRows > iMaxRows) {
                    //     sNotice = '<div style="padding:8px;background:#fff4e5;border:1px solid #ffdca8;margin-bottom:8px">Showing first ' + iMaxRows + ' of ' + iTotalRows + ' rows. Download the file to view all rows.</div>';
                    // }

                    // var sHtml = '<div style="overflow:auto;max-height:80vh">' + sNotice + '<table style="border-collapse:collapse;width:100%">';
                    // aLines.forEach(function (line, idx) {
                    //     var aCols = line.split(',');
                    //     sHtml += '<tr>';
                    //     aCols.forEach(function (c) { sHtml += '<td style="border:1px solid #ddd;padding:6px">' + (c || '') + '</td>'; });
                    //     sHtml += '</tr>';
                    // });
                    if (iTotalRows > iMaxRows) {
                        sNotice = '<div style="padding:10px;background:#fff4e5;border:1px solid #ffdca8;color:#8a6d3b;font-family:Arial;font-size:14px;margin-bottom:10px;">' +
                            'Showing first ' + iMaxRows + ' of ' + iTotalRows + ' rows. Download the file to view all rows.</div>';
                    }

                    var sHtml =
                        '<div>' +
                        '<div style="overflow:auto;max-height:80vh;">' +
                        sNotice +
                        '<table border="1" cellpadding="6" cellspacing="0" width="100%" style="border-collapse:collapse;font-family:Arial;font-size:13px;">';

                    aLines.forEach(function (line, idx) {
                        var aCols = line.split(',');

                        // Header row
                        if (idx === 0) {
                            sHtml += '<tr style="background:#f1f1f1;">';
                            aCols.forEach(function (c) {
                                sHtml += '<th style="border:1px solid #ccc;padding:8px;text-align:left;">' + c + '</th>';
                            });
                            sHtml += '</tr>';
                        } else {
                            // Alternate row color
                            var bgColor = (idx % 2 === 0) ? '#ffffff' : '#f9f9f9';

                            sHtml += '<tr style="background:' + bgColor + ';">';
                            aCols.forEach(function (c) {
                                sHtml += '<td style="border:1px solid #ddd;padding:8px;">' + (c || '') + '</td>';
                            });
                            sHtml += '</tr>';
                        }
                    });

                    sHtml += '</table></div></div>';
                    sHtml += '</table></div>';
                    oHtml.setContent(sHtml);
                    oView.byId("previewDialog").open();
                };
                oReader.onerror = function () {
                    MessageToast.show("Unable to read CSV for preview.");
                };
                oReader.readAsText(oFile);
                return;
            }

            // XLSX preview: parse with SheetJS if available
            if (sType === "xlsx") {
                if (window.XLSX) {
                    var oReaderX = new FileReader();
                    oReaderX.onload = function (ev) {
                        try {
                            var arrayBuffer = ev.target.result;
                            var workbook = XLSX.read(arrayBuffer, { type: 'array' });
                            var firstSheet = workbook.SheetNames[0];
                            var sheet = workbook.Sheets[firstSheet];
                            // var sTable = XLSX.utils.sheet_to_html(sheet, { id: 'xlsxPreviewTable' });
                            // var sHtmlWrap = '<div style="overflow:auto;max-height:80vh;padding:8px">' + sTable + '</div>';
                            // oHtml.setContent(sHtmlWrap);
                            var sTable = XLSX.utils.sheet_to_html(sheet, { id: 'xlsxPreviewTable' });

                            var sStyle = `
<style>
#xlsxPreviewTable {
    border-collapse: collapse;
    width: 100%;
    font-family: Arial;
    font-size: 13px;
}

/* ✅ HEADER STYLE CHANGE HERE */
#xlsxPreviewTable th {
    background: #0078d4;   /* change background */
    color: white;          /* change text color */
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

/* body cells */
#xlsxPreviewTable td {
    border: 1px solid #ddd;
    padding: 8px;
}

/* alternate rows */
#xlsxPreviewTable tr:nth-child(even) {
    background: #f9f9f9;
}
</style>
`;

                            var sHtmlWrap =
                                '<div style="overflow:auto;max-height:80vh;padding:8px;">' +
                                sStyle +
                                sTable +
                                '</div>';

                            oHtml.setContent(sHtmlWrap);

                            oView.byId("previewDialog").open();
                        } catch (err) {
                            MessageToast.show('Unable to parse XLSX for preview.');
                        }
                    };
                    oReaderX.onerror = function () { MessageToast.show('Unable to read XLSX for preview.'); };
                    oReaderX.readAsArrayBuffer(oFile);
                } else {
                    var sMsg = '<div style="padding:1rem">Preview for XLSX is not available. Please download to view.</div>';
                    oHtml.setContent(sMsg);
                    this.byId("previewDialog").open();
                }
                return;
            }
        },

        onClosePreview: function () {
            // Close dialog and revoke object URL if any
            var oDialog = this.byId("previewDialog");
            if (this._lastPreviewUrl) {
                try { URL.revokeObjectURL(this._lastPreviewUrl); } catch (e) { }
                this._lastPreviewUrl = null;
            }
            oDialog.close();
        },

        // Triggered from Preview button in list
        onPreviewFile: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            if (!oContext) { return; }
            var oFileObj = oContext.getObject();
            if (oFileObj) {
                this._showPreview(oFileObj);
            }
        },

        // ✅ VALIDATE FILE
        _validateAndCreateFileObject: function (oFile) {
            var sFileName = oFile.name;
            var sFileExtension = sFileName.split(".").pop().toLowerCase();
            var iFileSize = oFile.size;

            // Check file type
            if (!ALLOWED_TYPES.includes(sFileExtension)) {
                MessageToast.show("❌ " + sFileName + " - Invalid file type. Only CSV, PDF, XLSX allowed.");
                return null;
            }

            // Check file size
            if (iFileSize > MAX_FILE_SIZE) {
                MessageToast.show("❌ " + sFileName + " - File too large. Max 50MB allowed.");
                return null;
            }

            // Check for duplicates
            var aExistingFiles = this.oModel.getProperty("/uploadedFiles") || [];
            if (aExistingFiles.some(f => f.fileName === sFileName)) {
                MessageToast.show("⚠️ " + sFileName + " - File already uploaded.");
                return null;
            }

            // Create file object
            MessageToast.show("✅ " + sFileName + " - Upload successful");

            return {
                fileName: sFileName,
                fileType: sFileExtension,
                fileSize: iFileSize,
                status: "Completed",
                uploadDate: new Date().toLocaleString("en-IN"),
                file: oFile
            };
        },

        // ✅ DELETE FILE
        onDeleteFile: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext();
            var iIndex = oContext.getPath().split("/").pop();
            var aFiles = this.oModel.getProperty("/uploadedFiles");

            aFiles.splice(iIndex, 1);
            this.oModel.setProperty("/uploadedFiles", aFiles);
            MessageToast.show("File deleted");
        },

        // ✅ CLEAR ALL FILES
        onClearAll: function () {
            MessageBox.confirm("Are you sure you want to delete all files?", {
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        this.oModel.setProperty("/uploadedFiles", []);
                        MessageToast.show("All files cleared");
                    }
                }.bind(this)
            });
        },

        // ✅ SUBMIT FILES
        onSubmitFiles: function () {
            var aFiles = this.oModel.getProperty("/uploadedFiles");

            if (!aFiles || aFiles.length === 0) {
                MessageToast.show("No files to submit");
                return;
            }

            var sFileNames = aFiles.map(f => f.fileName).join(", ");

            MessageBox.success("Files submitted successfully!\n\n" + sFileNames, {
                onClose: function () {
                    this.oModel.setProperty("/uploadedFiles", []);
                }.bind(this)
            });
        },

        // ✅ FORMATTERS
        formatFilesVisible: function (aFiles) {
            return aFiles && aFiles.length > 0;
        },

        formatFilesEmpty: function (aFiles) {
            return !aFiles || aFiles.length === 0;
        },

        formatFileIcon: function (sFileType) {
            switch (sFileType) {
                case "csv":
                    return "sap-icon://document-text";
                case "pdf":
                    return "sap-icon://pdf-reader";
                case "xlsx":
                    return "sap-icon://excel-attachment";
                default:
                    return "sap-icon://document";
            }
        },

        formatFileColor: function (sFileType) {
            switch (sFileType) {
                case "csv":
                    return "#4CAF50"; // Green
                case "pdf":
                    return "#F44336"; // Red
                case "xlsx":
                    return "#2196F3"; // Blue
                default:
                    return "#999";
            }
        },

        formatStatusState: function (sStatus) {
            if (sStatus === "Completed") {
                return "Success";
            } else if (sStatus === "Failed") {
                return "Error";
            }
            return "None";
        },

        formatFileSize: function (iSize) {
            if (iSize === undefined) return "-";

            var aSizes = ["B", "KB", "MB"];
            var iSizeIndex = 0;
            var fSize = iSize;

            while (fSize > 1024 && iSizeIndex < aSizes.length - 1) {
                fSize /= 1024;
                iSizeIndex++;
            }

            return fSize.toFixed(2) + " " + aSizes[iSizeIndex];
        },
        
onOpenFileDialog: function () {

 var oUploader = this.byId("fileUploader");
    if (oUploader && oUploader.$().length) {
        oUploader.$().find("input[type='file']").click();
    }

}

    });
});