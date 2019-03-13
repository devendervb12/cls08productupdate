sap.ui.controller("update.Update", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf update.Update
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf update.Update
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf update.Update
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf update.Update
*/
//	onExit: function() {
//
//	}
	onSubmit : function(oEvent){
		// get productid
		//this.getView().byId("id").getValue();
		var prodID = oEvent.getSource().getValue();
		// call odataservice to get productDetails
		var oModel = new sap.ui.model.odata.v2.ODataModel("proxy/https/services.odata.org/V2/(S(fnh5000ch5nd21mplxssoao1))/OData/OData.svc/");
		this.getView().setModel(oModel);	
	
		var path = "/Products("+prodID+")";
		
		// element binding to simpleform
		this.getView().byId("SimpleFormChange354").bindElement({
			
		    path : path,
			 events: {
			        dataRequested: function(oEvent){
			        	sap.ui.core.BusyIndicator.show();
			        },
			        dataReceived: function(oEvent){
			        	sap.ui.core.BusyIndicator.hide();
			        }
			    }
		});
		
	//	this.getView().byId("SimpleFormChange354").attach
		//sap.ui.core.BusyIndicator.hide();
		// bind it to otherfields
	},
	onProductUpdate : function(){
		
		var data = {
				ID : this.getView().byId("id").getValue(),
				Name : this.getView().byId("name").getValue(),
				Description : this.getView().byId("description").getValue(),
				ReleaseDate : new Date(this.getView().byId("rDate").getValue()),//string
				Rating : this.getView().byId("rating").getValue(),
				Price : this.getView().byId("price").getValue()
		};
		
		var oModel = this. getView().getModel();
		var prodid = this.getView().byId("id").getValue();
		
		var path = "/Products("+prodid+")";
		
		sap.ui.core.BusyIndicator.show();
		oModel.update(path, data, {
			success : function(){
				sap.ui.core.BusyIndicator.hide();
				//sap.m.MessageToast.show("Data Updated");
				
			},
			error : function(){
				sap.m.MessageToast.show("Data not Updated");
			}
		})

		
	}
});




