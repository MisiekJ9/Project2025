let selectBaseCurrency = document.getElementById('fromCurrency')

let selectedBaseCurrency

function updateBaseCurrencyValue() {
  selectedBaseCurrency = selectBaseCurrency.value  
  console.log(selectedBaseCurrency)
}

updateBaseCurrencyValue()

selectBaseCurrency.addEventListener('change', updateBaseCurrencyValue)

let selectToConvertCurrency = document.getElementById('toCurrency')

let selectedToConvertCurrency

function updateToConvertCurrencyValue() {
  selectedToConvertCurrency = selectToConvertCurrency.value
  console.log(selectedToConvertCurrency)
}

updateToConvertCurrencyValue()

selectToConvertCurrency.addEventListener('change', updateToConvertCurrencyValue);

const apiKey = 'cur_live_3X5TpMpTz9M1m5bptONhtboPj8mZAvzaAgEAZEBH'
const currencyUrl = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${selectedToConvertCurrency}&base_currency=${selectedBaseCurrency}`

function convertCurrency(){
  let inputBaseCurrency = document.getElementById('kwota').value
  if(inputBaseCurrency != 0){
    fetch(currencyUrl).then(response => {
      if(response.ok){
        return response.json()
      } else {
        throw new Error('Wystąbił błąd w trakcie pobierania danych')
      }
    }).then(data => {
      let convertedCurrency = data.data[selectedBaseCurrency]?.value
      console.log(convertedCurrency)
    }).catch(error =>{
      console.log(Error)
    })
  } else {
    alert('Podaj wartość')
  }

  //}
  
}

function count(){
  
  
  
}