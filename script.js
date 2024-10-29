document.addEventListener("DOMContentLoaded", () => {
    fetchTrendingCoins();
});

async function fetchTrendingCoins() {
    const response = await fetch("https://api.coingecko.com/api/v3/search/trending", {
        headers: {
            "accept": "application/json",
            "x_cg_pro_api_key": "CG-QR9H7CUZMdKYowtqqNWecw71" // Replace with your actual API key
        }
    });

    if (!response.ok) {
        console.error("Failed to fetch data", response.statusText);
        return;
    }

    const data = await response.json();
    displayCoins(data.coins);
}

function displayCoins(coins) {
    const coinsList = document.getElementById("coins");
    coinsList.innerHTML = ""; // Clear previous content

    coins.forEach(coinData => {
        const coin = coinData.item;
        const coinElement = document.createElement("div");
        coinElement.classList.add("coin");

        coinElement.innerHTML = `
            <img src="${coin.thumb}" alt="${coin.name}">
            <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
            <p>Price: $${coin.data.price.toFixed(2)}</p>
            <p>Market Cap: ${coin.market_cap}</p>
            <p>Rank: ${coin.market_cap_rank}</p>
        `;

        coinsList.appendChild(coinElement);
    });
}
