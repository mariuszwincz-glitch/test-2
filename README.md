# AI Visual Overhaul — landing page

Nowoczesna strona “AI Visual Overhaul” (PL) zaprojektowana jak rozmowa sprzedażowa: pełnoekranowy pierwszy ekran z
porównaniem **Przed/Po**, potem sekcje odpowiadające na kolejne wątpliwości, interaktywny showroom (przełączanie
produktów i widoków) i na końcu oferta jako bezpieczny test + CTA „Pokaż swoją ofertę” bez klasycznego lead‑gen
formularza.

## Jak uruchomić

- Najprościej: otwórz `index.html` w przeglądarce.
- Jeśli chcesz lokalny serwer (np. pod hostowanie): uruchom dowolny static server. Uwaga: w niektórych
  środowiskach sandbox może blokować nasłuchiwanie na portach.

## Podmiana portfolio na prawdziwe realizacje

Wizuale demonstracyjne siedzą w `assets/demo/` jako pliki SVG. Żeby podmienić je na prawdziwe realizacje:

1. Wrzuć obrazy do `assets/` (np. `assets/p1-mini-przed.jpg`, `assets/p1-mini-po.jpg`).
2. Zaktualizuj mapę w `app.js` (sekcja `setupShowroom()` → obiekt `data`), podmieniając ścieżki `before/after`.
3. Zaktualizuj opisy `altBefore/altAfter` (ważne dla dostępności i SEO).
4. Jeśli chcesz, żeby pierwszy ekran (hero) też używał nowych obrazów, podmień `src` w `index.html` w sekcji `#top`.

## Dodanie kolejnych produktów / widoków

- Produkty i widoki są sterowane w `app.js` (mapa `data`): `p1/p2/p3` oraz `miniatura/galeria`.
- Żeby dodać nowy wariant (np. „reklama”), dopisz nowy klucz widoku i dodaj przycisk w `index.html` w sekcji `#pokaz`.
