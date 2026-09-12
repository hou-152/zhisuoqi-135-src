/**
 * Parse the first section of the AI 内参 concept pool.
 *
 * The parser deliberately mirrors the original inline loops.  In particular,
 * concept ids are assigned in source order and malformed/non-concept rows are
 * skipped rather than rejected.
 *
 * @param {string} markdown
 * @returns {Array<{id: string, src: string, artTitle: string, name: string, type: string, gloss: string}>}
 */
export function parseConceptPool(markdown) {
  const concepts = [];
  let article = null;

  for (const line of markdown.split('\n')) {
    if (line.startsWith('## 第二部分')) break;

    const heading = line.match(/^### (S\d+)\s+(.+?)\s*｜/);
    if (heading) {
      article = { id: heading[1], title: heading[2] };
      continue;
    }

    if (!article || !line.startsWith('| ') || line.startsWith('| 概念原文') || line.startsWith('|---')) {
      continue;
    }

    const cells = line.split('|').map(s => s.trim());
    if (cells.length < 5 || !cells[1]) continue;

    concepts.push({
      id: 'C' + String(concepts.length + 1).padStart(2, '0'),
      src: article.id,
      artTitle: article.title,
      name: cells[1],
      type: cells[2],
      gloss: cells[4],
    });
  }

  return concepts;
}
