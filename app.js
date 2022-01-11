const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        seedDB          = require('./seeds'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        User            = require('./models/user'),
        Slide           = require('./models/slide'),
        Artist          = require('./models/artist'),
        Favorite        = require('./models/favorite'),
        methodOverride  = require('method-override'),
        Music           = require('./models/music'),
        Home            = require('./models/home'),
        Schema          = mongoose.Schema;

var indexRoutes     = require('./routes/index'),
    artistRoutes    = require('./routes/artist'),
    musicRoutes     = require('./routes/music'),
    adminRoutes     = require('./routes/admin');
    favoriteRoutes  = require('./routes/favorite');
    
    

mongoose.connect('mongodb://localhost/uCollectionV3');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
// seedDB();

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use('/',            indexRoutes);
app.use('/artist',      artistRoutes);
app.use('/artist/:id',  musicRoutes );
app.use('/admin',       adminRoutes);
app.use('/favorite',    favoriteRoutes);

app.listen('3000', function(req, res){
    console.log('Server is running');
});
