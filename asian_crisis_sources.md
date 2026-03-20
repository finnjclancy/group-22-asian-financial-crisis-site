# Asian Financial Crisis deck: source log

This file records the main sources used for `Asian_Financial_Crisis_1997_98_Sourced_Deck.pptx`.

## Assignment files reviewed

- `BUU33760_Group presentation (1).pdf`
- `BUU33760_Group presentation_detailed requirements(1) (1).pdf`
- `Report.docx`
- `The Asian Financial Crisis 1997_1998.pptx`

## Primary web sources used

- IMF, "The Asian Crisis: Causes and Cures" (1998)
  https://www.imf.org/external/pubs/ft/fandd/1998/06/imfstaff.htm
- IMF, "The Asian Financial Crisis: What Have We Learned?" (1999)
  https://www.imf.org/external/pubs/ft/fandd/1999/09/lane.htm
- IMF Blog, "What We Have Seen and Learned 20 Years After the Asian Financial Crisis" (2017)
  https://www.imf.org/en/blogs/articles/2017/07/13/what-we-have-seen-and-learned-20-years-after-the-asian-financial-crisis
- IMF, "Malaysia: Selected Issues" (1999)
  https://www.imf.org/en/Publications/CR/Issues/2016/12/30/Malaysia-Selected-Issues-3227
- IMF, "Malaysia: From Crisis to Recovery" (Occasional Paper 207)
  https://www.imf.org/external/pubs/nft/op/207/index.htm
- ADB Institute, Yoshitomi and Ohno, "Capital-Account Crisis and Credit Contraction" (1999)
  https://www.adb.org/sites/default/files/publication/157213/adbi-rp2.pdf

## World Bank indicators used

- GDP growth: `NY.GDP.MKTP.KD.ZG`
- Official exchange rate: `PA.NUS.FCRF`
- Current account balance (% of GDP): `BN.CAB.XOKA.GD.ZS`
- Unemployment, total (% of total labor force): `SL.UEM.TOTL.ZS`
- Inflation, consumer prices (annual %): `FP.CPI.TOTL.ZG`
- Poverty headcount ratio at national poverty lines (% of population): `SI.POV.NAHC`

Example API endpoint:

`https://api.worldbank.org/v2/country/THA;IDN;KOR;MYS/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=200`
