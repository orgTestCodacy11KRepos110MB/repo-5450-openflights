var HintClass = "hintTextbox";var HintActiveClass = "hintTextboxActive";String.prototype.trim = (function () {return this.replace(/^\s+|\s+$/g, "");});
function initHintTextboxes() {var inputs = document.getElementsByTagName("input");for (i = 0; i < inputs.length; i++) {var input = inputs[i];if (input.type != "text") {continue;}if (input.className.indexOf(HintClass) != -1) {input.hintText = input.value;input.className = HintClass;input.onfocus = onHintTextboxFocus;input.onblur = onHintTextboxBlur;}}}

function resetHintTextboxes() {var inputs = document.getElementsByTagName("input");for (i = 0; i < inputs.length; i++) {var input = inputs[i];if (input.type != "text") {continue;}if (input.className.indexOf(HintClass) != -1) {input.className = HintClass;input.value = input.hintText;input.style.color = "#888";}}}

function onHintTextboxFocus() {var input = this;if (input.value.trim() == input.hintText) {input.value = "";input.className = HintActiveClass;}input.style.color = "#000";}

function onHintTextboxBlur() {var input = this;if (input.value.trim().length == 0) {input.style.color = "#888";input.value = input.hintText;input.className = HintClass;}}
var jg_ihtm, jg_ie, jg_fast, jg_dom, jg_moz, jg_n4 = (document.layers && typeof document.classes != "undefined");
function chkDHTM(x, i) {x = document.body || null;jg_ie = x && typeof x.insertAdjacentHTML != "undefined";jg_dom = (x && !jg_ie && typeof x.appendChild != "undefined" && typeof document.createRange != "undefined" && typeof (i = document.createRange()).setStartBefore != "undefined" && typeof i.createContextualFragment != "undefined");jg_ihtm = !jg_ie && !jg_dom && x && typeof x.innerHTML != "undefined";jg_fast = jg_ie && document.all && !window.opera;jg_moz = jg_dom && typeof x.style.MozOpacity != "undefined";}

function pntDoc() {this.wnd.document.write(jg_fast ? this.htmRpc() : this.htm);this.htm = "";}

function pntCnvDom() {var x = document.createRange();x.setStartBefore(this.cnv);x = x.createContextualFragment(jg_fast ? this.htmRpc() : this.htm);this.cnv.appendChild(x);this.htm = "";}

function pntCnvIe() {this.cnv.insertAdjacentHTML("BeforeEnd", jg_fast ? this.htmRpc() : this.htm);this.htm = "";}

function pntCnvIhtm() {this.cnv.innerHTML += this.htm;this.htm = "";}

function pntCnv() {this.htm = "";}

function mkDiv(x, y, w, h) {this.htm += "<div style=\"position:absolute;" + "left:" + x + "px;" + "top:" + y + "px;" + "width:" + w + "px;" + "height:" + h + "px;" + "clip:rect(0," + w + "px," + h + "px,0);" + "background-color:" + this.color + (!jg_moz ? ";overflow:hidden" : "") + ";\"></div>";}

function mkDivIe(x, y, w, h) {this.htm += "%%" + this.color + ";" + x + ";" + y + ";" + w + ";" + h + ";";}

function mkDivPrt(x, y, w, h) {this.htm += "<div style=\"position:absolute;" + "border-left:" + w + "px solid " + this.color + ";" + "left:" + x + "px;" + "top:" + y + "px;" + "width:0px;" + "height:" + h + "px;" + "clip:rect(0," + w + "px," + h + "px,0);" + "background-color:" + this.color + (!jg_moz ? ";overflow:hidden" : "") + ";\"></div>";}

function mkLyr(x, y, w, h) {this.htm += "<layer " + "left=\"" + x + "\" " + "top=\"" + y + "\" " + "width=\"" + w + "\" " + "height=\"" + h + "\" " + "bgcolor=\"" + this.color + "\"></layer>\n";}
var regex = /%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g;
function htmRpc() {return this.htm.replace(regex, "<div style=\"overflow:hidden;position:absolute;background-color:$1;left:$2;top:$3;width:$4;height:$5\"></div>\n");}

function htmPrtRpc() {return this.htm.replace(regex, "<div style=\"overflow:hidden;position:absolute;background-color:$1;left:$2;top:$3;width:$4;height:$5;border-left:$4px solid $1\"></div>\n");}

