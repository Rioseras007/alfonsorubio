@echo off
REM Fix for UNC paths (Network drives)
pushd "%~dp0"

if "%~1"=="" (
    echo Arrastra una carpeta sobre este archivo para generar el catalogo.
    echo O usaremos la carpeta actual...
    py "generate_catalog.py" .
) else (
    py "generate_catalog.py" "%~1"
)
popd
pause
