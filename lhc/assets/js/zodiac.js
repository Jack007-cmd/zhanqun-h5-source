function zostrokecanvashk(d, f, A, g) {
  var t = 1084;
  $(".c1").attr("width", t);
  var h = f.length;
  var o = (t / 772) * 70 * f.length + 100;
  $(".c1").attr("height", o);
  var y = t * 0.06666667
    , x = (t / 750) * 120
    , w = t * 0.97333333;
  var m = t * 0.04;
  var r = {};
  if (!document.getElementsByTagName("canvas") || document.getElementsByTagName("canvas").length == 0) {
    setTimeout(function () {
      zostrokecanvashk(d, f, A, g)
    }, 100);
    return;
  }
  var u = document.getElementsByTagName("canvas")[0].getContext("2d");
  u.textBaseline = "alphabetic";
  u.shadowBlur = "";
  u.font = "normal normal 100 " + t / 750 * 30 + "px PingFang SC Light";
  u.fillStyle = "#333333";
  u.fillText("期数", y - m, (t / 750) * 35);
  u.beginPath();
  u.moveTo(t * 0.12, (t / 750) * 15.5);
  u.lineTo(t * 0.12, (t / 750) * 40.5);
  u.strokeStyle = "#999";
  u.lineWidth = 1;
  u.stroke();
  if (g) {
    $(".c1").addClass("animated bounceInLeft")
  } else {
    $(".c1").addClass("animated bounceInRight")
  }
  var e = 159;
  var j = [];
  for (var s = 0; s < A.length; s++) {
    j.push(e);
    u.fillStyle = "#666666";
    u.fillText(A[s], e, (t / 750) * 35);
    e += 77.0833
  }
  u.beginPath();
  u.moveTo(0, (t / 750) * 55.5);
  u.lineTo(t, (t / 750) * 55.5);
  u.strokeStyle = "#E0E0E0";
  u.lineWidth = 1;
  u.stroke();

  function k(F, c, E, a, D, b) {
    b = b === undefined ? 5 : b;
    var p = a - c;
    var n = D - E;
    var C = Math.floor(Math.sqrt(p * p + n * n) / b);
    for (var B = 0; B < C; ++B) {
      F[B % 2 === 0 ? "moveTo" : "lineTo"](c + (p / C) * B, E + (n / C) * B)
    }
    F.stroke()
  }

  u.translate(0.5, 0.5);
  for (var v = 0; v < f.length; v++) {
    u.lineWidth = 0.7;
    u.strokeStyle = "#DADADA";
    u.beginPath();
    k(u, y + 35, x, w, x, 5.5);
    u.stroke();
    r[v] = x;
    u.fillStyle = "#989898";
    u.font = "normal normal 100 " + t / 750 * 30 + "px  微软雅黑 Regular";
    u.fillText(f[v], y - m, x + 15);
    x += (t / 750) * 65
  }
  u.beginPath();
  var l = ((t * 0.97333333) - (t * 0.14666667)) / 50;
  var q = 0;
  for (var q = 0; q < d.length; q++) {
    if (q == 0) {
      u.moveTo(j[d[q]] + 20, r[q])
    }
    u.lineTo(j[d[q]] + 20, r[q]);
    u.strokeStyle = "#FA213C";
    u.lineWidth = 1;
    // if (q == h) {
    //   clearInterval(abb)
    // }
    u.lineJoin = "bevel ";
    u.stroke();
    u.beginPath();
    u.moveTo(j[d[q]] + 20, r[q]);
    if (q != 0) {
      z(q - 1);
      z(q)
    }
  }

  function z(a) {
    u.font = "normal normal 100 " + t / 750 * 30 + "px PingFang SC Light";
    u.beginPath();
    u.arc(j[d[a]] + 20, r[a], +t / 750 * 12, 0, 2 * Math.PI);
    u.fillStyle = "#FA213C";
    u.fill();
    u.fillStyle = "#666";
    u.fillText(A[d[a]], j[d[a]] + 20 - 10 * 2, r[a] - 15 * 2)
  }
}


