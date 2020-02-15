'use strict';

QUnit.module('Тестируем функцию get', function () {
	QUnit.test('get работает правильно c объектами с существующими свойствами', function (assert) {
		const object = {
			foo: 'bar',
			deep: {
				hested: {
					field: 'baz'
				}
			}
		};

		assert.strictEqual(get(object, '.foo'), object.foo);
		assert.strictEqual(get(object, '.deep.hested.field'), object.deep.hested.field);

		assert.deepEqual(get(object, '.deep.hested'), object.deep.hested);
		assert.deepEqual(get(object, '.deep'), object.deep);
		assert.deepEqual(get(object, '.'), object);
	});

	QUnit.test('get работает правильно c массивами', function (assert) {
		const object = {
			foo: 'bar',
			baz: [ 1, 2, 3 ],
			deep: [
				{foobar: '42'}
			]
		};

		assert.strictEqual(get(object, '.foo.0'), object.foo[ 0 ]);
		assert.strictEqual(get(object, '.foo.length'), object.foo.length);
		assert.strictEqual(get(object, '.baz.0'), object.baz[ 0 ]);
		assert.strictEqual(get(object, '.baz.length'), object.baz.length);
		assert.strictEqual(get(object, '.deep.0.foobar'), object.deep[ 0 ].foobar);
	});

	QUnit.test('get работает правильно c объектами без свойств', function (assert) {
		const object = {
			foo: {
				bar: 42
			}
		};

		assert.strictEqual(get(object, '.foobar'), undefined);
		assert.strictEqual(get(object, '.foo.baz'), undefined);
		assert.strictEqual(get(object, '.baz.0'), undefined);
		assert.strictEqual(get(object, '.baz.length'), undefined);
		assert.strictEqual(get(object, '.0.1.2'), undefined);
	});

	QUnit.test('get работает правильно c пустым объектом', function (assert) {
		const object = {};

		assert.strictEqual(get(object, '.foobar'), undefined);
		assert.strictEqual(get(object, '.foo.baz'), undefined);
		assert.strictEqual(get(object, '.baz.0'), undefined);
		assert.strictEqual(get(object, '.baz.length'), undefined);
		assert.strictEqual(get(object, '.0.1.2'), undefined);
		assert.deepEqual(get(object, '.'), object);
	});

	QUnit.test('get работает правильно c объектом с большим количеством вложений', function (assert) {
		const object = [...Array(11)].map(x => "foo").reduce((prev, current, i = 0) => (
			{[current]:{...prev}, bar: i++}
		), {});

		assert.strictEqual(get(object, '.foo.foo.foo.foo.bar'), 6);
		assert.strictEqual(get(object, '.foo.foo.foo.foo.foo.foo.foo.foo.foo.bar'), 1);
		assert.strictEqual(get(object, '.foo.bar'), 9);
	});

	QUnit.test('get работает правильно c несуществующими массивами/объектами/строками', function (assert) {
		const object = {
			foo: undefined,
			bar: null
		};

		assert.strictEqual(get(object, '.foo.0'), undefined);
		assert.strictEqual(get(object, '.bar.0'), undefined);
		assert.strictEqual(get(object, '.foo'), undefined);
		assert.strictEqual(get(object, '.bar'), null);
		assert.strictEqual(get(object, '.foo.length'), undefined);
		assert.strictEqual(get(object, '.bar.length'), undefined);
	});

	QUnit.test('get работает правильно c null', function (assert) {
		const object = null;

		assert.strictEqual(get(object, '.foo.0'), undefined);
		assert.strictEqual(get(object, '.foo.length'), undefined);
	});

	QUnit.test('get работает правильно c неправильно заданным путем к свойству', function (assert) {
		const object = {
			foo: 'bar',
			deep: {
				hested: {
					field: 'baz'
				}
			}
		};

		assert.strictEqual(get(object, 'foo'), undefined);
		assert.strictEqual(get(object, 'deephested.field'), undefined);
		assert.deepEqual(get(object, ''), undefined);
	});
});
