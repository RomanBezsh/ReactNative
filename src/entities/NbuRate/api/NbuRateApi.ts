// 
import INbuRate from "../model/INbuRate";

export default class NbuRateApi {


    static getCurrentRates(): Promise<Array<INbuRate>> {
        return new Promise((resolve, reject) => {
            fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
            .then(r => r.json())
            .then(resolve)
            .catch(reject)
        });
    }
    
    static getRatesByDate(date: Date): Promise<Array<INbuRate>> {
        const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
        return fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&date=${dateStr}`)
            .then(r => r.json())
            .catch(() => []);
    }
};