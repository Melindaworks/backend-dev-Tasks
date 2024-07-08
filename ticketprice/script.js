const prices = {
    DXB: { GOI: 300, MAD: 700, LON: 900 },
    AUH: { GOI: 350, MAD: 650, LON: 850 },
    RAK: { GOI: 400, MAD: 600, LON: 800 }
};

function calculatePrice() {
    const departureCity = document.getElementById('departure-city').value;
    const destinationCity = document.getElementById('destination-city').value;
    const passengerCount = document.getElementById('passenger-count').value;

    const pricePerTicket = prices[departureCity][destinationCity];
    const totalPrice = pricePerTicket * passengerCount;

    document.getElementById('total-price').innerText = `Total Price: $${totalPrice}`;
}