function zostrokecanvasjs(d, f, A) {
  var s = 1084;
  $(".c1").attr("width", s);
  // if (d.length > url.les) {
  //   d = d.slice(0, url.les);
  //   f = f.slice(0, url.les);
  //   A = A.slice(0, url.les);
  // }
  var g = f.length;
  var m = (s / 772) * 65 * (f.length + 5);
  $(".c1").attr("height", m);
  var y = s * 0.06666667
    , w = (s / 750) * 120
    , v = s * 0.97333333;
  var l = s * 0.04;
  var q = {};
  if (!document.getElementsByTagName("canvas") || document.getElementsByTagName("canvas").length == 0) {
    setTimeout(function () {
      zostrokecanvasjs(d, f, A)
    }, 100);
    return;
  }
  var t = document.getElementsByTagName("canvas")[0].getContext("2d");
  t.textBaseline = "alphabetic";
  t.shadowBlur = "";
  t.font = "normal normal 100 " + s / 750 * 30 + "px PingFang SC Light";
  t.fillStyle = "#333333";
  t.fillText("期数", (y - l) * 3, (s / 750) * 35);
  t.beginPath();
  t.moveTo(s * 0.2, (s / 750) * 15.5);
  t.lineTo(s * 0.2, (s / 750) * 40.5);
  t.strokeStyle = "#999";
  t.lineWidth = 1;
  t.stroke();
  var e = 250;
  var h = [];
  for (var r = 0; r < A.length; r++) {
    h.push(e);
    t.fillStyle = "#666666";
    t.fillText(A[r], e, (s / 750) * 35);
    e += 69
  }
  t.beginPath();
  t.moveTo(0, (s / 750) * 55.5);
  t.lineTo(s, (s / 750) * 55.5);
  t.strokeStyle = "#E0E0E0";
  t.lineWidth = 1;
  t.stroke();

  function j(F, c, E, a, D, b) {
    b = b === undefined ? 5 : b;
    var p = a - c;
    var n = D - E;
    var C = Math.floor(Math.sqrt(p * p + n * n) / b);
    for (var B = 0; B < C; ++B) {
      F[B % 2 === 0 ? "moveTo" : "lineTo"](c + (p / C) * B, E + (n / C) * B)
    }
    F.stroke()
  }

  t.translate(0.5, 0.5);
  for (var u = 0; u < f.length; u++) {
    t.lineWidth = 1;
    t.strokeStyle = "#DADADA";
    t.beginPath();
    j(t, 250, w, v, w, 5.5);
    t.stroke();
    q[u] = w;
    t.fillStyle = "#989898";
    t.font = "normal normal 100 " + s / 750 * 30 + "px 微软雅黑 Regular";
    var x = f[u].toString().length;
    f[u] = x > 6 ? f[u].toString().slice(x - 6) : f[u];
    t.fillText(f[u] + "期", y - l, w + 15);
    w += (s / 750) * 65
  }
  t.beginPath();
  var k = ((s * 0.97333333) - (s * 0.14666667)) / 50;
  var o = 0;
  for (var o = 0; o < d.length; o++) {
    if (o == 0) {
      t.moveTo(h[d[o]] + 20, q[o])
    }
    t.lineTo(h[d[o]] + 20, q[o]);
    t.strokeStyle = "#FA213C";
    t.lineWidth = 1;
    // if (o == g) {
    //   clearInterval(abb)
    // }
    t.lineJoin = "bevel ";
    t.stroke();
    t.beginPath();
    t.moveTo(h[d[o]] + 20, q[o]);
    if (o != 0) {
      z(o - 1);
      z(o)
    }
  }

  function z(a) {
    t.font = "normal normal 100 " + s / 750 * 30 + "px PingFang SC Light";
    t.beginPath();
    t.arc(h[d[a]] + 20, q[a], +s / 750 * 12, 0, 2 * Math.PI);
    t.fillStyle = "#FA213C";
    t.fill();
    t.fillStyle = "#666";
    t.fillText(A[d[a]], h[d[a]] + 20 - 10 * 2, q[a] - 15 * 2)
  }
}
