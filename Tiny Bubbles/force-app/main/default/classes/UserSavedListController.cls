public class UserSavedListController {

    @AuraEnabled
    public static List<Brewery__c> getSavedList(){
        List<Brewery__c> savedBreweries = new List<Brewery__c>();
        for (Brewery__c brew : [SELECT Name, Type__c FROM Brewery__c]) {
            savedBreweries.add(brew);            
        }
        return savedBreweries;
    }
}
