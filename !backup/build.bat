start cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sample3.keystore android-release-unsigned.apk sample3
del sample3.apk
D:\android\sdk\build-tools\25.0.3\zipalign -v 4 android-release-unsigned.apk sample3.apk
pause
