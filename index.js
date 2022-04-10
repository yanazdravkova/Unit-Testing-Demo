function divide(x, y) {
  if (y === 0) {
    throw new Error("Division by 0 is not allowed!");
  } else {
    return x / y;
  }
}

function dailyGreeting(day) {
  switch (day) {
    case "monday":
      return "It's Monday, don't forget to be awesome";
    case "tuesday":
      return "Tuesday isn't so bad. It's a sign that you have somehow survived Monday";
    case "wednesday":
      return "Keep going you are halfway to the weekend";
    case "thursday":
      return "It's friday eve!";
    case "friday":
      return "Happiness is a day, it's called Friday";
  }
}

async function getRandomActivityAsToDoItem() {
  try {
    const result = await fetch(`https://boredapi.com/api/activity`);
    const activity = await result.json();

    const newToDoItem = {
      id: activity.key,
      title: activity.activity,
      completed: false,
    };

    return newToDoItem;
  } catch {
    throw new Error("Error occured when fetching activities");
  }
}

function delayedOnce(callback) {
  setTimeout(() => {
    callback();
  }, 1000);
}

function infiniteTimer(callback) {
  setTimeout(() => {
    callback();

    // Schedule the next call in 5 seconds
    setTimeout(() => {
      infiniteTimer(callback);
    }, 5000);
  }, 1000);
}

function colorTodoItems(items) {
  return items.map(applyColor);
}

function applyColor(item) {
  if (item.completed) {
    return { ...item, color: "green" };
  } else {
    return { ...item, color: "red" };
  }
}

module.exports = {
  divide,
  dailyGreeting,
  colorTodoItems,
  getRandomActivityAsToDoItem,
  delayedOnce,
  infiniteTimer,
};
