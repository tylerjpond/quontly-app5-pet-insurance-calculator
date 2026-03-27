import { useMemo, useState, type ReactNode } from 'react'
import clsx from 'clsx'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { z } from 'zod'
import { affiliateCards, explainerSections, faqs, legalPageCopy, siteMeta } from './content/site'
import {
  breeds,
  getRecommendations,
  type PetType,
  type Priority,
  usStates,
} from './lib/petInsurance'

const inputSchema = z.object({
  petType: z.union([z.literal('dog'), z.literal('cat'), z.literal('other')]),
  breed: z.string().min(1, 'Select a breed.'),
  age: z.number().min(0, 'Age cannot be negative.').max(15, 'Age must be 15 years or below.'),
  state: z.string().min(2, 'Select a state.').max(2, 'Select a valid state abbreviation.'),
  priorities: z.array(z.union([z.literal('price'), z.literal('coverage'), z.literal('reputation')])).max(2, 'Select up to two priorities.'),
  hasPreExistingCondition: z.boolean(),
})

type QuizState = z.infer<typeof inputSchema>
type FieldErrors = Partial<Record<keyof QuizState, string>>

const steps = [
  'Pet type',
  'Breed',
  'Age',
  'Location',
  'Priority',
  'Pre-existing conditions',
] as const

const defaultState: QuizState = {
  petType: 'dog',
  breed: 'Labrador Retriever',
  age: 3,
  state: 'CA',
  priorities: ['coverage'],
  hasPreExistingCondition: false,
}

const scoreFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function collectErrors(error: z.ZodError<QuizState> | null): FieldErrors {
  if (!error) return {}

  const fieldErrors: FieldErrors = {}
  error.issues.forEach((issue) => {
    const path = issue.path[0]
    if (!path || fieldErrors[path as keyof QuizState]) return
    fieldErrors[path as keyof QuizState] = issue.message
  })
  return fieldErrors
}

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<LegalPage page={legalPageCopy.about} eyebrow="Methodology" />} />
        <Route path="/privacy" element={<LegalPage page={legalPageCopy.privacy} eyebrow="Privacy" />} />
        <Route path="/terms" element={<LegalPage page={legalPageCopy.terms} eyebrow="Terms" />} />
        <Route path="/disclosure" element={<LegalPage page={legalPageCopy.disclosure} eyebrow="Disclosure" />} />
      </Routes>
    </div>
  )
}

