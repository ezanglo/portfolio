interface BioFacts {
  name: string
  yearsExperience: string
  mainStack: string
  additionalTech: string
  careerStatus: string
}

/**
 * Fallback career story, used whenever `content/site.ts` ships an empty `bio`.
 * Every view's About content should tell this same story, not a generic placeholder.
 */
const LONG_BIO = (f: BioFacts) => [
  `Graduating with a degree in Computer Science, I initially worked as a .NET Developer while also accepting freelance projects. Afterward, I started my journey into full-stack web development. Leveraging my experience with .NET and Object Oriented Programming, I easily adapted and learned their tech stack, despite lacking prior work experience in PHP. This opened up learning opportunities with web development for me. I love building applications and learning how to solve complex problems, whether in Desktop, Web, or Mobile. As a result, I find myself in a constant state of learning and trying out new things.`,
  `My main stack is ${f.mainStack}. I am also familiar with ${f.additionalTech}, to name a few. I am currently looking for a ${f.careerStatus}.`,
]

const THIRD_PERSON_BIO = (f: BioFacts) => [
  `${f.name} is a full-stack developer with ${f.yearsExperience}+ years of experience across Web, Mobile, and Desktop, originally trained as a .NET developer before moving into full-stack web work.`,
  `Main stack: ${f.mainStack}. Also familiar with ${f.additionalTech}.`,
]

const SHORT_BIO = (f: BioFacts) => [`${f.yearsExperience}+ years across Web, Mobile, and Desktop. Main stack: ${f.mainStack}.`]

export function buildBioVariants(opts: BioFacts & { longParagraphs: string[] }) {
  const long = opts.longParagraphs.length > 0 ? opts.longParagraphs : LONG_BIO(opts)
  return {
    long,
    short: SHORT_BIO(opts),
    thirdPerson: THIRD_PERSON_BIO(opts),
  }
}
