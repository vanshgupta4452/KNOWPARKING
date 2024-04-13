const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors()); // Enable CORS for all routes

// Define the path to the JSON file
const jsonFilePath = path.join(__dirname, '/home/vansh/catkin_ws/src/Automated_Parking/Automated_Parking-ishan/backend/parking_status.json');

app.get('/parking_status', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
