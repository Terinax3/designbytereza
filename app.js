const express = require('express');
const { create } = require('express-handlebars');
const portfolioItems = require("./data/portfolio");

const app = express();

app.use(express.static('public'));
app.use('/content', express.static('content'));

const hbs = create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/',
    helpers: {
        isVideo: function (filePath) {
            return filePath.endsWith('.mp4') || filePath.endsWith('.webm') || filePath.endsWith('.ogg');
        },
        eq: function (a, b) {
            return a === b;
        }
    }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


app.use((req, res, next) => {
    res.locals.isHomepage = req.url === "/" || req.path === "/";
    res.locals.currentPath = req.path;
    res.locals.portfolioItems = portfolioItems;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        title: 'Portfolio',
        portfolioItems: portfolioItems.map((item, index) => ({
            ...item,
            image: `/content/gallery/ok-0${index + 1}.jpg`,
        })),
        currentPath: req.path
    });
});


// Portfolio Item Page
app.get("/portfolio/:id", (req, res) => {
    console.log("Requested ID:", req.params.id);

    const item = portfolioItems.find(p => String(p.id) === req.params.id);

    if (!item) {
        return res.status(404).send("Portfolio item not found");
    }

    res.render("portfolio-item", {
        title: item.title,
        year: item.year,
        description: item.description,
        images: item.images,
        extraContent: item.extraContent, // Pass extra content
        customStyles: item.customStyles, // Pass custom styles
        currentPath: `/portfolio/${item.id}`
    });
});


// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        aboutText:
            "I’m a New Media Design student with a passion for crafting visually stunning and engaging interactive media. Whether it’s Graphic Design, Web Design, Development, or Programming, I thrive on the challenge of bringing creative ideas to life.<br><br>Beyond design and development, I’m inspired by art, illustration, and the beauty of the outdoors. Hiking and capturing the world’s natural wonders fuel my creativity, while quiet days are for recharging with board games, video games, and the purrs of my cat, Fia.",
        currentPath: req.path
    });
});


// 404 Error Handler
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
