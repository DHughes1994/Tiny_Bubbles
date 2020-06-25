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
}