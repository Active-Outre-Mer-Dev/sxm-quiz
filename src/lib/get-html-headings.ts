export function getHTMLHeadings(content: string) {
  const regex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/g;
  let matches = content.match(regex);
  let headings: { title: string; id: string }[] = [];
  if (matches) {
    for (const match of matches) {
      const regex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/g;
      const title = match.replace(regex, "$1");
      headings.push({ title, id: title.toLocaleLowerCase().replaceAll(" ", "-").trim().replaceAll(".", "") });
    }
  }

  return headings;
}

export function addIds(content: string) {
  const regex = /(<h[1-6][^>]*>)(.*?)(<\/h[1-6]>)/g;
  const result = content.replace(regex, (match, openingTag, content, closingTag) => {
    // Add an attribute to the opening tag
    const regex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/g;
    const result = match.replace(regex, "$1");
    openingTag = openingTag.replace(">", ` id='${result.toLocaleLowerCase().replaceAll(" ", "-").trim()}'>`);
    // Combine the modified opening tag with the original content and closing tag
    return openingTag + content + closingTag;
  });

  return result;
}

export function getReadTime(str: string) {
  if (str === null || str === "") return 0;
  const wpm = 225;
  const words = str
    .replace(/(<([^>]+)>)/gi, "")
    .trim()
    .replaceAll("\n", " ")
    .split(" ")
    .filter((s) => s);
  console.log(words);
  return Math.ceil(words.length / wpm);
}