function mkLin(x1, y1, x2, y2) {if (x1 > x2) {var _x2 = x2;var _y2 = y2;x2 = x1;y2 = y1;x1 = _x2;y1 = _y2;}var dx = x2 - x1, dy = Math.abs(y2 - y1), x = x1, y = y1, yIncr = (y1 > y2) ? -1 : 1;if (dx >= dy) {var pr = dy << 1, pru = pr - (dx << 1), p = pr - dx, ox = x;while ((dx--) > 0) {++x;if (p > 0) {this.mkDiv(ox, y, x - ox, 1);y += yIncr;p += pru;ox = x;} else {p += pr;}}this.mkDiv(ox, y, x2 - ox + 1, 1);} else {var pr = dx << 1, pru = pr - (dy << 1), p = pr - dy, oy = y;if (y2 <= y1) {while ((dy--) > 0) {if (p > 0) {this.mkDiv(x++, y, 1, oy - y + 1);y += yIncr;p += pru;oy = y;} else {y += yIncr;p += pr;}}this.mkDiv(x2, y2, 1, oy - y2 + 1);} else {while ((dy--) > 0) {y += yIncr;if (p > 0) {this.mkDiv(x++, oy, 1, y - oy);p += pru;oy = y;} else {p += pr;}}this.mkDiv(x2, oy, 1, y2 - oy + 1);}}}

function mkLin2D(x1, y1, x2, y2) {if (x1 > x2) {var _x2 = x2;var _y2 = y2;x2 = x1;y2 = y1;x1 = _x2;y1 = _y2;}var dx = x2 - x1, dy = Math.abs(y2 - y1), x = x1, y = y1, yIncr = (y1 > y2) ? -1 : 1;var s = this.stroke;if (dx >= dy) {if (dx > 0 && s - 3 > 0) {var _s = (s * dx * Math.sqrt(1 + dy * dy / (dx * dx)) - dx - (s >> 1) * dy) / dx;_s = (!(s - 4) ? Math.ceil(_s) : Math.round(_s)) + 1;} else {var _s = s;}var ad = Math.ceil(s / 2);var pr = dy << 1, pru = pr - (dx << 1), p = pr - dx, ox = x;while ((dx--) > 0) {++x;if (p > 0) {this.mkDiv(ox, y, x - ox + ad, _s);y += yIncr;p += pru;ox = x;} else {p += pr;}}this.mkDiv(ox, y, x2 - ox + ad + 1, _s);} else {if (s - 3 > 0) {var _s = (s * dy * Math.sqrt(1 + dx * dx / (dy * dy)) - (s >> 1) * dx - dy) / dy;_s = (!(s - 4) ? Math.ceil(_s) : Math.round(_s)) + 1;} else {var _s = s;}var ad = Math.round(s / 2);var pr = dx << 1, pru = pr - (dy << 1), p = pr - dy, oy = y;if (y2 <= y1) {++ad;while ((dy--) > 0) {if (p > 0) {this.mkDiv(x++, y, _s, oy - y + ad);y += yIncr;p += pru;oy = y;} else {y += yIncr;p += pr;}}this.mkDiv(x2, y2, _s, oy - y2 + ad);} else {while ((dy--) > 0) {y += yIncr;if (p > 0) {this.mkDiv(x++, oy, _s, y - oy + ad);p += pru;oy = y;} else {p += pr;}}this.mkDiv(x2, oy, _s, y2 - oy + ad + 1);}}}

function mkLinDott(x1, y1, x2, y2) {if (x1 > x2) {var _x2 = x2;var _y2 = y2;x2 = x1;y2 = y1;x1 = _x2;y1 = _y2;}var dx = x2 - x1, dy = Math.abs(y2 - y1), x = x1, y = y1, yIncr = (y1 > y2) ? -1 : 1, drw = true;if (dx >= dy) {var pr = dy << 1, pru = pr - (dx << 1), p = pr - dx;while ((dx--) > 0) {if (drw) {this.mkDiv(x, y, 1, 1);}drw = !drw;if (p > 0) {y += yIncr;p += pru;} else {p += pr;}++x;}if (drw) {this.mkDiv(x, y, 1, 1);}} else {var pr = dx << 1, pru = pr - (dy << 1), p = pr - dy;while ((dy--) > 0) {if (drw) {this.mkDiv(x, y, 1, 1);}drw = !drw;y += yIncr;if (p > 0) {++x;p += pru;} else {p += pr;}}if (drw) {this.mkDiv(x, y, 1, 1);}}}

