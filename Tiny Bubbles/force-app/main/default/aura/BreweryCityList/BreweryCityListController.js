({
    search : function(component, event, helper) {

        component.set('v.BreweryInfo',[
            {label: 'Name', fieldName: 'Name', type: 'String'},
            {label: 'Type', fieldName: 'Type', type: 'String'},
            {label: 'Address', fieldName: 'Street', type: 'String'},
            {label: 'City', fieldName: 'City', type: 'String'},
            {label: 'State', fieldName: 'State', type: 'String'},
            {label: 'Zip Code', fieldName: 'ZipCode', type: 'String'},
            {label: 'Phone Number', fieldName: 'Phone', type: 'String'},
            {label: 'Website', fieldName: 'Website', type: 'String'}
        ]);

        var CitySearch = component.get('{!v.City}')
        var action = component.get("c.getBreweriesbyCity");
        action.setParams({'City':CitySearch});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.Brewery", response.getReturnValue());
                console.log(response.getReturnValue());
            } else {
                console.log("NoGo");
            }
        });
        $A.enqueueAction(action);
    },

    save : function(component, event, helper) {

        var selectedRow = event.getParam("selectedRows");
        selectedRow = selectedRow[0];
        console.log(selectedRow.Name);
        console.log(selectedRow.Phone);
        console.log(selectedRow.Street);
        console.log(selectedRow.ZipCode);
        console.log(selectedRow);
        
        var inputBrewery = [{
            name:"FlowBrewery",
            type:"sObject",
            value:{
                "Name":selectedRow.Name,
                "Type__c":selectedRow.Type,
                "Street_Address__c":selectedRow.Street,
                "City__c":selectedRow.City,
                "State__c":selectedRow.State,
                "Zip_Code__c":selectedRow.ZipCode,
                "Phone__c":selectedRow.Phone,
                "Website__c":selectedRow.Website
            }
        }];
        console.log(inputBrewery);
        var flow = component.find("flowData");
        flow.startFlow("Save_Brewery",inputBrewery);

        
    }
})
