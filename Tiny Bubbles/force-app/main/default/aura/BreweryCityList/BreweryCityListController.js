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

    holdSelected : function(component, event, helper) {
        var selectedRow = event.getParam("selectedRows");
        selectedRow = selectedRow[0];
        component.set("v.SelectedBrewery", selectedRow);
        component.set("v.DisplayInput", true);
    },

    save : function(component, event, helper) {

        var breweryInfo = component.get("v.SelectedBrewery");
        var rating = component.get("v.Rating");
        var notes = component.get("v.Notes");

        console.log(typeof breweryInfo.Phone);
        //console.log(typeof rating);

        if (typeof breweryInfo.Street === 'undefined'||typeof breweryInfo.Street === 'object') {
            breweryInfo.Street = '';
        }
        if (typeof breweryInfo.ZipCode === 'undefined'||typeof breweryInfo.ZipCode === 'object') {
            breweryInfo.ZipCode = '';
        }
        if (typeof breweryInfo.Phone === 'undefined'||typeof breweryInfo.Phone === 'object') {
            breweryInfo.Phone = '';
        }
        console.log(typeof breweryInfo.Phone);
        if (typeof breweryInfo.Website === 'undefined'||typeof breweryInfo.Website === 'object') {
            breweryInfo.Website = '';
        }
        if (typeof rating == 'undefined'||typeof rating == 'object') {
            rating = 0;
        }
        //console.log(typeof rating);
        if (typeof notes == 'undefined'||typeof notes == 'object') {
            notes = '';
        }

        var action = component.get("c.saveNewBrewery");
        action.setParams({"breweryName":breweryInfo.Name,
                            "Type":breweryInfo.Type,
                            "Street":breweryInfo.Street,
                            "City":breweryInfo.City,
                            "State":breweryInfo.State,
                            "ZipCode":breweryInfo.ZipCode,
                            "Phone":breweryInfo.Phone,
                            "Website":breweryInfo.Website,
                            "Rating":rating,
                            "Notes":notes
                        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Record Saved");
                component.set("v.DisplayInput", false);
            } else {
                console.log("NoGo");
            }
        });
        $A.enqueueAction(action);


        
    }
})