import '../css/style.css';

if (process.env.NODE_ENV === 'development') {
  const myFunc = num => {
    return num * num * num;
  };

  window.myFunc = myFunc;
} else {
  const myFunc = num => {
    return num * num * num * num;
  };

  window.myFunc1 = myFunc;
}
