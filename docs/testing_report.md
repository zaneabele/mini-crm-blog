# Testēšanas pārskats – 2.5 diena

## 1. Vienību testi (Jest) – `validateUser` funkcija

| Testa gadījums | Ievaddati | Sagaidāmais rezultāts | Rezultāts |
|----------------|-----------|------------------------|-----------|
| 1.1. Visi dati pareizi | `{name: "Jānis", email: "janis@example.com", password: "parole123"}` | Kļūdu masīvs tukšs `[]` | ✅ Izdots |
| 1.2. Vārds par īsu (< 2) | `{name: "J", email: "janis@example.com", password: "parole123"}` | Kļūda par vārdu (masīvā) | ✅ Izdots |
| 1.3. Nederīgs e-pasts | `{name: "Jānis", email: "nepareizs", password: "parole123"}` | Kļūda par e-pastu (masīvā) | ✅ Izdots |
| 1.4. Parole par īsu (< 6) | `{name: "Jānis", email: "janis@example.com", password: "abc"}` | Kļūda par paroli (masīvā) | ✅ Izdots |
| 1.5. Trūkst vārda | `{email: "janis@example.com", password: "parole123"}` | Kļūda par vārdu (masīvā) | ✅ Izdots |
| 1.6. Trūkst e-pasta | `{name: "Jānis", password: "parole123"}` | Kļūda par e-pastu (masīvā) | ✅ Izdots |
| 1.7. Trūkst paroles | `{name: "Jānis", email: "janis@example.com"}` | Kļūda par paroli (masīvā) | ✅ Izdots |

## 2. Integrācijas testi (Supertest) – `POST /users`

| Testa gadījums | Ievaddati | Sagaidāmais statuss | Sagaidāmā atbilde | Rezultāts |
|----------------|-----------|----------------------|--------------------|-----------|
| 2.1. Veiksmīga lietotāja izveide | `{name: "Anna", email: "anna@example.com", password: "parole123"}` | `201 Created` | `{ id: <number>, name: "Anna", email: "anna@example.com" }` | ✅ Izdots |
| 2.2. E-pasta dublikāts | `{name: "Anna", email: "anna@example.com", password: "parole123"}` | `400 Bad Request` | `{ error: { code: "DUPLICATE_EMAIL", message: "..." } }` | ✅ Izdots |
| 2.3. Nederīgi dati (validācija) | `{name: "A", email: "nepareizs", password: "123"}` | `400 Bad Request` | `{ error: { code: "VALIDATION_ERROR", message: "..." } }` | ✅ Izdots |
