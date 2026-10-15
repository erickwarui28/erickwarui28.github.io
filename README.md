# erickwarui28.github.io

## VibeFinance

The built demo is served from [`vibefinance/`](https://erickwarui28.github.io/vibefinance/). Its review-only source lives in [Wild-Bugs-VibeFinance](https://github.com/erickwarui28/Wild-Bugs-VibeFinance); no backend credentials or databases belong in this Pages repository. `vibefinance/release.json` records the exact source revision.

Run **VibeFinance submission quality** from Actions with that 40-character source revision to check the public submission on Linux, including server tests, type checks, a build and desktop/mobile browser tests. The workflow is manual so unrelated profile-site updates do not rerun VibeFinance tests. It does not deploy the backend or alter the review-only source repository. Pages continues publishing this repository's `main` branch; future frontend releases must copy a verified `/vibefinance/` build into that folder while preserving other site content.
