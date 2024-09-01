# QuizTopia
## Backgrund

Välkommen till Quiztopia - vi är inte bara ett företag, vi är en revolution. Vi är ett gäng tekniknördar baserade i Göteborg, som älskar att utforska städer och göra det på det mest nördiga sättet möjligt - genom en webbapp. Vi är som en GPS på steroider, men istället för att bara berätta vart du ska gå, ger vi dig frågor baserade på platsen du befinner dig på. Det är som att ha en liten Jeopardy!-spelshow i fickan.

Vår app är som en interaktiv stadsvandring, men med en twist. Varje korrekt svar ger poäng, vilket gör det till en rolig upplevelse. Det är som att spela Pokémon Go, men istället för att fånga Pokémon, fångar du kunskap.

Hittills har det gjorts en backend och ditt uppdrag är skapa en frontend med nedanstående funktionalitet, detta är tnkt att vara en första MVP (Minimal Viable Product) och kommer inte ha all funktionalitet för att företaget vill först testa den på marknanden och få in feedback. Till din hjälp har du ett API med tillhörande dokumentation att använda dig av.

## Funktionalitet

* Det går att skapa konto och logga in.
* Det går att skapa ett quiz.
* Det går att lägga till frågor på ett skapat quiz och placera ut frågorna på en karta (Leaflet).
  - En fråga innehåller: Frågan, svaret samt koordinater på kartan (longitud och latitud).
* Det går att se alla quiz, vad quiz:et heter samt vem som skapat det.
* Det går att välja ett quiz och se alla frågor på kartan (det ska dock inte gå och spela quizet alltså svara på frågorna).
* Det går att se vad du befinner dig på kartan (ej i realtid).
* Det ska enbart behövas loggas in för skapa quiz och lägga till frågor.

## API-dokumentation

Swagger: http://quiztopia-api-documentation.s3-website.eu-north-1.amazonaws.com/#/

`BAS URL: https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com`

## Betygskriterier

**För att få Godkänt ska du:**
* Använt dig av **Geolocation API**.
* Använt dig av JSON Web Token (JWT).
* Använt dig av Leaflet JS - karta. (Annan karta är godkänd också)
* Appen är gjord i React och använder sig av det API som följer med examinationen.
* Uppfyller alla krav på funktionalitet.

**För att Väl Godkänt ska du:**
* Allt i godkänt.
* Kunna ta bort ett quiz som man själv skapat.
* Appen är gjord i React + Typescript.


