const express = require('express');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const session =  require('express-session');
require('dotenv').config({path: '../.env'});

const app = express();
const port = process.env.PORT || 3000;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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

// Spotify Route Middleware
app.get('/auth/spotify', passport.authenticate('spotify', {
   scope: ['user-read-email', 'playlist-modify-public']
  })
);

app.get('/auth/spotify/callback', passport.authenticate('spotify', {failureRedirect: '/login'}),
  (req, res) => {
    //Authentication successful ->  redirect to main route
    res.redirect('/');
  }
);

// App Routes
app.get('/', (req, res) => {
  res.send('Collaborative Playlist App Home Page');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
