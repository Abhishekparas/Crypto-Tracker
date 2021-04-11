let query = document.querySelector(".query");
let resp = document.querySelector(".resp");


let data = [
    {
        "Name": "Bitcoin",
        "Price": "$60,155.81",
        "MarketCap": "$1.12T",
        "Volume24h": "$53.9B",
        "Code": "https://github.com/bitcoin/"
    },
    {
        "Name": "Ethereum",
        "Price": "$2,139.37",
        "MarketCap": "$247B",
        "Volume24h": "$22.5B",
        "Code": "https://github.com/ethereum"
    },
    {
        "Name": "CyberFM",
        "Price": "$0.00",
        "MarketCap": "$110B",
        "Volume24h": "$3.99K"
    },
    {
        "Name": "Binance",
        "Price": "$467.63",
        "MarketCap": "$72.3B",
        "Volume24h": "$5.13B",
        "Code": "https://www.reddit.com/r/BinanceExchange/"
    },
    {
        "Name": "XRP",
        "Price": "$1.46",
        "MarketCap": "$66.2B",
        "Volume24h": "$30.1B",
        "Code": "https://github.com/ripple"
    },
    {
        "Name": "Tether",
        "Price": "$1.00",
        "MarketCap": "$44.5B",
        "Volume24h": "$109B",
        "Code": "https://www.reddit.com/r/Tether/"
    },
    {
        "Name": "Cardano",
        "Price": "$1.22",
        "MarketCap": "$39B",
        "Volume24h": "$2.41B",
        "Code": "https://github.com/input-output-hk/cardano-sl/"
    },
    {
        "Name": "Polkadot",
        "Price": "$40.79",
        "MarketCap": "$37.9B",
        "Volume24h": "$1.52B"
    },
    {
        "Name": "Litecoin",
        "Price": "$253.96",
        "MarketCap": "$17B",
        "Volume24h": "$7.22B",
        "Code": "https://github.com/litecoin-project/litecoin"
    },
    {
        "Name": "Uniswap",
        "Price": "$29.69",
        "MarketCap": "$15.5B",
        "Volume24h": "$388M"
    },
    {
        "Name": "Dogecoin",
        "Price": "$0.065",
        "MarketCap": "$8.36B",
        "Volume24h": "$2.05B",
        "Code": "https://github.com/dogecoin/dogecoin"
    }
]


var msg = new SpeechSynthesisUtterance();

let btn = document.getElementById('btn');
var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;


recognition.onstart = function () {
    console.log("Voice recognition started. Try speaking into the microphone.");
};

recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    query.innerHTML = transcript;

    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        for (j in obj) {
            let key = j;
            obj[j] = obj[j].toLowerCase();
            transcript = transcript.toLowerCase();
            if (transcript.includes(obj[j])) {
                if (transcript.includes("market")) {
                    msg.text = `The market cap of ${obj[j]} is ${obj["MarketCap"]}`;
                    resp.innerHTML = msg.text;
                    window.speechSynthesis.speak(msg);
                    console.log(obj["MarketCap"]);
                }
                if (transcript.includes("volume")) {
                    msg.text = `The 24 hour volume of ${obj[j]} is ${obj["Volume24h"]}`;
                    resp.innerHTML = msg.text;
                    window.speechSynthesis.speak(msg);
                    console.log(obj["Volume24h"]);
                }
                if (transcript.includes("price")) {
                    msg.text = `The price of ${obj[j]} is ${obj["Price"]}`;
                    resp.innerHTML = msg.text;
                    window.speechSynthesis.speak(msg);
                    console.log(obj["Price"]);
                }
                if (transcript.includes("code")) {
                    msg.text = `Redirecting to github`;
                    resp.innerHTML = msg.text;
                    window.speechSynthesis.speak(msg);
                    window.location.href = obj["Code"];
                }
            }
        }
    }
};

btn.addEventListener("click", function () {
    recognition.start();
})