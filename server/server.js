const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;

const port = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/zip", async (req, res) => {
  const zipCodes = await getZipCodes();
  res.json(zipCodes);
});

app.post("/api", (req, res) => {
  const isDataValid = validateFormData(req.body);
  console.log(isDataValid);
  if (isDataValid) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

async function getZipCodes() {
  try {
    const content = await fs.readFile(__dirname + "/zipCodes.txt", "utf8");
    const zipCodes = [];
    const lines = content.split("\n");
    lines.forEach((line) => {
      const columns = line.split("\t");
      const dataObj = {
        code: columns[0]?.trim(),
        place: columns[1]?.trim(),
        city: columns[3]?.trim(),
      };
      zipCodes.push(dataObj);
    });
    return zipCodes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function validateFormData(data) {
  const { name, email, phone, zip } = data;

  // Validate name (assumed to be non-empty)
  if (!name || typeof name !== "string") {
    console.log("name wrong");
    return false;
  }

  // Validate email using a simple regex (basic validation)
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    console.log("email wrong");
    return false;
  }

  // Validate phone number (assumed to be a number)
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{3}$/;
  if (!phoneRegex.test(phone)) {
    console.log("phone wrong");
    return false;
  }

  // Validate zip code
  if (!validateZipCode(zip)) {
    console.log("zip wrong");
    return false;
  }

  return true;
}

function validateZipCode(zip) {
  const { code, place, city } = zip;

  // Assuming code, place, and city should not be empty
  if (!code || !place || !city) return false;

  return true;
}
