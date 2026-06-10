/**
 * Test Data Fixtures
 * Centralizing test data here makes it easy to update and keeps
 * tests readable without hardcoded strings scattered everywhere.
 */

export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
};

export const checkoutInfo = {
  valid: {
    firstName: 'Jane',
    lastName: 'Tester',
    postalCode: '27601',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Tester',
    postalCode: '27601',
  },
};
