# BREATH WOOD

Лендінг BREATH WOOD — Next.js 15, React 19, Tailwind CSS, Framer Motion.

## Локально

```bash
npm install
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000).

## Автодеплой (щоб агент у Cursor міг пушити сам)

GitHub **не приймає пароль** — один раз налаштуйте вхід на Mac:

### Спосіб A — GitHub CLI (рекомендовано)

```bash
brew install gh
gh auth login
# GitHub.com → HTTPS → Login with a web browser
```

Після цього в терміналі Cursor:

```bash
cd "/Users/vladcabanuk/Desktop/Новая папка/portfolio"
git push -u origin main
```

Облікові дані збережуться — агент зможе пушити без пароля в наступних сесіях.

### Спосіб B — токен у файлі (тільки на вашому комп’ютері)

1. [Classic token](https://github.com/settings/tokens) з правом `repo`
2. `mkdir -p ~/.config && nano ~/.config/breathwood-github-token` — вставте токен, збережіть
3. `chmod 600 ~/.config/breathwood-github-token`
4. `./scripts/push-github.sh`

Файл з токеном **ніколи не комітити** (він уже в `.gitignore` через `.env*` — додайте шлях вручну, якщо потрібно).

---

## Деплой на GitHub Pages

1. Репозиторій: [github.com/lolittajdm-alt/BREATHWOOD](https://github.com/lolittajdm-alt/BREATHWOOD)

2. У терміналі (потрібен вхід у GitHub — браузер або Personal Access Token):

```bash
cd "/Users/vladcabanuk/Desktop/Новая папка/portfolio"
git remote add origin https://github.com/lolittajdm-alt/BREATHWOOD.git
git push -u origin main
```

Якщо `remote origin` вже є:

```bash
git remote set-url origin https://github.com/lolittajdm-alt/BREATHWOOD.git
git push -u origin main
```

3. На GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Після успішного workflow сайт буде тут:
   **https://lolittajdm-alt.github.io/BREATHWOOD/**

Якщо репозиторій називається `username.github.io`, сайт відкриється з кореня домену без підшляху.
