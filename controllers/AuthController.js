const passport = require('passport')
require('dotenv').config()

const Register = require('../models/RegisterModel')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (passport_id, done) {
    Register.findById(passport_id).then(user => {
      done(null, user)
    })
  })

  // GoogleStrategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
  },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        Register.findOne({ passport_id: profile.id }).then((currentUser) => {
          if (currentUser) {
            done(null, currentUser)
          } else {
            new Register({
              passport_id: profile.id,
              email: profile.emails[0].value,
              name: profile.name.givenName,
              last_name: profile.name.familyName,
              picture: profile.photos[0].value,
              provider: profile.provider
            }).save().then((newUser) => {
              done(null, newUser)
            })
          }
        })
      })
    })
  )

  // LinkedInStrategy
  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_ID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      Register.findOne({ passport_id: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser)
        } else {
          new Register({
            passport_id: profile.id,
            email: profile.emails[0].value,
            name: profile.name.givenName,
            last_name: profile.name.familyName,
            picture: profile.photos[0].value,
            provider: profile.provider
          }).save().then((newUser) => {
            done(null, newUser)
          })
        }
      })
    })
  })
  )
}
