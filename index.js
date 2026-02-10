const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const OFFICIAL_EMAIL = "nischay1353.be23@chitkarauniversity.edu.in"; 

// Health API
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

// Helpers
function fibonacci(n) {
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr.slice(0, n);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// Main API
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    let data;

    if (body.fibonacci !== undefined) {
      data = fibonacci(body.fibonacci);

    } else if (body.prime !== undefined) {
      data = body.prime.filter(isPrime);

    } else if (body.lcm !== undefined) {
      data = body.lcm.reduce((a, b) => lcm(a, b));

    } else if (body.hcf !== undefined) {
      data = body.hcf.reduce((a, b) => gcd(a, b));

    } else if (body.AI !== undefined) {
      data = "Mumbai"; // TEMP (AI later)

    } else {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "Invalid input"
      });
    }

    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: data
    });

  } catch (err) {
    res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: "Server error"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
