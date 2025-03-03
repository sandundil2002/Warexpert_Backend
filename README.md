<h1 align="center" id="title"><a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&amp;weight=600&amp;size=60&amp;pause=1000&amp;color=7A82F7&amp;center=true&amp;vCenter=true&amp;width=800&amp;height=120&amp;lines=Warexpert+Backend+API" alt="Typing SVG"></a></h1>

<p id="description">The WareXpert Backend API is a robust and scalable RESTful API designed to power the operations of a modern warehouse management system. It offers a comprehensive suite of endpoints that enable seamless management of various aspects of logistics and warehousing including inventory tracking staff management warehouse operations equipment handling transportation logistics customer interactions and more. Built with precision and flexibility in mind the API ensures efficient data flow and integration between the frontend application and backend services. It supports key functionalities such as real-time package tracking inventory updates user authentication payment processing and notification management. The API also incorporates advanced error handling and validation mechanisms to ensure reliability and ease of debugging.</p>

  
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Warehouse Management: Manage multiple warehouses with detailed information
*   Inventory Management: Track items quantities and locations
*   Staff Management: Handle staff assignments roles and permissions\\
*   Customer Management: Store customer information and track their packages
*   Equipment Tracking: Monitor warehouse equipment and maintenance
*   Transportation Management: Track transport vehicles and shipments
*   Operations Logging: Keep detailed logs of warehouse operations
*   Payment Processing: Handle payment transactions for services
*   Authentication & Authorization: JWT Secured role-based access to endpoints
*   Package Tracking: Allow customers to track their packages with unique tracking numbers
*   Email Notifications: Send automatic notifications for various events
*   Analyzes: Generate warehouse capacity and inventory stock reports

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository</p>

```
git clone https://github.com/sandundil2002/Warexpert_Backend.git
```

<p>2. Install dependencies</p>

```
npm install
```

<p>3. Set up environment variables in a .env file</p>

```
DATABASE_URL="mysql://username:password@localhost:3306/warexpert" SECRET_KEY="your-secret-key" REFRESH_TOKEN="your-refresh-token-secret" EMAIL_USER="your-email@example.com" EMAIL_PASS="your-email-password"
```

<p>4. Run Prisma migrations</p>

```
npx prisma migrate dev
```

<p>5. Start the server</p>

```
npm start
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Node.js with Express
*   TypeScript
*   Prisma ORM
*   MySQL database
*   JWT for authentication
*   Nodemailer for email communication
*   Multer for file uploads

<h2>🛡️ License:</h2>

This project is licensed under the MIT License - see the LICENSE file for details.
