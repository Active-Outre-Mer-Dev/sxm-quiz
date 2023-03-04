export function randomize(arr: string[]) {
    const newArr: string[] = [];
    const original = arr.slice();
    for (const _ of arr) {
      const random = Math.floor(Math.random() * original.length);
      const [el] = original.splice(random, 1);
      newArr.push(el);
    }
    console.log(newArr);
    return newArr;
  }