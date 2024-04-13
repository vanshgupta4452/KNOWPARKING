document.addEventListener("DOMContentLoaded", async () => {
  // Parse query parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedSpotID = urlParams.get('spotID');

  // Define fake data
  const fakeData = {
    parkingInfo: {
      time: Date.now(),
      parkingspot: "A123",
      parkingname: "Example Parking Lot",
      rent: 20.00,
      bookedSpotID: selectedSpotID // Use the selected spot ID from query parameter
    }
  };

  try {
    // Populate the receipt details with fake data
    document.getElementById("receipt-date").textContent = new Date(fakeData.parkingInfo.time).toLocaleDateString();
    document.getElementById("receipt-parking-number").textContent = fakeData.parkingInfo.parkingspot;
    document.getElementById("receipt-parking-place").textContent = fakeData.parkingInfo.bookedSpotID; // Display the booked spot ID
    document.getElementById("receipt-rent").textContent = fakeData.parkingInfo.rent.toFixed(2);
    document.getElementById("receipt-total").textContent = fakeData.parkingInfo.rent.toFixed(2);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch parking information. Please try again.");
  }
});
