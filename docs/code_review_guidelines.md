# Koda pārskatīšanas vadlīnijas – 5.2 diena

## 1. Mērķis
Koda pārskatīšanas (code review) mērķis ir uzlabot koda kvalitāti, atrast kļūdas un dalīties zināšanās komandā. Tas nav personisks vērtējums, bet gan sadarbības process.

## 2. Pārskatīšanas process

### 2.1. Pirms PR izveides (autors)
- Pārliecinies, ka kods ir iztīrīts no liekiem komentāriem un `console.log`.
- Pārbaudi, ka visas izmaiņas ir komitētas loģiskās vienībās.
- Pievieno aprakstošu PR nosaukumu un detalizētu aprakstu.
- Ja PR risina kādu Issue, pievieno atsauci (piemēram, `Closes #123`).
- Norādi, kā testēt izmaiņas.

### 2.2. Pārskatīšanas laikā (recenzents)
- Pārskati kodu saprātīgos apjomos (ne vairāk kā 200-300 rindas vienā reizē).
- Koncentrējies uz:
  - **Funkcionalitāti** – vai kods dara to, ko paredzēts?
  - **Lasāmību** – vai kods ir saprotams?
  - **Konsekvenci** – vai ievērotas projekta stila vadlīnijas?
  - **Testējamību** – vai ir pievienoti testi?
  - **Drošību** – vai nav acīmredzamu drošības robu?
- Komentāriem jābūt:
  - Konkrētiem (norādi uz konkrētu rindu)
  - Konstruktīviem (piedāvā risinājumu, ne tikai norādi problēmu)
  - Pieklājīgiem (lieto "mēs", nevis "tu")

### 2.3. Pēc pārskatīšanas (autors)
- Atbildi uz katru komentāru.
- Ja piekrīti – veic labojumus un komitē tos tajā pašā atzarā.
- Ja nepiekrīti – pamato savu viedokli diskusijā.
- Kad visi komentāri ir atrisināti, informē recenzentu.

## 3. PR veidne

Lai nodrošinātu vienotu informāciju, katram PR jāizmanto šāda veidne:

```markdown
## Apraksts
[Īss izmaiņu apraksts]

## Saistītie Issues
Closes #[numurs]

## Izmaiņu veids
- [ ] Jauna funkcija
- [ ] Labojums (bug fix)
- [ ] Dokumentācija
- [ ] Testi
- [ ] Refaktorēšana

## Kā testēt?
[Soļi, kā pārbaudīt, ka izmaiņas strādā]

## Ekrānuzņēmumi (ja nepieciešams)
[Pievieno bildes]

## Papildus informācija
[Jebkas cits, kas var noderēt recenzentam]

## 4. Sadarbības rīki

### 4.1. Saziņas kanāli
- **GitHub Issues** – konkrētu uzdevumu izsekošanai un diskusijām.
- **Pull Requests** – koda pārskatīšanai un tehniskām diskusijām.
- **Slack / Discord** – ikdienas saziņai, ātriem jautājumiem, paziņojumiem.

### 4.2. Slack / Discord lietošanas principi
- Katram projektam vai tēmai – atsevišķs kanāls (piem., `#projekts`, `#testi`).
- Ja jautājums attiecas uz konkrētu PR vai Issue, pievieno saiti.
- Izmanto `@mentions`, lai piesaistītu konkrēta cilvēka uzmanību.
- Pirms jautāt, pārbaudi, vai atbilde jau nav atrodama dokumentācijā vai iepriekšējās diskusijās.

### 5. Kopsavilkums
Code review ir komandas darbs, nevis audits.

Esi atvērts ieteikumiem un uzdod jautājumus.

Dokumentē lēmumus, lai nākotnē būtu vieglāk saprast, kāpēc kaut kas tika darīts.