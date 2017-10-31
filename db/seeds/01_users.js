const encrypted = require('../../config/encryption.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries

      //Babs' and ADMIN'S password: abc $2a$10$MHa8DImeSUSYVZJ2UFYdeur/z.3nr5rnBCHc5zBoeOFHgjI/x8b0a
      //Hassan's password: 123 $2a$10$IbOrl5w2ngI54Fq.k6OuYOJCuN3bAyFX9rjJHweh68lgfl82swLwm
      //Scott password: abc123 $2a$10$XF33yUYZl.TTK4tR/6.ZNehXVR.SfOfq55iqkZm/aYCB59GrWoymy

      return knex('users').insert([
        {first_name: 'Bárbara', last_name: 'Doring', email: 'b@bs.com', password: '$2a$10$MHa8DImeSUSYVZJ2UFYdeur/z.3nr5rnBCHc5zBoeOFHgjI/x8b0a', cohort: 'g66', campus: 'Phoenix', type: 'Student', role: 'user'},
        {first_name: 'Hassan', last_name: 'Khan', email: 'h@ssan.com', password: '$2a$10$IbOrl5w2ngI54Fq.k6OuYOJCuN3bAyFX9rjJHweh68lgfl82swLwm', cohort: 'g58', campus: 'Denver', type: 'Student', role: 'user'},
        {first_name: 'Scott', last_name: 'Dicksheid', email: 'scott@me.com', password: '$2a$10$XF33yUYZl.TTK4tR/6.ZNehXVR.SfOfq55iqkZm/aYCB59GrWoymy', cohort: 'g60', campus: 'Seattle', type: 'Student', role: 'user'},
        {first_name: 'Tiny', last_name: 'Tina', email: 'tin@me.com', password: '$2a$10$MHa8DImeSUSYVZJ2UFYdeur/z.3nr5rnBCHc5zBoeOFHgjI/x8b0a', cohort: '', campus: 'Phoenix', type: 'Student', role: 'ADMIN'}
      ]);
    });
};
