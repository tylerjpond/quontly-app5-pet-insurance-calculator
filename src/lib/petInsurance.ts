export type PetType = 'dog' | 'cat' | 'other'
export type SizeClass = 'toy' | 'medium' | 'large' | 'giant'
export type Priority = 'price' | 'coverage' | 'reputation'

export interface BreedProfile {
  name: string
  type: PetType
  sizeClass: SizeClass
  riskScore: number
}

export interface QuizInputs {
  petType: PetType
  breed: string
  age: number
  state: string
  priorities: Priority[]
  hasPreExistingCondition: boolean
}

export interface ProviderPlan {
  key: string
  name: string
  affiliateUrl: string
  priceIndex: number
  coverageScore: number
  reputationScore: number
  deductibleOptions: string
  reimbursementOptions: string
  highlights: string[]
}

export interface Recommendation {
  provider: ProviderPlan
  matchScore: number
  monthlyPremiumEstimate: number
  premiumDetail: {
    base: number
    adjusted: number
  }
}

const sizeMultipliers: Record<SizeClass, number> = {
  toy: 0.85,
  medium: 1,
  large: 1.2,
  giant: 1.5,
}

const stateMultipliers: Record<string, number> = {
  AL: 0.92, AK: 1.18, AZ: 0.98, AR: 0.9, CA: 1.25, CO: 1.02, CT: 1.12, DE: 1.03,
  FL: 1.16, GA: 1.02, HI: 1.2, ID: 0.9, IL: 1.08, IN: 0.95, IA: 0.92, KS: 0.9,
  KY: 0.92, LA: 0.98, ME: 0.95, MD: 1.06, MA: 1.14, MI: 1.02, MN: 1.01, MS: 0.88,
  MO: 0.94, MT: 0.9, NE: 0.9, NV: 1.03, NH: 1.02, NJ: 1.15, NM: 0.93, NY: 1.2,
  NC: 1.01, ND: 0.87, OH: 0.97, OK: 0.9, OR: 1.04, PA: 1.02, RI: 1.1, SC: 0.98,
  SD: 0.87, TN: 0.95, TX: 1.05, UT: 0.94, VT: 0.95, VA: 1.02, WA: 1.08, WV: 0.9,
  WI: 0.95, WY: 0.88,
}

