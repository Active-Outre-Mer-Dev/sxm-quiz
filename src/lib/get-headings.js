import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

function getHeadings(root) {
  const nodes = {};
  const output = [];
  const indexMap = {};
  visit(root, "heading", node => {
    addID(node, nodes);
    transformNode(node, output, indexMap);
  });

  return output;
}
export function headingTree() {
  return (node, file) => {
    file.data.headings = getHeadings(node);
  };
}

function addID(node, nodes) {
  const id = node.children.map(c => c.value).join("");
  nodes[id] = (nodes[id] || 0) + 1;
  node.data = node.data || {
    hProperties: {
      id: `${id}${nodes[id] > 1 ? ` ${nodes[id] - 1}` : ""}`
        .replace(/[^a-zA-Z\d\s-]/g, "")
        .split(" ")
        .join("-")
        .toLowerCase()
    }
  };
}

function transformNode(node, output, indexMap) {
  const transformedNode = {
    value: toString(node),
    depth: node.depth,
    data: node.data,
    children: []
  };

  if (node.depth === 2) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
}
