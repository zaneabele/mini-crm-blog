# Mini CRM / Blog projekts

## Kā palaist projektu
1. Instalē atkarības:
   - `npm install`

2. Izveido `.env` no `.env.example` un pielāgo nepieciešamās vides vērtības:
   - `cp .env.example .env` (Windows: `copy .env.example .env`)

3. Palaid serveri:
   - `npm start`

4. Pārbaudi veselības endpointu:
   - Atver `http://localhost:3000/health` (vai `http://localhost:<PORT>` ja mainīji `.env`)

Piezīmes:
- `.env` fails ir iekļauts `.gitignore`, tam nevajadzētu tikt izsekotam versiju vadībā.
- Ja nepieciešams, maini `PORT` vērtību `.env` failā.

## API galapunkti

| Metode | Maršruts | Apraksts |
|--------|----------|----------|
| POST   | `/users` | Izveido jaunu lietotāju |
| GET    | `/users` | Atgriež visus lietotājus (ar lapošanu) |
| GET    | `/users?email=` | Atgriež lietotāju pēc e-pasta |
| GET    | `/health` | Servera statusa pārbaude |
| GET    | `/health/db` | Datubāzes savienojuma pārbaude |

## Piemēri

### POST /users
```json
{
  "name": "Jānis",
  "email": "janis@example.com",
  "password": "parole123"
}
```

### GET /users?email=janis@example.com
Atgriež konkrētu lietotāju pēc e-pasta adreses.

Atbilde:
```json
{
  "id": 1,
  "name": "Jānis",
  "email": "janis@example.com",
  "created_at": "2026-02-16T12:00:00.000Z"
}
```

## Datubāzes izveide
1. Izveido datubāzi no shēmas faila:
```
mysql -u root -p < db/schema.sql
```
2. Ievieto testa datus (pēc izvēles):
```
mysql -u root -p < db/seed.sql
```

## Testi
Palaist testus:
```
npm test
```


