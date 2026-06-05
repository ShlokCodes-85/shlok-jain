export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  experience: 'experience',
  skills: 'skills',
  projects: 'projects',
  certifications: 'certifications',
  achievements: 'achievements',
  contact: 'contact',
}

const NAVBAR_OFFSET = 64

export function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  window.history.replaceState(null, '', `#${sectionId}`)
  window.scrollTo({ top, behavior: 'smooth' })
}

export function getSectionFromHash(hash) {
  const value = (hash || '').replace('#', '').trim()
  if (Object.values(SECTION_IDS).includes(value)) {
    return value
  }

  return SECTION_IDS.home
}
