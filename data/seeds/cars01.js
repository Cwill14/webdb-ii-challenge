
exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: '12345678909876543', make: 'Mercury', model: 'Mountaineer', mileage: 100000},
        { VIN: '10203040506070809', make: 'Ford', model: 'GT', mileage: 2564}
      ]);
    });
};
