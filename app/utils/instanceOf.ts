const instanceOf = <T>(object: any): object is T => {
  return "title" in object;
};

export default instanceOf;
