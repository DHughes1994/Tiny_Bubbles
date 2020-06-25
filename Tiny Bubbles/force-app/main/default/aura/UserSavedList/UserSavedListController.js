({
    doinit : function(component, event, helper) {
        component.set('v.SavedList',[
            {label: 'Name', fieldName: 'Name', type: 'String'},
            {label: 'Type', fieldName: 'Type__c', type: 'String'},
            {label: 'Address', fieldName: 'Street_Address__c', type: 'String'},
            {label: 'City', fieldName: 'City__c', type: 'String'},
            {label: 'State', fieldName: 'State__c', type: 'String'},
            {label: 'Zip Code', fieldName: 'Zip_Code__c', type: 'String'},
            {label: 'Phone Number', fieldName: 'Phone__c', type: 'Number'},
            {label: 'Website', fieldName: 'Website__c', type: 'URL', typeAttributes: {target: '_self'}}
        ]);
    }
})
