const demo = require("./index");

describe("divide", () => {
  it("should return 5 when dividing 15 by 3", () => {
    // arrange
    const expectedResult = 5;

    //act
    const result = demo.divide(15, 3);

    //assert
    expect(result).toBe(expectedResult);
  });

  it("should throw and error when dividing by 0", () => {
    expect(() => demo.divide(15, 0)).toThrow("Division by 0 is not allowed!");
  });
});

// EXPECTATIONS & ASSERTIONS
const smallCat = {
  name: "Garfield",
  weight: 5,
};

const smallCatCloning = {
  name: "Garfield",
  weight: 5,
};

const bigCat = {
  name: "Garfield",
  weight: 5,
  awesomenessLevel: 100,
};

describe("cats test", () => {
  it("should demonstrate referential identity check", () => {
    expect(smallCat).not.toBe(smallCatCloning);
  });

  it("should demonstrate deep equality ", () => {
    expect(smallCat).toEqual(smallCatCloning);
  });

  it("should demonstrate subset matching check", () => {
    expect(bigCat).toMatchObject(smallCat);
  });
});

// DAILY GREETING
describe("dailyGreeting", () => {
  const testCases = [
    { input: "monday", expected: "It's Monday, don't forget to be awesome" },
    {
      input: "tuesday",
      expected:
        "Tuesday isn't so bad. It's a sign that you have somehow survived Monday",
    },
    {
      input: "wednesday",
      expected: "Keep going you are halfway to the weekend",
    },
    { input: "thursday", expected: "It's friday eve!" },
    { input: "friday", expected: "Happiness is a day, it's called Friday" },
  ];

  for (const testCase of testCases) {
    it(`should return greeting ${testCase.expected} when the day is ${testCase.input}`, () => {
      expect(demo.dailyGreeting(testCase.input)).toEqual(testCase.expected);
    });
  }

  it.each([
    ["monday", "It's Monday, don't forget to be awesome"],
    [
      "tuesday",
      "Tuesday isn't so bad. It's a sign that you have somehow survived Monday",
    ],
    ["wednesday", "Keep going you are halfway to the weekend"],
    ["thursday", "It's friday eve!"],
    ["friday", "Happiness is a day, it's called Friday"],
  ])(
    "should return correct greeting for a day of the week",
    (input, expected) => {
      expect(demo.dailyGreeting(input)).toEqual(expected);
    }
  );
});

describe("getRandomActivityAsToDoItem", () => {
  afterEach(() => {
    global.fetch.mockClear();
  });

  setUpFetchResolve = (activity) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(activity),
      })
    );
  };

  setUpFetchReject = () => {
    global.fetch = jest.fn(() => Promise.reject());
  };

  it("should convert random activity into todo item", () => {
    const activity = {
      key: "id1",
      activity: "any activity",
    };

    setUpFetchResolve(activity);

    const expectedToDoItem = {
      id: "id1",
      title: "any activity",
      completed: false,
    };

    return expect(demo.getRandomActivityAsToDoItem()).resolves.toEqual(
      expectedToDoItem
    );
  });

  it("should trow error when fetch random activity is rejected", () => {
    setUpFetchReject();

    return expect(demo.getRandomActivityAsToDoItem()).rejects.toThrow(
      "Error occured when fetching activities"
    );
  });
});

describe("timers", () => {
  it("delayedOnce should delay a function by 1 second", () => {
    jest.useFakeTimers();
    const callback = jest.fn();

    demo.delayedOnce(callback);

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalled();
  });

  it("infiniteTimer should schedule a 5 second timer after 1 second", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    const callback = jest.fn();

    demo.infiniteTimer(callback);
    expect(setTimeout).toBeCalledTimes(1);

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalledTimes(1);

    expect(setTimeout).toBeCalledTimes(2);
    expect(setTimeout).toBeCalledWith(expect.any(Function), 5000);
  });
});
