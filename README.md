<h2>User Management System</h2>
<h4>A basic user management system API implementing authentication (login page), CRUD functions, wherein the admin can:</h4>

<ul>
  <li>Add a new user </li>
  <li>Edit a user </li>
  <li>Delete a user </li>
  <li>View list of all users in the system </li>
  <li>Allow multiple users to be removed </li>
</ul>

<h2></h2>
<p>Built in NodeJS, running as an offline serverless module with the implementation of JWT Token for the authentication and authorization of users. Currently supported authentication role is 'Admin'</p>

<h4>Instructions: To run the project in local machine</h4>
Requirements: 
MySQL as Database
NodeJS version ^14


<ol>
<li>npm install -g serverless - For the Serverless CLI </li>
<li><p>npm install - To install all dependency packages</p></li>
<li><p>Run command: <b>sh scripts/initialize_dev.sh</b></p></li>
<p>Shell command breakdown:</p>
<ul>
  <li>
    npm run db:create - Create user_management_system database
  </li>
  <li>
    npm run db:migrate:undo:all - Undo previous migration of all tables for a clean reinstall
  </li>
  <li>
    npm run db:migrate - Migrate tables to local database
  </li>
  <li>
    npm run db:seed:all - Populate necessary tables. This will ensure an admin account is always available.
  </li>
  <li>
    npm run dev - Run server in development mode
  </li>
</ul>
</ol>
