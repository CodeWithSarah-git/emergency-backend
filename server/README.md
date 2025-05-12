# מערכת ניהול קריאות חירום - צד שרת

מערכת Node.js לניהול קריאות חירום, מתנדבים, התראות והיסטוריית טיפולים.

## תכונות עיקריות

- **ניהול משתמשים** – יצירה, עדכון, מחיקה ושליפה.
- **מערכת קריאות חירום (Emergency Calls)** – יצירה, עדכון, מחיקה, מיקום גיאוגרפי.
- **התראות (Notifications)** – לכל משתמש, כולל סטטוס `isRead`.
- **היסטוריית טיפולים (CallHistory)** – תיעוד סטטוסים: `accepted`, `rejected`, `completed`.
- **JWT Authentication** – התחברות עם שמירה בטוחה של סיסמאות.
- **הרשאות גישה (middleware)** לפי תפקיד המשתמש (`admin`, `volunteer`).

## טכנולוגיות

- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcrypt
- dotenv
- CORS

## התקנה והרצה

1. התקיני חבילות:
   ```bash
   npm install
