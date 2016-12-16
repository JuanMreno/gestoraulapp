echo off
set arg1=%1
set arg2=%2
set arg3=%3
cd /d %arg1%\bin
mysql -uroot -p%arg2% -e "create database gestor_aula;"
mysql -uroot -p%arg2% gestor_aula < %arg3%