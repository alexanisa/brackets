module.exports = function check(str, bracketsConfig) {
  const openSet = new Set();
  const closeMap = {};
  for (let i = 0; i < bracketsConfig.length; i += 1) {
    const open = bracketsConfig[i][0];
    const close = bracketsConfig[i][1];
    openSet.add(open);
    closeMap[close] = open;
  }
  const stack = [];
  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    if (openSet.has(char)) {
      const isSame = closeMap[char] === char;
      const isClosing = isSame && stack[stack.length - 1] === char;
      if (isClosing) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (closeMap[char]) {
      const expectedOpen = closeMap[char];
      const lastOpen = stack.pop();
      if (lastOpen !== expectedOpen) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
