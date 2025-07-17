const projectLinkDefinitions = {
  repo: { label: 'Repository', iconClass: 'i-mingcute:github-line' },
  doc: { label: 'Documentation', iconClass: 'i-mingcute:book-line' },
  url: { label: 'Website', iconClass: 'i-mingcute:link-line' },
  release: { label: 'Release', iconClass: 'i-mingcute:download-line' }
} as const

export const getProjectLinks = (repo?: string, doc?: string, url?: string, release?: string) => {
  const linkData = [
    { type: 'repo' as const, href: repo },
    { type: 'doc' as const, href: doc },
    { type: 'url' as const, href: url },
    { type: 'release' as const, href: release }
  ]

  return linkData
    .filter((link) => link.href)
    .map((link) => ({
      type: link.type,
      href: link.href!,
      icon: projectLinkDefinitions[link.type].iconClass,
      label: projectLinkDefinitions[link.type].label
    }))
}

export const hasProjectContent = (project: { body?: string }) => {
  return project.body && project.body.trim().length > 0
}

export const getProjectDescription = (project: {
  data: { description?: string }
  body?: string
}) => {
  if (project.data.description) {
    return project.data.description
  }
  if (project.body) {
    const truncated =
      project.body.length > 100 ? project.body.substring(0, 100) + '...' : project.body
    return truncated
  }
  return null
}
