# Zielona Marka Studio

Techniczny wariant aplikacyjny Zielonej Marki pokazujący połączenie publicznej strony usługowej z prywatnym zapleczem do obsługi zapytań, projektów i zadań.

Projekt jest demonstracją architektury React/Vinext + Cloudflare Workers + D1/Drizzle. Nie zawiera prawdziwych danych klientów, haseł ani produkcyjnych sekretów.

## Co pokazuje

- responsywną stronę usługową,
- formularz zapytania zapisujący dane do backendu,
- prywatne Studio dla właściciela,
- encje zapytań, projektów i zadań,
- Cloudflare D1 z migracjami Drizzle,
- API do pracy ze Studio,
- podstawowe zabezpieczenie prywatnego panelu i sesji.

## Technologia

- React 19
- TypeScript
- Vinext / Vite
- Cloudflare Workers
- Cloudflare D1
- Drizzle ORM

## Uruchomienie lokalne

Wymagany jest Node.js 22.13 lub nowszy.

```bash
npm ci
npm run dev
```

Weryfikacja:

```bash
npm test
```

Test buduje projekt i sprawdza render strony głównej, prywatny charakter Studio oraz konfigurację D1.

## Dane i bezpieczeństwo

- repozytorium nie powinno zawierać haseł, tokenów ani plików `.env`,
- dane demonstracyjne nie powinny zawierać informacji o rzeczywistych klientach,
- Studio wymaga kontroli właściciela po stronie serwera,
- konfiguracja produkcyjna i sekrety środowiskowe pozostają poza repozytorium,
- publiczne demo nie powinno być traktowane jako gotowy system SaaS.

## Powiązane projekty

- [Zielona Marka](https://zielona-marka.pl)
- [Zielona Marka WordPress](https://github.com/lukaszst-cz/zielona-marka-wordpress)
- [Publiczne portfolio](https://github.com/lukaszst-cz/zielona-marka-public-portfolio)

## Autor, darmowe projekty i wsparcie

Projekt jest udostępniany bezpłatnie jako demonstracja i portfolio. Jeśli jest przydatny, można dobrowolnie wesprzeć dalszy rozwój: **[Postaw Naleśnikowi++ kawę ☕](https://buymeacoffee.com/nalesnik_plus_plus)**.

Potrzebujesz własnej strony WWW, formularza wyceny albo prostego systemu dla firmy? **[Zobacz Zielona Marka →](https://zielona-marka.pl)**.