function mkOv(left, top, width, height) {var a = width >> 1, b = height >> 1, wod = width & 1, hod = (height & 1) + 1, cx = left + a, cy = top + b, x = 0, y = b, ox = 0, oy = b, aa = (a * a) << 1, bb = (b * b) << 1, st = (aa >> 1) * (1 - (b << 1)) + bb, tt = (bb >> 1) - aa * ((b << 1) - 1), w, h;while (y > 0) {if (st < 0) {st += bb * ((x << 1) + 3);tt += (bb << 1) * (++x);} else {if (tt < 0) {st += bb * ((x << 1) + 3) - (aa << 1) * (y - 1);tt += (bb << 1) * (++x) - aa * (((y--) << 1) - 3);w = x - ox;h = oy - y;if (w & 2 && h & 2) {this.mkOvQds(cx, cy, -x + 2, ox + wod, -oy, oy - 1 + hod, 1, 1);this.mkOvQds(cx, cy, -x + 1, x - 1 + wod, -y - 1, y + hod, 1, 1);} else {this.mkOvQds(cx, cy, -x + 1, ox + wod, -oy, oy - h + hod, w, h);}ox = x;oy = y;} else {tt -= aa * ((y << 1) - 3);st -= (aa << 1) * (--y);}}}this.mkDiv(cx - a, cy - oy, a - ox + 1, (oy << 1) + hod);this.mkDiv(cx + ox + wod, cy - oy, a - ox + 1, (oy << 1) + hod);}

function mkOv2D(left, top, width, height) {var s = this.stroke;width += s - 1;height += s - 1;var a = width >> 1, b = height >> 1, wod = width & 1, hod = (height & 1) + 1, cx = left + a, cy = top + b, x = 0, y = b, aa = (a * a) << 1, bb = (b * b) << 1, st = (aa >> 1) * (1 - (b << 1)) + bb, tt = (bb >> 1) - aa * ((b << 1) - 1);if (s - 4 < 0 && (!(s - 2) || width - 51 > 0 && height - 51 > 0)) {var ox = 0, oy = b, w, h, pxl, pxr, pxt, pxb, pxw;while (y > 0) {if (st < 0) {st += bb * ((x << 1) + 3);tt += (bb << 1) * (++x);} else {if (tt < 0) {st += bb * ((x << 1) + 3) - (aa << 1) * (y - 1);tt += (bb << 1) * (++x) - aa * (((y--) << 1) - 3);w = x - ox;h = oy - y;if (w - 1) {pxw = w + 1 + (s & 1);h = s;} else {if (h - 1) {pxw = s;h += 1 + (s & 1);} else {pxw = h = s;}}this.mkOvQds(cx, cy, -x + 1, ox - pxw + w + wod, -oy, -h + oy + hod, pxw, h);ox = x;oy = y;} else {tt -= aa * ((y << 1) - 3);st -= (aa << 1) * (--y);}}}this.mkDiv(cx - a, cy - oy, s, (oy << 1) + hod);this.mkDiv(cx + a + wod - s + 1, cy - oy, s, (oy << 1) + hod);} else {var _a = (width - ((s - 1) << 1)) >> 1, _b = (height - ((s - 1) << 1)) >> 1, _x = 0, _y = _b, _aa = (_a * _a) << 1, _bb = (_b * _b) << 1, _st = (_aa >> 1) * (1 - (_b << 1)) + _bb, _tt = (_bb >> 1) - _aa * ((_b << 1) - 1), pxl = new Array(), pxt = new Array(), _pxb = new Array();pxl[0] = 0;pxt[0] = b;_pxb[0] = _b - 1;while (y > 0) {if (st < 0) {st += bb * ((x << 1) + 3);tt += (bb << 1) * (++x);pxl[pxl.length] = x;pxt[pxt.length] = y;} else {if (tt < 0) {st += bb * ((x << 1) + 3) - (aa << 1) * (y - 1);tt += (bb << 1) * (++x) - aa * (((y--) << 1) - 3);pxl[pxl.length] = x;pxt[pxt.length] = y;} else {tt -= aa * ((y << 1) - 3);st -= (aa << 1) * (--y);}}if (_y > 0) {if (_st < 0) {_st += _bb * ((_x << 1) + 3);_tt += (_bb << 1) * (++_x);_pxb[_pxb.length] = _y - 1;} else {if (_tt < 0) {_st += _bb * ((_x << 1) + 3) - (_aa << 1) * (_y - 1);_tt += (_bb << 1) * (++_x) - _aa * (((_y--) << 1) - 3);_pxb[_pxb.length] = _y - 1;} else {_tt -= _aa * ((_y << 1) - 3);_st -= (_aa << 1) * (--_y);_pxb[(_pxb.length - 1)]--;}}}}var ox = 0, oy = b, _oy = _pxb[0], l = pxl.length, w, h;for (var i = 0; i < l; i++) {if (typeof _pxb[i] != "undefined") {if (_pxb[i] < _oy || pxt[i] < oy) {x = pxl[i];this.mkOvQds(cx, cy, -x + 1, ox + wod, -oy, _oy + hod, x - ox, oy - _oy);ox = x;oy = pxt[i];_oy = _pxb[i];}} else {x = pxl[i];this.mkDiv(cx - x + 1, cy - oy, 1, (oy << 1) + hod);this.mkDiv(cx + ox + wod, cy - oy, 1, (oy << 1) + hod);ox = x;oy = pxt[i];}}this.mkDiv(cx - a, cy - oy, 1, (oy << 1) + hod);this.mkDiv(cx + ox + wod, cy - oy, 1, (oy << 1) + hod);}}

