var x = 4;
var a = {
	x: 5,
	b: {
		x: 6,
		c() {
			console.log(this.x);
			return this.x;
		}
	}
};

var test = a.b.c;
console.log('------->', test());
console.log('------->', a.b.c());

// new

function Salvatore(name, age) {
	this.name = name;
	this.age = age;
}
Salvatore.prototype.say = function() {
	console.log(`I am ${this.name}, ${this.age} years old`);
};
console.log(Salvatore());
function _new() {
	const rest = Array.prototype.slice.call(arguments);
	const constructer = rest.shift();
	const context = Object.create(constructer.prototype);
	const result = constructer.apply(context, rest);
	return typeof result === 'object' && result !== null ? result : context;
}

const actions = _new(Salvatore, 'liaoxuan', 26);
actions.say();
console.log('===>', Salvatore.prototype, actions.__prote__);

// 多重继承

const Obj1 = function(name, age) {
	this.name = name;
	this.age = age;
};
Obj1.prototype.method = function() {
	console.log(this.name);
};

const Obj2 = function(color) {
	this.color = color;
};
Obj2.prototype.method = function() {
	console.log(this.color);
};

const my = function(name, age, color, action) {
	Obj1.call(this, name, age);
	Obj2.call(this, color);
	this.action = action;
};

Object.assign(my.prototype, Obj1.prototype, Obj2.prototype);
my.prototype.constructer = my;

const f_test = new my('cat', 12, '#fff', 'run');
f_test.method();
console.log(f_test.method);

const func = () => {
	if (!Promise.all) {
		Promise.prototype.all = (services = []) => {
			return new Promise((resolve, reject) => {
				const count = 0;
				const errCount = 0;
				const result = [];
				services.forEach((item, index) => {
					item
						.then((res) => {
							count++;
							result[index] = res;
							if (count === services.length) {
								resolve(result);
							}
						})
						.catch((err) => {
							result[index] = err;
							errCount++;
							if (count + errCount === services.length) {
								reject(result);
							}
						});
				});
			});
		};
	}
};

setTimeout(() => {
	console.log(4)
}, 0);

new Promise((resolve, reject) => {
	console.log(1)
	for(let i = 0; i < 100; i++) {
		if (i === 99) {
			resolve()
		}
	}
	console.log(2)
}).then(() => {
	console.log(5)
})

console.log(3)
