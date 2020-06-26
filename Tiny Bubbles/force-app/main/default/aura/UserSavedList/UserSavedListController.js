({
    doinit : function(component, event, helper) {
        component.set('v.SavedList',[
            {label: 'Name', fieldName: 'Name', type: 'String'},
            {label: 'Type', fieldName: 'Type__c', type: 'String'}
        ]);
        
        var action = component.get("c.getSavedList");
        action.setParam();
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.Brewery", response.getReturnValue());
                console.log(response.getReturnValue());
            }else{
                console.log("Couldn't get save list")
            }
        });
        $A.enqueueAction(action);
        
    }
})