function mkOvDott(left, top, width, height) {var a = width >> 1, b = height >> 1, wod = width & 1, hod = height & 1, cx = left + a, cy = top + b, x = 0, y = b, aa2 = (a * a) << 1, aa4 = aa2 << 1, bb = (b * b) << 1, st = (aa2 >> 1) * (1 - (b << 1)) + bb, tt = (bb >> 1) - aa2 * ((b << 1) - 1), drw = true;while (y > 0) {if (st < 0) {st += bb * ((x << 1) + 3);tt += (bb << 1) * (++x);} else {if (tt < 0) {st += bb * ((x << 1) + 3) - aa4 * (y - 1);tt += (bb << 1) * (++x) - aa2 * (((y--) << 1) - 3);} else {tt -= aa2 * ((y << 1) - 3);st -= aa4 * (--y);}}if (drw) {this.mkOvQds(cx, cy, -x, x + wod, -y, y + hod, 1, 1);}drw = !drw;}}

function mkRect(x, y, w, h) {var s = this.stroke;this.mkDiv(x, y, w, s);this.mkDiv(x + w, y, s, h);this.mkDiv(x, y + h, w + s, s);this.mkDiv(x, y + s, s, h - s);}

function mkRectDott(x, y, w, h) {this.drawLine(x, y, x + w, y);this.drawLine(x + w, y, x + w, y + h);this.drawLine(x, y + h, x + w, y + h);this.drawLine(x, y, x, y + h);}

