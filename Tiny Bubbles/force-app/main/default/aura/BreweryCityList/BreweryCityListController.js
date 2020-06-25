({
    doInit : function(component, event, helper) {

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

        var action = component.get("c.getBreweriesbyCity");
        action.setParams({'City':'Atlanta'});
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
    }
})
