# Testēšanas pārskats – 2.5 – 3.10 diena

## 1. Vienību testi (Jest)

### 1.1. `validateUser` funkcija

| Testa gadījums | Ievaddati | Sagaidāmais rezultāts | Rezultāts |
|----------------|-----------|------------------------|-----------|
| 1.1.1. Visi dati pareizi | `{name: "Jānis", email: "janis@example.com", password: "parole123"}` | Kļūdu masīvs tukšs `[]` | ✅ Izdots |
| 1.1.2. Vārds par īsu (< 2) | `{name: "J", email: "janis@example.com", password: "parole123"}` | Kļūda par vārdu (masīvā) | ✅ Izdots |
| 1.1.3. Nederīgs e-pasts | `{name: "Jānis", email: "nepareizs", password: "parole123"}` | Kļūda par e-pastu (masīvā) | ✅ Izdots |
| 1.1.4. Parole par īsu (< 6) | `{name: "Jānis", email: "janis@example.com", password: "abc"}` | Kļūda par paroli (masīvā) | ✅ Izdots |
| 1.1.5. Trūkst vārda | `{email: "janis@example.com", password: "parole123"}` | Kļūda par vārdu (masīvā) | ✅ Izdots |
| 1.1.6. Trūkst e-pasta | `{name: "Jānis", password: "parole123"}` | Kļūda par e-pastu (masīvā) | ✅ Izdots |
| 1.1.7. Trūkst paroles | `{name: "Jānis", email: "janis@example.com"}` | Kļūda par paroli (masīvā) | ✅ Izdots |

### 1.2. `validatePost` funkcija

| Testa gadījums | Ievaddati | Sagaidāmais rezultāts | Rezultāts |
|----------------|-----------|------------------------|-----------|
| 1.2.1. Visi dati pareizi | `{title: "Pilns virsraksts", content: "Šis ir pietiekami garš saturs testiem.", user_id: 1}` | Kļūdu masīvs tukšs `[]` | ✅ Izdots |
| 1.2.2. Virsraksts par īsu (< 3) | `{title: "Aa", content: "Šis ir pietiekami garš saturs testiem.", user_id: 1}` | Kļūda par virsrakstu (masīvā) | ✅ Izdots |
| 1.2.3. Saturs par īsu (< 10) | `{title: "Pilns virsraksts", content: "Īss", user_id: 1}` | Kļūda par saturu (masīvā) | ✅ Izdots |
| 1.2.4. Trūkst lietotāja ID | `{title: "Pilns virsraksts", content: "Šis ir pietiekami garš saturs testiem."}` | Kļūda par lietotāja ID (masīvā) | ✅ Izdots |
| 1.2.5. Lietotājs neeksistē | `{title: "Pilns virsraksts", content: "Šis ir pietiekami garš saturs testiem.", user_id: 999}` | Kļūda par neesošu lietotāju (masīvā) | ✅ Izdots |

## 2. Integrācijas testi (Supertest)

### 2.1. `POST /users`

| Testa gadījums | Ievaddati | Sagaidāmais statuss | Sagaidāmā atbilde | Rezultāts |
|----------------|-----------|----------------------|--------------------|-----------|
| 2.1.1. Veiksmīga lietotāja izveide | `{name: "Testa Lietotājs", email: "test@example.com", password: "parole123"}` | `201 Created` | `{ id: <number>, name, email }` | ✅ Izdots |
| 2.1.2. E-pasta dublikāts | `{name: "Anna", email: "anna@example.com", password: "parole123"}` | `400 Bad Request` | `{ error: { code: "DUPLICATE_EMAIL" } }` | ✅ Izdots |
| 2.1.3. Nederīgs e-pasts | `{name: "Test", email: "nav-epasts", password: "parole123"}` | `400 Bad Request` | `{ error: { code: "VALIDATION_ERROR" } }` | ✅ Izdots |

### 2.2. `GET /users`

| Testa gadījums | Ievaddati | Sagaidāmais statuss | Sagaidāmā atbilde | Rezultāts |
|----------------|-----------|----------------------|--------------------|-----------|
| 2.2.1. Visi lietotāji | `-` | `200 OK` | `{ data: [...], page, limit, total }` | ✅ Izdots |
| 2.2.2. Filtrs pēc e-pasta (atrasts) | `?email=anna@example.com` | `200 OK` | `{ id, name, email, created_at }` | ✅ Izdots |
| 2.2.3. Filtrs pēc e-pasta (nav atrasts) | `?email=nepareizs@example.com` | `404 Not Found` | `{ error: { code: "USER_NOT_FOUND" } }` | ✅ Izdots |
| 2.2.4. Lapošana | `?page=1&limit=1` | `200 OK` | `{ data: [...], page:1, limit:1 }` | ✅ Izdots |

### 2.3. `POST /posts`

| Testa gadījums | Ievaddati | Sagaidāmais statuss | Sagaidāmā atbilde | Rezultāts |
|----------------|-----------|----------------------|--------------------|-----------|
| 2.3.1. Veiksmīga ieraksta izveide | `{title: "Testa ieraksts", content: "Šis ir testa ieraksta saturs.", user_id: 1}` | `201 Created` | `{ id, title, content, user_id }` | ✅ Izdots |
| 2.3.2. Īss virsraksts | `{title: "Aa", content: "Šis ir testa ieraksta saturs.", user_id: 1}` | `400 Bad Request` | `{ error: { code: "VALIDATION_ERROR" } }` | ✅ Izdots |

### 2.4. `GET /posts`

| Testa gadījums | Ievaddati | Sagaidāmais statuss | Sagaidāmā atbilde | Rezultāts |
|----------------|-----------|----------------------|--------------------|-----------|
| 2.4.1. Visi ieraksti | `-` | `200 OK` | `{ data: [...] }` (ar autora datiem) | ✅ Izdots |
| 2.4.2. Filtrs pēc autora | `?user_id=1` | `200 OK` | `{ data: [...] }` (tikai autora ieraksti) | ✅ Izdots |