function jsgFont() {this.PLAIN = "font-weight:normal;";this.BOLD = "font-weight:bold;";this.ITALIC = "font-style:italic;";this.ITALIC_BOLD = this.ITALIC + this.BOLD;this.BOLD_ITALIC = this.ITALIC_BOLD;}
var Font = new jsgFont();
function jsgStroke() {this.DOTTED = -1;}
var Stroke = new jsgStroke();
function jsGraphics(id, wnd) {this.setColor = new Function("arg", "this.color = arg.toLowerCase();");this.setStroke = (function (x) {this.stroke = x;if (!(x + 1)) {this.drawLine = mkLinDott;this.mkOv = mkOvDott;this.drawRect = mkRectDott;} else {if (x - 1 > 0) {this.drawLine = mkLin2D;this.mkOv = mkOv2D;this.drawRect = mkRect;} else {this.drawLine = mkLin;this.mkOv = mkOv;this.drawRect = mkRect;}}});this.setPrintable = (function (arg) {this.printable = arg;if (jg_fast) {this.mkDiv = mkDivIe;this.htmRpc = arg ? htmPrtRpc : htmRpc;} else {this.mkDiv = jg_n4 ? mkLyr : arg ? mkDivPrt : mkDiv;}});this.setFont = (function (fam, sz, sty) {this.ftFam = fam;this.ftSz = sz;this.ftSty = sty || Font.PLAIN;});this.drawPolyline = this.drawPolyLine = (function (x, y, s) {for (var i = 0; i < x.length - 1; i++) {this.drawLine(x[i], y[i], x[i + 1], y[i + 1]);}});this.fillRect = (function (x, y, w, h) {this.mkDiv(x, y, w, h);});this.drawPolygon = (function (x, y) {this.drawPolyline(x, y);this.drawLine(x[x.length - 1], y[x.length - 1], x[0], y[0]);});this.drawEllipse = this.drawOval = (function (x, y, w, h) {this.mkOv(x, y, w, h);});this.fillEllipse = this.fillOval = (function (left, top, w, h) {var a = (w -= 1) >> 1, b = (h -= 1) >> 1, wod = (w & 1) + 1, hod = (h & 1) + 1, cx = left + a, cy = top + b, x = 0, y = b, ox = 0, oy = b, aa2 = (a * a) << 1, aa4 = aa2 << 1, bb = (b * b) << 1, st = (aa2 >> 1) * (1 - (b << 1)) + bb, tt = (bb >> 1) - aa2 * ((b << 1) - 1), pxl, dw, dh;if (w + 1) {while (y > 0) {if (st < 0) {st += bb * ((x << 1) + 3);tt += (bb << 1) * (++x);} else {if (tt < 0) {st += bb * ((x << 1) + 3) - aa4 * (y - 1);pxl = cx - x;dw = (x << 1) + wod;tt += (bb << 1) * (++x) - aa2 * (((y--) << 1) - 3);dh = oy - y;this.mkDiv(pxl, cy - oy, dw, dh);this.mkDiv(pxl, cy + y + hod, dw, dh);ox = x;oy = y;} else {tt -= aa2 * ((y << 1) - 3);st -= aa4 * (--y);}}}}this.mkDiv(cx - a, cy - oy, w + 1, (oy << 1) + hod);});this.fillPolygon = (function (array_x, array_y) {var i;var y;var miny, maxy;var x1, y1;var x2, y2;var ind1, ind2;var ints;var n = array_x.length;if (!n) {return;}miny = array_y[0];maxy = array_y[0];for (i = 1; i < n; i++) {if (array_y[i] < miny) {miny = array_y[i];}if (array_y[i] > maxy) {maxy = array_y[i];}}for (y = miny; y <= maxy; y++) {var polyInts = new Array();ints = 0;for (i = 0; i < n; i++) {if (!i) {ind1 = n - 1;ind2 = 0;} else {ind1 = i - 1;ind2 = i;}y1 = array_y[ind1];y2 = array_y[ind2];if (y1 < y2) {x1 = array_x[ind1];x2 = array_x[ind2];} else {if (y1 > y2) {y2 = array_y[ind1];y1 = array_y[ind2];x2 = array_x[ind1];x1 = array_x[ind2];} else {continue;}}if ((y >= y1) && (y < y2)) {polyInts[ints++] = Math.round((y - y1) * (x2 - x1) / (y2 - y1) + x1);} else {if ((y == maxy) && (y > y1) && (y <= y2)) {polyInts[ints++] = Math.round((y - y1) * (x2 - x1) / (y2 - y1) + x1);}}}polyInts.sort(integer_compare);for (i = 0; i < ints; i += 2) {this.mkDiv(polyInts[i], y, polyInts[i + 1] - polyInts[i] + 1, 1);}}});this.drawString = (function (txt, x, y) {this.htm += "<div style=\"position:absolute;white-space:nowrap;" + "left:" + x + "px;" + "top:" + y + "px;" + "font-family:" + this.ftFam + ";" + "font-size:" + this.ftSz + ";" + "color:" + this.color + ";" + this.ftSty + "\">" + txt + "</div>";});this.drawStringRect = (function (txt, x, y, width, halign) {this.htm += "<div style=\"position:absolute;overflow:hidden;" + "left:" + x + "px;" + "top:" + y + "px;" + "width:" + width + "px;" + "text-align:" + halign + ";" + "font-family:" + this.ftFam + ";" + "font-size:" + this.ftSz + ";" + "color:" + this.color + ";" + this.ftSty + "\">" + txt + "</div>";});this.drawImage = (function (imgSrc, x, y, w, h, a) {this.htm += "<div style=\"position:absolute;" + "left:" + x + "px;" + "top:" + y + "px;" + "width:" + w + ";" + "height:" + h + ";\">" + "<img src=\"" + imgSrc + "\" width=\"" + w + "\" height=\"" + h + "\"" + (a ? (" " + a) : "") + ">" + "</div>";});this.clear = (function () {this.htm = "";if (this.cnv) {this.cnv.innerHTML = this.defhtm;}});this.mkOvQds = (function (cx, cy, xl, xr, yt, yb, w, h) {this.mkDiv(xr + cx, yt + cy, w, h);this.mkDiv(xr + cx, yb + cy, w, h);this.mkDiv(xl + cx, yb + cy, w, h);this.mkDiv(xl + cx, yt + cy, w, h);});this.setStroke(1);this.setFont("verdana,geneva,helvetica,sans-serif", String.fromCharCode(49, 50, 112, 120), Font.PLAIN);this.color = "#000000";this.htm = "";this.wnd = wnd || window;if (!(jg_ie || jg_dom || jg_ihtm)) {chkDHTM();}if (typeof id != "string" || !id) {this.paint = pntDoc;} else {this.cnv = document.all ? (this.wnd.document.all[id] || null) : document.getElementById ? (this.wnd.document.getElementById(id) || null) : null;this.defhtm = (this.cnv && this.cnv.innerHTML) ? this.cnv.innerHTML : "";this.paint = jg_dom ? pntCnvDom : jg_ie ? pntCnvIe : jg_ihtm ? pntCnvIhtm : pntCnv;}this.setPrintable(false);}

