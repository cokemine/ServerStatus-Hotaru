// serverstatus.js
// var result = null;
var error = 0;
var d = 0;
var server_status = new Array();
uptime();
setInterval(uptime, 2000);
setInterval(updateTime, 500);

function uptime() {
    getJSON(function (result) {
        if (result) {
            console.log(result);
            //下方卡片
            var shstr = '<div class="col-lg-4 col-md-4 col-sm-4">' +
                ' <div class="panel panel-block panel-block-sm panel-location">' +
                '<div class="location-header">' +

                ' <h3 class="h4"><img src="img/clients/@region.png"> @name <small>@type</small></h3>' +
                '   <i class="zmdi zmdi-check-circle @online"></i>' +
                '   </div>' +
                '  <div class="location-progress">' +
                '      <div class="progress progress-sm">' +
                '       <div class="progress-bar" style="width: @Mem%;"></div>' +
                '   </div>' +
                '  </div>' +
                ' <ul class="location-info list-styled">' +
                '     <li><span class="list-label">Network @network_rxandnetwork_tx</li>' +
                '     <li><span class="list-label">负载状态:</span> @load%</li>' +
                '   </ul>' +
                '  </div>' +
                ' </div>';
            var shinnerhtml = '';
            var loadingNotice = document.getElementById("loading-notice");
            if (loadingNotice) loadingNotice.parentNode.removeChild(loadingNotice);
            for (var i = 0; i < result.servers.length; i++) {
                //Cards Start
                // Memory
                var Mem = ((result.servers[i].memory_used / result.servers[i].memory_total) * 100.0).toFixed(0);
                // Network
                var newnetstr = "";
                if (result.servers[i].network_rx < 1000)
                    newnetstr += result.servers[i].network_rx.toFixed(0) + "B";
                else if (result.servers[i].network_rx < 1000 * 1000)
                    newnetstr += (result.servers[i].network_rx / 1000).toFixed(0) + "K";
                else
                    newnetstr += (result.servers[i].network_rx / 1000 / 1000).toFixed(1) + "M";
                newnetstr += " | "
                if (result.servers[i].network_tx < 1000)
                    newnetstr += result.servers[i].network_tx.toFixed(0) + "B";
                else if (result.servers[i].network_tx < 1000 * 1000)
                    newnetstr += (result.servers[i].network_tx / 1000).toFixed(0) + "K";
                else
                    newnetstr += (result.servers[i].network_tx / 1000 / 1000).toFixed(1) + "M";

                shinnerhtml += shstr.replace("@name", result.servers[i].name).replace("@network_rxandnetwork_tx", newnetstr).replace("@type", result.servers[i].type).replace("@online", result.servers[i].online4 ? 'text-success' : 'text-error').replace("@location", result.servers[i].location).replace("@Mem", Mem).replace("@load", result.servers[i].load).replace("@region", result.servers[i].region);
                //Cards End
                //Table Start
                var TableRow = document.querySelectorAll("#servers tr#r" + i);
                var ExpandRow = document.querySelectorAll("#servers #rt" + i);
                var hack;
                if (i % 2) hack = "odd";
                else hack = "even";
                if (!TableRow.length) {
                    var TableRowNode = document.createElement("tr");
                    var ExpandRowNode = document.createElement("tr");
                    TableRowNode.id = "r" + i;
                    TableRowNode.className = "tableRow " + hack;
                    TableRowNode.innerHTML = "<td id=\"online4\"><div class=\"progress\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-warning\"><small>加载中</small></div></div></td>" +
                        "<td id=\"name\">加载中</td>" +
                        "<td id=\"type\">加载中</td>" +
                        "<!-- td id=\"host\">加载中</td -->" +
                        "<td id=\"location\">加载中</td>" +
                        "<td id=\"uptime\">加载中</td>" +
                        "<td id=\"load\">加载中</td>" +
                        "<td id=\"network\">加载中</td>" +
                        "<td id=\"traffic\">加载中</td>" +
                        "<td id=\"cpu\"><div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-warning\"><small>加载中</small></div></div></td>" +
                        "<td id=\"memory\"><div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-warning\"><small>加载中</small></div></div></td>" +
                        "<td id=\"hdd\"><div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-warning\"><small>加载中</small></div></div></td>"
                    ExpandRowNode.className = "expandRow " + hack;
                    ExpandRowNode.innerHTML = "<td colspan=\"12\"><div class=\"collapsed\" id=\"rt" + i + "\">" +
                        "<div id=\"expand_mem\">加载中</div>" +
                        "<div id=\"expand_swap\">加载中</div>" +
                        "<div id=\"expand_hdd\">加载中</div>" +
                        "<div id=\"expand_custom\">加载中</div>" +
                        "</div></td>";
                    document.getElementById("servers").appendChild(TableRowNode);
                    document.getElementById("servers").appendChild(ExpandRowNode);
                    server_status[i] = true;
                }
                TableRow = document.querySelector("#servers tr#r" + i);
                ExpandRow = document.querySelector("#servers #rt" + i);
                // Online4
                if (result.servers[i].online4) {
                    TableRow.children["online4"].children[0].children[0].className = "progress-bar progress-bar-success";
                    TableRow.children["online4"].children[0].children[0].innerHTML = "<small>运行中</small>";
                } else {
                    TableRow.children["online4"].children[0].children[0].className = "progress-bar progress-bar-danger";
                    TableRow.children["online4"].children[0].children[0].innerHTML = "<small>维护中</small>";
                }

                // Online6
                //if (result.servers[i].online6) {
                //	TableRow.children["online6"].children[0].children[0].className = "progress-bar progress-bar-success";
                //	TableRow.children["online6"].children[0].children[0].innerHTML = "<small>开启</small>";
                //} else {
                //	TableRow.children["online6"].children[0].children[0].className = "progress-bar progress-bar-danger";
                //	TableRow.children["online6"].children[0].children[0].innerHTML = "<small>关闭</small>";
                //}

                // Name
                TableRow.children["name"].innerHTML = result.servers[i].name;

                // Type
                TableRow.children["type"].innerHTML = result.servers[i].type;

                // Host
                //TableRow.children["host"].innerHTML = result.servers[i].host;

                // Location
                TableRow.children["location"].innerHTML = result.servers[i].location;
                //Region
                //TableRow.children["region"].innerHTML = result.servers[i].region;
                if (!result.servers[i].online4 && !result.servers[i].online6) {
                        TableRow.children["uptime"].innerHTML = "–";
                        TableRow.children["load"].innerHTML = "–";
                        TableRow.children["network"].innerHTML = "–";
                        TableRow.children["traffic"].innerHTML = "–";
                        TableRow.children["cpu"].children[0].children[0].className = "progress-bar progress-bar-danger";
                        TableRow.children["cpu"].children[0].children[0].style.width = "100%";
                        TableRow.children["cpu"].children[0].children[0].innerHTML = "<small>维护中</small>";
                        TableRow.children["memory"].children[0].children[0].className = "progress-bar progress-bar-danger";
                        TableRow.children["memory"].children[0].children[0].style.width = "100%";
                        TableRow.children["memory"].children[0].children[0].innerHTML = "<small>维护中</small>";
                        TableRow.children["hdd"].children[0].children[0].className = "progress-bar progress-bar-danger";
                        TableRow.children["hdd"].children[0].children[0].style.width = "100%";
                        TableRow.children["hdd"].children[0].children[0].innerHTML = "<small>维护中</small>";
                        server_status[i] = false;
                } else {
                    //collapse
                    (function (rowId) {
                        TableRow.onclick = function () {
                            // var rowId = this.id.match(/\d/g);
                            ExpandRow = document.querySelector("#servers #rt" + rowId);
                            toggleCollapse(ExpandRow);
                        }
                    })(i);
                    // Uptime
                    TableRow.children["uptime"].innerHTML = result.servers[i].uptime;

                    // Load
                    if (result.servers[i].load == -1) {
                        TableRow.children["load"].innerHTML = "–";
                    } else {
                        TableRow.children["load"].innerHTML = result.servers[i].load;
                    }

                    // Network
                    var netstr = "";
                    if (result.servers[i].network_rx < 1000)
                        netstr += result.servers[i].network_rx.toFixed(0) + "B";
                    else if (result.servers[i].network_rx < 1000 * 1000)
                        netstr += (result.servers[i].network_rx / 1000).toFixed(0) + "K";
                    else
                        netstr += (result.servers[i].network_rx / 1000 / 1000).toFixed(1) + "M";
                    netstr += " | "
                    if (result.servers[i].network_tx < 1000)
                        netstr += result.servers[i].network_tx.toFixed(0) + "B";
                    else if (result.servers[i].network_tx < 1000 * 1000)
                        netstr += (result.servers[i].network_tx / 1000).toFixed(0) + "K";
                    else
                        netstr += (result.servers[i].network_tx / 1000 / 1000).toFixed(1) + "M";
                    TableRow.children["network"].innerHTML = netstr;

                    //Traffic
                    var trafficstr = "";
                    if (result.servers[i].network_in < 1024)
                        trafficstr += result.servers[i].network_in.toFixed(0) + "B";
                    else if (result.servers[i].network_in < 1024 * 1024)
                        trafficstr += (result.servers[i].network_in / 1024).toFixed(0) + "K";
                    else if (result.servers[i].network_in < 1024 * 1024 * 1024)
                        trafficstr += (result.servers[i].network_in / 1024 / 1024).toFixed(1) + "M";
                    else if (result.servers[i].network_in < 1024 * 1024 * 1024 * 1024)
                        trafficstr += (result.servers[i].network_in / 1024 / 1024 / 1024).toFixed(2) + "G";
                    else
                        trafficstr += (result.servers[i].network_in / 1024 / 1024 / 1024 / 1024).toFixed(2) + "T";
                    trafficstr += " | "
                    if (result.servers[i].network_out < 1024)
                        trafficstr += result.servers[i].network_out.toFixed(0) + "B";
                    else if (result.servers[i].network_out < 1024 * 1024)
                        trafficstr += (result.servers[i].network_out / 1024).toFixed(0) + "K";
                    else if (result.servers[i].network_out < 1024 * 1024 * 1024)
                        trafficstr += (result.servers[i].network_out / 1024 / 1024).toFixed(1) + "M";
                    else if (result.servers[i].network_out < 1024 * 1024 * 1024 * 1024)
                        trafficstr += (result.servers[i].network_out / 1024 / 1024 / 1024).toFixed(2) + "G";
                    else
                        trafficstr += (result.servers[i].network_out / 1024 / 1024 / 1024 / 1024).toFixed(2) + "T";
                    TableRow.children["traffic"].innerHTML = trafficstr;

                    // CPU
                    if (result.servers[i].cpu >= 90)
                        TableRow.children["cpu"].children[0].children[0].className = "progress-bar progress-bar-danger";
                    else if (result.servers[i].cpu >= 80)
                        TableRow.children["cpu"].children[0].children[0].className = "progress-bar progress-bar-warning";
                    else
                        TableRow.children["cpu"].children[0].children[0].className = "progress-bar progress-bar-success";
                    TableRow.children["cpu"].children[0].children[0].style.width = result.servers[i].cpu + "%";
                    TableRow.children["cpu"].children[0].children[0].innerHTML = result.servers[i].cpu + "%";

                    // Memory
                    //var Mem = ((result.servers[i].memory_used/result.servers[i].memory_total)*100.0).toFixed(0);
                    if (Mem >= 90)
                        TableRow.children["memory"].children[0].children[0].className = "progress-bar progress-bar-danger";
                    else if (Mem >= 80)
                        TableRow.children["memory"].children[0].children[0].className = "progress-bar progress-bar-warning";
                    else
                        TableRow.children["memory"].children[0].children[0].className = "progress-bar progress-bar-success";
                    TableRow.children["memory"].children[0].children[0].style.width = Mem + "%";
                    TableRow.children["memory"].children[0].children[0].innerHTML = Mem + "%";
                    ExpandRow.children["expand_mem"].innerHTML = "内存信息: " + bytesToSize(result.servers[i].memory_used * 1024, 2) + " / " + bytesToSize(result.servers[i].memory_total * 1024, 2);
                    // Swap
                    ExpandRow.children["expand_swap"].innerHTML = "交换分区: " + bytesToSize(result.servers[i].swap_used * 1024, 2) + " / " + bytesToSize(result.servers[i].swap_total * 1024, 2);

                    // HDD
                    var HDD = ((result.servers[i].hdd_used / result.servers[i].hdd_total) * 100.0).toFixed(0);
                    if (HDD >= 90)
                        TableRow.children["hdd"].children[0].children[0].className = "progress-bar progress-bar-danger";
                    else if (HDD >= 80)
                        TableRow.children["hdd"].children[0].children[0].className = "progress-bar progress-bar-warning";
                    else
                        TableRow.children["hdd"].children[0].children[0].className = "progress-bar progress-bar-success";
                    TableRow.children["hdd"].children[0].children[0].style.width = HDD + "%";
                    TableRow.children["hdd"].children[0].children[0].innerHTML = HDD + "%";
                    ExpandRow.children["expand_hdd"].innerHTML = "硬盘信息: " + bytesToSize(result.servers[i].hdd_used * 1024 * 1024, 2) + " / " + bytesToSize(result.servers[i].hdd_total * 1024 * 1024, 2);

                    // Custom
                    if (result.servers[i].custom) {
                        ExpandRow.children["expand_custom"].innerHTML = result.servers[i].custom
                    } else {
                        ExpandRow.children["expand_custom"].innerHTML = ""
                    }
                }
            }
            var cards = document.getElementById("cards");
            cards.innerHTML = shinnerhtml;
            d = new Date(result.updated * 1000);
            error = 0;
        } else {
            document.querySelectorAll("#servers > tr.tableRow").forEach(function (TableRow, i) {
                TableRow.onclick = null;
                // var ExpandRow = document.querySelector("#servers #rt" + i);
                TableRow.children["online4"].children[0].children[0].className = "progress-bar progress-bar-error";
                TableRow.children["online4"].children[0].children[0].innerHTML = "<small>错误</small>";
                //TableRow.children["online6"].children[0].children[0].className = "progress-bar progress-bar-error";
                //TableRow.children["online6"].children[0].children[0].innerHTML = "<small>错误</small>";
                TableRow.children["uptime"].innerHTML = "<div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-error\"><small>错误</small></div></div>";
                TableRow.children["load"].innerHTML = "<div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-error\"><small>错误</small></div></div>";
                TableRow.children["network"].innerHTML = "<div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-error\"><small>错误</small></div></div>";
                TableRow.children["traffic"].innerHTML = "<div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-error\"><small>错误</small></div></div>";
                TableRow.children["cpu"].children[0].children[0].className = "progress-bar progress-bar-error";
                TableRow.children["cpu"].children[0].children[0].style.width = "100%";
                TableRow.children["cpu"].children[0].children[0].innerHTML = "<small>错误</small>";
                TableRow.children["memory"].children[0].children[0].className = "progress-bar progress-bar-error";
                TableRow.children["memory"].children[0].children[0].style.width = "100%";
                TableRow.children["memory"].children[0].children[0].innerHTML = "<small>错误</small>";
                TableRow.children["hdd"].children[0].children[0].className = "progress-bar progress-bar-error";
                TableRow.children["hdd"].children[0].children[0].style.width = "100%";
                TableRow.children["hdd"].children[0].children[0].innerHTML = "<small>错误</small>";
                server_status[i] = false;
            });
            document.querySelectorAll("div.collapsed").forEach(function(expandRow, i) {
                if(expandRow.offsetHeight) expandRow.style.height = "0px";
            });
            error = 1;
            document.getElementById("updated").innerHTML = "更新错误";
        }
    });
}

