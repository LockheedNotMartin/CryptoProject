// Function to fetch the latest Bitcoin price
async function fetchBitcoinPrice() {
    const apiUrl = `https://api.coindesk.com/v1/bpi/currentprice/BTC.json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const price = data.bpi.USD.rate_float;

        return price;
    } catch (error) {
        console.log("Error fetching Bitcoin price:", error);
    }
}

// Function to update the price element with the latest price
let previousPrice = 0;
async function updatePrice() {
    const priceElement = document.getElementById("price");
    const price = await fetchBitcoinPrice();

    if (price > previousPrice) {
        priceElement.classList.add("animation-up");
        priceElement.classList.remove("animation-down");
    } else if (price < previousPrice) {
        priceElement.classList.add("animation-down");
        priceElement.classList.remove("animation-up");
    } else {
        priceElement.classList.remove("animation-up");
        priceElement.classList.remove("animation-down");
    }

    priceElement.innerText = price.toFixed(2);
    previousPrice = price;
}

// Function to periodically update the price
function startPriceUpdate() {
    updatePrice();
    setInterval(updatePrice, 1000); // Check every second
}

// Start the price update
startPriceUpdate();