function integer_compare(x, y) {return (x < y) ? -1 : ((x > y) * 1);}
hD = "0123456789ABCDEF";
function d2h(d) {var h = hD.substr(d & 15, 1);while (d > 15) {d >>= 4;h = hD.substr(d & 15, 1) + h;}return h;}

function h2d(h) {return parseInt(h, 16);}

function pie() {this.ct = 0;this.data = new Array();this.x_name = new Array();this.max = 0;this.c_array = new Array();this.c_array[0] = new Array(42, 65, 106);this.c_array[1] = new Array(57, 88, 142);this.c_array[2] = new Array(104, 139, 195);this.c_array[3] = new Array(178, 195, 223);this.getColor = (function () {if (this.ct >= (this.c_array.length - 1)) {this.ct = 0;} else {this.ct++;}return "#" + d2h(this.c_array[this.ct][0]) + d2h(this.c_array[this.ct][1]) + d2h(this.c_array[this.ct][2]);});this.add = (function (x_name, value) {this.x_name.push(x_name);this.data.push(parseInt(value, 10));this.max += parseInt(value, 10);});this.fillArc = (function (x, y, r, st_a, en_a, jg) {var number_of_steps = en_a - st_a;var angle_increment = 2 * Math.PI / number_of_steps;var xc = new Array();var yc = new Array();st_r = st_a * Math.PI / 180;en_r = en_a * Math.PI / 180;for (angle = st_r; angle <= en_r; angle += angle_increment) {if (en_r < angle + angle_increment) {angle = en_r;}var y2 = Math.sin(angle) * r;var x2 = Math.cos(angle) * r;xc.push(x + x2);yc.push(y - y2);}xc.push(x);yc.push(y);jg.fillPolygon(xc, yc);});this.render = (function (canvas, title) {var jg = new jsGraphics(canvas);var r = 30;var sx = 75;var sy = 40;var hyp = 42;var fnt = 12;jg.setColor("gray");jg.fillEllipse(sx + 2 - r, sy + 2 - r, 2 * r, 2 * r);var st_angle = 0;for (i = 0; i < this.data.length; i++) {var angle = Math.round(this.data[i] / this.max * 360);jg.setColor(this.getColor());this.fillArc(sx, sy, r, st_angle, st_angle + angle, jg);var ang_rads = (st_angle + (angle / 2)) * 2 * Math.PI / 360;var my = (Math.sin(ang_rads) * hyp) + 10;var mx = Math.cos(ang_rads) * hyp;st_angle += angle;mxa = (mx < 0 ? hyp : 0);if (my > (r + 10)) {my = r + 10;}if (my < -r) {my = -r;}jg.setColor("black");jg.drawString(this.x_name[i] + " " + this.data[i], sx + mx - mxa, sy - my);}jg.setColor("black");jg.drawEllipse(sx - r, sy - r, 2 * r, 2 * r);jg.paint();});}
var image_path = "img/";var image_up = "arrow-up.gif";var image_down = "arrow-down.gif";var image_none = "arrow-none.gif";var europeandate = true;var alternate_row_colors = true;addEvent(window, "load", sortables_init);var SORT_COLUMN_INDEX;var thead = false;
function sortables_init() {if (!document.getElementsByTagName) {return;}tbls = document.getElementsByTagName("table");for (ti = 0; ti < tbls.length; ti++) {thisTbl = tbls[ti];if (((" " + thisTbl.className + " ").indexOf("sortable") != -1) && (thisTbl.id)) {ts_makeSortable(thisTbl);}}}

function ts_makeSortable(t) {if (t.rows && t.rows.length > 0) {if (t.tHead && t.tHead.rows.length > 0) {var firstRow = t.tHead.rows[t.tHead.rows.length - 1];thead = true;} else {var firstRow = t.rows[0];}}if (!firstRow) {return;}for (var i = 0; i < firstRow.cells.length; i++) {var cell = firstRow.cells[i];var txt = ts_getInnerText(cell);if (cell.className != "unsortable" && cell.className.indexOf("unsortable") == -1) {cell.innerHTML = "<a href=\"#\" class=\"sortheader\" onclick=\"ts_resortTable(this, " + i + ");return false;\">" + txt + "<span class=\"sortarrow\">&nbsp;<img src=\"" + image_path + image_none + "\" alt=\"&darr;\"/></span></a>";}}if (alternate_row_colors) {alternate(t);}}

