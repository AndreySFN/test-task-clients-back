
# Требования к системе для запуска

1. **Node.js**: Версия **16.x** или выше.
2. **npm**: Версия **7.x** или выше.
3. **MongoDB**: Версия **5.x** или выше (локально или удалённый экземпляр).
4. **Переменные окружения**:
    - `USER_NAME`: Имя пользователя для авторизации.
    - `MONGODB_URI`: Ссылка для подключения к базе данных MongoDB.
    - `JWT_KEY`: Секретный ключ для генерации JWT.
    - `HASHED_PASSWORD`: Захэшированный пароль (bcrypt). Пароль можно захешировать, используя скрипт `password-hasher.js`.

---

## Скрипты проекта

### Основные скрипты

1. **`build`**
   Команда для сборки приложения в продакшн-режиме. Скомпилированные файлы будут помещены в папку `dist`.

   ```bash
   npm run build
   ```

2. **`start`**
   Запуск приложения в собранном виде (продакшн-режим). Требуется предварительная сборка с помощью команды `build`.

   ```bash
   npm run start
   ```

3. **`start:dev`**
   Запуск приложения в режиме разработки с отслеживанием изменений.

   ```bash
   npm run start:dev
   ```

4. **`start:prod`**
   Запуск приложения в продакшн-режиме. Использует скомпилированные файлы из папки `dist`.

   ```bash
   npm run start:prod
   ```

---

## API сервера

### Аутентификация

#### **Маршрут: POST `/auth`**

Используется для получения JWT-токена.

**Тело запроса (DTO)**:

```json
{
  "username": "string",
  "password": "string"
}
```

**Пример успешного ответа**:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Требования**:

- Доступен без авторизации.
- После получения `accessToken` его необходимо передавать в заголовке `Authorization` в формате `Bearer <token>` для всех маршрутов, требующих авторизации.

---

### Работа с клиентами

#### **Маршруты без токена**

1. **GET `/clients`**  
   Возвращает список всех клиентов. Поддерживает фильтрацию и сортировку.

   **Параметры запроса**:

    - `search` — строка для поиска по имени и компании.
    - `sortField` — поле для сортировки (`name`, `company`).
    - `sortOrder` — порядок сортировки (`asc`, `desc`).

   **Пример запроса**:

   ```bash
   GET /clients?search=John&sortField=name&sortOrder=asc
   ```

   **Пример ответа**:

   ```json
   [
     {
       "_id": "64b5d6e2f1b4",
       "name": "John Doe",
       "company": "Doe Inc."
     },
     {
       "_id": "64b5d6e2f1b5",
       "name": "Jane Smith",
       "company": "Smith Ltd."
     }
   ]
   ```

2. **GET `/clients/:id`**  
   Возвращает клиента по `id`.

   **Пример запроса**:

   ```bash
   GET /clients/64b5d6e2f1b4
   ```

   **Пример ответа**:

   ```json
   {
     "_id": "64b5d6e2f1b4",
     "name": "John Doe",
     "company": "Doe Inc.",
     "details": {
       "contact": "john.doe@example.com",
       "about": "Client description",
       "phoneNumber": "+123456789"
     }
   }
   ```

---

#### **Маршруты, требующие токен**

1. **POST `/clients`**  
   Создаёт нового клиента.

   **Тело запроса (DTO)**:

   ```json
   {
     "name": "string",
     "company": "string",
     "details": {
       "contact": "string",
       "about": "string",
       "phoneNumber": "string"
     }
   }
   ```

   **Пример успешного ответа**:

   ```json
   {
     "_id": "64b5d6e2f1b4",
     "name": "John Doe",
     "company": "Doe Inc.",
     "details": {
       "contact": "john.doe@example.com",
       "about": "Client description",
       "phoneNumber": "+123456789"
     }
   }
   ```

2. **PUT `/clients/:id`**  
   Обновляет данные клиента по `id`.

   **Тело запроса (DTO)**:

   ```json
   {
     "name": "Updated Name",
     "company": "Updated Company",
     "details": {
       "contact": "updated.contact@example.com",
       "about": "Updated description",
       "phoneNumber": "+987654321"
     }
   }
   ```

   **Пример успешного ответа**:

   ```json
   {
     "_id": "64b5d6e2f1b4",
     "name": "Updated Name",
     "company": "Updated Company",
     "details": {
       "contact": "updated.contact@example.com",
       "about": "Updated description",
       "phoneNumber": "+987654321"
     }
   }
   ```

3. **DELETE `/clients/:id`**  
   Удаляет клиента по `id`.

   **Пример успешного ответа**:

   ```json
   {
     "message": "Client successfully deleted"
   }
   ```

---

## DTO

### **UserDto (используется в аутентификации)**

```typescript
export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

### **ClientDto (основной DTO для клиента)**

```typescript
export class ClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  details: ClientDetailsDto;
}
```

### **ClientDetailsDto (подробности клиента)**

```typescript
export class ClientDetailsDto {
  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;
}
```
