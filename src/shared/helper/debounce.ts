const debounce = async (
  func: (...args: never[]) => Promise<void>,
  delay: number
) => {
  let timeout: NodeJS.Timeout;
  return async (...args: never[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export default debounce;
