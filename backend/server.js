const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/screenshot", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        const screenshotBase64 = await page.screenshot({ encoding: 'base64' });
    
        await browser.close();
    
        res.json({base64: screenshotBase64});

    } catch (error) {
        console.error("Error taking screenshot:", error);
        res.status(500).json({ error: "Failed to take screenshot" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
