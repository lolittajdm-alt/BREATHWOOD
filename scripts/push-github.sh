#!/usr/bin/env bash
# Пуш на GitHub + підказка щодо Pages.
# Один раз: gh auth login  АБО  збережіть токен у ~/.config/breathwood-github-token (не комітити!)

set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE="${GIT_REMOTE:-origin}"
BRANCH="${GIT_BRANCH:-main}"

if [[ -f "${HOME}/.config/breathwood-github-token" ]]; then
  TOKEN="$(tr -d '[:space:]' < "${HOME}/.config/breathwood-github-token")"
  git push "https://lolittajdm-alt:${TOKEN}@github.com/lolittajdm-alt/BREATHWOOD.git" "${BRANCH}"
else
  git push -u "${REMOTE}" "${BRANCH}"
fi

echo ""
echo "Після push: https://github.com/lolittajdm-alt/BREATHWOOD/actions"
echo "Сайт:       https://lolittajdm-alt.github.io/BREATHWOOD/"
