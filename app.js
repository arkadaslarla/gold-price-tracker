const apiKey = "599d3fb57dc827f296669d1312f54d74";
const baseCurrency = "XAU";
const currencies = "TRY";
const apiUrl = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=${baseCurrency}&currencies=${currencies}`;

const alisfiyati1Element = document.querySelector(".alisfiyati1");
const alisfiyati2Element = document.querySelector(".alisfiyati2");
const alisfiyati3Element = document.querySelector(".alisfiyati3");
const alisfiyati4Element = document.querySelector(".alisfiyati4");
const satisfiyati1Element = document.querySelector(".satisfiyati1");
const satisfiyati2Element = document.querySelector(".satisfiyati2");
const satisfiyati3Element = document.querySelector(".satisfiyati3");
const satisfiyati4Element = document.querySelector(".satisfiyati4");

function getExchangeRate() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.rates[currencies];
      const gramsPerOunce = 30.901961;
      const ouncePrice = exchangeRate / gramsPerOunce;
      alisfiyati1Element.innerHTML = `${ouncePrice.toFixed(2)} TL`;
      alisfiyati2Element.innerHTML = `${(ouncePrice * 1.63).toFixed(2)} TL`;
      alisfiyati3Element.innerHTML = `${(ouncePrice * 3.269).toFixed(2)} TL`;
      alisfiyati4Element.innerHTML = `${(ouncePrice * 6.75).toFixed(2)} TL`;
      satisfiyati1Element.innerHTML = `${(ouncePrice * 1.084141).toFixed(2)} TL`;
      satisfiyati2Element.innerHTML = `${(ouncePrice * 1.63 * 1.037652).toFixed(2)} TL`;
      satisfiyati3Element.innerHTML = `${(ouncePrice * 3.269 * 1.034887).toFixed(2)} TL`;
      satisfiyati4Element.innerHTML = `${(ouncePrice * 6.75 * 1.01346).toFixed(2)} TL`;
      
    })
    .catch(error => console.log(error));
}

getExchangeRate();

document.getElementById("refresh-btn").addEventListener("click", () => {
  getExchangeRate();
});