const dogBreeds: BreedProfile[] = [
  { name: 'Labrador Retriever', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Golden Retriever', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'German Shepherd', type: 'dog', sizeClass: 'large', riskScore: 4 },
  { name: 'French Bulldog', type: 'dog', sizeClass: 'medium', riskScore: 5 },
  { name: 'Bulldog', type: 'dog', sizeClass: 'medium', riskScore: 5 },
  { name: 'Poodle', type: 'dog', sizeClass: 'medium', riskScore: 2 },
  { name: 'Beagle', type: 'dog', sizeClass: 'medium', riskScore: 3 },
  { name: 'Rottweiler', type: 'dog', sizeClass: 'large', riskScore: 4 },
  { name: 'Dachshund', type: 'dog', sizeClass: 'toy', riskScore: 4 },
  { name: 'German Shorthaired Pointer', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Pembroke Welsh Corgi', type: 'dog', sizeClass: 'medium', riskScore: 3 },
  { name: 'Australian Shepherd', type: 'dog', sizeClass: 'medium', riskScore: 3 },
  { name: 'Yorkshire Terrier', type: 'dog', sizeClass: 'toy', riskScore: 3 },
  { name: 'Cavalier King Charles Spaniel', type: 'dog', sizeClass: 'toy', riskScore: 4 },
  { name: 'Doberman Pinscher', type: 'dog', sizeClass: 'large', riskScore: 4 },
  { name: 'Great Dane', type: 'dog', sizeClass: 'giant', riskScore: 4 },
  { name: 'Siberian Husky', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Miniature Schnauzer', type: 'dog', sizeClass: 'toy', riskScore: 2 },
  { name: 'Boxer', type: 'dog', sizeClass: 'large', riskScore: 4 },
  { name: 'Shih Tzu', type: 'dog', sizeClass: 'toy', riskScore: 3 },
  { name: 'Boston Terrier', type: 'dog', sizeClass: 'toy', riskScore: 4 },
  { name: 'Pomeranian', type: 'dog', sizeClass: 'toy', riskScore: 3 },
  { name: 'Havanese', type: 'dog', sizeClass: 'toy', riskScore: 2 },
  { name: 'Bernese Mountain Dog', type: 'dog', sizeClass: 'giant', riskScore: 5 },
  { name: 'Mastiff', type: 'dog', sizeClass: 'giant', riskScore: 5 },
  { name: 'Chihuahua', type: 'dog', sizeClass: 'toy', riskScore: 2 },
  { name: 'Bichon Frise', type: 'dog', sizeClass: 'toy', riskScore: 2 },
  { name: 'Maltese', type: 'dog', sizeClass: 'toy', riskScore: 2 },
  { name: 'Cane Corso', type: 'dog', sizeClass: 'giant', riskScore: 4 },
  { name: 'Airedale Terrier', type: 'dog', sizeClass: 'medium', riskScore: 3 },
  { name: 'Bloodhound', type: 'dog', sizeClass: 'large', riskScore: 4 },
  { name: 'Border Collie', type: 'dog', sizeClass: 'medium', riskScore: 3 },
  { name: 'Borzoi', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Brittany', type: 'dog', sizeClass: 'medium', riskScore: 2 },
  { name: 'Cocker Spaniel', type: 'dog', sizeClass: 'medium', riskScore: 3 },
  { name: 'Collie', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Dalmatian', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'English Setter', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Fox Terrier', type: 'dog', sizeClass: 'toy', riskScore: 3 },
  { name: 'Greyhound', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Irish Setter', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Lhasa Apso', type: 'dog', sizeClass: 'toy', riskScore: 2 },
  { name: 'Newfoundland', type: 'dog', sizeClass: 'giant', riskScore: 4 },
  { name: 'Old English Sheepdog', type: 'dog', sizeClass: 'large', riskScore: 4 },
  { name: 'Papillon', type: 'dog', sizeClass: 'toy', riskScore: 2 },
  { name: 'Pekingese', type: 'dog', sizeClass: 'toy', riskScore: 3 },
  { name: 'Saint Bernard', type: 'dog', sizeClass: 'giant', riskScore: 5 },
  { name: 'Samoyed', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Scottish Terrier', type: 'dog', sizeClass: 'toy', riskScore: 2 },
  { name: 'Weimaraner', type: 'dog', sizeClass: 'large', riskScore: 3 },
  { name: 'Whippet', type: 'dog', sizeClass: 'medium', riskScore: 2 },
]

const catBreeds: BreedProfile[] = [
  { name: 'Domestic Shorthair', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Domestic Longhair', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Maine Coon', type: 'cat', sizeClass: 'large', riskScore: 3 },
  { name: 'Siamese', type: 'cat', sizeClass: 'medium', riskScore: 3 },
  { name: 'Ragdoll', type: 'cat', sizeClass: 'large', riskScore: 3 },
  { name: 'Bengal', type: 'cat', sizeClass: 'medium', riskScore: 3 },
  { name: 'Persian', type: 'cat', sizeClass: 'medium', riskScore: 4 },
  { name: 'Sphynx', type: 'cat', sizeClass: 'medium', riskScore: 3 },
  { name: 'Abyssinian', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'American Shorthair', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'American Wirehair', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Balinese', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Birman', type: 'cat', sizeClass: 'medium', riskScore: 3 },
  { name: 'Bombay', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'British Shorthair', type: 'cat', sizeClass: 'medium', riskScore: 3 },
  { name: 'Burmese', type: 'cat', sizeClass: 'medium', riskScore: 3 },
  { name: 'Chartreux', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Cornish Rex', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Devon Rex', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Egyptian Mau', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Exotic Shorthair', type: 'cat', sizeClass: 'medium', riskScore: 4 },
  { name: 'Himalayan', type: 'cat', sizeClass: 'medium', riskScore: 4 },
  { name: 'Japanese Bobtail', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Korat', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'LaPerm', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Manx', type: 'cat', sizeClass: 'medium', riskScore: 3 },
  { name: 'Norwegian Forest Cat', type: 'cat', sizeClass: 'large', riskScore: 3 },
  { name: 'Ocicat', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Oriental', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Russian Blue', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Scottish Fold', type: 'cat', sizeClass: 'medium', riskScore: 4 },
  { name: 'Selkirk Rex', type: 'cat', sizeClass: 'medium', riskScore: 3 },
  { name: 'Somali', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Tonkinese', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Turkish Angora', type: 'cat', sizeClass: 'medium', riskScore: 2 },
  { name: 'Turkish Van', type: 'cat', sizeClass: 'large', riskScore: 2 },
]

export const breeds: BreedProfile[] = [...dogBreeds, ...catBreeds]

export const usStates = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
  'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
  'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
  'WI','WY',
]

export const providerPlans: ProviderPlan[] = [
  {
    key: 'pets-best',
    name: 'Pets Best',
    affiliateUrl: 'https://www.petsbest.com/',
    priceIndex: 1,
    coverageScore: 90,
    reputationScore: 84,
    deductibleOptions: '$50 to $1,000',
    reimbursementOptions: '70%, 80%, 90%',
    highlights: ['Strong coverage range', 'Flexible reimbursement tiers', 'Popular multi-pet fit'],
  },
  {
    key: 'lemonade',
    name: 'Lemonade Pet',
    affiliateUrl: 'https://www.lemonade.com/pet/',
    priceIndex: 0.9,
    coverageScore: 78,
    reputationScore: 80,
    deductibleOptions: '$100 to $750',
    reimbursementOptions: '70%, 80%, 90%',
    highlights: ['Budget-friendly profile', 'Fast online quote flow', 'Good for simple enrollment'],
  },
  {
    key: 'healthy-paws',
    name: 'Healthy Paws',
    affiliateUrl: 'https://www.healthypawspetinsurance.com/',
    priceIndex: 1.06,
    coverageScore: 86,
    reputationScore: 91,
    deductibleOptions: '$100 to $1,000',
    reimbursementOptions: '70%, 80%, 90%',
    highlights: ['Strong reputation signal', 'Consistent plan profile', 'Often favored for long-term continuity'],
  },
  {
    key: 'aspca',
    name: 'ASPCA Pet Insurance',
    affiliateUrl: 'https://www.aspcapetinsurance.com/',
    priceIndex: 1.02,
    coverageScore: 82,
    reputationScore: 83,
    deductibleOptions: '$100 to $500',
    reimbursementOptions: '70%, 80%, 90%',
    highlights: ['Balanced option set', 'Widely recognized brand', 'Solid baseline comparison pick'],
  },
  {
    key: 'embrace',
    name: 'Embrace Pet Insurance',
    affiliateUrl: 'https://www.embracepetinsurance.com/',
    priceIndex: 1.08,
    coverageScore: 89,
    reputationScore: 87,
    deductibleOptions: '$100 to $1,000',
    reimbursementOptions: '70%, 80%, 90%',
    highlights: ['Comprehensive coverage profile', 'Strong customization fit', 'High score on coverage weight'],
  },
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getPriorityWeights(priorities: Priority[]) {
  const base = { price: 0.34, coverage: 0.33, reputation: 0.33 }
  if (!priorities.length) return base

  const boost = priorities.length === 1 ? 0.24 : 0.18
  const decay = priorities.length === 1 ? 0.12 : 0.09

  const adjusted = {
    price: base.price,
    coverage: base.coverage,
    reputation: base.reputation,
  }

  priorities.forEach((priority) => {
    adjusted[priority] += boost
  })

  ;(['price', 'coverage', 'reputation'] as const).forEach((key) => {
    if (!priorities.includes(key)) adjusted[key] -= decay
  })

  const total = adjusted.price + adjusted.coverage + adjusted.reputation
  return {
    price: adjusted.price / total,
    coverage: adjusted.coverage / total,
    reputation: adjusted.reputation / total,
  }
}

export function findBreedByName(name: string) {
  return breeds.find((breed) => breed.name === name)
}

export function estimateMonthlyPremium(inputs: QuizInputs) {
  const breed = findBreedByName(inputs.breed)
  const sizeClass = breed?.sizeClass ?? 'medium'
  const riskScore = breed?.riskScore ?? 3

  const typeBase = inputs.petType === 'dog' ? 52 : inputs.petType === 'cat' ? 34 : 28
  const ageMultiplier = 1 + Math.max(inputs.age - 1, 0) * 0.05
  const riskMultiplier = 1 + (riskScore - 3) * 0.08
  const stateMultiplier = stateMultipliers[inputs.state] ?? 1
  const preExistingMultiplier = inputs.hasPreExistingCondition ? 1.15 : 1

  const base = typeBase
  const adjusted =
    base * sizeMultipliers[sizeClass] * ageMultiplier * riskMultiplier * stateMultiplier * preExistingMultiplier

  return {
    base,
    adjusted: Number(clamp(adjusted, 12, 900).toFixed(2)),
  }
}

export function getRecommendations(inputs: QuizInputs): Recommendation[] {
  const estimate = estimateMonthlyPremium(inputs)
  const weights = getPriorityWeights(inputs.priorities)

  const scored = providerPlans.map((provider) => {
    const premium = Number((estimate.adjusted * provider.priceIndex).toFixed(2))
    const normalizedPriceScore = clamp(100 - ((premium - 20) / 380) * 100, 0, 100)
    const priceScore = normalizedPriceScore
    const coverageScore = provider.coverageScore - (inputs.hasPreExistingCondition ? 3 : 0)
    const reputationScore = provider.reputationScore

    const matchScore =
      priceScore * weights.price + coverageScore * weights.coverage + reputationScore * weights.reputation

    return {
      provider,
      monthlyPremiumEstimate: premium,
      matchScore: Number(matchScore.toFixed(1)),
      premiumDetail: {
        base: estimate.base,
        adjusted: estimate.adjusted,
      },
    }
  })

  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4)
}
