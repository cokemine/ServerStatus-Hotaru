function switchDarkMode() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (night == '0') {
        document.body.classList.add('dark');
        document.cookie = "dark=1;path=/";
        console.log('Dark mode on');
    } else {
        document.body.classList.remove('dark');
        document.cookie = "dark=0;path=/";
        console.log('Dark mode off');
    }
}
$("#darkmodeButton").click(switchDarkMode);