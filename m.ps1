Set-Location .\source\_posts\2022-07-31-why-homogeneous
Remove-Item -Recurse -Force .\media
manim -ql .\_manim\scene.py
Set-Location ..\..\..