# SpeechLog

Прикольная программа, разработанная чисто для записи речей и кейсов

Легковестная и не требующая многих ресурсов альтернатива блокноту, но с более удобным структурированием кейсов

# Запуск
## Как веб-страницу
Этот запуск не требует никаких дополнительных условий и открывается только при помощи браузера, но хуже поддерживает сохранение
- Скачайте репозиторий по [ссылку](https://github.com/Rakutin2005/debatelog)
- Разархивируйте ZIP-архив. У вас должна получиться одна, в которой содержатся все файлы
- Откройте файл `log.html`
- Работайте
## Как приложение
- Скачайте акутальный релиз с репозитория \
(speechlog-vXXXwXXeXX.exe для Windows и speechlog-vXXXueXX.sh для Linux/OSX)
- Запустите файл
- Работайте
# Сохранение
Вы моежете сохранить конспект в качестве картинки (нажав `ctrl`+`shift`+`s`) или в качестве htm-разметки (`ctrl`+`s`). В десктопной версии приложения вы также можете сохранить как zip-архив или сплошной текст
# Термины
## Поинт информации
любой текст, тезис или ещё что, повествующее что вам нужно
## Уровень контекста
 это поле, вмещающее в себя множество поинтов информации, которые также могут иметь собственные уровни контекста. Таким образом можно отображать ветвистую структуру и глубокие относительные уровни, структурируя их по тезисам

# Функции

## Структурирование данных
каждый поинт информации может быть дополнен внутренним уровнем поинтов

При помощи сочетаня клавиши `Enter` вы создаёте новый поинт информации в том же уровне контекста

При помощи сочетаня клавиш `Shift` + `Enter` вы можете добавить новый уровень контекста (доказательства). Подпункты будут выделены подпунктами

При помощи сочетаня клавиш `Ctrl` + `Enter` вы можете создать новый поинт информации на уровне выше текущего уровня контекста

При помощи сочетаня клавиш `Ctrl` + `Shift` + `Enter` вы можете создать новый поинт информации в корневом уровне контекста

Сочетание `Ctrl` + `<-` позволяет отметить текущую строку (поинт информации) жёлтым цветом. Просто хайлайтер. По умолчанию добавляет поинт в группу "надо сказать"

Сочетание `Ctrl` + `->` позволяет выбрать тип выделения: `ребаттл`/`информацию`/`комментарий`/`поинт выступления`/`важно`

## Тайм менеджмент

### Боковое меню

Содержит настройки, памятку к выступлению, вкладки

### Таймер

Ну бля, таймер, хуле говорить?

### Поиск

тебе ещё и пояснение нужно?