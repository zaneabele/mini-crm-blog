# Git darba plūsma un atzarošana – 5.1 diena

## 1. Pamatprincipi
- Galvenais zars: `master` (vai `main`) – satur stabilu, izstrādei gatavu kodu.
- Katrai jaunai funkcijai vai labojumam tiek veidots atsevišķs **funkciju atzars** (feature branch).
- Atzara nosaukuma piemērs: `feature/īss-apraksts` vai `bugfix/problēmas-apraksts`.
- Izmaiņas tiek integrētas galvenajā zarā, izmantojot **pull request (PR)**.

## 2. Darba plūsmas soļi

### 2.1. Pirms sāc
1. Pārliecinies, ka esi `master` zarā:
   ```bash
   git checkout master