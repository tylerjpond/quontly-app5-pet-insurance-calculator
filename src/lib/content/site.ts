export interface AffiliateCardContent {
  title: string
  badge: string
  description: string
  highlights: string[]
  ctaLabel: string
  href: string
  disclosureTag: string
}

export interface ContentSection {
  eyebrow: string
  title: string
  paragraphs: string[]
}

export interface LegalPageContent {
  title: string
  description: string
  sections: Array<{
    heading: string
    paragraphs: string[]
  }>
}

export const siteMeta = {
  siteName: 'Pet Insurance Comparison Guide',
  adsEnabled: false,
  disclosure:
    'This site may earn a commission from affiliate links on this page. That compensation does not change recommendation scoring or ranking logic. Availability and quote details vary by country and region.',
}

export const affiliateCards: AffiliateCardContent[] = [
  {
    title: 'Pets Best',
    badge: 'Coverage-first',
    description:
      'Strong wellness and accident/illness options with flexible reimbursement and deductible choices for many dog and cat profiles.',
    highlights: [
      'Multiple deductible and reimbursement combinations',
      'Commonly selected for broad coverage preferences',
      'Useful fit when long-term claim flexibility matters',
    ],
    ctaLabel: 'Explore Pets Best',
    href: 'https://www.petsbest.com/',
    disclosureTag: 'Affiliate Link',
  },
  {
    title: 'Lemonade Pet',
    badge: 'Budget pick',
    description:
      'Digital-first quote flow and quick enrollment experience that can work well for price-sensitive households.',
    highlights: [
      'Streamlined online enrollment journey',
      'Often competitive for lower-risk pet profiles',
      'Good fit for users prioritizing monthly affordability',
    ],
    ctaLabel: 'Check Lemonade Pet',
    href: 'https://www.lemonade.com/pet/',
    disclosureTag: 'Affiliate Link',
  },
  {
    title: 'Healthy Paws',
    badge: 'Reputation pick',
    description:
      'Popular choice for users who prioritize provider track record and straightforward claims experience over lowest possible premium.',
    highlights: [
      'Reputation-oriented fit in scoring model',
      'Common choice for long-term plan continuity',
      'Useful benchmark when comparing top-ranked options',
    ],
    ctaLabel: 'View Healthy Paws',
    href: 'https://www.healthypawspetinsurance.com/',
    disclosureTag: 'Affiliate Link',
  },
  {
    title: 'ASPCA Pet Insurance',
    badge: 'Balanced option',
    description:
      'Balanced plan profile with broad recognition, often relevant when users want a middle ground across price and coverage factors.',
    highlights: [
      'Commonly considered in comparison shopping',
      'Balanced score profile for mixed priorities',
      'Useful as a baseline quote in side-by-side analysis',
    ],
    ctaLabel: 'Compare ASPCA Plans',
    href: 'https://www.aspcapetinsurance.com/',
    disclosureTag: 'Affiliate Link',
  },
  {
    title: 'Embrace Pet Insurance',
    badge: 'Comprehensive pick',
    description:
      'Strong customization options and policy breadth for users who emphasize richer benefits and configurable coverage structure.',
    highlights: [
      'Configurable coverage profile in many states',
      'Frequently selected for higher-coverage goals',
      'Useful for users prioritizing plan flexibility',
    ],
    ctaLabel: 'See Embrace Options',
    href: 'https://www.embracepetinsurance.com/',
    disclosureTag: 'Affiliate Link',
  },
]

export const explainerSections: ContentSection[] = [
  {
    eyebrow: 'How to use it',
    title: 'Complete the pet profile quiz, then compare ranked plans',
    paragraphs: [
      'This pet insurance comparison guide works best when you complete all profile steps: pet type, breed, age, location, priorities, and pre-existing condition status. Those inputs determine how each plan is weighted in the ranking engine.',
      'After submitting, review the top recommendations, compare deductible and reimbursement ranges, and request live quotes from the most relevant providers in your country and region.',
    ],
  },
  {
    eyebrow: 'Scoring model',
    title: 'Recommendations balance price, coverage, and reputation signals',
    paragraphs: [
      'Each provider receives a weighted composite score across affordability, coverage depth, and reputation profile. Your selected priorities raise the weight of matching factors while still preserving baseline balance across all three categories.',
      'Premium estimates combine pet profile risk factors with provider pricing indices. Rankings are deterministic for the same inputs so you can compare options consistently.',
      'The current release supports United States states and Canada provinces/territories. Additional countries may be added in future updates.',
    ],
  },
  {
    eyebrow: 'What to know',
    title: 'Use estimates as planning guidance, then confirm live quotes',
    paragraphs: [
      'Any pet insurance calculator is an estimate, not a bindable quote. Final premiums and eligibility depend on carrier underwriting, local rules, and plan details available at checkout.',
      'A practical workflow is to shortlist two to three top-ranked providers, request real quotes, and compare exclusions, waiting periods, and annual caps before purchasing.',
    ],
  },
]

