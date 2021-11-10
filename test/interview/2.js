function Foo() {
  getName = function () {
    console.error(1);
  };
  return this;
}

var getName;
function getName() {
  console.error(5);
}

Foo.getName = function () {
  console.error(2);
};

Foo.prototype.getName = function () {
  console.error(3);
};

getName = function () {
  console.error(4);
};

Foo.getName(); // 2

getName(); // 4

Foo().getName(); // 1

getName(); // 1

new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3