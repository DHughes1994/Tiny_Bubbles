public class BreweryCityListController {

    @AuraEnabled
    public static List<Object> getBreweriesbyCity(String City){
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
            System.debug(cityBreweries);
            return cityBreweries;
        }else {
            List<Object> nogo = new List<Object>();
            return nogo;
        }
    }
}