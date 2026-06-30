# Garden Diary

Webová aplikace pro správu zahrady a plánování pěstování rostlin.

## Live Demo

https://garden-diary-theta.vercel.app

**Poznámka:** Aplikace využívají bezplatný hosting Render. Při první návštěvě může spuštění backendu a navázání spojení s databází trvat přibližně **30–60 sekund**. Po načtení již aplikace funguje standardně.


## Funkce

- katalog rostlin
- evidence vysazených rostlin
- plánování výsadby
- CRUD operace nad rostlinami a plány
- REST API

## Použité technologie

### Frontend
- React
- JavaScript
- HTML
- CSS
- Bootstrap

### Backend
- Node.js
- Express

## Struktura projektu

```text
/client  - React frontend
/server  - REST API backend
```

## Spuštění

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm start
```

## Autor

Anastasie Žďárská

## Ukázky aplikace

### Hlavní stránka

![Home](docs/home.png)

### Detail rostliny

![Plant Detail](docs/plant-detail.png)

### Přidání nové rostliny

![Add Plant](docs/add-plant.png)

### Vyhledávání

![Search](docs/search.png)
