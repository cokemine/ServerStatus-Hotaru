// serverstatus.js
// var result = null;
/** @typedef {Object} json
 * @property {Array} servers
 *  @param servers[].memory_used
 *  @param servers[].memory_total
 *  @param servers[].swap_total
 *  @param servers[].swap_used
 *  @param servers[].network_rx
 *  @param servers[].network_tx
 *  @param servers[].online4
 *  @param servers[].online6
 *  @param servers[].network_in
 *  @param servers[].network_out
 *  @param servers[].hdd_used
 *  @param servers[].hdd_total
 *  @param servers[].cpu
 *  @param servers[].uptime
 *  @param servers[].custom
 * @property {String} updated
 */


var error = 0;
var d = 0;
var server_status = [];
uptime();
setInterval(uptime, 2000);
setInterval(updateTime, 500);

function uptime() {
    getJSON(function (result) {
        if (result) {
            console.log(result);
            if (result.reload) setTimeout(function () {
                location.reload();
            }, 1000);
            //下方卡片
            var shstr = '<div class="col-lg-4 col-md-4 col-sm-4">' +
                ' <div class="panel panel-block panel-block-sm panel-location">' +
                '<div class="location-header">' +
                ' <h3 class="h4"><img src="img/clients/@region.png" alt="@region"> @name <small>@type</small></h3>' +
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
            loadingNotice && loadingNotice.parentNode.removeChild(loadingNotice);
            for (var i = 0, length = result.servers.length; i < length; i++) {
                //Cards Start
                // Memory
                var Mem = ((result.servers[i].memory_used / result.servers[i].memory_total) * 100.0).toFixed(0);
                // Network
                var newnetstr = createStr(result.servers[i].network_rx, false) + " | " + createStr(result.servers[i].network_tx, false);
                shinnerhtml += shstr.replace("@name", result.servers[i].name).replace("@network_rxandnetwork_tx", newnetstr).replace("@type", result.servers[i].type).replace("@online", (result.servers[i].online4 || result.servers[i].online6) ? 'text-success' : 'text-error').replace("@location", result.servers[i].location).replace("@Mem", Mem).replace("@load", result.servers[i].load).replace("@region", result.servers[i].region);
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
                    ExpandRowNode.innerHTML = "<td colspan=\"12\"><div class=\"overflow collapsed\" id=\"rt" + i + "\">" +
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
                if (result.servers[i].online4 || result.servers[i].online6) {
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
                    TableRow.onclick = null;
                    server_status[i] = false;
                    if (ExpandRow.offsetHeight) ExpandRow.className += " collapsed";
                } else {
                    //collapse
                    (function (i) {
                            TableRow.onclick = function () {
                                var ExpandRow = document.querySelector("#servers #rt" + i);
                                toggleCollapse(ExpandRow);
                            }
                        }
                    )(i)
                    // Uptime
                    TableRow.children["uptime"].innerHTML = result.servers[i].uptime;

                    // Load
                    if (result.servers[i].load === -1) {
                        TableRow.children["load"].innerHTML = "–";
                    } else {
                        TableRow.children["load"].innerHTML = result.servers[i].load;
                    }

                    // Network
                    TableRow.children["network"].innerHTML = createStr(result.servers[i].network_rx, false) + " | " + createStr(result.servers[i].network_tx, false);

                    //Traffic
                    TableRow.children["traffic"].innerHTML = createStr(result.servers[i].network_in, false) + " | " + createStr(result.servers[i].network_out, false);

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
                    //Mem = ((result.servers[i].memory_used/result.servers[i].memory_total)*100.0).toFixed(0);
                    if (Mem >= 90)
                        TableRow.children["memory"].children[0].children[0].className = "progress-bar progress-bar-danger";
                    else if (Mem >= 80)
                        TableRow.children["memory"].children[0].children[0].className = "progress-bar progress-bar-warning";
                    else
                        TableRow.children["memory"].children[0].children[0].className = "progress-bar progress-bar-success";
                    TableRow.children["memory"].children[0].children[0].style.width = Mem + "%";
                    TableRow.children["memory"].children[0].children[0].innerHTML = Mem + "%";
                    ExpandRow.children["expand_mem"].innerHTML = "内存信息: " + createStr(result.servers[i].memory_used * 1024, true) + " / " + createStr(result.servers[i].memory_total * 1024, true);
                    // Swap
                    ExpandRow.children["expand_swap"].innerHTML = "交换分区: " + createStr(result.servers[i].swap_used * 1024, true) + " / " + createStr(result.servers[i].swap_total * 1024, true);

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
                    ExpandRow.children["expand_hdd"].innerHTML = "硬盘信息: " + createStr(result.servers[i].hdd_used * 1024 * 1024, true) + " / " + createStr(result.servers[i].hdd_total * 1024 * 1024, true);

                    // Custom
                    if (result.servers[i].custom) {
                        ExpandRow.children["expand_custom"].innerHTML = result.servers[i].custom;
                    } else {
                        ExpandRow.children["expand_custom"].innerHTML = "";
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
        if (request.status === 200) result = JSON.parse(request.responseText);
        callback(result);
    }
}

//更新时间
function timeSince(date) {
    if (!date)
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
    var beginHeight = row.offsetHeight;
    toggleClass(row);
    var endHeight = row.offsetHeight;
    row.style.height = beginHeight + "px";
    ExpandRowMove(row, "height", endHeight, 3, function () {
        row.style.height = "";
    });
}

function toggleClass(row) {
    var reg = new RegExp("\\b collapsed\\b");
    if (!reg.test(row.className)) row.className += " collapsed";
    else row.className = row.className.replace(reg, "");
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
        if (newVal === target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 15);
}

function createStr(data, f) {
    var str;
    if (f) {
        if (data < 1024)
            str = data.toFixed(0) + " B";
        else if (data < 1024 * 1024)
            str = (data / 1024).toFixed(2) + " KiB";
        else if (data < 1024 * 1024 * 1024)
            str = (data / 1024 / 1024).toFixed(2) + " MiB";
        else if (data < 1024 * 1024 * 1024 * 1024)
            str = (data / 1024 / 1024 / 1024).toFixed(2) + " GiB";
        else
            str = (data / 1024 / 1024 / 1024 / 1024).toFixed(2) + " TiB";
    } else {
        if (data < 1024)
            str = data.toFixed(0) + "B";
        else if (data < 1024 * 1024)
            str = (data / 1024).toFixed(0) + "K";
        else if (data < 1024 * 1024 * 1024)
            str = (data / 1024 / 1024).toFixed(1) + "M";
        else if (data < 1024 * 1024 * 1024 * 1024)
            str = (data / 1024 / 1024 / 1024).toFixed(2) + "G";
        else
            str = (data / 1024 / 1024 / 1024 / 1024).toFixed(2) + "T";
    }
    return str;
}

//darkmode
if (document.getElementById("darkmodeButton")) {
    var night = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*=\s*([^;]*).*$)|^.*$/, "$1") || '0');
    if (night) {
        document.body.classList.add('dark');
        console.log('Dark mode on', night);
    }
    document.getElementById("darkmodeButton").onclick = function () {
        night = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*=\s*([^;]*).*$)|^.*$/, "$1") || '0');
        if (!night) {
            document.body.classList.add('dark');
            document.cookie = "dark=1";
            console.log('Dark mode on', night);
        } else {
            document.body.classList.remove('dark');
            document.cookie = "dark=0";
            console.log('Dark mode off', night);
        }
    }
} else {
    document.cookie && (document.cookie = "");
    console.log('Darkmode not Support');
}