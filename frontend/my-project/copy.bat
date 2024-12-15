@echo off

echo Copying files from Source to Path...
del "C:\Dev\Softwarearchitektur\jodel_app\src\main\resources\static\assets\*" /q /f
xcopy "C:\Dev\Softwarearchitektur\jodel_app\frontend\my-project\dist\index.html" "C:\Dev\Softwarearchitektur\jodel_app\src\main\resources\templates\index.html" /Y
xcopy "C:\Dev\Softwarearchitektur\jodel_app\frontend\my-project\dist\public" "C:\Dev\Softwarearchitektur\jodel_app\src\main\resources\templates" /Y /D
xcopy "C:\Dev\Softwarearchitektur\jodel_app\frontend\my-project\dist\assets" "C:\Dev\Softwarearchitektur\jodel_app\src\main\resources\static\assets" /Y /D


echo Operation completed successfully.
pause