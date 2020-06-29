public class UserSavedListController {

    @AuraEnabled
    public static List<Brewery__c> getSavedList(){
        ID userId = System.UserInfo.getUserId();
        User userContactId = [Select ContactId FROM USER WHERE ID = :userId] ;
        List<Brewery__c> savedBreweries = new List<Brewery__c>();
        for (Brewery__c brew : [SELECT Name, Type__c FROM Brewery__c WHERE Contact__c = :userContactId.ContactId]) {
            savedBreweries.add(brew);            
        }
        return savedBreweries;
    }
}
