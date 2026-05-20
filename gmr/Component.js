sap.ui.define(["sap/ui/core/UIComponent","app/model/models"], function(UIComponent, models){
"use strict";
return UIComponent.extend("app.Component",{
metadata:{manifest:"json"},
init:function(){UIComponent.prototype.init.apply(this,arguments);
this.setModel(models.createJSONModel());}
});});