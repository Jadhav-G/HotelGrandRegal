// const apiURL = import.meta.env.VITE_SERVER_URL || "https://api.hotelgrandregal.com/api/";
const apiURL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000/api/"
export default async function (path, method, jsonData = null, formData= null, credentials = 'include'){
    console.log("In Fetched, Request Received");
    if(jsonData) console.log("Json Data Found", jsonData);
    let route = apiURL + path;
    let overhead = {
        method: method,
        credentials: credentials,
    }
    if(jsonData){
        overhead.headers = {
            'Content-Type': 'application/json'
        };
        overhead.body = JSON.stringify(jsonData);
    }
    if(formData){
        let dataToSend =  new FormData();
        formData.forEach(data => {
            dataToSend.append(data.key, data.value); 
        });
        overhead.body = dataToSend;
        console.log(dataToSend);
    }
    try{
        let responce = await fetch(route, overhead);
        try{
            console.log("res =", responce);
            let jsonResponce = await responce.json();
            let output = {
                status: false,
                reason: "output not found"
            }
            console.log("jsonRes=", jsonResponce);
            if(jsonResponce.status){
                output.status = true;
                output.content = jsonResponce.content || '';
            }else{
                output.reason = jsonResponce.reason;
            }
            return output;
        }catch(error){
            return {
                status : false,
                reason: 'Failed To Extract JSON responce\nInternal Error = \n ' + error 
            }
        }
    }catch(error){
        return {
            status : false,
            reason: 'Failed To Fetch responce\nINternal Error = \n ' + error 
        }
    }
}