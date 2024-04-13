const BASEURL = "https://irctc1.p.rapidapi.com/api/v3/";
const BASE_URL = "https://irctc1.p.rapidapi.com/api/v1/";
const BASELINK="https://irctc1.p.rapidapi.com/api/v2/";

export const getTrainBetweenStationsUrl = (fromStation, toStation, formattedDate) => `${BASEURL}trainBetweenStations?fromStationCode=${fromStation}&toStationCode=${toStation}&dateOfJourney=${formattedDate}`;
export const getTrainnumUrl = (train) => `${BASE_URL}getTrainClasses?trainNo=${train.train_number}`;
export const getfairdetails=(trainNumber,fromStation,toStation) => `${BASELINK}getFare?trainNo=${trainNumber}&fromStationCode=${fromStation}&toStationCode=${toStation}`;

export const searchTrainUrl = (query) => `${BASE_URL}searchTrain?query=${query}`;

export const checkSeatAvailabilityUrl = (classType, fromStationCode, quota, toStationCode, trainNo, date) => 
 `${BASE_URL}checkSeatAvailability?classType=${classType}&fromStationCode=${fromStationCode}&quota=${quota}&toStationCode=${toStationCode}&trainNo=${trainNo}&date=${date}`;

export const apiHeaders = {
    
'X-RapidAPI-Key':'09fe8d65f5mshd2166ad02f645e2p13f88bjsn980723e560ef',

'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'

};
export const getLiveTrainStatusUrl = (statusnumber) => {
  const baseUrl = 'https://trainjourney-irctc-api.p.rapidapi.com/rapidapi/trainapi/2/';
  const queryParams = `train=${statusnumber}&Disclaimer=This%20train%20running%20information%20is%20not%20affiliated%20with%20or%20endorsed%20by%20Indian%20Railways%20or%20IRCTC.`;

  return {
    url: baseUrl + '?' + queryParams,
    headers: {
      'X-RapidAPI-Key': '2ea7e2ce9dmsh327ba63af8e7762p18f1f1jsnf0a4ac8d1411',
      'X-RapidAPI-Host': 'trainjourney-irctc-api.p.rapidapi.com'
    }
  };
};


