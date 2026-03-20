const countryMeta = {
  TH: { name: "Thailand", color: "#1e2435" },
  ID: { name: "Indonesia", color: "#ab2c27" },
  KR: { name: "South Korea", color: "#1a6f6d" },
  MY: { name: "Malaysia", color: "#6b7248" },
}

const rawSeries = {
  TH: {
    1995: { gdp: 8.1203, inflation: 5.8182, unemployment: 1.1, currentAccount: -8.0233, fxRate: 24.9152 },
    1996: { gdp: 5.6519, inflation: 5.8051, unemployment: 1.071, currentAccount: -8.0266, fxRate: 25.3427 },
    1997: { gdp: -2.7536, inflation: 5.6258, unemployment: 0.873, currentAccount: -2.0116, fxRate: 31.3643 },
    1998: { gdp: -7.634, inflation: 7.9947, unemployment: 3.404, currentAccount: 12.529, fxRate: 41.3594 },
    1999: { gdp: 4.5723, inflation: 0.2847, unemployment: 2.968, currentAccount: 9.8113, fxRate: 37.8137 },
    2000: { gdp: 4.4552, inflation: 1.592, unemployment: 2.389, currentAccount: 7.3685, fxRate: 40.1118 },
  },
  ID: {
    1995: { gdp: 8.22, inflation: 9.4203, unemployment: 4.611, currentAccount: -3.1816, fxRate: 2248.608 },
    1996: { gdp: 7.8182, inflation: 7.9733, unemployment: 4.861, currentAccount: -3.3703, fxRate: 2342.2963 },
    1997: { gdp: 4.6999, inflation: 6.2262, unemployment: 4.684, currentAccount: -2.2661, fxRate: 2909.38 },
    1998: { gdp: -13.1267, inflation: 58.451, unemployment: 5.459, currentAccount: 4.2925, fxRate: 10013.6225 },
    1999: { gdp: 0.7911, inflation: 20.4778, unemployment: 6.358, currentAccount: 4.1306, fxRate: 7855.15 },
    2000: { gdp: 4.9201, inflation: 3.6886, unemployment: 6.077, currentAccount: 4.8431, fxRate: 8421.775 },
  },
  KR: {
    1995: { gdp: 9.7359, inflation: 4.4807, unemployment: 2.063, currentAccount: -1.7448, fxRate: 771.2542 },
    1996: { gdp: 7.9904, inflation: 4.9245, unemployment: 2.048, currentAccount: -3.8754, fxRate: 804.4575 },
    1997: { gdp: 6.2822, inflation: 4.4389, unemployment: 2.608, currentAccount: -1.8349, fxRate: 949.89 },
    1998: { gdp: -4.9389, inflation: 7.5136, unemployment: 6.963, currentAccount: 10.0964, fxRate: 1403.1833 },
    1999: { gdp: 11.6173, inflation: 0.813, unemployment: 6.342, currentAccount: 4.2243, fxRate: 1189.4392 },
    2000: { gdp: 9.2019, inflation: 2.2592, unemployment: 4.063, currentAccount: 1.7039, fxRate: 1130.3625 },
  },
  MY: {
    1995: { gdp: 9.8291, inflation: 3.4506, unemployment: 3.15, currentAccount: -9.7441, fxRate: 2.5044 },
    1996: { gdp: 10.0027, inflation: 3.4886, unemployment: 2.52, currentAccount: -4.4241, fxRate: 2.5159 },
    1997: { gdp: 7.3227, inflation: 2.6625, unemployment: 2.45, currentAccount: -5.9349, fxRate: 2.8132 },
    1998: { gdp: -7.3594, inflation: 5.2703, unemployment: 3.2, currentAccount: 13.2035, fxRate: 3.9244 },
    1999: { gdp: 6.1376, inflation: 2.7446, unemployment: 3.43, currentAccount: 15.9241, fxRate: 3.8 },
    2000: { gdp: 8.8589, inflation: 1.5347, unemployment: 3, currentAccount: 9.0499, fxRate: 3.8 },
  },
}

const years = [1995, 1996, 1997, 1998, 1999, 2000]
const countryCodes = Object.keys(countryMeta)

for (const code of countryCodes) {
  const base = rawSeries[code][1996].fxRate
  for (const year of years) {
    rawSeries[code][year].fxIndex = (rawSeries[code][year].fxRate / base) * 100
  }
}

const metrics = {
  gdp: {
    label: "GDP Growth",
    shortLabel: "GDP",
    suffix: "%",
    description: "Real GDP growth, annual percent change (World Bank).",
    note: "Indonesia’s output shock in 1998 is the starkest contraction in the data.",
  },
  inflation: {
    label: "Inflation",
    shortLabel: "Inflation",
    suffix: "%",
    description: "Consumer prices, annual percent change (World Bank).",
    note: "Inflation pressure was uneven across the region and exploded in Indonesia.",
  },
  unemployment: {
    label: "Unemployment",
    shortLabel: "Unemployment",
    suffix: "%",
    description: "Total unemployment as a share of the labor force (World Bank).",
    note: "Labor-market stress lags the financial shock, then rises fast once credit collapses.",
  },
  currentAccount: {
    label: "Current Account",
    shortLabel: "Current account",
    suffix: "% of GDP",
    description: "Current-account balance as a share of GDP (World Bank).",
    note: "Deficits swung into surpluses as domestic demand collapsed and external adjustment was forced through.",
  },
  fxIndex: {
    label: "Exchange-Rate Pressure",
    shortLabel: "FX pressure",
    suffix: " index",
    description: "Official exchange rate indexed to 1996 = 100 (World Bank). Higher means stronger depreciation against the US dollar.",
    note: "Indexing the exchange rate lets very different currencies be compared on the same graph.",
  },
}