function ts_getInnerText(el) {if (typeof el == "string") {return el;}if (typeof el == "undefined") {return el;}if (el.innerText) {return el.innerText;}var str = "";var cs = el.childNodes;var l = cs.length;for (var i = 0; i < l; i++) {switch (cs[i].nodeType) {case 1:str += ts_getInnerText(cs[i]);break;case 3:str += cs[i].nodeValue;break;default:;}}return str;}

function ts_resortTable(lnk, clid) {var span;for (var ci = 0; ci < lnk.childNodes.length; ci++) {if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == "span") {span = lnk.childNodes[ci];}}var spantext = ts_getInnerText(span);var td = lnk.parentNode;var column = clid || td.cellIndex;var t = getParent(td, "TABLE");if (t.rows.length <= 1) {return;}var itm = "";var i = 0;while (itm == "" && i < t.tBodies[0].rows.length) {var itm = ts_getInnerText(t.tBodies[0].rows[i].cells[column]);itm = trim(itm);if (itm.substr(0, 4) == "<!--" || itm.length == 0) {itm = "";}i++;}if (itm == "") {return;}sortfn = ts_sort_caseinsensitive;if (itm.match(/^\d\d[\/\.-][a-zA-z][a-zA-Z][a-zA-Z][\/\.-]\d\d\d\d$/)) {sortfn = ts_sort_date;}if (itm.match(/^\d\d[\/\.-]\d\d[\/\.-]\d\d\d{2}?$/)) {sortfn = ts_sort_date;}if (itm.match(/^-?[�$�ۢ�]\d/)) {sortfn = ts_sort_numeric;}if (itm.match(/^-?(\d+[,\.]?)+(E[-+][\d]+)?%?$/)) {sortfn = ts_sort_numeric;}SORT_COLUMN_INDEX = column;var firstRow = new Array();var newRows = new Array();for (k = 0; k < t.tBodies.length; k++) {for (i = 0; i < t.tBodies[k].rows[0].length; i++) {firstRow[i] = t.tBodies[k].rows[0][i];}}for (k = 0; k < t.tBodies.length; k++) {if (!thead) {for (j = 1; j < t.tBodies[k].rows.length; j++) {newRows[j - 1] = t.tBodies[k].rows[j];}} else {for (j = 0; j < t.tBodies[k].rows.length; j++) {newRows[j] = t.tBodies[k].rows[j];}}}newRows.sort(sortfn);if (span.getAttribute("sortdir") == "down") {ARROW = "&nbsp;<img src=\"" + image_path + image_down + "\" alt=\"&darr;\"/>";newRows.reverse();span.setAttribute("sortdir", "up");} else {ARROW = "&nbsp;<img src=\"" + image_path + image_up + "\" alt=\"&uarr;\"/>";span.setAttribute("sortdir", "down");}for (i = 0; i < newRows.length; i++) {if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf("sortbottom") == -1))) {t.tBodies[0].appendChild(newRows[i]);}}for (i = 0; i < newRows.length; i++) {if (newRows[i].className && (newRows[i].className.indexOf("sortbottom") != -1)) {t.tBodies[0].appendChild(newRows[i]);}}var allspans = document.getElementsByTagName("span");for (var ci = 0; ci < allspans.length; ci++) {if (allspans[ci].className == "sortarrow") {if (getParent(allspans[ci], "table") == getParent(lnk, "table")) {allspans[ci].innerHTML = "&nbsp;<img src=\"" + image_path + image_none + "\" alt=\"&darr;\"/>";}}}span.innerHTML = ARROW;alternate(t);}

function getParent(el, pTagName) {if (el == null) {return null;} else {if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {return el;} else {return getParent(el.parentNode, pTagName);}}}

function sort_date(date) {dt = "00000000";if (date.length == 11) {mtstr = date.substr(3, 3);mtstr = mtstr.toLowerCase();switch (mtstr) {case "jan":var mt = "01";break;case "feb":var mt = "02";break;case "mar":var mt = "03";break;case "apr":var mt = "04";break;case "may":var mt = "05";break;case "jun":var mt = "06";break;case "jul":var mt = "07";break;case "aug":var mt = "08";break;case "sep":var mt = "09";break;case "oct":var mt = "10";break;case "nov":var mt = "11";break;case "dec":var mt = "12";break;default:;}dt = date.substr(7, 4) + mt + date.substr(0, 2);return dt;} else {if (date.length == 10) {if (europeandate == false) {dt = date.substr(6, 4) + date.substr(0, 2) + date.substr(3, 2);return dt;} else {dt = date.substr(6, 4) + date.substr(3, 2) + date.substr(0, 2);return dt;}} else {if (date.length == 8) {yr = date.substr(6, 2);if (parseInt(yr) < 50) {yr = "20" + yr;} else {yr = "19" + yr;}if (europeandate == true) {dt = yr + date.substr(3, 2) + date.substr(0, 2);return dt;} else {dt = yr + date.substr(0, 2) + date.substr(3, 2);return dt;}}}}return dt;}

