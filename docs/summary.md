# Projekta kopsavilkums – Mini CRM Blog

## Paveiktais

1. **2.1 diena** – Izveidots Express serveris ar `/health` maršrutu, pievienots dotenv, izveidots README.md un publicēts GitHub.
2. **2.2 diena** – Izveidota MySQL datubāze `prakse` un tabula `users` ar unikālu e-pastu. Izveidots savienojums ar `mysql2` un funkcijas `createUser()` un `getUsers()`.
3. **2.3 diena** – Izveidota validācijas funkcija `validateUser()` (vārds ≥2, e-pasts formātā, parole ≥6). Izveidots `POST /users` maršruts ar bcrypt paroles hashošanai un dublikātu pārbaudi. Saglabāta Postman kolekcija.
4. **2.4 diena** – Izveidots `GET /users` maršruts ar filtrēšanu pēc e-pasta un lapošanu. Ieviests vienots kļūdu formāts.
5. **2.5 diena** – Uzrakstīti Jest vienību testi `validateUser()` funkcijai (7 testi) un Supertest integrācijas testi `POST /users` maršrutam (3 testi). Sagatavots testēšanas pārskats `testing_report.md`.
6. **2.6 diena** – Sakārtota projekta struktūra, pievienots `seed.sql` ar testa datiem, izveidots kopsavilkums `summary.md` un papildināts README.md.

## Izmantotās tehnoloģijas

Node.js, Express, MySQL, bcrypt, Jest, Supertest, Postman, Git

## Repozitorijs

https://github.com/zaneabele/mini-crm-blog