function getJSON(callback) {
    var url = "json/stats.json";
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        var result = null;
        if (request.status == 200) result = JSON.parse(request.responseText);
        callback(result);
    }
}
//更新时间
function timeSince(date) {
    if (date == 0)
        return "从未.";

    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1)
        return interval + " 年前.";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1)
        return interval + " 月前.";
    interval = Math.floor(seconds / 86400);
    if (interval > 1)
        return interval + " 日前.";
    interval = Math.floor(seconds / 3600);
    if (interval > 1)
        return interval + " 小时前.";
    interval = Math.floor(seconds / 60);
    if (interval > 1)
        return interval + " 分钟前.";
    /*if(Math.floor(seconds) >= 5)
        return Math.floor(seconds) + " seconds";*/
    else
        return "几秒前.";
}
function updateTime() {
    if (!error) document.getElementById("updated").innerHTML = "最后更新: " + timeSince(d);
}

//折叠
function toggleCollapse(row) {
    if (row.offsetHeight) ExpandRowMove(row, "height", 0, 3);
    else ExpandRowMove(row, "height", 49, 3);
}
function ExpandRowMove(obj, attr, target, speed, callback) {
    clearInterval(obj.timer);
    var current = parseInt(getComputedStyle(obj, null)[attr]);
    if (current > target) {
        speed = -speed;
    }
    obj.timer = setInterval(function () {
        var oldVal = parseInt(getComputedStyle(obj, null)[attr]);
        var newVal = oldVal + speed;
        if ((speed < 0 && newVal < target) || (speed > 0 && newVal > target)) newVal = target;
        obj.style[attr] = newVal + "px";
        if (newVal == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 15);
}
//单位转换
function bytesToSize(bytes, precision, si) {
    var ret;
    si = typeof si !== 'undefined' ? si : 0;
    if (si != 0) {
        var kilobyte = 1000;
        var megabyte = kilobyte * 1000;
        var gigabyte = megabyte * 1000;
        var terabyte = gigabyte * 1000;
    } else {
        var kilobyte = 1024;
        var megabyte = kilobyte * 1024;
        var gigabyte = megabyte * 1024;
        var terabyte = gigabyte * 1024;
    }

    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';

    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        ret = (bytes / kilobyte).toFixed(precision) + ' K';

    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        ret = (bytes / megabyte).toFixed(precision) + ' M';

    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        ret = (bytes / gigabyte).toFixed(precision) + ' G';

    } else if (bytes >= terabyte) {
        ret = (bytes / terabyte).toFixed(precision) + ' T';

    } else {
        return bytes + ' B';
    }
    if (si != 0) {
        return ret + 'B';
    } else {
        return ret + 'iB';
    }
}
//darkmode
if (document.getElementById("darkmodeButton")) {
    document.getElementById("darkmodeButton").onclick = function () {
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
}