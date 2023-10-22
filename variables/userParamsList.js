const userParamsList = {
  minHeight: 150,
  minCurrentWeight: 35,
  minDesiredWeight: 35,
  minAge: 18,
  bloodTypes: [1, 2, 3, 4],
  sexTypes: ['male', 'female'],
  levelActivityTypes: [1, 2, 3, 4, 5],
  passwordMinLength: 6,
  weightIndex: 10,
  heightIndex: 6.25,
  ageIndex: 5,
  sexIndex: {
    male: 5,
    female: -161,
  },
  activityIndex: {
    1: 1.2,
    2: 1.375,
    3: 1.55,
    4: 1.725,
    5: 1.9,
  },
};

module.exports = userParamsList;
