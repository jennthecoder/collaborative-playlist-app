const express = require('express');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const session =  require('express-session');
const ensureAuthenticated = require('../middleware/auth');
const  {getAccessToken, createPlaylist, getUserPlaylists} = require('../utils/spotifyHelpers');
require('dotenv').config();
//require('dotenv').config({ path: __dirname + '/../.env' });


const app = express();

//#########    GLOBAL VARIABLES   #################
const port = process.env.PORT || 3000;
const clientID = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

//#########   PASSPORT AND SESSION SETUP   ###############

passport.use(
  new SpotifyStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // Save profile to the database
      // return the user object
      /* User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        return done(err, user);
      });*/
      return done(null, profile);
    }
  )
);

app.use (session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false} // Set to true if using HTTPS
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) =>  done(null, obj));

app.use(passport.initialize());
app.use(passport.session());


//########################## ROUTES #######################################

// Spotify Route Middleware
app.get('/auth/spotify', passport.authenticate('spotify', {
   scope: ['user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'ugc-image-upload']
  })
);

app.get('/auth/spotify/callback', passport.authenticate('spotify', {failureRedirect: '/login'}),
  (req, res) => {
    //Authentication successful ->  redirect to main route
    res.redirect('/');
  }
);

// App Routes
app.get('/', ensureAuthenticated, (req, res) => {
  res.send('Welcome to your Collaborative Playlist App!');
});

//Add /login route in case login fails that tells the user what the next step is.

//Playlist Routes
app.post('/playlists', ensureAuthenticated, async (req, res) => {
  const { name, description, public, collaborative} = req.body;
  const accessToken = await getAccessToken(clientID, clientSecret)
  try {
    const response = await createPlaylist(req.user.id, name , description, public, collaborative, accessToken);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: `${error}`});
  }
});

app.get('/playlists', ensureAuthenticated, async (req, res) => {

  try {
    const accessToken = await getAccessToken(clientID, clientSecret)
    const playlists = await getUserPlaylists(req.user.id, accessToken);
    res.status(200).json(playlists)
  } catch (error) {
    res.status(500).json({error: `${error}`});
  }
});

//Modify playlist route  - PUT /playlists/{playlist_id}/tracks  - reorder or replace items in a playlist

//Add to a playlist -  /playlists/{playlist_id}/tracks




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
