import axios from "axios"

export async function getExchangeRateData() {
    const { data } = await axios.get("https://asia-southeast1-hybrid-dolphin-364409.cloudfunctions.net/getAsianCountriesExchange");
    return data
  }
  
