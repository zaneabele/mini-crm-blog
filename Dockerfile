# Izmantojam oficiālo Node.js 20 LTS attēlu (viegla versija)
FROM node:20-alpine

# Iestata darba direktoriju konteinerā
WORKDIR /app

# Kopē package.json un package-lock.json vispirms (labākai kešošanai)
COPY package*.json ./

# Instalē atkarības
RUN npm install

# Kopē visu pārējo projektu
COPY . .

# Eksponē portu, ko lietotne izmanto (3000)
EXPOSE 3000

# Palaid lietotni
CMD ["npm", "start"]