let query = document.querySelector(".query");
let resp = document.querySelector(".resp");

let data = [
    {
        "Name": "Bitcoin",
        "Price": "$60,370.52",
        "MarketCap": "$1.13T",
        "Volume24h": "$52.9B"
    },
    {
        "Name": "Ethereum",
        "Price": "$2,157.32",
        "MarketCap": "$249B",
        "Volume24h": "$23.2B"
    },
    {
        "Name": "CyberFM",
        "Price": "$0.00",
        "MarketCap": "$110B",
        "Volume24h": "$5K"
    },
    {
        "Name": "Binance",
        "Price": "$476.96",
        "MarketCap": "$73.7B",
        "Volume24h": "$6.02B"
    },
    {
        "Name": "XRP",
        "Price": "$1.29",
        "MarketCap": "$58.6B",
        "Volume24h": "$17.3B"
    },
    {
        "Name": "Tether",
        "Price": "$1.00",
        "MarketCap": "$44.4B",
        "Volume24h": "$98.3B"
    },
    {
        "Name": "Cardano",
        "Price": "$1.23",
        "MarketCap": "$39.4B",
        "Volume24h": "$2.21B"
    },
    {
        "Name": "Dogecoin",
        "Price": "$0.063",
        "MarketCap": "$8.13B",
        "Volume24h": "$1.24B"
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
            }
        }
    }
};

btn.addEventListener("click", function () {
    recognition.start();
})