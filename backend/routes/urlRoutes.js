const { Router } = require("express");
const { Url, User } = require("../db");
const { authMiddleware } = require("../middleware");
const router = Router();

router.post("/lilurl", async function (req, res) {
    
    function generateShortCode(length = 6) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let shortCode = '';
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            shortCode += characters[randomIndex];
        }
    
        return shortCode;
    } 
    const { longUrl } = req.body;
    const shortCode = generateShortCode();

    const newUrl = await Url.create({
        longUrl,
        shortCode,
        createdBy: null,
        clicks: 0,
    });

    res.json ({
        shortUrl: `http://localhost:3001/lilurl/${shortCode}`
    });
});

router.get("/lilurl/:shortCode", async (req, res) => {
    try {
        const url = await Url.findOneAndUpdate(
            { shortCode: req.params.shortCode },
            { $inc: { clicks: 1 } },
            { new: true }
        );

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.redirect(302, url.longUrl);
    } catch (error) {
        console.error("Error fetching short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/dashboard", authMiddleware, async function (req, res) {
    function generateShortCode(length = 6) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let shortCode = '';
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            shortCode += characters[randomIndex];
        }
    
        return shortCode;
    } 
    const { longUrl } = req.body;
    const shortCode = generateShortCode();
    const userId = req.userId;
    console.log(userId);

    const newUrl = await Url.create({
        longUrl,
        shortCode,
        createdBy: userId,
        clicks: 0,
    });

    res.json ({
        shortUrl: `http://localhost:3001/lilurl/${shortCode}`
    });

});

router.get("/analytics", authMiddleware, async function (req, res) {
    const userUrls = await Url.find({ createdBy: req.userId });

    const updatedUrls = userUrls.map(url => ({
        ...url._doc, 
        shortUrl: `http://lilurl.com/${url.shortCode}`,
        longUrl: url.longUrl,
        clicks: url.clicks
    }));

    res.json(updatedUrls);
});



module.exports = ({
    urlRouter: router,
})