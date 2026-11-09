// Replace the sample entries with your own project titles, copy, and URLs.
export const projects = [
  {
    id: '01',
    title: 'AI product',
    category: 'Product design · AI',
    description: 'Space for a case study about how people give direction to an AI product and make sense of its output.',
    artwork: 'prompt',
    image: '',
    sample: true,
    href: '',
  },
  {
    id: '02',
    title: 'SaaS workspace',
    category: 'UX design · SaaS',
    description: 'Space for a case study about simplifying a recurring workflow and making the next action easier to find.',
    artwork: 'workspace',
    image: '',
    sample: true,
    href: '',
  },
] satisfies {
  id: string
  title: string
  category: string
  description: string
  artwork: 'prompt' | 'workspace'
  image: string
  sample: boolean
  href: string
}[]

export const about = {
  heading: 'Curiosity first. Make it tangible.',
  introduction: 'I’m Sasi, a product designer and builder. I turn everyday observations into thoughtful product experiences.',
  approach: 'I like to give an idea a form early, so there’s something concrete to try, question, and improve.',
  portrait: '', // Set a URL or public asset path to add an About portrait.
}

export const contact: { label: string; href: string }[] = []
// Add real destinations here. For an email, use a mailto: URL.
