import type { Node, Root } from 'mdast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import mdastToString from './mdast-util-to-string'
import getReadingTime from './reading-time'

export const remarkAddZoomable: Plugin<[{ className?: string }], Root> = function ({
  className = 'zoomable'
}) {
  return function (tree) {
    visit(tree, 'image', (node: Node) => {
      node.data = { hProperties: { class: className } }
    })
  }
}

export const remarkReadingTime: Plugin<[], Root> = function () {
  return function (tree, { data }) {
    const textOnPage = mdastToString(tree)
    const readingTime = getReadingTime(textOnPage)
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    if (data.astro && data.astro.frontmatter) {
      data.astro.frontmatter.minutesRead = readingTime.text
      data.astro.frontmatter.words = readingTime.words
    }
  }
}
