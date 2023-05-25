@echo Getnode by Aworldc

@powershell -Command "Invoke-WebRequest https://nodejs.org/dist/v18.16.0/node-v18.16.0-win-x64.zip -OutFile node.zip"
@powershell -command "Expand-Archive -Force '%~dp0node.zip' '%~dp0'"

@del "%~dp0node.zip"

@xcopy "%~dp0node-v18.16.0-win-x64\node.exe" "%~dp0\node.exe*"
@xcopy "%~dp0node-v18.16.0-win-x64\npm.cmd" "%~dp0\npm.cmd*"
@xcopy "%~dp0node-v18.16.0-win-x64\npx.cmd" "%~dp0\npx.cmd*"

@echo D | xcopy /s "%~dp0node-v18.16.0-win-x64\node_modules" "%~dp0node_modules"
@echo Y | rmdir /s "%~dp0node-v18.16.0-win-x64"

@npm i npm && cls && echo Done! && pause