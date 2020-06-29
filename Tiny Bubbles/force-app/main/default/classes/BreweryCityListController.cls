public class BreweryCityListController {

    @AuraEnabled
    public static List<Map<String, Object>> getBreweriesbyCity(String City){
        //Cleaning string for use in the URL
        City = City.replace(' ', '_');        
        City = City.toLowerCase();
        //Callout to Open Brewery DB
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndPoint('https://api.openbrewerydb.org/breweries?by_city='+City);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if (response.getStatusCode()==200) {
            List<object> cityBreweries = (List<Object>) JSON.deserializeUntyped(response.getbody());
            Map<String, Object> breweryMap = (new Map<String, Object>());
            List<Map<String,Object>> listMappedBreweries = new List<Map<String,Object>>();
            for (Object Brewery : cityBreweries) {
                breweryMap = (Map<String, Object>) Brewery;
                Map<String, Object> usefulBreweryMap = new Map<String, Object>();
                usefulBreweryMap.put('Name', breweryMap.get('name'));
                usefulBreweryMap.put('Type', breweryMap.get('brewery_type'));
                usefulBreweryMap.put('Street', breweryMap.get('street'));
                usefulBreweryMap.put('City', breweryMap.get('city'));
                usefulBreweryMap.put('State', breweryMap.get('state'));
                usefulBreweryMap.put('ZipCode', breweryMap.get('postal_code'));
                usefulBreweryMap.put('Phone', breweryMap.get('phone'));
                usefulBreweryMap.put('Website', breweryMap.get('website_url'));
                listMappedBreweries.add(usefulBreweryMap);
            }
            System.debug(cityBreweries);
            return listMappedBreweries;
        }else {
            List<Map<String,Object>> nogo = new List<Map<String,Object>>();
            return nogo;
        }
    }

    @AuraEnabled
    public static void saveNewBrewery(String breweryName, String Type, String Street, String City,
                                        String State, String ZipCode, String Phone, String Website,
                                        Integer Rating, String Notes){
        
        Decimal fixedPhone;

        ID userId = System.UserInfo.getUserId();

        system.debug(userId);

        User userContactId = [Select Name, ContactId FROM USER WHERE ID = :userId];

        system.debug(userContactId);

        String contactId = userContactid.ContactId;

        system.debug(contactId);

        if (Phone == '') {
            Phone=null;
        }else {
        fixedPhone = decimal.valueof(Phone);
        }
                
        if (Rating == 0) {
            Rating = null;
        }

        Brewery__c newBrewery = new Brewery__c(Name = breweryName, Type__c = Type, Street_Address__c = Street,
                                                City__c = City, State__c = State, Zip_Code__c = ZipCode, 
                                                Phone__c = fixedPhone, Website__c = Website, Rating__c = Rating,
                                                Notes__c = Notes, Contact__c = contactId);
        insert newBrewery;
        
    }
}