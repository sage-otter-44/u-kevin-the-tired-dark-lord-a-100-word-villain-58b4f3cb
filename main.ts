import * as fs from "node:fs";
import * as path from "node:path";

// The Tired Dark Lord: a 100-word villain monologue.
// The tiredness lives in the rhythm and the small deflections —
// the pause held for effect, the knees, the retired dragon —
// never in a plain statement that he is weary.
const LINES: string[] = [
  "You want the speech. Fine.",
  "Three hundred years I've held this mountain, and the dramatic pause — I used to hold it for effect.",
  "Now my knees have opinions.",
  "The ravens stopped reporting. The dragon retired. My generals send memos.",
  "I forged a crown from a fallen star, and somewhere it started pinching.",
  "The hero waits at my gate, sword raised, destiny in his eyes.",
  "I have seen twelve of him. They all want the same monologue.",
  "So here it is: take the crown. Take the mountain.",
  "Just — close the door on your way out. The draft gets in.",
];

const text = LINES.join(" ");

// Gate self-check: the sealed scorer requires 1-600 UTF-8 characters,
// and the brief wants the monologue near 100 words. Fail loudly here
// rather than shipping an entry the gate would refuse.
const wordCount = text.split(/\s+/).filter(Boolean).length;
if (text.length < 1 || text.length > 600) {
  throw new Error(`entry is ${text.length} chars, outside the 1-600 gate`);
}
if (wordCount < 90 || wordCount > 110) {
  throw new Error(`entry is ${wordCount} words, not near 100`);
}
const trimmed = text.trim();

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync(path.join("/output", "entry.txt"), trimmed, "utf8");
console.log(`wrote ${trimmed.length} chars, ${wordCount} words`);