function ts_sort_date(a, b) {dt1 = sort_date(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));dt2 = sort_date(ts_getInnerText(b.cells[SORT_COLUMN_INDEX]));if (dt1 == dt2) {return 0;}if (dt1 < dt2) {return -1;}return 1;}

function ts_sort_numeric(a, b) {var aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);aa = clean_num(aa);var bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);bb = clean_num(bb);return compare_numeric(aa, bb);}

function compare_numeric(a, b) {var a = parseFloat(a);a = (isNaN(a) ? 0 : a);var b = parseFloat(b);b = (isNaN(b) ? 0 : b);return a - b;}

function ts_sort_caseinsensitive(a, b) {aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();if (aa == bb) {return 0;}if (aa < bb) {return -1;}return 1;}

function ts_sort_default(a, b) {aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);if (aa == bb) {return 0;}if (aa < bb) {return -1;}return 1;}

function addEvent(elm, evType, fn, useCapture) {if (elm.addEventListener) {elm.addEventListener(evType, fn, useCapture);return true;} else {if (elm.attachEvent) {var r = elm.attachEvent("on" + evType, fn);return r;} else {alert("Handler could not be removed");}}}

function clean_num(str) {str = str.replace(new RegExp(/[^-?0-9.]/g), "");return str;}

function trim(s) {return s.replace(/^\s+|\s+$/g, "");}

function alternate(table) {var tableBodies = table.getElementsByTagName("tbody");for (var i = 0; i < tableBodies.length; i++) {var tableRows = tableBodies[i].getElementsByTagName("tr");for (var j = 0; j < tableRows.length; j++) {if ((j % 2) == 0) {if (!(tableRows[j].className.indexOf("odd") == -1)) {tableRows[j].className = tableRows[j].className.replace("odd", "even");} else {if (tableRows[j].className.indexOf("even") == -1) {tableRows[j].className += " even";}}} else {if (!(tableRows[j].className.indexOf("even") == -1)) {tableRows[j].className = tableRows[j].className.replace("even", "odd");} else {if (tableRows[j].className.indexOf("odd") == -1) {tableRows[j].className += " odd";}}}}}}
var jsonParse = (function () {var number = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";var oneChar = "(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))";var string = "(?:\"" + oneChar + "*\")";var jsonToken = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]" + "|" + number + "|" + string + ")", "g");var escapeSequence = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");var escapes = {'"':"\"", '/':"/", '\\':"\\", b:"\b", f:"\f", n:"\n", r:"\r", t:"\t"};
function unescapeOne(_, ch, hex) {return ch ? escapes[ch] : String.fromCharCode(parseInt(hex, 16));}
var EMPTY_STRING = new String("");var SLASH = "\\";var firstTokenCtors = {'{':Object, '[':Array};return (function (json) {var toks = json.match(jsonToken);var result;var tok = toks[0];if ("{" === tok) {result = {};} else {if ("[" === tok) {result = [];} else {throw new Error(tok);}}var key;var stack = [result];for (var i = 1, n = toks.length; i < n; ++i) {tok = toks[i];var cont;switch (tok.charCodeAt(0)) {default:cont = stack[0];cont[key || cont.length] = +(tok);key = void 0;break;case 34:tok = tok.substring(1, tok.length - 1);if (tok.indexOf(SLASH) !== -1) {tok = tok.replace(escapeSequence, unescapeOne);}cont = stack[0];if (!key) {if (cont instanceof Array) {key = cont.length;} else {key = tok || EMPTY_STRING;break;}}cont[key] = tok;key = void 0;break;case 91:cont = stack[0];stack.unshift(cont[key || cont.length] = []);key = void 0;break;case 93:stack.shift();break;case 102:cont = stack[0];cont[key || cont.length] = false;key = void 0;break;case 110:cont = stack[0];cont[key || cont.length] = null;key = void 0;break;case 116:cont = stack[0];cont[key || cont.length] = true;key = void 0;break;case 123:cont = stack[0];stack.unshift(cont[key || cont.length] = {});key = void 0;break;case 125:stack.shift();break;}}if (stack.length) {throw new Error();}return result;});})();
