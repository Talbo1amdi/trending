document.addEventListener("DOMContentLoaded", () => {
    fetchTrendingCoins();
});

async function fetchTrendingCoins() {
    const response = await fetch("https://api.coingecko.com/api/v3/search/trending", {
        headers: {
            "accept": "application/json"
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
            <h2>
                <a href="https://www.coingecko.com/en/coins/${coin.id}" target="_blank">
                    ${coin.name} (${coin.symbol.toUpperCase()})
                </a>
            </h2>
            <p>Price: $${coin.price || "N/A"}</p>
            <p>Market Cap: ${coin.market_cap || "N/A"}</p>
            <p>Rank: ${coin.market_cap_rank}</p>
        `;

        coinsList.appendChild(coinElement);
    });
}
