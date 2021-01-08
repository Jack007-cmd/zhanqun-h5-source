function tmstrokecanvas(g, z) {
  arr = g;
  if (z.length == 10) {
    var d = 110
  } else {
    if (z.length == 12) {
      var d = 88.0833
    }
  }
  var e = $(".text_left>.title>li").height();
  var s = 1084;
  $(".c1").attr("width", s);
  var h = arr.length;
  var m = 1.45 * 87.5 * (g.length + 1);
  $(".c1").attr("height", m);
  var x = s * 0.06666667
    , w = (s / 750) * 176
    , v = s * 0.97333333;
  var l = 0;
  var q = {};
  if (!document.getElementsByTagName("canvas") || document.getElementsByTagName("canvas").length == 0) {
    setTimeout(function () {
      tmstrokecanvas(g, z)
    }, 100);
    return;
  }
  var t = document.getElementsByTagName("canvas")[0].getContext("2d");
  t.clearRect(0, 0, 20000, 20000);
  t.textBaseline = "alphabetic";
  t.shadowBlur = "";
  t.font = "normal normal 100 " + s / 750 * 40 + "px PingFang SC Light";
  t.fillStyle = "#333333";
  t.beginPath();
  var f = 30;
  var j = [];
  for (var r = 0; r < z.length; r++) {
    j.push(f);
    t.fillStyle = "#666666";
    t.fillText(z[r], f, (s / 750) * 55);
    f += d
  }
  t.beginPath();
  t.moveTo(0, (s / 750) * 88);
  t.lineTo(s, (s / 750) * 88);
  t.strokeStyle = "#E0E0E0";
  t.lineWidth = 2;
  t.stroke();
  t.translate(0.5, 0.5);
  for (var u = 0; u < arr.length; u++) {
    t.lineWidth = 0.7;
    t.strokeStyle = "#DADADA";
    t.beginPath();
    t.fillStyle = "#F2F2F2";
    if (u % 2 == 0) {
      t.fillRect(0, w - 125, 1084, 125)
    }
    q[u] = w - 35;
    w += (s / 750) * 87.768
  }
  t.beginPath();
  var k = ((s * 0.97333333) - (s * 0.14666667)) / 50;
  var o = 0;
  for (var o = 0; o < arr.length; o++) {
    if (o == 0) {
      t.moveTo(j[arr[o]] + 20, q[o])
    }
    t.lineTo(j[arr[o]] + 20, q[o]);
    t.strokeStyle = "#FA213C";
    t.lineWidth = 2;
    if (o == h) {
      clearInterval(abb)
    }
    t.lineJoin = "bevel ";
    t.stroke();
    t.beginPath();
    t.moveTo(j[arr[o]] + 20, q[o]);
    if (o != 0) {
      if (o == 1) {
        y(o - 1);
        y(o);
      } else {
        y(o);
      }
    }
  }

  function y(a) {
    t.font = "normal normal 100 " + s / 750 * 35 + "px PingFang SC Light";
    t.beginPath();
    t.arc(j[arr[a]] + 20, q[a], +s / 750 * 15, 0, 2 * Math.PI);
    t.fillStyle = "#FA213C";
    t.fill();
    t.fillStyle = "#666";
    t.fillText(z[arr[a]], j[arr[a]] + 20 - 10 * 2, q[a] - 15 * 2);
  }
}
