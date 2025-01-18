document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const addressline2 = document.getElementById("addressline2").value;
    const grande = document.getElementById("order-review").textContent;
  
    const webhookURL = "https://discord.com/api/webhooks/1329840105476587520/3ir5ckQ1sxw580nlyb2wOJnFW1TS7kFAWiabcD6V-29Q--zNcrHHOABdsS-FbReohhU2";
  
    const payload = {
      content: "New Submission",
      embeds: [
        {
          title: "Details",
          color: 5207853,
          fields: [
            // { name: "Name", value: name, inline: true },
            // { name: "Email", value: email, inline: true },
            // { name: "Address", value: address, inline: true },
            // { name: "Addressline2", value: addressline2, inline: true },
            { name: "Main Details:", value: grande, inline: false },
            
          ]
        }
      ]
    };
  
    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        window.location.href = "ordersuccess.html";
      } else {
        alert("Failed to send checkout information.");
        window.location.href = "orderfail.html";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  });

// let step1 = document.querySelector("#step1")

// let step2 = document.querySelector("#step2")

// let step3 = document.querySelector("#step3")


// step1.addEventListener("click", step1t2);

// function step1t2() {
//     console.log("Step 1 to 2");
//     step1.style.color
// }

  document.addEventListener("DOMContentLoaded", () => {
    // Get all options
    const shippingOptions = document.querySelectorAll(".shoption");

    // Add click event listener to each option
    shippingOptions.forEach(option => {
      option.addEventListener("click", () => {
        // Remove "selected" class from all options
        shippingOptions.forEach(opt => opt.classList.remove("selected"));
        // Add "selected" class to the clicked option
        option.classList.add("selected");
      });
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");
  
    // Input fields
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const addressInput = document.getElementById("address");
    const addressLine2Input = document.getElementById("addressline2");
  
    // Options
    const shippingOptions = document.querySelectorAll(".shoption");
    const paymentOptions = document.querySelectorAll(".paoption");
  
    // Order review container
    const orderReview = document.getElementById("order-review");
  
    // Add event listener for input changes
    [nameInput, emailInput, addressInput, addressLine2Input].forEach(input => {
      input.addEventListener("input", updateOrderReview);
    });
  
    // Add click event listeners to shipping and payment options
    [...shippingOptions, ...paymentOptions].forEach(option => {
      option.addEventListener("click", () => {
        // Determine if it's a shipping or payment group
        const group = option.classList.contains("shoption")
          ? shippingOptions
          : paymentOptions;
  
        // Remove "selected" class from all options in the group
        group.forEach(opt => opt.classList.remove("selected"));
        option.classList.add("selected");
  
        updateOrderReview();
      });
    });
  
    // Update the Order Review section
    function updateOrderReview() {
      const selectedShipping = document.querySelector(".shoption.selected .optionsecondary");
      const selectedPayment = document.querySelector(".paoption.selected .optionmain");
  
      orderReview.innerHTML = `
        <p>Full Name: ${nameInput.value || ""}</p>
        <p>E-Mail: ${emailInput.value || ""}</p>
        <p>Address: ${addressInput.value || ""}</p>
        <p>${addressLine2Input.value || ""}</p>
        
        <p>Shipping Option:<br> ${selectedShipping ? selectedShipping.textContent : "{Shipping Option}"}</p>
        <p>Payment Option:<br> ${selectedPayment ? selectedPayment.textContent : "{Payment Option}"}</p>
      `;
    }
  
    // Initialize order review on page load
    updateOrderReview();
  });