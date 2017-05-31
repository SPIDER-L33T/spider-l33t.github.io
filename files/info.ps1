$url = "https://github.com/SPIDER-L33T/spider-l33t.github.io/raw/master/files/hacked.png"
$output = "C:\temp\hacked.png"
Import-Module BitsTransfer
$job = Start-BitsTransfer -Source $url -Destination $output -Asynchronous
sleep 5;
Complete-BitsTransfer -BitsJob $job
Set-ItemProperty -path 'HKCU:\Control Panel\Desktop\' -name wallpaper -value $output
rundll32.exe user32.dll, UpdatePerUserSystemParameters
