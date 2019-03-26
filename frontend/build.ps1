Remove-Item ./.cache -Recurse
Remove-Item ./dist -Recurse
Start-Sleep -s 1
New-Item ./dist -ItemType directory -Force
Start-Sleep -s 1
Copy-Item ./assets/ ./dist/ -Recurse -Force
parcel ./templates/login.html ./templates/play.html ./templates/signup.html
