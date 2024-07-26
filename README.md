# Setup & Run Instructions

1. Install dependencies:
    npm i

2. Changes in .env file:
    Change port value if require and change mysql credentials.

3. Create Database:
    Create database in mysql named "notificationsystem".

3. Run the server:
    npm start
    Wait for console "Seed files executed successfully." on server to seed data in database.

4. URL for frontend:
    http://localhost:<<port>>/userpanel
    http://localhost:<<port>>/adminpanel

5. Credentals: 1 admin user and 50 normal users using seeder
    Admin User: 
        Username: admin@example.com
        Password: 1234
    Normal User: 
        Username: user1@example.com
        Password: 1234