const faults = [
  {
    id: "mismatch",
    kicker: "Structural weakness 01",
    title: "Double mismatch",
    summary:
      "Banks borrowed short in US dollars and lent long in local currency, leaving them exposed to both maturity risk and exchange-rate risk.",
    paragraphs: [
      "This sits at the center of your report. Once local currencies weakened, dollar liabilities became harder to service, even before projects had time to generate cash flow.",
      "The setup made balance sheets look stable only while pegs held and capital kept rolling over.",
    ],
    chips: [
      { label: "Why it mattered", value: "Currency depreciation inflated debt burdens immediately" },
      { label: "Report link", value: "Yoshitomi and Ohno (1999)" },
      { label: "Hidden risk", value: "Short-term funding backed long-duration local assets" },
      { label: "Result", value: "Banks and firms faced solvency pressure at the same time" },
    ],
  },
  {
    id: "pegs",
    kicker: "Structural weakness 02",
    title: "Dollar pegs that looked credible until they did not",
    summary:
      "Exchange rates tied to the US dollar reduced perceived risk, but made external competitiveness worse as the dollar appreciated in the mid-1990s.",
    paragraphs: [
      "IMF staff highlighted the prolonged maintenance of pegged exchange rates as a contributor to overheating and excessive foreign-currency exposure.",
      "When reserves ran down, the adjustment happened abruptly rather than gradually.",
    ],
    chips: [
      { label: "Why it mattered", value: "Pegs encouraged external borrowing and delayed adjustment" },
      { label: "Outside fact", value: "Thailand dropped the baht peg on July 2, 1997" },
      { label: "Report link", value: "Export slowdowns widened current-account stress" },
      { label: "Result", value: "Devaluations turned funding stress into a regional confidence shock" },
    ],
  },
  {
    id: "governance",
    kicker: "Structural weakness 03",
    title: "Weak governance and poor financial oversight",
    summary:
      "Crony lending, weak supervision, and moral hazard meant funds were directed into risky projects and fragile banks rather than durable productive investment.",
    paragraphs: [
      "IMF and OECD analyses both point to enforcement failures: prudential rules existed in form, but not in disciplined practice.",
      "Once markets questioned asset quality, creditor confidence disappeared quickly.",
    ],
    chips: [
      { label: "Why it mattered", value: "Bad loans and weak transparency undermined confidence" },
      { label: "Report link", value: "Moral hazard and crony capitalism are central to your explanation" },
      { label: "Outside fact", value: "IMF stressed governance, accountability, and transparency in recovery programs" },
      { label: "Result", value: "Crisis response had to fix institutions, not just currencies" },
    ],
  },
]

const timelineEvents = [
  {
    id: "1996",
    date: "1996",
    title: "Thailand’s property boom begins to crack",
    summary:
      "The report identifies 1996 as the point when Thailand’s property bubble started to burst under rising credit defaults.",
    bullets: [
      "Asset prices weakened before the full regional panic was obvious.",
      "Bank and finance-company vulnerabilities were already building.",
      "Growth was still strong enough to disguise how exposed balance sheets had become.",
    ],
    pills: ["Thailand", "Credit defaults", "Property sector"],
  },
  {
    id: "early-1997",
    date: "Early 1997",
    title: "Confidence fades and capital starts to leave",
    summary:
      "Investor sentiment deteriorated as current-account deficits, export slowdowns, and fragile funding structures became harder to ignore.",
    bullets: [
      "Capital inflows reversed and rollover risk increased.",
      "Pressure on central-bank reserves mounted.",
      "Markets started testing fixed or tightly managed exchange rates.",
    ],
    pills: ["Capital flight", "Reserve pressure", "Investor confidence"],
  },
  {
    id: "july-1997",
    date: "2 Jul 1997",
    title: "Thailand drops the baht peg",
    summary:
      "IMF analysis from the 20th-anniversary review marks July 2, 1997 as the start of the crisis, when Thailand abandoned the baht’s peg to the US dollar.",
    bullets: [
      "The move exposed regional foreign-currency borrowing to abrupt repricing.",
      "Contagion spread quickly to Indonesia, South Korea, Malaysia, and the Philippines.",
      "What had looked like isolated weakness now looked systemic.",
    ],
    pills: ["Thailand", "Baht devaluation", "Regional contagion"],
  },
  {
    id: "late-1997",
    date: "Late 1997",
    title: "IMF programs arrive as the crisis deepens",
    summary:
      "Indonesia, South Korea, and Thailand received IMF-backed support packages as exchange rates, stocks, and confidence deteriorated.",
    bullets: [
      "IMF staff reported $36 billion in IMF financing inside broader packages totaling almost $100 billion.",
      "Programs combined tight monetary policy, fiscal adjustment, bank restructuring, and institutional reform.",
      "The near-term effect was stabilisation at the cost of deeper pain for households and firms.",
    ],
    pills: ["IMF", "$36bn", "Rate hikes"],
  },
  {
    id: "sept-1998",
    date: "1 Sep 1998",
    title: "Malaysia imposes capital controls and pegs the ringgit",
    summary:
      "Malaysia rejected the standard IMF route. IMF country-report material notes that it introduced broad capital controls and pegged the exchange rate at RM 3.8 per US dollar.",
    bullets: [
      "This gave Malaysia room to cut rates and support domestic activity.",
      "The approach remains one of the most debated policy divergences of the crisis.",
      "It also made Malaysia a useful comparison case in your report.",
    ],
    pills: ["Malaysia", "Capital controls", "RM 3.8 peg"],
  },
  {
    id: "1999-2000",
    date: "1999-2000",
    title: "Recovery arrives, but the policy framework changes for good",
    summary:
      "Growth rebounded sharply in several countries, but the post-crisis settlement was different: more flexible exchange rates, tighter supervision, and lower tolerance for external balance-sheet mismatches.",
    bullets: [
      "South Korea returned to double-digit growth in 1999.",
      "Malaysia and Thailand also rebounded after deep 1998 contractions.",
      "IMF’s later assessment credits reforms in exchange-rate flexibility, regulation, and external resilience.",
    ],
    pills: ["Recovery", "Reform", "Resilience"],
  },
]