function HomePage() {
  const [inputs, setInputs] = useState<QuizState>(defaultState)
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [breedQuery, setBreedQuery] = useState('')
  const [scenarioAge, setScenarioAge] = useState(defaultState.age)

  const validation = useMemo(() => inputSchema.safeParse(inputs), [inputs])
  const fieldErrors = useMemo(() => collectErrors(validation.success ? null : validation.error), [validation])

  const availableBreeds = useMemo(() => {
    if (inputs.petType === 'other') return []
    return breeds.filter((breed) => breed.type === inputs.petType)
  }, [inputs.petType])

  const filteredBreeds = useMemo(() => {
    const q = breedQuery.trim().toLowerCase()
    if (!q) return availableBreeds
    return availableBreeds.filter((breed) => breed.name.toLowerCase().includes(q))
  }, [availableBreeds, breedQuery])

  const recommendations = useMemo(() => {
    if (!submitted || !validation.success) return []
    return getRecommendations(inputs)
  }, [inputs, submitted, validation])

  const chartData = useMemo(
    () => recommendations.map((item) => ({ provider: item.provider.name, premium: Math.round(item.monthlyPremiumEstimate), score: item.matchScore })),
    [recommendations],
  )

  const scenarioEstimate = useMemo(() => {
    if (!validation.success) return null
    const scenario = { ...inputs, age: scenarioAge }
    const [top] = getRecommendations(scenario)
    return top
  }, [inputs, scenarioAge, validation])

  const setStepField = <T extends keyof QuizState>(field: T, value: QuizState[T]) => {
    setInputs((current) => ({ ...current, [field]: value }))
  }

  const togglePriority = (priority: Priority) => {
    setInputs((current) => {
      const exists = current.priorities.includes(priority)
      if (exists) {
        return { ...current, priorities: current.priorities.filter((value) => value !== priority) }
      }

      if (current.priorities.length >= 2) return current
      return { ...current, priorities: [...current.priorities, priority] }
    })
  }

  const stepValid = () => {
    switch (currentStep) {
      case 1:
        return Boolean(inputs.petType)
      case 2:
        return inputs.petType === 'other' ? true : Boolean(inputs.breed)
      case 3:
        return inputs.age >= 0 && inputs.age <= 15
      case 4:
        return usStates.includes(inputs.state)
      case 5:
        return inputs.priorities.length > 0 && inputs.priorities.length <= 2
      case 6:
        return true
      default:
        return false
    }
  }

  const goNext = () => {
    if (!stepValid()) return
    setCurrentStep((step) => Math.min(step + 1, 6))
  }

  const goBack = () => setCurrentStep((step) => Math.max(step - 1, 1))

  const submitQuiz = () => {
    if (!validation.success) return
    setSubmitted(true)
    setCurrentStep(6)
  }

  return (
    <>
      <AppHeader />
      <main>
        <section className="relative isolate overflow-hidden border-b border-base-300 bg-[radial-gradient(circle_at_top_left,rgba(225,29,72,0.2),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(180deg,#fff7f8_0%,#f8fafc_60%,#fef2f2_100%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-6 lg:py-24">
            <div className="space-y-6">
              <div className="badge badge-outline border-primary/30 bg-white/65 px-4 py-3 text-primary">
                Pet Insurance Comparison Guide
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl">
                  Match pet insurance plans to your pet profile in minutes.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Compare coverage, reputation, and estimated monthly cost with a guided quiz for dogs and cats.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a className="btn btn-primary btn-lg" href="#calculator">
                  Start comparison quiz
                </a>
                <a className="btn btn-ghost btn-lg text-slate-700" href="#how-it-works">
                  See scoring details
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <TrustPoint label="Quiz steps" value="6-step flow" />
                <TrustPoint label="Compare plans" value="Top 4 ranked" />
                <TrustPoint label="Factors" value="Price + coverage + reputation" />
              </div>
            </div>

            <div className="card border border-primary/10 bg-white/90 shadow-xl shadow-primary/5">
              <div className="card-body gap-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Quick snapshot</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500">Current quiz status</p>
                    <p className="text-3xl font-semibold text-slate-900">Step {currentStep} of 6</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <SnapshotCard label="Pet" value={inputs.petType === 'other' ? 'Other' : `${inputs.petType.toUpperCase()} · ${inputs.breed || 'n/a'}`} />
                    <SnapshotCard label="Priority" value={inputs.priorities.length ? inputs.priorities.join(', ') : 'Select one'} />
                  </div>
                </div>
                <p className="rounded-box bg-base-200 p-4 text-sm leading-6 text-slate-600">
                  Educational comparison only. Confirm exclusions, waiting periods, and policy language directly with providers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {siteMeta.adsEnabled ? (
          <section className="border-b border-base-300 bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
              <AdSlot title="Sponsored" description="Relevant partner offers may appear here to support the free guide." />
            </div>
          </section>
        ) : null}

        <section id="calculator" className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <SectionHeading
            eyebrow="Calculator"
            title="Build your pet profile and rank matching plans"
            description="Complete each step to generate provider recommendations with estimated monthly premiums and score transparency."
          />

          <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)]">
            <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
              <ControlPanel
                eyebrow="Quiz flow"
                title={`Step ${currentStep}: ${steps[currentStep - 1]}`}
                description="Progress through each section. You can go back at any time without losing your inputs."
              >
                <div className="grid gap-2 sm:grid-cols-3">
                  {steps.map((label, index) => {
                    const stepNumber = index + 1
                    const active = stepNumber === currentStep
                    const complete = stepNumber < currentStep
                    return (
                      <div
                        key={label}
                        className={clsx(
                          'rounded-box border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] min-h-16 h-full flex items-center',
                          active && 'border-primary bg-primary/10 text-primary',
                          complete && 'border-success/30 bg-success/10 text-success',
                          !active && !complete && 'border-base-300 text-slate-500',
                        )}
                      >
                        {stepNumber}. {label}
                      </div>
                    )
                  })}
                </div>

                {currentStep === 1 ? (
                  <BinaryChoiceField<PetType>
                    label="Pet type"
                    hint="Choose your pet category"
                    value={inputs.petType}
                    options={[
                      { value: 'dog', label: 'Dog' },
                      { value: 'cat', label: 'Cat' },
                      { value: 'other', label: 'Other' },
                    ]}
                    onChange={(value) => {
                      setStepField('petType', value)
                      if (value === 'other') {
                        setStepField('breed', 'Other / Mixed')
                      } else {
                        const fallback = breeds.find((breed) => breed.type === value)?.name ?? ''
                        setStepField('breed', fallback)
                      }
                    }}
                  />
                ) : null}

                {currentStep === 2 ? (
                  <FieldCluster label="Breed" hint="Search and select a breed">
                    {inputs.petType === 'other' ? (
                      <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm text-slate-700">
                        Breed-level scoring is disabled for Other pets. The estimator will use a generalized baseline profile.
                      </div>
                    ) : (
                      <BreedField
                        query={breedQuery}
                        onQueryChange={setBreedQuery}
                        options={filteredBreeds.map((breed) => breed.name)}
                        value={inputs.breed}
                        onSelect={(value) => setStepField('breed', value)}
                        error={fieldErrors.breed}
                      />
                    )}
                  </FieldCluster>
                ) : null}

                {currentStep === 3 ? (
                  <SliderNumberField
                    label="Pet age"
                    hint="Years"
                    min={0}
                    max={15}
                    step={1}
                    suffix="yrs"
                    value={inputs.age}
                    error={fieldErrors.age}
                    onChange={(value) => setStepField('age', value)}
                  />
                ) : null}

                {currentStep === 4 ? (
                  <FieldCluster label="State" hint="Two-letter abbreviation">
                    <select
                      className={clsx('select select-bordered w-full', fieldErrors.state && 'select-error')}
                      value={inputs.state}
                      onChange={(event) => setStepField('state', event.target.value)}
                    >
                      {usStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.state ? <p className="text-sm text-error">{fieldErrors.state}</p> : null}
                  </FieldCluster>
                ) : null}

                {currentStep === 5 ? (
                  <PriorityField priorities={inputs.priorities} onToggle={togglePriority} error={fieldErrors.priorities} />
                ) : null}

                {currentStep === 6 ? (
                  <BinaryChoiceField<'yes' | 'no'>
                    label="Pre-existing conditions"
                    hint="Impacts estimate and provider fit"
                    value={inputs.hasPreExistingCondition ? 'yes' : 'no'}
                    options={[
                      { value: 'no', label: 'No' },
                      { value: 'yes', label: 'Yes' },
                    ]}
                    onChange={(value) => setStepField('hasPreExistingCondition', value === 'yes')}
                  />
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-base-300 pt-4">
                  <button className="btn btn-ghost" type="button" onClick={goBack} disabled={currentStep === 1}>
                    Previous
                  </button>
                  <div className="flex gap-2">
                    {currentStep < 6 ? (
                      <button className="btn btn-primary" type="button" onClick={goNext}>
                        Next step
                      </button>
                    ) : (
                      <button className="btn btn-primary" type="button" onClick={submitQuiz}>
                        Show recommendations
                      </button>
                    )}
                  </div>
                </div>
              </ControlPanel>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  tone="primary"
                  label="Top match score"
                  value={recommendations[0] ? `${scoreFormatter.format(recommendations[0].matchScore)} / 100` : 'Pending'}
                  detail={recommendations[0] ? recommendations[0].provider.name : 'Complete all steps and submit.'}
                />
                <ResultCard
                  label="Estimated monthly"
                  value={recommendations[0] ? currencyFormatter.format(recommendations[0].monthlyPremiumEstimate) : '$0'}
                  detail={recommendations[0] ? `${inputs.state} · ${inputs.age} yrs` : 'Profile required'}
                />
                <ResultCard
                  label="Priority weighting"
                  value={inputs.priorities.length ? inputs.priorities.join(' + ') : 'Not set'}
                  detail="Choose up to two priorities"
                />
                <ResultCard
                  label="Compared providers"
                  value={`${recommendations.length || 0}`}
                  detail="Top ranked results shown"
                />
              </div>

              <div className="card overflow-hidden border border-base-300 bg-base-100 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)]">
                <div className="card-body gap-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Comparison table</p>
                      <h2 className="text-2xl font-semibold text-slate-900">Top plan matches</h2>
                    </div>
                  </div>

                  {recommendations.length ? (
                    <div className="overflow-x-auto">
                      <table className="table table-zebra table-sm">
                        <thead>
                          <tr>
                            <th>Provider</th>
                            <th>Monthly</th>
                            <th>Deductible</th>
                            <th>Reimbursement</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recommendations.map((row) => (
                            <tr key={row.provider.key}>
                              <td>
                                <a className="link link-primary" href={row.provider.affiliateUrl} target="_blank" rel="noreferrer">
                                  {row.provider.name}
                                </a>
                              </td>
                              <td>{currencyFormatter.format(row.monthlyPremiumEstimate)}</td>
                              <td>{row.provider.deductibleOptions}</td>
                              <td>{row.provider.reimbursementOptions}</td>
                              <td>{scoreFormatter.format(row.matchScore)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="rounded-box border border-dashed border-base-300 bg-base-200/70 p-4 text-sm text-slate-600">
                      Recommendations will appear after you complete and submit the quiz.
                    </div>
                  )}

                  <div className="space-y-3 rounded-box bg-base-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">Cost estimator widget</p>
                      <span className="text-sm text-slate-600">Age scenario: {scenarioAge} yrs</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      step={1}
                      value={scenarioAge}
                      onChange={(event) => setScenarioAge(Number(event.target.value))}
                      className="range range-primary"
                    />
                    <p className="text-sm text-slate-700">
                      {scenarioEstimate
                        ? `Projected top-match premium at ${scenarioAge} years: ${currencyFormatter.format(scenarioEstimate.monthlyPremiumEstimate)} / month`
                        : 'Complete the quiz to test age scenarios.'}
                    </p>
                  </div>

                  {chartData.length ? (
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="provider" tick={{ fontSize: 12 }} />
                          <YAxis yAxisId="left" tickFormatter={(value) => `$${value}`} />
                          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="premium" fill="#e11d48" name="Monthly premium" />
                          <Bar yAxisId="right" dataKey="score" fill="#0ea5e9" name="Match score" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {siteMeta.adsEnabled ? (
          <section className="border-y border-base-300 bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
              <AdSlot title="Sponsored" description="Additional partner offers may appear here." />
            </div>
          </section>
        ) : null}

        <section id="offers" className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <SectionHeading
            eyebrow="Affiliate offers"
            title="Provider and quote links"
            description="These links support operation of this free tool. Recommendation scoring is independent of affiliate relationships."
          />
          <div className="alert mt-8 border border-primary/15 bg-primary/5 text-sm text-slate-700">
            <span>{siteMeta.disclosure}</span>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {affiliateCards.map((card) => (
              <article key={card.title} className="card border border-base-300 bg-base-100 shadow-sm">
                <div className="card-body gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
                      <p className="mt-1 text-sm text-slate-500">{card.disclosureTag}</p>
                    </div>
                    <span className="badge badge-primary badge-outline">{card.badge}</span>
                  </div>
                  <p className="leading-7 text-slate-600">{card.description}</p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {card.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions mt-auto justify-between">
                    <a className="btn btn-primary" href={card.href} target="_blank" rel="noreferrer">
                      {card.ctaLabel}
                    </a>
                    <span className="text-xs text-slate-500">FTC disclosure applies</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-t border-base-300 bg-base-200/50">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
            <SectionHeading
              eyebrow="Guide"
              title="How this pet insurance comparison guide works"
              description="Understand the assumptions behind ranking and premium estimation before selecting a provider."
            />

            <div className="mt-10 grid gap-6 xl:grid-cols-3">
              {explainerSections.map((section) => (
                <article key={section.title} className="card border border-base-300 bg-base-100 shadow-sm">
                  <div className="card-body gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{section.eyebrow}</p>
                    <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
                    <div className="space-y-4 leading-7 text-slate-600">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="collapse-arrow collapse border border-base-300 bg-base-100">
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-semibold text-slate-900">{faq.question}</div>
                  <div className="collapse-content leading-7 text-slate-600">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </>
  )
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/85 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4 lg:px-6">
        <div className="navbar-start gap-3">
          <a href="/" className="flex items-center gap-3 text-slate-900">
            <span className="grid h-11 w-11 place-items-center rounded-box bg-primary text-lg font-bold text-primary-content">PI</span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">QUONTLY</p>
              <p className="text-lg font-semibold text-slate-900">
                Pet Insurance <span className="font-mono italic text-primary">Guide</span>
              </p>
            </div>
          </a>
        </div>
        <div className="navbar-end hidden gap-2 lg:flex">
          <HeaderLink to="/">Calculator</HeaderLink>
          <HeaderLink to="/about">About</HeaderLink>
          <HeaderLink to="/privacy">Privacy</HeaderLink>
          <HeaderLink to="/terms">Terms</HeaderLink>
          <HeaderLink to="/disclosure">Disclosure</HeaderLink>
          <a className="btn btn-primary ml-2" href="#calculator">
            Start now
          </a>
        </div>
      </div>
    </header>
  )
}

function HeaderLink({ to, children }: { to: string; children: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => clsx('btn btn-ghost text-sm font-medium', isActive && 'bg-primary/10 text-primary')}>
      {children}
    </NavLink>
  )
}

function AppFooter() {
  return (
    <footer className="border-t border-base-300 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">Pet Insurance Comparison Guide</p>
          <p className="max-w-2xl leading-7 text-slate-300">
            Educational estimate only. This tool helps compare plan fit but is not insurance, legal, or veterinary advice.
          </p>
          <p className="text-sm text-slate-400">{siteMeta.disclosure}</p>
        </div>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <NavLink className="link link-hover" to="/about">
            About & methodology
          </NavLink>
          <NavLink className="link link-hover" to="/privacy">
            Privacy policy
          </NavLink>
          <NavLink className="link link-hover" to="/terms">
            Terms of use
          </NavLink>
          <NavLink className="link link-hover" to="/disclosure">
            Affiliate disclosure
          </NavLink>
        </div>
      </div>
    </footer>
  )
}

function LegalPage({
  eyebrow,
  page,
}: {
  eyebrow: string
  page: (typeof legalPageCopy)[keyof typeof legalPageCopy]
}) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-16 lg:px-6">
        <SectionHeading eyebrow={eyebrow} title={page.title} description={page.description} />
        <div className="mt-10 grid gap-6">
          {page.sections.map((section) => (
            <article key={section.heading} className="card border border-base-300 bg-base-100 shadow-sm">
              <div className="card-body gap-4">
                <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
                <div className="space-y-4 leading-7 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <AppFooter />
    </>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{title}</h2>
      <p className="text-lg leading-8 text-slate-600">{description}</p>
    </div>
  )
}

function AdSlot({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-28 items-center justify-center rounded-box border border-dashed border-base-300 bg-base-200/70 p-6 text-center">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function TrustPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-box border border-white/60 bg-white/75 p-4 shadow-sm backdrop-blur">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function SnapshotCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 min-w-0 break-words text-[clamp(1.15rem,2.2vw,1.55rem)] font-semibold leading-tight tracking-tight text-slate-900">{value}</p>
    </div>
  )
}

function ResultCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string
  value: string
  detail: string
  tone?: 'primary'
}) {
  return (
    <article
      className={clsx(
        'card overflow-hidden border border-base-300 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_16px_40px_-32px_rgba(15,23,42,0.45)]',
        tone === 'primary' && 'border-primary/20 bg-[linear-gradient(180deg,rgba(225,29,72,0.12)_0%,rgba(255,255,255,0.98)_100%)]',
      )}
    >
      <div className="card-body relative gap-2">
        <span className={clsx('absolute inset-x-0 top-0 h-1 bg-base-300/60', tone === 'primary' && 'bg-primary/70')} aria-hidden="true" />
        <p className="pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <p className="min-w-0 break-words text-[clamp(1.2rem,2.1vw,2rem)] font-semibold leading-tight tracking-tight text-slate-900">{value}</p>
        <p className="text-sm leading-6 text-slate-600">{detail}</p>
      </div>
    </article>
  )
}

function ControlPanel({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="relative overflow-hidden rounded-[1.35rem] border border-base-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.96)_100%)] p-5 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.38)] ring-1 ring-white/70 md:p-6">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/6 blur-2xl" aria-hidden="true" />
      <div className="relative space-y-2 border-b border-base-300/80 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.7rem]">{title}</h3>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <div className="relative mt-5 space-y-6">{children}</div>
    </section>
  )
}

function FieldCluster({
  label,
  hint,
  children,
}: {
  label: string
  hint: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="label-text font-semibold text-slate-800">{label}</span>
        <span className="text-xs text-slate-500">{hint}</span>
      </div>
      {children}
    </div>
  )
}

function SliderNumberField({
  label,
  hint,
  min,
  max,
  step,
  suffix,
  value,
  error,
  onChange,
}: {
  label: string
  hint: string
  min: number
  max: number
  step: number
  suffix?: string
  value: number
  error?: string
  onChange: (value: number) => void
}) {
  return (
    <FieldCluster label={label} hint={hint}>
      <div className="grid gap-3 sm:grid-cols-[1fr_148px]">
        <input
          type="range"
          className="range range-primary"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <label className={clsx('input input-bordered flex items-center gap-2', error && 'input-error')}>
          <input
            type="number"
            className="w-full"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
          />
          {suffix ? <span className="text-xs text-slate-500">{suffix}</span> : null}
        </label>
      </div>
      {error ? <p className="text-sm text-error">{error}</p> : null}
    </FieldCluster>
  )
}

interface ChoiceFieldProps<T extends string> {
  label: string
  hint: string
  value: T
  options: Array<{ value: T; label: string }>
  onChange: (value: T) => void
}

function BinaryChoiceField<T extends string>(props: ChoiceFieldProps<T>) {
  return <ChoiceField {...props} columns="3" />
}

function ChoiceField<T extends string>({
  label,
  hint,
  value,
  options,
  onChange,
  columns,
}: ChoiceFieldProps<T> & { columns: '3' }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="label-text font-semibold text-slate-800">{label}</span>
        <span className="text-xs text-slate-500">{hint}</span>
      </div>
      <div className={clsx('grid gap-2', columns === '3' && 'grid-cols-1 sm:grid-cols-3')}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={clsx(
              'btn h-auto min-h-0 w-full rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold normal-case shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 justify-between',
              value === option.value ? 'border-primary bg-primary text-primary-content hover:bg-primary' : 'border-base-300 bg-base-100 text-slate-700',
            )}
            onClick={() => onChange(option.value)}
          >
            <span>{option.label}</span>
            <span
              className={clsx(
                'grid h-5 w-5 place-items-center rounded-full border text-[10px] font-bold shadow-sm',
                value === option.value
                  ? 'border-white/60 bg-white/20 text-white'
                  : 'border-primary/25 bg-primary/5 text-primary',
              )}
            >
              {value === option.value ? '✓' : ''}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function BreedField({
  query,
  onQueryChange,
  options,
  value,
  onSelect,
  error,
}: {
  query: string
  onQueryChange: (value: string) => void
  options: string[]
  value: string
  onSelect: (value: string) => void
  error?: string
}) {
  return (
    <div className="space-y-3">
      <label className={clsx('input input-bordered flex items-center gap-2', error && 'input-error')}>
        <span className="text-xs uppercase tracking-[0.12em] text-slate-500">Search</span>
        <input
          type="text"
          className="w-full"
          placeholder="Type breed name..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
      <select className={clsx('select select-bordered w-full', error && 'select-error')} value={value} onChange={(event) => onSelect(event.target.value)}>
        {options.slice(0, 100).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {options.length > 100 ? <p className="text-xs text-slate-500">Showing first 100 matches. Narrow your search for faster selection.</p> : null}
      {error ? <p className="text-sm text-error">{error}</p> : null}
    </div>
  )
}

function PriorityField({
  priorities,
  onToggle,
  error,
}: {
  priorities: Priority[]
  onToggle: (value: Priority) => void
  error?: string
}) {
  const options: Array<{ value: Priority; label: string; hint: string }> = [
    { value: 'price', label: 'Price', hint: 'Lower monthly premium' },
    { value: 'coverage', label: 'Coverage', hint: 'Broader policy fit' },
    { value: 'reputation', label: 'Reputation', hint: 'Provider track record' },
  ]

  return (
    <FieldCluster label="What matters most" hint="Select up to two">
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const active = priorities.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(option.value)}
              className={clsx(
                'rounded-2xl border-2 p-4 text-left transition duration-200 hover:-translate-y-0.5',
                active
                  ? 'border-primary bg-primary text-primary-content shadow-sm'
                  : 'border-base-300 bg-base-100 text-slate-700 hover:border-primary/40 hover:bg-primary/5',
              )}
            >
              <p className="font-semibold">{option.label}</p>
              <p className={clsx('mt-1 text-xs', active ? 'text-primary-content/80' : 'text-slate-500')}>{option.hint}</p>
            </button>
          )
        })}
      </div>
      <p className="text-xs text-slate-500">Selected: {priorities.length ? priorities.join(', ') : 'none'}</p>
      {error ? <p className="text-sm text-error">{error}</p> : null}
    </FieldCluster>
  )
}

export default App
