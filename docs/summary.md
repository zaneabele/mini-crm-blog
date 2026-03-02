# Projekta kopsavilkums – Mini CRM Blog

## Paveiktais

1. **2.1 diena** – Izveidots Express serveris ar `/health` maršrutu, pievienots dotenv, izveidots README.md un publicēts GitHub.
2. **2.2 diena** – Izveidota MySQL datubāze `prakse` un tabula `users` ar unikālu e-pastu. Izveidots savienojums ar `mysql2` un funkcijas `createUser()` un `getUsers()`.
3. **2.3 diena** – Izveidota validācijas funkcija `validateUser()` (vārds ≥2, e-pasts formātā, parole ≥6). Izveidots `POST /users` maršruts ar bcrypt paroles hashošanai un dublikātu pārbaudi. Saglabāta Postman kolekcija.
4. **2.4 diena** – Izveidots `GET /users` maršruts ar filtrēšanu pēc e-pasta un lapošanu. Ieviests vienots kļūdu formāts.
5. **2.5 diena** – Uzrakstīti Jest vienību testi `validateUser()` funkcijai (7 testi) un Supertest integrācijas testi `POST /users` maršrutam (3 testi). Sagatavots testēšanas pārskats `testing_report.md`.
6. **2.6 diena** – Sakārtota projekta struktūra, pievienots `seed.sql` ar testa datiem, izveidots kopsavilkums `summary.md` un papildināts README.md.
7. **3.1 diena** – Pārskatīts līdzšinējais darbs, pārbaudīta projekta atbilstība prasībām, veikta koda audita un sagatavota bāze turpmākajiem uzdevumiem.
8. **3.2 diena** – Paplašināta datubāzes shēma: pievienotas tabulas `posts` un `logs`. Uzzīmēta ERD diagramma un saglabāta `docs/erd.png`. Pārbaudīta shēmas importēšana MySQL Workbench.
9. **3.3 diena** – Inicializēta datubāze, importēta shēma, izveidoti testa dati (2 lietotāji, 3 bloga ieraksti, 2 žurnāla ieraksti). Pārbaudīti SELECT vaicājumi un JOIN starp `posts` un `users`. Saglabāts ekrānuzņēmums `docs/seed_data_success.png`.
10. **3.4 diena** – Izveidots MySQL savienojums (`src/db/connection.js`) un veselības pārbaudes maršruts (`/health`), kas pārbauda arī datubāzes savienojumu. Pārbaudīts, ka maršruts atgriež `{"status":"ok","db":"connected"}`. Saglabāts ekrānuzņēmums `docs/health_check.png`.
11. **3.5 diena** – Izstrādāta lietotāja validācijas funkcija, universāls kļūdu apstrādātājs un logu rakstīšanas funkcija. Pievienota kļūdu reģistrēšana `logs` tabulā. Pārbaudītas dažādas kļūdas (nepareizs JSON, tukšs vārds, nepareizs e-pasts) un pārliecināts, ka tās tiek ierakstītas datubāzē. Saglabāts ekrānuzņēmums `docs/logs_test.png`.
12. **3.6 diena** – Ieviesta reģistrācijas funkcionalitāte ar datu validāciju, e-pasta unikalitātes pārbaudi un paroles hešošanu (bcrypt). Pārbaudīti veiksmīgi un neveiksmīgi scenāriji. Postman kolekcija papildināta ar jauniem pieprasījumiem.

## Izmantotās tehnoloģijas

Node.js, Express, MySQL, bcrypt, Jest, Supertest, Postman, Git

## Repozitorijs

https://github.com/zaneabele/mini-crm-blog