const responseModes = [
  {
    id: "imf",
    title: "IMF-backed stabilisation",
    summary:
      "Thailand, Indonesia, and South Korea took IMF-supported programs aimed at restoring confidence, stabilising currencies, and restructuring weak financial systems.",
    paragraphs: [
      "This matches your report closely: rates were raised, fiscal policy tightened at first, failed institutions were closed or restructured, and financial-sector rules were strengthened.",
      "The political and social criticism was that these programs intensified the recession before recovery set in. IMF’s later retrospective acknowledges that fiscal policy was eased after the downturn proved more severe than first expected.",
    ],
    chips: [
      { label: "IMF financing", value: "$36bn inside packages approaching $100bn" },
      { label: "Core tools", value: "Interest-rate hikes, fiscal adjustment, bank repair" },
      { label: "Short-run cost", value: "Higher unemployment, business failures, sharper recession" },
      { label: "Longer-run aim", value: "Restore confidence and rebuild financial credibility" },
    ],
  },
  {
    id: "malaysia",
    title: "Malaysia’s alternative path",
    summary:
      "Malaysia avoided an IMF program and instead used capital controls, a fixed exchange rate, and lower borrowing costs to regain policy control.",
    paragraphs: [
      "IMF country-report material records the key move clearly: on September 1, 1998, Malaysia introduced broad capital controls and pegged the ringgit at RM 3.8 per US dollar.",
      "That choice remains controversial, but it gave Malaysia more room to cushion the downturn domestically. In the World Bank data used here, GDP moves from -7.36 percent in 1998 to +6.14 percent in 1999.",
    ],
    chips: [
      { label: "Policy break", value: "Capital controls plus exchange-rate peg" },
      { label: "Exchange rate", value: "RM 3.8 per US dollar" },
      { label: "1998 to 1999 GDP", value: "-7.36% to +6.14%" },
      { label: "Trade-off", value: "More autonomy, but with credibility and market-access questions" },
    ],
  },
  {
    id: "legacy",
    title: "What changed after the crisis",
    summary:
      "The crisis did not just produce a cyclical rebound. It reshaped the way Asian economies thought about exchange rates, regulation, and self-insurance against capital-flow reversals.",
    paragraphs: [
      "IMF’s 2017 retrospective argues that many countries adopted more flexible exchange rates, reduced external vulnerabilities, overhauled supervision, resolved private-sector debt overhangs, and developed domestic capital markets.",
      "That is why the 1997-1998 crisis still matters in a financial-markets course: it changed the framework, not only the numbers.",
    ],
    chips: [
      { label: "Exchange rates", value: "More flexible regimes after 1997-1998" },
      { label: "Finance", value: "Tighter regulation and stronger supervision" },
      { label: "External buffers", value: "Lower external vulnerability and stronger defenses" },
      { label: "Long-run lesson", value: "Resilience requires institutions, not just growth" },
    ],
  },
]

const contagionStates = [
  {
    id: "thailand",
    title: "Thailand: the trigger point",
    summary:
      "This is where the crisis clearly breaks in your report. Thailand ran down its reserves, dropped the baht peg in July 1997, and turned a slow-building vulnerability into a visible regional panic.",
    meta: ["2 Jul 1997", "Baht devaluation", "Reserve exhaustion"],
  },
  {
    id: "philippines",
    title: "Philippines: early regional pressure",
    summary:
      "The Philippines appears in your report as part of the early chain reaction. It matters here as evidence that once confidence broke, investors no longer treated the region as a set of isolated cases.",
    meta: ["Early spillover", "Currency pressure", "Confidence shock"],
  },
  {
    id: "malaysia",
    title: "Malaysia: contagion plus policy divergence",
    summary:
      "Malaysia was hit by the regional sell-off, but it later became important for a second reason: it chose capital controls and a fixed ringgit rate instead of the standard IMF route, making it the key comparison case in your responses section.",
    meta: ["Regional spillover", "Capital controls", "RM 3.8 peg"],
  },
  {
    id: "indonesia",
    title: "Indonesia: the deepest collapse",
    summary:
      "Indonesia shows how severe the crisis could become once currency weakness, debt stress, and institutional fragility fed into each other. In your data, real GDP falls by 13.13 percent in 1998, the sharpest contraction in the dashboard.",
    meta: ["GDP 1998: -13.13%", "Political crisis", "Institutional fragility"],
  },
  {
    id: "korea",
    title: "South Korea: a systemic financing shock",
    summary:
      "South Korea’s case makes clear that this was not just a Southeast Asian currency story. Heavy short-term external borrowing left the economy exposed to a full financing crisis, which is why Korea became central to the IMF program phase of the story.",
    meta: ["Short-term debt", "IMF program", "1998 GDP: -4.94%"],
  },
]

const faultCardsEl = document.querySelector("#faultCards")
const faultPanelEl = document.querySelector("#faultPanel")
const timelineRailEl = document.querySelector("#timelineRail")
const timelinePanelEl = document.querySelector("#timelinePanel")
const metricButtonsEl = document.querySelector("#metricButtons")
const yearSliderEl = document.querySelector("#yearSlider")
const yearValueEl = document.querySelector("#yearValue")
const countryLegendEl = document.querySelector("#countryLegend")
const snapshotGridEl = document.querySelector("#snapshotGrid")
const chartNoteEl = document.querySelector("#chartNote")
const responseModesEl = document.querySelector("#responseModes")
const responsePanelEl = document.querySelector("#responsePanel")
const chartSvg = document.querySelector("#impactChart")
const tooltipEl = document.querySelector("#chartTooltip")
const chartPanelEl = document.querySelector(".chart-panel")
const metricWallEl = document.querySelector("#metricWall")
const yearCompareChartEl = document.querySelector("#yearCompareChart")
const yearCompareRankingEl = document.querySelector("#yearCompareRanking")
const yearCompareNoteEl = document.querySelector("#yearCompareNote")
const countryProfileButtonsEl = document.querySelector("#countryProfileButtons")
const countryProfileHeadEl = document.querySelector("#countryProfileHead")
const countryMetricWallEl = document.querySelector("#countryMetricWall")
const heatmapGridEl = document.querySelector("#heatmapGrid")
const heatmapLegendEl = document.querySelector("#heatmapLegend")
const heatmapNoteEl = document.querySelector("#heatmapNote")
const contagionTrackEl = document.querySelector("#contagionTrack")
const contagionPanelEl = document.querySelector("#contagionPanel")

