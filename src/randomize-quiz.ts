export function randomize<T>(arr: T[]) {
  const newArr: T[] = [];
  const original = arr.slice();
  for (const _ of arr) {
    const random = Math.floor(Math.random() * original.length);
    const [el] = original.splice(random, 1);
    newArr.push(el);
  }
  return newArr;
}
