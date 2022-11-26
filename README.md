## REQUIREMENTS
- Php 7.4.*

## RUN BACKEND
<p>After you cloned the project install the package dependencies by running the command:</p>
<pre>$ composer i</pre>

<p>Create and connect your database (.env file):</p>
<pre>
DB_DATABASE=database_name
DB_USERNAME=root
DB_PASSWORD=
</pre>

<p>Migrate the database tables:</p>
<pre>$ php artisan migrate</pre>

<p>Run the database seeder:</p>
<pre>$ php artisan db:seeder</pre>

<p>Finaly, serve:</p>
<pre>$ php artisan serve </pre>

<br><br>

## RUN VUE APPLICATION
<p>Go to vue applciation root folder:</p>
<pre>$ cd resources/frontend/admin</pre>

<p>Install package dependencies:</p>
<pre>$ npm i</pre>

<p>Run the application:</p>
<pre>$ npm run dev</pre>
