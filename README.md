## REQUIREMENTS
- Php 7.4.*

## RUN BACKEND
<p>After you cloned the project install the dependencies by running the command:</p>
<pre>
$ composer i
$ php artisan key:generate
$ php composer require php-open-source-saver/jwt-auth (optional)
$ php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"
$ php artisan jwt:secret
</pre>

<p>Create and connect your database (.env file):</p>
<pre>
DB_DATABASE=database_name
DB_USERNAME=root
DB_PASSWORD=
</pre>

<p>Migrate the database tables:</p>
<pre>$ php artisan migrate</pre>

<p>Run the database seeder:</p>
<pre>$ php artisan db:seed</pre>

<p>Finaly, serve:</p>
<pre>$ php artisan serve </pre>

<note>Note : I serve project with port 8000</note>

<br><br>

## RUN VUE APPLICATION
<p>Go to vue applciation root folder:</p>
<pre>$ cd resources/frontend/admin</pre>

<p>Install package dependencies:</p>
<pre>$ npm i</pre>

<p>Inside the resources/frontend/admin create a .env file with the following content.</p>
<pre>
VITE_API_BASEURL=http://127.0.0.1:8000
VITE_APP_BASEURL=''
</pre>

<p>Run the application:</p>
<pre>$ npm run dev</pre>

<note>Note : VITE_API_BASEURL value should be base on the backend endpoint url</note>