let selectedFault = faults[0].id
let selectedTimeline = timelineEvents[2].id
let selectedMetric = "gdp"
let selectedYear = 1998
let selectedResponse = "imf"
let selectedProfileCountry = "TH"
let selectedContagion = "thailand"
const activeCountries = new Set(countryCodes)

function formatValue(metricKey, value) {
  if (metricKey === "fxIndex") return `${value.toFixed(0)}`
  if (metricKey === "currentAccount") return `${value.toFixed(1)}`
  if (Math.abs(value) >= 10) return `${value.toFixed(1)}`
  return `${value.toFixed(2)}`
}

function displayMetricValue(metricKey, value) {
  const formatted = formatValue(metricKey, value)
  if (metricKey === "fxIndex") return `${formatted} index`
  if (metricKey === "currentAccount") return `${formatted}% of GDP`
  return `${formatted}%`
}

function signedDisplay(metricKey, value) {
  if (value > 0) return `+${displayMetricValue(metricKey, value)}`
  return displayMetricValue(metricKey, value)
}

function compactMetricValue(metricKey, value) {
  const formatted = formatValue(metricKey, value)
  if (metricKey === "fxIndex") return `${formatted} idx`
  if (metricKey === "currentAccount") return `${formatted}%`
  return `${formatted}%`
}

function heatmapSubLabel(metricKey, code, year) {
  if (metricKey === "fxIndex") {
    if (year === 1996) return "1996 base"
    const change = rawSeries[code][year][metricKey] - 100
    return `${change >= 0 ? "+" : ""}${formatValue(metricKey, change)} vs 1996`
  }

  if (year === years[0]) return "start year"
  const previous = rawSeries[code][year - 1][metricKey]
  const delta = rawSeries[code][year][metricKey] - previous
  return `${delta >= 0 ? "+" : ""}${formatValue(metricKey, delta)} vs ${year - 1}`
}

function createSvgNode(name, attrs = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name)
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value)
  return node
}

function getMetricValues(metricKey, codes = countryCodes) {
  return codes.flatMap(code => years.map(year => rawSeries[code][year][metricKey]))
}

function getMetricDomain(metricKey, codes = countryCodes) {
  const values = getMetricValues(metricKey, codes)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const range = maxValue - minValue || Math.max(Math.abs(maxValue), 1)
  const padding = range * 0.16
  return {
    min: minValue - padding,
    max: maxValue + padding,
  }
}

