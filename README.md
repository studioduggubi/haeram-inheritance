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

