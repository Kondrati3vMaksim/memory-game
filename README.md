# Space Memory — игра на поиск пар

Учебная браузерная игра на чистом JavaScript. Нужно найти 8 пар карточек за минимальное число ходов.

[Открыть демо](https://kondrati3vmaksim.github.io/memory-game/) · [Исходный код](https://github.com/Kondrati3vMaksim/memory-game) · [Все проекты](https://github.com/Kondrati3vMaksim/frontend-portfolio)

[![Space Memory — игровое поле](https://raw.githubusercontent.com/Kondrati3vMaksim/frontend-portfolio/main/assets/previews/memory-game.jpg)](https://kondrati3vmaksim.github.io/memory-game/)

## Мой вклад

- Создал DOM-интерфейс и 16 карточек из локального JSON; добавил перемешивание Fisher–Yates.
- Реализовал сравнение пар по `dataset.id`, счётчики ходов и совпадений, завершение игры.
- Добавил защиту от повторного выбора карточки и блокировку поля на время показа несовпавшей пары.
- Реализовал новую игру с отменой старого таймера и таблицу 10 лучших результатов в localStorage.

Основную игровую реализацию выполнял самостоятельно. ИИ помогал разбивать задачу на шаги; позднее с его помощью доработаны оформление и документация.

## Результат и технологии

Полный игровой цикл: новая партия → поиск пар → победа → сохранение результата. Данные карточек загружаются через fetch из `data.json`; отдельного backend нет.

**JavaScript, HTML5, CSS3, DOM API, Fetch API, localStorage.**

## Запуск

Нужны Git, современный браузер и HTTP-сервер, например Python 3:

```bash
git clone https://github.com/Kondrati3vMaksim/memory-game.git
cd memory-game
python3 -m http.server 8080
```

Откройте http://localhost:8080. Подойдёт также Live Server в VS Code. Открытие через `file://` не подходит из-за загрузки JSON через fetch.

## Код

- [script.js](https://github.com/Kondrati3vMaksim/memory-game/blob/main/script.js) — создание DOM, обработчики, игровое состояние, таймер и результаты.
- [style.css](https://github.com/Kondrati3vMaksim/memory-game/blob/main/style.css) — оформление, адаптивность и переворот карточек.
- [data.json](https://github.com/Kondrati3vMaksim/memory-game/blob/main/data.json) — исходные карточки.

Код и описание доступны в `main`; исходная ветка `memory-game` и её история сохранены.

## Что улучшить дальше

Показ ошибок загрузки JSON, обработка повреждённых данных localStorage, управление фокусом модального окна и разделение скрипта на модули.
