::create_gulp_pr.bat
::Create simple GULP, BOWER project v1

md node_modules
md src
md src\css
md src\js
md src\img
::md src\template
md src\plugins
md src\temp
md src\fonts
cd src
::write command into file and create the file
echo //= ../template/creator.html> index.html
::remove CRLF of first text's line
(for /f "usebackq delims=" %%a  in (index.html) do (set /P "=%%a" < NUL))
::add text to the end of file
echo //= ../template/doctype.html>> index.html
::remove CRLF of second text's line
(for /f "usebackq delims=" %%a  in (index.html) do (set /P "=%%a" < NUL))
cd css
echo /*= ../../template/creator.css*/> main.css
(for /f "usebackq delims=" %%a  in (main.css) do (set /P "=%%a" < NUL))
::echo /*= ../plugins/normalize-css/normalize.css*/>> main.css
::(for /f "usebackq delims=" %%a  in (main.css) do (set /P "=%%a" < NUL))
cd ..
cd js
echo //= ../../template/creator.js> main.js
(for /f "usebackq delims=" %%a  in (main.js) do (set /P "=%%a" < NUL))
cd ../../
::xcopy  template src\template /s /e
cmd /c bower i
cmd /c npm i
cmd /c gulp proj:init
cmd /c gulp
::exit

