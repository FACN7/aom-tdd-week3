var test = require("tape");
var logic = require("./logic");


test("Add todo", function (t) {
  const actual = logic.addTodo([], {
    description: "make smoothie out of things that should really be cooked"
  });
  const expected = [{
    id: 1,
    description: "make smoothie out of things that should really be cooked",
    done: false
  }];
  t.deepEqual(actual, expected, "This should return id=2");

  t.end();
});

test("Add todo", function (t) {
  console.log(logic.generateId);

  const actual = logic.addTodo([{
    id: 1,
    description: "abc",
    done: false
  }], {
    description: "abc"
  });
  const expected = [{
      id: 1,
      description: "abc",
      done: false
    },
    {
      id: 2,
      description: "abc",
      done: false
    }
  ];
  console.log(actual);
  t.deepEqual(actual, expected, "This should return id=2");

  t.end();
});

test("Delete todo", function (t) {
  const actual = logic.deleteTodo(
    [{
        id: 1,
        description: "make smoothie out of things that should really be cooked",
        done: false
      },
      {
        id: 2,
        description: "make smoothie out of things that should really be cooked",
        done: false
      }
    ],
    1
  );
  console.log(actual);
  const expected = [{
    id: 2,
    description: "make smoothie out of things that should really be cooked",
    done: false
  }];

  t.deepEqual(actual, expected, "This should delete id=1");

  t.end();
});

test("Mark todo", function (t) {
  const actual = logic.markTodo(
    [{
        id: 1,
        description: "a",
        done: false
      },
      {
        id: 2,
        description: "b",
        done: false
      }
    ],
    2
  );

  const expected = [{
      id: 1,
      description: "a",
      done: false
    },
    {
      id: 2,
      description: "b",
      done: true
    }
  ];

  t.deepEqual(actual, expected, "abc");

  t.end();
});

test("Sort Method", function (t) {
  const actual = logic.sortTodos([{

      id: 2,
      description: "b",
      done: false
    },
    {
      id: 1,
      description: "a",
      done: false
    }
  ]);

  const expected = logic.markTodo([{
      id: 1,
      description: "a",
      done: false
    },
    {
      id: 2,
      description: "b",
      done: false
    }

  ]);

  t.deepEqual(actual, expected);

  t.end();
});