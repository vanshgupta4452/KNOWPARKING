document.addEventListener("DOMContentLoaded", () => {
  const seats = document.querySelectorAll('input[name="tickets"]');
  const bookButton = document.getElementById("bookButton");
  let selectedSpot = ""; // Variable to store the selected parking spot

  // Function to handle checkbox selection
  function handleCheckboxSelection(event) {
    const checkbox = event.target;
    if (checkbox.checked) {
      selectedSpot = checkbox.id; // Update selectedSpot when checkbox is checked
      console.log("Selected Parking Spot:", selectedSpot);
    } else {
      selectedSpot = ""; // Clear selectedSpot if checkbox is unchecked
    }
  }

  // Add event listener to each checkbox
  seats.forEach((seat) => {
    seat.addEventListener("change", handleCheckboxSelection);
  });

  // Event listener for book button click
  bookButton.addEventListener("click", () => {
    if (!selectedSpot) {
      alert("Please select a parking spot.");
      return;
    }
    alert("Booking confirmed for parking spot: " + selectedSpot);
    // Redirect to receipt page
    window.location.href = "../frontend/receipt.html";
  });
});

// Code for generating seats - corrected
const seatsContainer = document.querySelector(".all-seats");
for (let i = 0; i < 4; i++) {
  let randint = Math.floor(Math.random() * 2);
  let booked = randint === 1 ? "booked" : "";
  let checkboxHtml = `<input type="checkbox" name="tickets" id="s${i + 2}" `;
  if (booked === "booked") {
    checkboxHtml += "disabled ";
  }
  checkboxHtml += `/><label for="s${i + 2}" class="seat ${booked}"></label>`;
  seatsContainer.insertAdjacentHTML("beforeend", checkboxHtml);
}
