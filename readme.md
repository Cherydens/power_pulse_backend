# Серверна частина проєкту PowerPulse

## Призначення

Для налагодження взаємодії сайту (frontend частини) з базою даних.

## Технології

Проєкт створений на платформі [Node.js](https://nodejs.org/en/docs/) з
використанням фреймворку [Express](https://devdocs.io/express/)

Зв'язок з базою даних забезпечує бібліотека
[mongoose](https://mongoosejs.com/docs/documents.html) через систему керування
базами даних [MongoDB](https://www.mongodb.com/docs/)

## Опис API

Детально робота з ендпоінтами описана в документації
[Power Pulse API](https://power-pulse-api.onrender.com/api-docs/#/).
Документація створена за допомогою пакета
[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

### users

Запити для роботи з даними користувача

- GET (публічний), **/api/users/google** - отримання URL для авторизації через
  Google.
- POST (публічний), **/api/users/register** - реєстрація нового користувача в
  системі;
- POST (публічний), **/api/users/login** - авторизація існуючого користувача в
  системі;
- GET (приватний), **/api/users/current** - отримання інформації про поточного
  користувача;
- POST (приватний), **/api/users/logout** - вихід користувача з системи;
- POST (приватний), **/api/users/params** - додавання параметрів користувача в
  систему;
- PUT (приватний), **/api/users/params** - оновлення параметрів користувача в
  системі;
- GET (приватний), **/api/users/params** - отримання параметрів користувача;
- PATCH (приватний), **/api/users/username** - оновлення імені користувача в
  системі;
- PATCH (приватний), **/api/users/avatars** - оновлення аватара користувача в
  системі.

  ### products

Приватні запити на одержання інформації про харчування

- GET, **/api/products** - список продуктів, які рекомендовано або не
  рекомендовано для конкретної групи крові користувача.
- GET, **/api/products/categories** - список усіх доступних категорій продуктів;

### training

Приватні запити на одержання інформації про тренування

- GET, **/api/training/exercises** - список всіх доступних вправ і тренувань,
  які доступні у застосунку. Інформація про кожну вправу включає такі дані, як
  назва вправи, область тіла, яку вона залучає, обладнання, яке потрібно для її
  виконання, URL з гіфкою, тривалість та кількість спалених калорій;
- GET, **/api/training/subcategories** - повертає підгрупи вправ за категоріями:
  - bodyPart - список доступних областей тіла, які можуть бути використані для
    фільтрації вправ. Наприклад, користувач може обрати вправи для розвитку
    конкретних груп м'язів або областей тіла;
  - target список м'язів, які можуть бути використані для фільтрації вправ. Він
    надає інформацію про різні м'язні групи, які задіяні в різних вправах;
  - equipment - повертає список обладнання, яке може бути використано для
    виконання вправ. Він допомагає користувачам знайти вправи, які можна
    виконати з використанням конкретного обладнання або без нього.

### diary

Приватні запити для роботи з щоденником

- GET, **/api/diary/day** - інформація про спожиті користувачем продукти та
  виконані користувачем вправи за обрану дату;
- DELETE, **/api/diary/day/diaryProducts/{id}** - видалення продукту, що був
  спожитий користувачем;
- DELETE, **/api/diary/day/diaryExercises/{id}** - видалення вправи, що була
  виконана користувачем;
- POST, **/api/diary/day/diaryProducts** - збереження продукту, що був спожитий
  користувачем, та його закріплення за обраною датою;
- POST, **/api/diary/day/diaryExercises** - збереження вправи, що була виконана
  користувачем, та її закріплення за обраною датою;

### statistics

Публічні запити на одержання загальної статистичної інформації

- GET, **/api/statistics/**:

  - загальна кількість тренувань, виконаних зареєстрованими користувачами;
  - загальна кількість спалених усіма зареєстрованими користувачами калорій;
  - загальна кількість зареєстрованих у застосунку користувачів;
  - загальна кількість годин, проведених зареєстрованими користувачами за
    тренуванням;
  - кількість відео-тренувань у застосунку;

  ### reviews

Запити для роботи з даними користувача

- GET (публічний), **/api/reviews/public** - отримання усіх відгуків.
- GET (публічний), **/api/reviews/public/{id}** - отримання відгуку за його id;

- GET (приватний), **/api/reviews/private** - отримання усіх відгуків поточного
  користувача;
- POST (приватний), **/api/reviews/private** - додавання відгуку користувача в
  систему;;
- GET (приватний), **/api/reviews/private/{id}** - отримання відгуку поточного
  користувача за його id;
- PATCH (приватний), **/api/reviews/private/{id}** - оновлення відгуку поточного
  користувача за його id в системі;
- DELETE (приватний), **/api/reviews/private/{id}** - видалення відгуку
  поточного користувача за його id з системи;

## Команда розробників

Денис Чередниченко (Denys Cherednychenko), Team lead.
[linkedin](https://www.linkedin.com/in/denys-cherednychenko) ||
[github](https://github.com/Cherydens)

Олександр Сіротов (Alexander Sirotov), Developer.
[Linkedin](https://www.linkedin.com/in/alexander-sirotov/) ||
[github](https://github.com/SirotovAlexander)

Сергій Савчак (Serhii Savchak), Developer.
[linkedin](https://www.linkedin.com/in/itsavchak/) ||
[github](https://github.com/SerhiiSavchak)
