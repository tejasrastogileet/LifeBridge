const userService = require('../../../services/userService');

test('hello world!', () => {
	expect(userService.someMethod()).toBe(someExpectedValue);
});