function rgba(hex, alpha) {
  const clean = hex.replace("#", "")
  const r = Number.parseInt(clean.slice(0, 2), 16)
  const g = Number.parseInt(clean.slice(2, 4), 16)
  const b = Number.parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getHeatmapColor(metricKey, value, domain) {
  const { min, max } = domain
  if (min < 0 && max > 0) {
    if (value >= 0) {
      const intensity = max === 0 ? 0 : value / max
      return rgba("#1a6f6d", 0.12 + intensity * 0.52)
    }
    const intensity = min === 0 ? 0 : Math.abs(value / min)
    return rgba("#ab2c27", 0.12 + intensity * 0.52)
  }

  const intensity = (value - min) / (max - min || 1)
  return rgba("#1e2435", 0.1 + intensity * 0.48)
}

function describeShift(metricKey, fromValue, toValue) {
  const delta = toValue - fromValue
  const direction = delta >= 0 ? "up" : "down"
  if (metricKey === "gdp") return `1997 to 1998: ${signedDisplay(metricKey, delta)} ${direction}`
  if (metricKey === "inflation") return `1997 to 1998: ${signedDisplay(metricKey, delta)} ${direction}`
  if (metricKey === "unemployment") return `1997 to 1998: ${signedDisplay(metricKey, delta)} ${direction}`
  if (metricKey === "currentAccount") return `1997 to 1998: ${signedDisplay(metricKey, delta)} swing`
  return `1997 to 1998: ${signedDisplay(metricKey, delta)} pressure change`
}

function renderFaults() {
  faultCardsEl.innerHTML = faults
    .map(
      fault => `
        <button class="fault-card" type="button" data-fault="${fault.id}" aria-selected="${fault.id === selectedFault}">
          <span class="card-kicker">${fault.kicker}</span>
          <span class="card-title">${fault.title}</span>
          <span class="card-copy">${fault.summary}</span>
        </button>
      `
    )
    .join("")

  const current = faults.find(fault => fault.id === selectedFault)
  faultPanelEl.innerHTML = `
    <p class="eyebrow">${current.kicker}</p>
    <h3>${current.title}</h3>
    ${current.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
    <div class="detail-grid">
      ${current.chips
        .map(
          chip => `
            <div class="detail-chip">
              <strong>${chip.label}</strong>
              <span>${chip.value}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `

  faultCardsEl.querySelectorAll("[data-fault]").forEach(button => {
    button.addEventListener("click", () => {
      selectedFault = button.dataset.fault
      renderFaults()
    })
  })
}

function renderTimeline() {
  timelineRailEl.innerHTML = timelineEvents
    .map(
      event => `
        <button class="timeline-step" type="button" data-timeline="${event.id}" aria-selected="${event.id === selectedTimeline}">
          <strong>${event.date}</strong>
          <span>${event.title}</span>
        </button>
      `
    )
    .join("")

  const current = timelineEvents.find(event => event.id === selectedTimeline)
  timelinePanelEl.innerHTML = `
    <p class="eyebrow">${current.date}</p>
    <h3>${current.title}</h3>
    <p>${current.summary}</p>
    <ul>
      ${current.bullets.map(item => `<li>${item}</li>`).join("")}
    </ul>
    <div class="timeline-meta">
      ${current.pills.map(pill => `<span class="meta-pill">${pill}</span>`).join("")}
    </div>
  `

  timelineRailEl.querySelectorAll("[data-timeline]").forEach(button => {
    button.addEventListener("click", () => {
      selectedTimeline = button.dataset.timeline
      renderTimeline()
    })
  })
}

function renderContagion() {
  const current = contagionStates.find(item => item.id === selectedContagion)
  contagionPanelEl.innerHTML = `
    <h3>${current.title}</h3>
    <p>${current.summary}</p>
    <div class="contagion-meta">
      ${current.meta.map(item => `<span>${item}</span>`).join("")}
    </div>
  `

  contagionTrackEl.querySelectorAll("[data-contagion]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.contagion === selectedContagion)
    button.onclick = () => {
      selectedContagion = button.dataset.contagion
      renderContagion()
    }
  })
}

function renderMetricButtons() {
  metricButtonsEl.innerHTML = Object.entries(metrics)
    .map(
      ([key, metric]) => `
        <button class="metric-button" type="button" data-metric="${key}" aria-pressed="${key === selectedMetric}">
          ${metric.label}
        </button>
      `
    )
    .join("")

  metricButtonsEl.querySelectorAll("[data-metric]").forEach(button => {
    button.addEventListener("click", () => {
      selectedMetric = button.dataset.metric
      renderMetricButtons()
      renderImpactViews()
    })
  })
}

function renderLegend() {
  countryLegendEl.innerHTML = countryCodes
    .map(
      code => `
        <button
          class="legend-button"
          type="button"
          data-country="${code}"
          aria-pressed="${activeCountries.has(code)}"
          style="--legend-color:${countryMeta[code].color}"
        >
          ${countryMeta[code].name}
        </button>
      `
    )
    .join("")

  countryLegendEl.querySelectorAll("[data-country]").forEach(button => {
    button.addEventListener("click", () => {
      const code = button.dataset.country
      if (activeCountries.has(code) && activeCountries.size === 1) return
      if (activeCountries.has(code)) activeCountries.delete(code)
      else activeCountries.add(code)
      if (!activeCountries.has(selectedProfileCountry)) selectedProfileCountry = Array.from(activeCountries)[0]
      renderLegend()
      renderImpactViews()
    })
  })
}

function drawLineChart(svg, options) {
  const {
    metricKey,
    codes,
    domain = getMetricDomain(metricKey, codes),
    width = 900,
    height = 430,
    margin = { top: 20, right: 24, bottom: 44, left: 70 },
    showYLabels = true,
    showXLabels = true,
    interactive = false,
    highlightYear = selectedYear,
  } = options

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const xForYear = year => margin.left + ((year - years[0]) / (years.length - 1)) * innerWidth
  const yForValue = value => margin.top + (1 - (value - domain.min) / (domain.max - domain.min || 1)) * innerHeight

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`)
  svg.innerHTML = ""

  for (let i = 0; i < 5; i += 1) {
    const value = domain.min + ((domain.max - domain.min) / 4) * i
    const y = yForValue(value)
    svg.append(
      createSvgNode("line", {
        x1: margin.left,
        y1: y,
        x2: width - margin.right,
        y2: y,
        class: showYLabels ? "grid-line" : "mini-grid-line",
      })
    )

    if (showYLabels) {
      const label = createSvgNode("text", {
        x: margin.left - 12,
        y: y + 4,
        "text-anchor": "end",
        class: "tick-label",
      })
      label.textContent = `${formatValue(metricKey, value)}`
      svg.append(label)
    }
  }

  svg.append(
    createSvgNode("line", {
      x1: margin.left,
      y1: height - margin.bottom,
      x2: width - margin.right,
      y2: height - margin.bottom,
      class: "axis-line",
    })
  )

  if (domain.min < 0 && domain.max > 0) {
    const zeroY = yForValue(0)
    svg.append(
      createSvgNode("line", {
        x1: margin.left,
        y1: zeroY,
        x2: width - margin.right,
        y2: zeroY,
        class: "zero-line",
      })
    )
  }

  if (highlightYear !== null) {
    const focusClass = showYLabels ? "focus-line" : "mini-focus-line"
    svg.append(
      createSvgNode("line", {
        x1: xForYear(highlightYear),
        y1: margin.top,
        x2: xForYear(highlightYear),
        y2: height - margin.bottom,
        class: focusClass,
      })
    )
  }

  if (showXLabels) {
    years.forEach(year => {
      const label = createSvgNode("text", {
        x: xForYear(year),
        y: height - 16,
        "text-anchor": "middle",
        class: "tick-label",
      })
      label.textContent = `${year}`
      svg.append(label)
    })
  }

  codes.forEach(code => {
    const pathData = years
      .map((year, index) => {
        const x = xForYear(year)
        const y = yForValue(rawSeries[code][year][metricKey])
        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")

    svg.append(
      createSvgNode("path", {
        d: pathData,
        stroke: countryMeta[code].color,
        class: showYLabels ? "series-path" : "mini-series-path",
      })
    )

    years.forEach(year => {
      const value = rawSeries[code][year][metricKey]
      const point = createSvgNode("circle", {
        cx: xForYear(year),
        cy: yForValue(value),
        r: year === highlightYear ? (showYLabels ? 6 : 4.6) : showYLabels ? 4.5 : 3.4,
        fill: countryMeta[code].color,
        class: showYLabels ? "series-point" : "mini-series-point",
      })

      if (interactive) {
        point.setAttribute("tabindex", "0")
        point.dataset.country = code
        point.dataset.year = String(year)
        point.dataset.value = String(value)
        point.addEventListener("mouseenter", showTooltip)
        point.addEventListener("mousemove", showTooltip)
        point.addEventListener("mouseleave", hideTooltip)
        point.addEventListener("focus", showTooltip)
        point.addEventListener("blur", hideTooltip)
      }

      svg.append(point)
    })
  })
}

function renderChart() {
  drawLineChart(chartSvg, {
    metricKey: selectedMetric,
    codes: Array.from(activeCountries),
    interactive: true,
    highlightYear: selectedYear,
  })

  chartNoteEl.textContent = `${metrics[selectedMetric].description} ${metrics[selectedMetric].note}`
}

function renderSnapshots() {
  snapshotGridEl.innerHTML = Array.from(activeCountries)
    .map(code => {
      const series = rawSeries[code][selectedYear]
      return `
        <article class="snapshot-card">
          <div class="snapshot-header">
            <h3>${countryMeta[code].name}</h3>
            <span class="swatch" style="background:${countryMeta[code].color}"></span>
          </div>
          <div class="snapshot-main">
            <strong>${displayMetricValue(selectedMetric, series[selectedMetric])}</strong>
            <span>${metrics[selectedMetric].label} in ${selectedYear}</span>
          </div>
          <div class="mini-metrics">
            <div class="mini-row"><span>GDP growth</span><span>${displayMetricValue("gdp", series.gdp)}</span></div>
            <div class="mini-row"><span>Inflation</span><span>${displayMetricValue("inflation", series.inflation)}</span></div>
            <div class="mini-row"><span>Unemployment</span><span>${displayMetricValue("unemployment", series.unemployment)}</span></div>
            <div class="mini-row"><span>Current account</span><span>${displayMetricValue("currentAccount", series.currentAccount)}</span></div>
            <div class="mini-row"><span>FX pressure</span><span>${displayMetricValue("fxIndex", series.fxIndex)}</span></div>
          </div>
        </article>
      `
    })
    .join("")
}

function renderMetricWall() {
  const codes = Array.from(activeCountries)
  metricWallEl.innerHTML = Object.entries(metrics)
    .map(
      ([metricKey, metric]) => `
        <button class="metric-mini-card" type="button" data-wall-metric="${metricKey}" aria-pressed="${metricKey === selectedMetric}">
          <div class="mini-card-head">
            <div>
              <h4>${metric.label}</h4>
              <p>${metric.description}</p>
            </div>
            <div class="mini-card-value">
              <strong>${displayMetricValue(metricKey, rawSeries[selectedProfileCountry][selectedYear][metricKey])}</strong>
              <span>${countryMeta[selectedProfileCountry].name}</span>
            </div>
          </div>
          <svg class="mini-svg" data-mini-svg="${metricKey}" role="img" aria-label="${metric.label} mini chart"></svg>
          <div class="mini-note">${metric.note}</div>
        </button>
      `
    )
    .join("")

  Object.keys(metrics).forEach(metricKey => {
    const svg = metricWallEl.querySelector(`[data-mini-svg="${metricKey}"]`)
    drawLineChart(svg, {
      metricKey,
      codes,
      width: 340,
      height: 180,
      margin: { top: 14, right: 14, bottom: 22, left: 14 },
      showYLabels: false,
      showXLabels: false,
      interactive: false,
      highlightYear: selectedYear,
    })
  })

  metricWallEl.querySelectorAll("[data-wall-metric]").forEach(button => {
    button.addEventListener("click", () => {
      selectedMetric = button.dataset.wallMetric
      renderMetricButtons()
      renderImpactViews()
    })
  })
}

function renderYearCompare() {
  const metricKey = selectedMetric
  const codes = Array.from(activeCountries)
  const values = codes.map(code => rawSeries[code][selectedYear][metricKey])
  const minValue = Math.min(0, ...values)
  const maxValue = Math.max(0, ...values)
  const range = maxValue - minValue || 1
  const padding = range * 0.16
  const domain = { min: minValue - padding, max: maxValue + padding }
  const width = 760
  const height = 330
  const margin = { top: 18, right: 20, bottom: 58, left: 56 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const zeroY = margin.top + (1 - (0 - domain.min) / (domain.max - domain.min || 1)) * innerHeight
  const step = innerWidth / codes.length
  const barWidth = Math.min(92, step * 0.56)

  yearCompareChartEl.setAttribute("viewBox", `0 0 ${width} ${height}`)
  yearCompareChartEl.innerHTML = ""

  for (let i = 0; i < 5; i += 1) {
    const value = domain.min + ((domain.max - domain.min) / 4) * i
    const y = margin.top + (1 - (value - domain.min) / (domain.max - domain.min || 1)) * innerHeight
    yearCompareChartEl.append(
      createSvgNode("line", {
        x1: margin.left,
        y1: y,
        x2: width - margin.right,
        y2: y,
        class: "grid-line",
      })
    )
    const label = createSvgNode("text", {
      x: margin.left - 10,
      y: y + 4,
      "text-anchor": "end",
      class: "tick-label",
    })
    label.textContent = formatValue(metricKey, value)
    yearCompareChartEl.append(label)
  }

  yearCompareChartEl.append(
    createSvgNode("line", {
      x1: margin.left,
      y1: zeroY,
      x2: width - margin.right,
      y2: zeroY,
      class: "zero-line",
    })
  )

  codes.forEach((code, index) => {
    const value = rawSeries[code][selectedYear][metricKey]
    const x = margin.left + index * step + (step - barWidth) / 2
    const y = margin.top + (1 - (value - domain.min) / (domain.max - domain.min || 1)) * innerHeight
    const barHeight = Math.abs(y - zeroY)
    const top = value >= 0 ? y : zeroY

    yearCompareChartEl.append(
      createSvgNode("rect", {
        x,
        y: top,
        width: barWidth,
        height: Math.max(barHeight, 1),
        rx: 12,
        fill: rgba(countryMeta[code].color, 0.88),
      })
    )

    const valueLabel = createSvgNode("text", {
      x: x + barWidth / 2,
      y: value >= 0 ? top - 8 : top + barHeight + 18,
      "text-anchor": "middle",
      class: "bar-value",
    })
    valueLabel.textContent = formatValue(metricKey, value)
    yearCompareChartEl.append(valueLabel)

    const countryLabel = createSvgNode("text", {
      x: x + barWidth / 2,
      y: height - 18,
      "text-anchor": "middle",
      class: "bar-label",
    })
    countryLabel.textContent = countryMeta[code].name
    yearCompareChartEl.append(countryLabel)
  })

  const ranked = [...codes].sort((a, b) => rawSeries[b][selectedYear][metricKey] - rawSeries[a][selectedYear][metricKey])
  yearCompareRankingEl.innerHTML = ranked
    .map(
      (code, index) => `
        <div class="ranking-row">
          <strong>${index + 1}</strong>
          <span>${countryMeta[code].name}</span>
          <strong>${displayMetricValue(metricKey, rawSeries[code][selectedYear][metricKey])}</strong>
        </div>
      `
    )
    .join("")

  yearCompareNoteEl.textContent = `${selectedYear} ordered by ${metrics[metricKey].label.toLowerCase()} level. Use the top controls to change both the metric and the year.`
}

function renderCountryProfile() {
  countryProfileButtonsEl.innerHTML = countryCodes
    .filter(code => activeCountries.has(code))
    .map(
      code => `
        <button
          class="legend-button"
          type="button"
          data-profile-country="${code}"
          aria-pressed="${code === selectedProfileCountry}"
          style="--legend-color:${countryMeta[code].color}"
        >
          ${countryMeta[code].name}
        </button>
      `
    )
    .join("")

  countryProfileButtonsEl.querySelectorAll("[data-profile-country]").forEach(button => {
    button.addEventListener("click", () => {
      selectedProfileCountry = button.dataset.profileCountry
      renderCountryProfile()
      renderMetricWall()
      renderHeatmap()
    })
  })

  const code = selectedProfileCountry
  const current = rawSeries[code][selectedYear]
  const gdpDrop = rawSeries[code][1998].gdp - rawSeries[code][1997].gdp
  const fxJump = rawSeries[code][1998].fxIndex - rawSeries[code][1997].fxIndex

  countryProfileHeadEl.innerHTML = `
    <div>
      <strong>${countryMeta[code].name}</strong>
      <p>Focused year: ${selectedYear}. This profile redraws every metric for a single country so you can see how one balance-sheet shock spread across output, prices, jobs, the current account, and the exchange rate.</p>
      <div class="profile-badges">
        <span class="profile-badge">1998 GDP shock: ${signedDisplay("gdp", gdpDrop)}</span>
        <span class="profile-badge">1998 FX jump: ${signedDisplay("fxIndex", fxJump)}</span>
        <span class="profile-badge">Selected metric: ${displayMetricValue(selectedMetric, current[selectedMetric])}</span>
      </div>
    </div>
    <span class="swatch" style="background:${countryMeta[code].color}; width:18px; height:18px;"></span>
  `

  countryMetricWallEl.innerHTML = Object.entries(metrics)
    .map(
      ([metricKey, metric]) => `
        <article class="country-mini-card">
          <div class="country-mini-head">
            <div>
              <h4>${metric.label}</h4>
              <p>${metric.shortLabel} in ${selectedYear}</p>
            </div>
            <div class="country-mini-value">
              <strong>${displayMetricValue(metricKey, current[metricKey])}</strong>
            </div>
          </div>
          <svg class="mini-svg" data-country-mini="${metricKey}" role="img" aria-label="${countryMeta[code].name} ${metric.label} chart"></svg>
          <div class="mini-note">${describeShift(metricKey, rawSeries[code][1997][metricKey], rawSeries[code][1998][metricKey])}</div>
        </article>
      `
    )
    .join("")

  Object.keys(metrics).forEach(metricKey => {
    const svg = countryMetricWallEl.querySelector(`[data-country-mini="${metricKey}"]`)
    drawLineChart(svg, {
      metricKey,
      codes: [code],
      width: 340,
      height: 180,
      margin: { top: 14, right: 14, bottom: 22, left: 14 },
      showYLabels: false,
      showXLabels: false,
      interactive: false,
      highlightYear: selectedYear,
    })
  })
}

function renderHeatmap() {
  const domain = getMetricDomain(selectedMetric, countryCodes)
  heatmapLegendEl.innerHTML = `
    <div class="heatmap-legend-item">
      <span class="heatmap-legend-swatch" style="background:${rgba("#ab2c27", 0.55)}"></span>
      <span>Lower or more negative values</span>
    </div>
    <div class="heatmap-legend-item">
      <span class="heatmap-legend-swatch" style="background:${rgba("#1a6f6d", 0.55)}"></span>
      <span>Higher or more positive values</span>
    </div>
    ${
      selectedMetric === "fxIndex"
        ? `<div class="heatmap-legend-item"><span class="heatmap-legend-swatch" style="background:${rgba("#1e2435", 0.4)}"></span><span>Exchange-rate pressure is indexed to 1996 = 100</span></div>`
        : ""
    }
  `
  const headerCells = ['<div class="heatmap-cell header"></div>']
  years.forEach(year => {
    headerCells.push(`<div class="heatmap-cell header">${year}</div>`)
  })

  const rows = countryCodes
    .map(code => {
      const cells = [`<div class="heatmap-cell row-header">${countryMeta[code].name}</div>`]
      years.forEach(year => {
        const value = rawSeries[code][year][selectedMetric]
        const activeClass = code === selectedProfileCountry && year === selectedYear ? " is-active" : ""
        cells.push(`
          <button
            class="heatmap-cell data${activeClass}"
            type="button"
            data-heatmap-country="${code}"
            data-heatmap-year="${year}"
            style="background:${getHeatmapColor(selectedMetric, value, domain)}"
            aria-label="${countryMeta[code].name} ${year} ${metrics[selectedMetric].label} ${compactMetricValue(selectedMetric, value)}"
          >
            <strong>${compactMetricValue(selectedMetric, value)}</strong>
            <span>${countryMeta[code].name}</span>
            <small>${heatmapSubLabel(selectedMetric, code, year)}</small>
          </button>
        `)
      })
      return cells.join("")
    })
    .join("")

  heatmapGridEl.innerHTML = headerCells.join("") + rows
  heatmapNoteEl.textContent = `${metrics[selectedMetric].label} across all countries and years. Click any cell to update the main chart, the year comparison, and the country profile. ${selectedMetric === "fxIndex" ? "For exchange-rate pressure, 100 is the 1996 baseline." : ""}`

  heatmapGridEl.querySelectorAll("[data-heatmap-country]").forEach(button => {
    button.addEventListener("click", () => {
      selectedProfileCountry = button.dataset.heatmapCountry
      selectedYear = Number(button.dataset.heatmapYear)
      yearSliderEl.value = String(selectedYear)
      yearValueEl.textContent = String(selectedYear)
      renderImpactViews()
      scrollToMainGraph()
    })
  })
}

function renderImpactViews() {
  renderChart()
  renderSnapshots()
  renderMetricWall()
  renderYearCompare()
  renderCountryProfile()
  renderHeatmap()
  setupScrollAnimations()
}

function scrollToMainGraph() {
  if (!chartPanelEl) return
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  chartPanelEl.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  })
}

function showTooltip(event) {
  const target = event.currentTarget
  tooltipEl.hidden = false
  tooltipEl.innerHTML = `
    <strong>${countryMeta[target.dataset.country].name} · ${target.dataset.year}</strong>
    <span>${metrics[selectedMetric].label}: ${displayMetricValue(selectedMetric, Number(target.dataset.value))}</span>
  `

  const box = chartSvg.getBoundingClientRect()
  const x = Number(target.getAttribute("cx"))
  const y = Number(target.getAttribute("cy"))
  tooltipEl.style.left = `${(x / 900) * box.width + 18}px`
  tooltipEl.style.top = `${(y / 430) * box.height + 18}px`
}

function hideTooltip() {
  tooltipEl.hidden = true
}

function renderResponses() {
  responseModesEl.innerHTML = responseModes
    .map(
      item => `
        <button class="response-mode" type="button" data-response="${item.id}" aria-selected="${item.id === selectedResponse}">
          <strong>${item.title}</strong>
          <span>${item.summary}</span>
        </button>
      `
    )
    .join("")

  const current = responseModes.find(item => item.id === selectedResponse)
  responsePanelEl.innerHTML = `
    <p class="eyebrow">Policy comparison</p>
    <h3>${current.title}</h3>
    ${current.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
    <div class="response-grid">
      ${current.chips
        .map(
          chip => `
            <div class="response-chip">
              <strong>${chip.label}</strong>
              <span>${chip.value}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `

  responseModesEl.querySelectorAll("[data-response]").forEach(button => {
    button.addEventListener("click", () => {
      selectedResponse = button.dataset.response
      renderResponses()
    })
  })
}

function attachYearControl() {
  yearSliderEl.addEventListener("input", event => {
    selectedYear = Number(event.target.value)
    yearValueEl.textContent = String(selectedYear)
    renderImpactViews()
  })
}

function setupReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible")
      })
    },
    { threshold: 0.12 }
  )

  document.querySelectorAll(".reveal").forEach(section => observer.observe(section))
}

function setupScrollAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars && trigger.vars.id && trigger.vars.id.startsWith("codex-scroll-")) trigger.kill()
  })

  const fadeGroups = [
    ".intro-grid > *",
    ".fault-layout > *",
    ".timeline-layout > *",
    "#impact .dashboard > *",
    ".impact-extras > *",
    ".impact-secondary-grid > *",
    ".lesson-grid > *",
    ".sources-grid > *",
    ".responses-layout > *",
  ]

  fadeGroups.forEach((selector, groupIndex) => {
    const elements = gsap.utils.toArray(selector)
    if (!elements.length) return

    gsap.fromTo(
      elements,
      { autoAlpha: 0, y: 56, scale: 0.985 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          id: `codex-scroll-group-${groupIndex}`,
          trigger: elements[0].closest("section") || elements[0],
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })

  gsap.to(".hero-copy", {
    yPercent: -18,
    ease: "none",
    scrollTrigger: {
      id: "codex-scroll-hero-copy",
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.9,
    },
  })

  gsap.to(".hero-visual", {
    yPercent: -10,
    rotate: -1.5,
    ease: "none",
    scrollTrigger: {
      id: "codex-scroll-hero-visual",
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  })

  gsap.utils.toArray(".panel, .stat-card").forEach((element, index) => {
    gsap.fromTo(
      element,
      { boxShadow: "0 18px 60px rgba(23, 27, 40, 0.04)" },
      {
        boxShadow: "0 24px 70px rgba(23, 27, 40, 0.16)",
        ease: "none",
        scrollTrigger: {
          id: `codex-scroll-shadow-${index}`,
          trigger: element,
          start: "top 85%",
          end: "center 45%",
          scrub: 1,
        },
      }
    )
  })

  gsap.utils.toArray(".metric-mini-card, .country-mini-card, .snapshot-card, .ranking-row, .heatmap-cell.data").forEach((element, index) => {
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 36 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          id: `codex-scroll-item-${index}`,
          trigger: element,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })

  ScrollTrigger.refresh()
}

renderFaults()
renderTimeline()
renderContagion()
renderMetricButtons()
renderLegend()
renderImpactViews()
renderResponses()
attachYearControl()
setupReveal()
