# 해람 상속 홈페이지

## Production deployment

- Production: https://haeram-law.com/ on the existing Cafe24 web hosting. Apex DNS, Google mail and the recovery subdomain remain unchanged.
- GitHub Pages is a preview. Pushing to GitHub alone does not update production; also deploy the reviewed static release to Cafe24.
- Include `.htaccess`, public HTML/CSS/JS and referenced `assets/`. Exclude `.git`, `backend/`, `design/`, `qa/`, server backups, secrets and customer records.
- The HTTPS reverse proxy requires the forwarded-protocol condition. Keep the HTTP upgrade as 302: this Cafe24 environment rewrites HTTP 301 responses into redirect loops. HTTPS www and legacy URLs use 301.
- The previous PHP site and database are preserved privately outside the public web root, with separate local project backups. Do not place them in this repository or the web root.

한정승인 · 상속포기 · 상속등기의 기한·업무·전문가·진행 과정을 안내하는 상속 사이트입니다.

- Preview: https://studioduggubi.github.io/haeram-inheritance/
- Static HTML, CSS and JavaScript. Run locally with `python3 -m http.server 4186 --bind 127.0.0.1`.
- Revision 9 uses distinct cream, white, sage and forest sections. Reading sections have no repeated consultation prompts; the shared header/dock and key decision points retain access.
- Customer situation tabs include a quiet comparison; the six original process steps expand below a three-phase overview. Core mobile prose is 14px, with default sections checked against the available viewport across ten desktop/mobile sizes.
- Native continuous page scrolling with no wheel interception or page snapping.
- Three professional portraits remain visible together on desktop and mobile, with natural aspect ratios and individually calibrated crops. Each opens the original introduction and career credentials in an inline panel.
- Buttons share primary/secondary styling and keyboard focus states. Display arrows and floating decorative badges are removed.
- Year, month and day are selected separately with native controls; invalid month-end dates and future dates are excluded. Deadline estimates use calendar months and distinguish the death date from the date inheritance became known. Editing either date clears stale results. Only an empty or automatically copied consultation date is populated; manual text is retained and the visible reference reflects that state. The base date and holiday-adjusted date are retained separately. Verified 2026/2027 calendars include weekends, official holidays, substitutes, the local election, Labor Day and Constitution Day. Other years visibly fall back to base dates; see the source and exception dialog. Update the calendar data before 2028 and whenever a temporary holiday is announced.
- Six original consultation fields remain in order. Name, phone and consent are required. The four context fields are optional. Concern shortcuts preserve free-entry details.
- Success requires a confirmed server response with the matching request ID. The thank-you page requires a recent confirmed session receipt and does not emit a conversion for direct visits, test submissions or repeated reloads.
- The official site's existing Naver common key and legacy `cnv` integration are retained. No form contents are passed to analytics. Advertising domain registration and report attribution require verification in the advertiser account.
- The closing trust section uses the actual office bookshelf and appointment certificate, with telephone/online consultation wording. It contains no visit invitation, address, map, gallery controls or extra conversion buttons.
- The official inheritance videos use an embedded player and selectable thumbnails; playback starts only after an explicit user action. No Naver booking links are included.
- Main page is crawlable. The thank-you page remains excluded from indexing.

Private backend sources, email feedback, generation originals and design records are excluded from this public repository. Real customer data and credentials must not be committed.


## SEO and GA4 (2026-11-06)

- Canonical production URL: `https://haeram-law.com/`. The Korean title/description target 한정승인, 상속포기 and 상속등기. Open Graph and Twitter previews, Korean language, one H1, descriptive image alternatives and nine connected Schema.org entities are present. No fabricated reviews, ratings or local address have been added.
- `sitemap.xml` contains the single canonical indexable home page. `robots.txt` allows search crawling and excludes private development paths. The receipt page is crawlable with `noindex,nofollow`; do not block it in robots because crawlers must read that directive.
- Google Search Console URL-prefix ownership is verified. The sitemap was accepted successfully, a live URL test passed and recrawling was requested. Search Console is linked to this GA4 web stream. Search-result updates are processed by the search engine.
- Naver ownership meta is installed. Ownership confirmation and sitemap submission remain pending the account owner's CAPTCHA; do not mark these complete until Search Advisor confirms them.
- Existing Analytics account: `414858321` (해람법무사). Inheritance property: `562909008` (해람 상속 홈페이지). Web stream: `16285915556`. Measurement ID: `G-PS0EG83LFG`. Korea time zone, KRW currency; user/event retention 14 months without resetting on new activity. Recovery analytics remains a separate property.
- `analytics.js` loads the Google tag only on the production homepage and receipt page. The measurement ID is in the public `#analytics-config` JSON element in both pages. Enhanced Measurement is off; explicit page and interaction events avoid automatic form/history duplicates. No GTM container or Measurement Protocol secret is needed.
- `generate_lead` is the primary key event, once per verified server receipt, with no fabricated monetary value. The implementation excludes direct receipt-page visits, expired/test receipts and reload duplicates. Telephone/Kakao button clicks are separate interactions, not confirmed consultations or completed telephone calls.
- Ordinary events: `page_view`, `section_view`, `scroll` (25/50/75/90%), `consult_open`, `contact_click`, `form_start`, `consult_submit`, `consult_error`, `deadline_calculate`, `service_select`, `expert_select`, `video_select`, `video_outbound`. Video selection/outbound does not imply confirmed player playback.
- Six event-scoped custom dimensions: `contact_method` (상담 채널), `placement` (버튼 위치), `section_name` (열람 섹션), `service_type` (관심 상속 업무), `expert_name` (선택 전문가), `video_id` (선택 영상). Search Console reports and a marketing-performance report overview are available in GA4.
- Analytics receives no name, phone, deceased date, form text or receipt ID. Reported URLs retain only approved campaign/click attribution keys; referrers are reduced to the origin. Global and event-level Google-tag URL settings both use sanitized values. Google Signals and advertising personalization signals are disabled in code. GA cookies use the inheritance-specific prefix and a one-year expiry.
- Google stream data redaction keeps email redaction enabled and removes 20 potentially sensitive/test URL query keys. The page's privacy dialog explains analytics and offers a browser-local opt-out; DNT and GPC also stop initialization. Re-enabling analytics does not require form consent or change existing form consent.
- Naver's existing common key and confirmed-receipt conversion are retained on production only; the same opt-out/DNT/GPC rules apply. After opting back in from an initially opted-out page, reload to initialize the Naver script.
- Campaign example: `https://haeram-law.com/?utm_source=naver&utm_medium=cpc&utm_campaign=inheritance`. Keep names, contact details, case descriptions and dates out of campaign parameters. Internal links should not carry UTM parameters.
- QA uses `?analytics_debug=1` on production and synthetic local harnesses kept outside this public repository. It never submits a real consultation to create an analytics test conversion. Standard reports and custom dimensions need processing time after collection begins.