export const faqs = [
  {
    question: 'How accurate are the monthly premium estimates?',
    answer:
      'Estimates are directional and based on your quiz profile plus provider pricing indices. They are useful for comparison, but final premiums come from each insurer\'s live underwriting and state-specific filings.',
  },
  {
    question: 'Can I select more than one priority?',
    answer:
      'Yes. You can choose up to two priorities among price, coverage, and reputation. The ranking model boosts those factors while still considering the full profile for balanced recommendations.',
  },
  {
    question: 'Do pre-existing conditions affect recommendations?',
    answer:
      'Yes. The model applies a profile adjustment when pre-existing conditions are present and can shift plan ordering toward providers that score better for broader policy fit.',
  },
  {
    question: 'Do affiliate relationships change rank order?',
    answer:
      'No. Affiliate relationships do not alter score calculation or sorting logic. Recommendations are generated from the same deterministic scoring model for all users.',
  },
]

export const legalPageCopy: Record<string, LegalPageContent> = {
  about: {
    title: 'About this comparison guide',
    description:
      'Methodology, assumptions, and intended use for pet insurance recommendations and premium estimates.',
    sections: [
      {
        heading: 'Methodology',
        paragraphs: [
          'The tool uses a deterministic scoring model with weighted factors for price, coverage, and reputation. User-selected priorities raise the influence of matching factors while preserving baseline balance.',
          'Monthly premium estimates apply pet type, size class, age, and risk adjustments along with country, region, and provider multipliers. This produces planning estimates, not binding quotes.',
        ],
      },
      {
        heading: 'Intended use',
        paragraphs: [
          'This guide is educational and should be used to shortlist providers before requesting official quotes. Insurance decisions should include review of exclusions, waiting periods, and policy documents.',
          'If your pet has a complex clinical history, consult the provider directly for underwriting and coverage eligibility details.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy policy',
    description:
      'How this site handles analytics, advertising, and affiliate outbound links.',
    sections: [
      {
        heading: 'Data handling',
        paragraphs: [
          'Calculator inputs are processed in the browser and are not tied to user accounts by default. Standard site analytics may collect aggregate traffic and interaction data.',
          'If account or save features are added later, this policy will be updated with clear data retention and access terms.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: [
          'Affiliate partners, ad providers, and analytics vendors may process data according to their own policies when you interact with their services.',
          'Please review each third-party privacy policy for details about cookies, attribution, and measurement practices.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of use',
    description:
      'Terms governing use of this comparison guide and related content.',
    sections: [
      {
        heading: 'Informational use only',
        paragraphs: [
          'This tool provides informational estimates and plan-ranking guidance only. It is not insurance advice and does not constitute an offer, binder, or policy contract.',
          'Users are responsible for final decisions and should verify policy details directly with insurers before purchase.',
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'The tool is provided as-is without warranties for uninterrupted availability, quote parity, or universal carrier coverage in every location.',
          'By using this site, you acknowledge that insurer pricing and eligibility may change and that results are estimates.',
        ],
      },
    ],
  },
  disclosure: {
    title: 'Affiliate disclosure',
    description:
      'How affiliate relationships work and how recommendations remain independent.',
    sections: [
      {
        heading: 'How affiliate links work',
        paragraphs: [
          'Some outbound links may generate a commission when a qualifying action occurs. This supports operation of the free comparison tool.',
          'Affiliate relationships do not change score formulas, weights, or sort order for recommendations.',
        ],
      },
      {
        heading: 'Placement approach',
        paragraphs: [
          'Disclosure appears near recommendation content and in the footer so users can evaluate context where decisions occur.',
          'Recommendations are ranked by model fit, not by commission size.',
        ],
      },
    ],
  },
}