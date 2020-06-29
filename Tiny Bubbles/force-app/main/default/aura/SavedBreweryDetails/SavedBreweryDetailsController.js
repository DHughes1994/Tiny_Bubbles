({
    getUpdated : function(component, event, helper) {
        component.set("v.DisplayPage", false);
        var breweryId = event.getParam("BreweryId");
        console.log(typeof breweryId);
        component.set("v.BreweryId", breweryId)
        component.set("v.DisplayPage", true);
        console.log(component.get("v.DisplayPage"));
    }
})