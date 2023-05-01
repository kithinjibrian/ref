// modules
const path = require('path'),
      express = require('express'),
      dotenv = require('dotenv'),
      logger = require('morgan'),
      helmet = require('helmet'),
      cors = require('cors'),
      favicon = require('serve-favicon'),
      cookieParser = require("cookie-parser"),
      rfs = require('rotating-file-stream');

// Logger file stream
const als = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

// fetching environment variables
dotenv.config({ path: path.join(__dirname, '/.env') });

// Initializing express app
const app = express();

// Routes
const usersRouter = require('./routes/users'),
      walletRouter = require('./routes/wallet'),
      hooksRouter = require('./routes/hooks'),
      videosRouter = require('./routes/videos'),
      boxesRouter = require('./routes/boxes'),
      triviaRouter = require('./routes/trivia'),
      tiersRouter=require('./routes/tiers'),
      adminRouter = require('./routes/admin');

//route middlwares
const day = require("./middleware/day/days");

// Setting express middlewares
app.use(cors());
app.use(helmet({
contentSecurityPolicy:false,
crossOriginResourcePolicy: { policy: "cross-origin"},
crossOriginEmbedderPolicy: false
}))
app.use(cookieParser());
app.use(logger('combined', { stream: als }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))

// Registering routes
app.get("/",(req,res)=>res.sendFile("index.html"));
app.use('/api/admin', adminRouter);
app.use('/api/tier', tiersRouter);
app.use('/api/users', usersRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/boxes',day(5,"This route is only active on Fridays"), boxesRouter);
app.use('/api/video',day(6,"This route is only active on Saturdays") ,videosRouter);
app.use('/api/trivia',day(7,"This route is only active on Sundays"), triviaRouter);
app.use('/api/hooks', hooksRouter);

//app.listen()
module.exports = app;
