(function(a, b) {
    function c(b) {
        return a.less[b.split("/")[1]]
    }

    function m() {
        var a = document.getElementsByTagName("style");
        for (var b = 0; b < a.length; b++) a[b].type.match(k) && (new d.Parser).parse(a[b].innerHTML || "", function(c, d) {
            var e = d.toCSS(),
                f = a[b];
            f.type = "text/css", f.styleSheet ? f.styleSheet.cssText = e : f.innerHTML = e
        })
    }

    function n(a, b) {
        for (var c = 0; c < d.sheets.length; c++) o(d.sheets[c], a, b, d.sheets.length - (c + 1))
    }

    function o(b, c, e, f) {
        var g = a.location.href.replace(/[#?].*$/, ""),
            i = b.href.replace(/\?.*$/, ""),
            j = h && h.getItem(i),
            k = h && h.getItem(i + ":timestamp"),
            l = {
                css: j,
                timestamp: k
            };
        /^(https?|file):/.test(i) || (i.charAt(0) == "/" ? i = a.location.protocol + "//" + a.location.host + i : i = g.slice(0, g.lastIndexOf("/") + 1) + i);
        var m = i.match(/([^\/]+)$/)[1];
        s(b.href, b.type, function(a, g) {
            if (!e && l && g && (new Date(g)).valueOf() === (new Date(l.timestamp)).valueOf()) r(l.css, b), c(null, b, {
                local: !0,
                remaining: f
            });
            else try {
                (new d.Parser({
                    optimization: d.optimization,
                    paths: [i.replace(/[\w\.-]+$/, "")],
                    mime: b.type,
                    filename: m
                })).parse(a, function(d, e) {
                    if (d) return w(d, i);
                    try {
                        c(d, e, a, b, {
                            local: !1,
                            lastModified: g,
                            remaining: f
                        }), u(document.getElementById("less-error-message:" + q(i)))
                    } catch (d) {
                        w(d, i)
                    }
                })
            } catch (h) {
                w(h, i)
            }
        }, function(a, b) {
            throw new Error("Couldn't load " + b + " (" + a + ")")
        })
    }

    function q(a) {
        return a.replace(/^[a-z]+:\/\/?[^\/]+/, "").replace(/^\//, "").replace(/\?.*$/, "").replace(/\.[^\.\/]+$/, "").replace(/[^\.\w-]+/g, "-").replace(/\./g, ":")
    }

    function r(a, b, c) {
        var d, e = b.href ? b.href.replace(/\?.*$/, "") : "",
            f = "less:" + (b.title || q(e));
        (d = document.getElementById(f)) === null && (d = document.createElement("style"), d.type = "text/css", d.media = b.media || "screen", d.id = f, document.getElementsByTagName("head")[0].appendChild(d));
        if (d.styleSheet) try {
            d.styleSheet.cssText = a
        } catch (g) {
            throw new Error("Couldn't reassign styleSheet.cssText.")
        } else(function(a) {
            d.childNodes.length > 0 ? d.firstChild.nodeValue !== a.nodeValue && d.replaceChild(a, d.firstChild) : d.appendChild(a)
        })(document.createTextNode(a));
        c && h && (v("saving " + e + " to cache."), h.setItem(e, a), h.setItem(e + ":timestamp", c))
    }

    function s(a, b, c, e) {
        function i(b, c, d) {
            b.status >= 200 && b.status < 300 ? c(b.responseText, b.getResponseHeader("Last-Modified")) : typeof d == "function" && d(b.status, a)
        }
        var f = t(),
            h = g ? !1 : d.async;
        typeof f.overrideMimeType == "function" && f.overrideMimeType("text/css"), f.open("GET", a, h), f.setRequestHeader("Accept", b || "text/x-less, text/css; q=0.9, */*; q=0.5"), f.send(null), g ? f.status === 0 || f.status >= 200 && f.status < 300 ? c(f.responseText) : e(f.status, a) : h ? f.onreadystatechange = function() {
            f.readyState == 4 && i(f, c, e)
        } : i(f, c, e)
    }

    function t() {
        if (a.XMLHttpRequest) return new XMLHttpRequest;
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.3.0")
        } catch (b) {
            return v("browser doesn't support AJAX."), null
        }
    }

    function u(a) {
        return a && a.parentNode.removeChild(a)
    }

    function v(a) {
        d.env == "development" && typeof console != "undefined" && console.log("less: " + a)
    }

    function w(a, b) {
        var c = "less-error-message:" + q(b),
            e = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>',
            f = document.createElement("div"),
            g, h, i = [],
            j = a.filename || b;
        f.id = c, f.className = "less-error-message", h = "<h3>" + (a.message || "There is an error in your .less file") + "</h3>" + '<p>in <a href="' + j + '">' + j + "</a> ";
        var k = function(a, b, c) {
            a.extract[b] && i.push(e.replace(/\{line\}/, parseInt(a.line) + (b - 1)).replace(/\{class\}/, c).replace(/\{content\}/, a.extract[b]))
        };
        a.stack ? h += "<br/>" + a.stack.split("\n").slice(1).join("<br/>") : a.extract && (k(a, 0, ""), k(a, 1, "line"), k(a, 2, ""), h += "on line " + a.line + ", column " + (a.column + 1) + ":</p>" + "<ul>" + i.join("") + "</ul>"), f.innerHTML = h, r([".less-error-message ul, .less-error-message li {", "list-style-type: none;", "margin-right: 15px;", "padding: 4px 0;", "margin: 0;", "}", ".less-error-message label {", "font-size: 12px;", "margin-right: 15px;", "padding: 4px 0;", "color: #cc7777;", "}", ".less-error-message pre {", "color: #dd6666;", "padding: 4px 0;", "margin: 0;", "display: inline-block;", "}", ".less-error-message pre.line {", "color: #ff0000;", "}", ".less-error-message h3 {", "font-size: 20px;", "font-weight: bold;", "padding: 15px 0 5px 0;", "margin: 0;", "}", ".less-error-message a {", "color: #10a", "}", ".less-error-message .error {", "color: red;", "font-weight: bold;", "padding-bottom: 2px;", "border-bottom: 1px dashed red;", "}"].join("\n"), {
            title: "error-message"
        }), f.style.cssText = ["font-family: Arial, sans-serif", "border: 1px solid #e00", "background-color: #eee", "border-radius: 5px", "-webkit-border-radius: 5px", "-moz-border-radius: 5px", "color: #e00", "padding: 15px", "margin-bottom: 15px"].join(";"), d.env == "development" && (g = setInterval(function() {
            document.body && (document.getElementById(c) ? document.body.replaceChild(f, document.getElementById(c)) : document.body.insertBefore(f, document.body.firstChild), clearInterval(g))
        }, 10))
    }
    Array.isArray || (Array.isArray = function(a) {
        return Object.prototype.toString.call(a) === "[object Array]" || a instanceof Array
    }), Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
        var c = this.length >>> 0;
        for (var d = 0; d < c; d++) d in this && a.call(b, this[d], d, this)
    }), Array.prototype.map || (Array.prototype.map = function(a) {
        var b = this.length >>> 0,
            c = new Array(b),
            d = arguments[1];
        for (var e = 0; e < b; e++) e in this && (c[e] = a.call(d, this[e], e, this));
        return c
    }), Array.prototype.filter || (Array.prototype.filter = function(a) {
        var b = [],
            c = arguments[1];
        for (var d = 0; d < this.length; d++) a.call(c, this[d]) && b.push(this[d]);
        return b
    }), Array.prototype.reduce || (Array.prototype.reduce = function(a) {
        var b = this.length >>> 0,
            c = 0;
        if (b === 0 && arguments.length === 1) throw new TypeError;
        if (arguments.length >= 2) var d = arguments[1];
        else
            do {
                if (c in this) {
                    d = this[c++];
                    break
                }
                if (++c >= b) throw new TypeError
            } while (!0);
        for (; c < b; c++) c in this && (d = a.call(null, d, this[c], c, this));
        return d
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
        var b = this.length,
            c = arguments[1] || 0;
        if (!b) return -1;
        if (c >= b) return -1;
        c < 0 && (c += b);
        for (; c < b; c++) {
            if (!Object.prototype.hasOwnProperty.call(this, c)) continue;
            if (a === this[c]) return c
        }
        return -1
    }), Object.keys || (Object.keys = function(a) {
        var b = [];
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
        return b
    }), String.prototype.trim || (String.prototype.trim = function() {
        return String(this).replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    });
    var d, f;
    typeof environment == "object" && {}.toString.call(environment) === "[object Environment]" ? (typeof a == "undefined" ? d = {} : d = a.less = {}, f = d.tree = {}, d.mode = "rhino") : typeof a == "undefined" ? (d = exports, f = c("./tree"), d.mode = "node") : (typeof a.less == "undefined" && (a.less = {}), d = a.less, f = a.less.tree = {}, d.mode = "browser"), d.Parser = function(b) {
        function t() {
            j = m[i], k = h, n = h
        }

        function u() {
            m[i] = j, h = k, n = h
        }

        function v() {
            h > n && (m[i] = m[i].slice(h - n), n = h)
        }

        function w(a) {
            var b, c, d, e, f, j, k, l;
            if (a instanceof Function) return a.call(o.parsers);
            if (typeof a == "string") b = g.charAt(h) === a ? a : null, d = 1, v();
            else {
                v();
                if (!(b = a.exec(m[i]))) return null;
                d = b[0].length
            }
            if (b) {
                l = h += d, j = h + m[i].length - d;
                while (h < j) {
                    e = g.charCodeAt(h);
                    if (e !== 32 && e !== 10 && e !== 9) break;
                    h++
                }
                return m[i] = m[i].slice(d + (h - l)), n = h, m[i].length === 0 && i < m.length - 1 && i++, typeof b == "string" ? b : b.length === 1 ? b[0] : b
            }
        }

        function x(a, b) {
            var c = w(a);
            if (!!c) return c;
            y(b || (typeof a == "string" ? "expected '" + a + "' got '" + g.charAt(h) + "'" : "unexpected token"))
        }

        function y(a, b) {
            throw {
                index: h,
                type: b || "Syntax",
                message: a
            }
        }

        function z(a) {
            return typeof a == "string" ? g.charAt(h) === a : a.test(m[i]) ? !0 : !1
        }

        function A(a, b) {
            return a.filename && b.filename && a.filename !== b.filename ? o.imports.contents[a.filename] : g
        }

        function B(a, b) {
            for (var c = a, d = -1; c >= 0 && b.charAt(c) !== "\n"; c--) d++;
            return {
                line: typeof a == "number" ? (b.slice(0, a).match(/\n/g) || "").length : null,
                column: d
            }
        }

        function C(a, b) {
            var c = A(a, b),
                d = B(a.index, c),
                e = d.line,
                f = d.column,
                g = c.split("\n");
            this.type = a.type || "Syntax", this.message = a.message, this.filename = a.filename || b.filename, this.index = a.index, this.line = typeof e == "number" ? e + 1 : null, this.callLine = a.call && B(a.call, c) + 1, this.callExtract = g[B(a.call, c)], this.stack = a.stack, this.column = f, this.extract = [g[e - 1], g[e], g[e + 1]]
        }
        var g, h, i, j, k, l, m, n, o, q = this,
            r = function() {},
            s = this.imports = {
                paths: b && b.paths || [],
                queue: [],
                files: {},
                contents: {},
                mime: b && b.mime,
                error: null,
                push: function(a, c) {
                    var e = this;
                    this.queue.push(a), d.Parser.importer(a, this.paths, function(b, d, f) {
                        e.queue.splice(e.queue.indexOf(a), 1), e.files[a] = d, e.contents[a] = f, b && !e.error && (e.error = b), c(b, d), e.queue.length === 0 && r()
                    }, b)
                }
            };
        return this.env = b = b || {}, this.optimization = "optimization" in this.env ? this.env.optimization : 1, this.env.filename = this.env.filename || null, o = {
            imports: s,
            parse: function(a, e) {
                var j, k, p, q, s, t, u = [],
                    v, x = null;
                h = i = n = l = 0, m = [], g = a.replace(/\r\n/g, "\n"), m = function(a) {
                    var c = 0,
                        d = /[^"'`\{\}\/\(\)]+/g,
                        e = /\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g,
                        f = 0,
                        h, i = a[0],
                        j, k;
                    for (var l = 0, m, n; l < g.length; l++) {
                        d.lastIndex = l, (h = d.exec(g)) && h.index === l && (l += h[0].length, i.push(h[0])), m = g.charAt(l), e.lastIndex = l, !k && !j && m === "/" && (n = g.charAt(l + 1), (n === "/" || n === "*") && (h = e.exec(g)) && h.index === l && (l += h[0].length, i.push(h[0]), m = g.charAt(l)));
                        if (m === "{" && !k && !j) f++, i.push(m);
                        else if (m === "}" && !k && !j) f--, i.push(m), a[++c] = i = [];
                        else if (m === "(" && !k && !j) i.push(m), j = !0;
                        else if (m === ")" && !k && j) i.push(m), j = !1;
                        else {
                            if (m === '"' || m === "'" || m === "`") k ? k = k === m ? !1 : k : k = m;
                            i.push(m)
                        }
                    }
                    if (f > 0) throw {
                        type: "Syntax",
                        message: "Missing closing `}`",
                        filename: b.filename
                    };
                    return a.map(function(a) {
                        return a.join("")
                    })
                }([
                    []
                ]);
                try {
                    j = new f.Ruleset([], w(this.parsers.primary)), j.root = !0
                } catch (y) {
                    return e(new C(y, b))
                }
                j.toCSS = function(a) {
                    var e, g, h;
                    return function(e, g) {
                        var h = [],
                            i;
                        e = e || {}, typeof g == "object" && !Array.isArray(g) && (g = Object.keys(g).map(function(a) {
                            var b = g[a];
                            return b instanceof f.Value || (b instanceof f.Expression || (b = new f.Expression([b])), b = new f.Value([b])), new f.Rule("@" + a, b, !1, 0)
                        }), h = [new f.Ruleset(null, g)]);
                        try {
                            var j = a.call(this, {
                                frames: h
                            }).toCSS([], {
                                compress: e.compress || !1
                            })
                        } catch (k) {
                            throw new C(k, b)
                        }
                        if (i = o.imports.error) throw i instanceof C ? i : new C(i, b);
                        return e.yuicompress && d.mode === "node" ? c("./cssmin").compressor.cssmin(j) : e.compress ? j.replace(/(\s)+/g, "$1") : j
                    }
                }(j.eval);
                if (h < g.length - 1) {
                    h = l, t = g.split("\n"), s = (g.slice(0, h).match(/\n/g) || "").length + 1;
                    for (var z = h, A = -1; z >= 0 && g.charAt(z) !== "\n"; z--) A++;
                    x = {
                        type: "Parse",
                        message: "Syntax Error on line " + s,
                        index: h,
                        filename: b.filename,
                        line: s,
                        column: A,
                        extract: [t[s - 2], t[s - 1], t[s]]
                    }
                }
                this.imports.queue.length > 0 ? r = function() {
                    e(x, j)
                } : e(x, j)
            },
            parsers: {
                primary: function() {
                    var a, b = [];
                    while ((a = w(this.mixin.definition) || w(this.rule) || w(this.ruleset) || w(this.mixin.call) || w(this.comment) || w(this.directive)) || w(/^[\s\n]+/)) a && b.push(a);
                    return b
                },
                comment: function() {
                    var a;
                    if (g.charAt(h) !== "/") return;
                    if (g.charAt(h + 1) === "/") return new f.Comment(w(/^\/\/.*/), !0);
                    if (a = w(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/)) return new f.Comment(a)
                },
                entities: {
                    quoted: function() {
                        var a, b = h,
                            c;
                        g.charAt(b) === "~" && (b++, c = !0);
                        if (g.charAt(b) !== '"' && g.charAt(b) !== "'") return;
                        c && w("~");
                        if (a = w(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/)) return new f.Quoted(a[0], a[1] || a[2], c)
                    },
                    keyword: function() {
                        var a;
                        if (a = w(/^[_A-Za-z-][_A-Za-z0-9-]*/)) return f.colors.hasOwnProperty(a) ? new f.Color(f.colors[a].slice(1)) : new f.Keyword(a)
                    },
                    call: function() {
                        var a, c, d = h;
                        if (!(a = /^([\w-]+|%|progid:[\w\.]+)\(/.exec(m[i]))) return;
                        a = a[1].toLowerCase();
                        if (a === "url") return null;
                        h += a.length;
                        if (a === "alpha") return w(this.alpha);
                        w("("), c = w(this.entities.arguments);
                        if (!w(")")) return;
                        if (a) return new f.Call(a, c, d, b.filename)
                    },
                    arguments: function() {
                        var a = [],
                            b;
                        while (b = w(this.entities.assignment) || w(this.expression)) {
                            a.push(b);
                            if (!w(",")) break
                        }
                        return a
                    },
                    literal: function() {
                        return w(this.entities.dimension) || w(this.entities.color) || w(this.entities.quoted)
                    },
                    assignment: function() {
                        var a, b;
                        if ((a = w(/^\w+(?=\s?=)/i)) && w("=") && (b = w(this.entity))) return new f.Assignment(a, b)
                    },
                    url: function() {
                        var a;
                        if (g.charAt(h) !== "u" || !w(/^url\(/)) return;
                        return a = w(this.entities.quoted) || w(this.entities.variable) || w(this.entities.dataURI) || w(/^[-\w%@$\/.&=:;#+?~]+/) || "", x(")"), new f.URL(a.value || a.data || a instanceof f.Variable ? a : new f.Anonymous(a), s.paths)
                    },
                    dataURI: function() {
                        var a;
                        if (w(/^data:/)) {
                            a = {}, a.mime = w(/^[^\/]+\/[^,;)]+/) || "", a.charset = w(/^;\s*charset=[^,;)]+/) || "", a.base64 = w(/^;\s*base64/) || "", a.data = w(/^,\s*[^)]+/);
                            if (a.data) return a
                        }
                    },
                    variable: function() {
                        var a, c = h;
                        if (g.charAt(h) === "@" && (a = w(/^@@?[\w-]+/))) return new f.Variable(a, c, b.filename)
                    },
                    color: function() {
                        var a;
                        if (g.charAt(h) === "#" && (a = w(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/))) return new f.Color(a[1])
                    },
                    dimension: function() {
                        var a, b = g.charCodeAt(h);
                        if (b > 57 || b < 45 || b === 47) return;
                        if (a = w(/^(-?\d*\.?\d+)(px|%|em|rem|pc|ex|in|deg|s|ms|pt|cm|mm|rad|grad|turn)?/)) return new f.Dimension(a[1], a[2])
                    },
                    javascript: function() {
                        var a, b = h,
                            c;
                        g.charAt(b) === "~" && (b++, c = !0);
                        if (g.charAt(b) !== "`") return;
                        c && w("~");
                        if (a = w(/^`([^`]*)`/)) return new f.JavaScript(a[1], h, c)
                    }
                },
                variable: function() {
                    var a;
                    if (g.charAt(h) === "@" && (a = w(/^(@[\w-]+)\s*:/))) return a[1]
                },
                shorthand: function() {
                    var a, b;
                    if (!z(/^[@\w.%-]+\/[@\w.-]+/)) return;
                    if ((a = w(this.entity)) && w("/") && (b = w(this.entity))) return new f.Shorthand(a, b)
                },
                mixin: {
                    call: function() {
                        var a = [],
                            c, d, e, i = h,
                            j = g.charAt(h),
                            k = !1;
                        if (j !== "." && j !== "#") return;
                        while (c = w(/^[#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/)) a.push(new f.Element(d, c, h)), d = w(">");
                        w("(") && (e = w(this.entities.arguments)) && w(")"), w(this.important) && (k = !0);
                        if (a.length > 0 && (w(";") || z("}"))) return new f.mixin.Call(a, e, i, b.filename, k)
                    },
                    definition: function() {
                        var a, b = [],
                            c, d, e, i, j;
                        if (g.charAt(h) !== "." && g.charAt(h) !== "#" || z(/^[^{]*(;|})/)) return;
                        t();
                        if (c = w(/^([#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+)\s*\(/)) {
                            a = c[1];
                            while (e = w(this.entities.variable) || w(this.entities.literal) || w(this.entities.keyword)) {
                                e instanceof f.Variable ? w(":") ? (i = x(this.expression, "expected expression"), b.push({
                                    name: e.name,
                                    value: i
                                })) : b.push({
                                    name: e.name
                                }) : b.push({
                                    value: e
                                });
                                if (!w(",")) break
                            }
                            x(")"), w(/^when/) && (j = x(this.conditions, "expected condition")), d = w(this.block);
                            if (d) return new f.mixin.Definition(a, b, d, j);
                            u()
                        }
                    }
                },
                entity: function() {
                    return w(this.entities.literal) || w(this.entities.variable) || w(this.entities.url) || w(this.entities.call) || w(this.entities.keyword) || w(this.entities.javascript) || w(this.comment)
                },
                end: function() {
                    return w(";") || z("}")
                },
                alpha: function() {
                    var a;
                    if (!w(/^\(opacity=/i)) return;
                    if (a = w(/^\d+/) || w(this.entities.variable)) return x(")"), new f.Alpha(a)
                },
                element: function() {
                    var a, b, c, d;
                    c = w(this.combinator), a = w(/^(?:\d+\.\d+|\d+)%/) || w(/^(?:[.#]?|:*)(?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/) || w("*") || w(this.attribute) || w(/^\([^)@]+\)/), a || w("(") && (d = w(this.entities.variable)) && w(")") && (a = new f.Paren(d));
                    if (a) return new f.Element(c, a, h);
                    if (c.value && c.value.charAt(0) === "&") return new f.Element(c, null, h)
                },
                combinator: function() {
                    var a, b = g.charAt(h);
                    if (b === ">" || b === "+" || b === "~") {
                        h++;
                        while (g.charAt(h) === " ") h++;
                        return new f.Combinator(b)
                    }
                    if (b === "&") {
                        a = "&", h++, g.charAt(h) === " " && (a = "& ");
                        while (g.charAt(h) === " ") h++;
                        return new f.Combinator(a)
                    }
                    if (b === ":" && g.charAt(h + 1) === ":") {
                        h += 2;
                        while (g.charAt(h) === " ") h++;
                        return new f.Combinator("::")
                    }
                    return g.charAt(h - 1) === " " ? new f.Combinator(" ") : new f.Combinator(null)
                },
                selector: function() {
                    var a, b, c = [],
                        d, e;
                    while (b = w(this.element)) {
                        d = g.charAt(h), c.push(b);
                        if (d === "{" || d === "}" || d === ";" || d === ",") break
                    }
                    if (c.length > 0) return new f.Selector(c)
                },
                tag: function() {
                    return w(/^[a-zA-Z][a-zA-Z-]*[0-9]?/) || w("*")
                },
                attribute: function() {
                    var a = "",
                        b, c, d;
                    if (!w("[")) return;
                    if (b = w(/^[a-zA-Z-]+/) || w(this.entities.quoted))(d = w(/^[|~*$^]?=/)) && (c = w(this.entities.quoted) || w(/^[\w-]+/)) ? a = [b, d, c.toCSS ? c.toCSS() : c].join("") : a = b;
                    if (!w("]")) return;
                    if (a) return "[" + a + "]"
                },
                block: function() {
                    var a;
                    if (w("{") && (a = w(this.primary)) && w("}")) return a
                },
                ruleset: function() {
                    var a = [],
                        b, c, d;
                    t();
                    while (b = w(this.selector)) {
                        a.push(b), w(this.comment);
                        if (!w(",")) break;
                        w(this.comment)
                    }
                    if (a.length > 0 && (c = w(this.block))) return new f.Ruleset(a, c);
                    l = h, u()
                },
                rule: function() {
                    var a, b, c = g.charAt(h),
                        d, e;
                    t();
                    if (c === "." || c === "#" || c === "&") return;
                    if (a = w(this.variable) || w(this.property)) {
                        a.charAt(0) != "@" && (e = /^([^@+\/'"*`(;{}-]*);/.exec(m[i])) ? (h += e[0].length - 1, b = new f.Anonymous(e[1])) : a === "font" ? b = w(this.font) : b = w(this.value), d = w(this.important);
                        if (b && w(this.end)) return new f.Rule(a, b, d, k);
                        l = h, u()
                    }
                },
                "import": function() {
                    var a, b, c = h;
                    if (w(/^@import\s+/) && (a = w(this.entities.quoted) || w(this.entities.url))) {
                        b = w(this.mediaFeatures);
                        if (w(";")) return new f.Import(a, s, b, c)
                    }
                },
                mediaFeature: function() {
                    var a = [];
                    do
                        if (e = w(this.entities.keyword)) a.push(e);
                        else if (w("(")) {
                        p = w(this.property), e = w(this.entity);
                        if (!w(")")) return null;
                        if (p && e) a.push(new f.Paren(new f.Rule(p, e, null, h, !0)));
                        else {
                            if (!e) return null;
                            a.push(new f.Paren(e))
                        }
                    } while (e);
                    if (a.length > 0) return new f.Expression(a)
                },
                mediaFeatures: function() {
                    var a, b = [];
                    while (a = w(this.mediaFeature)) {
                        b.push(a);
                        if (!w(",")) break
                    }
                    return b.length > 0 ? b : null
                },
                media: function() {
                    var a;
                    if (w(/^@media/)) {
                        a = w(this.mediaFeatures);
                        if (rules = w(this.block)) return new f.Directive("@media", rules, a)
                    }
                },
                directive: function() {
                    var a, b, c, d, e, i;
                    if (g.charAt(h) !== "@") return;
                    if (b = w(this["import"]) || w(this.media)) return b;
                    if (a = w(/^@page|@keyframes/) || w(/^@(?:-webkit-|-moz-|-o-|-ms-)[a-z0-9-]+/)) {
                        d = (w(/^[^{]+/) || "").trim();
                        if (c = w(this.block)) return new f.Directive(a + " " + d, c)
                    } else if (a = w(/^@[-a-z]+/))
                        if (a === "@font-face") {
                            if (c = w(this.block)) return new f.Directive(a, c)
                        } else if ((b = w(this.entity)) && w(";")) return new f.Directive(a, b)
                },
                font: function() {
                    var a = [],
                        b = [],
                        c, d, e, g;
                    while (g = w(this.shorthand) || w(this.entity)) b.push(g);
                    a.push(new f.Expression(b));
                    if (w(","))
                        while (g = w(this.expression)) {
                            a.push(g);
                            if (!w(",")) break
                        }
                    return new f.Value(a)
                },
                value: function() {
                    var a, b = [],
                        c;
                    while (a = w(this.expression)) {
                        b.push(a);
                        if (!w(",")) break
                    }
                    if (b.length > 0) return new f.Value(b)
                },
                important: function() {
                    if (g.charAt(h) === "!") return w(/^! *important/)
                },
                sub: function() {
                    var a;
                    if (w("(") && (a = w(this.expression)) && w(")")) return a
                },
                multiplication: function() {
                    var a, b, c, d;
                    if (a = w(this.operand)) {
                        while (!z(/^\/\*/) && (c = w("/") || w("*")) && (b = w(this.operand))) d = new f.Operation(c, [d || a, b]);
                        return d || a
                    }
                },
                addition: function() {
                    var a, b, c, d;
                    if (a = w(this.multiplication)) {
                        while ((c = w(/^[-+]\s+/) || g.charAt(h - 1) != " " && (w("+") || w("-"))) && (b = w(this.multiplication))) d = new f.Operation(c, [d || a, b]);
                        return d || a
                    }
                },
                conditions: function() {
                    var a, b, c = h,
                        d;
                    if (a = w(this.condition)) {
                        while (w(",") && (b = w(this.condition))) d = new f.Condition("or", d || a, b, c);
                        return d || a
                    }
                },
                condition: function() {
                    var a, b, c, d, e = h,
                        g = !1;
                    w(/^not/) && (g = !0), x("(");
                    if (a = w(this.addition) || w(this.entities.keyword) || w(this.entities.quoted)) return (d = w(/^(?:>=|=<|[<=>])/)) ? (b = w(this.addition) || w(this.entities.keyword) || w(this.entities.quoted)) ? c = new f.Condition(d, a, b, e, g) : y("expected expression") : c = new f.Condition("=", a, new f.Keyword("true"), e, g), x(")"), w(/^and/) ? new f.Condition("and", c, w(this.condition)) : c
                },
                operand: function() {
                    var a, b = g.charAt(h + 1);
                    g.charAt(h) === "-" && (b === "@" || b === "(") && (a = w("-"));
                    var c = w(this.sub) || w(this.entities.dimension) || w(this.entities.color) || w(this.entities.variable) || w(this.entities.call);
                    return a ? new f.Operation("*", [new f.Dimension(-1), c]) : c
                },
                expression: function() {
                    var a, b, c = [],
                        d;
                    while (a = w(this.addition) || w(this.entity)) c.push(a);
                    if (c.length > 0) return new f.Expression(c)
                },
                property: function() {
                    var a;
                    if (a = w(/^(\*?-?[-a-z_0-9]+)\s*:/)) return a[1]
                }
            }
        }
    };
    if (d.mode === "browser" || d.mode === "rhino") d.Parser.importer = function(a, b, c, d) {
        a.charAt(0) !== "/" && b.length > 0 && (a = b[0] + a), o({
            href: a,
            title: a,
            type: d.mime
        }, c, !0)
    };
    (function(a) {
        function b(b) {
            return a.functions.hsla(b.h, b.s, b.l, b.a)
        }

        function c(b) {
            if (b instanceof a.Dimension) return parseFloat(b.unit == "%" ? b.value / 100 : b.value);
            if (typeof b == "number") return b;
            throw {
                error: "RuntimeError",
                message: "color functions take numbers as parameters"
            }
        }

        function d(a) {
            return Math.min(1, Math.max(0, a))
        }
        a.functions = {
            rgb: function(a, b, c) {
                return this.rgba(a, b, c, 1)
            },
            rgba: function(b, d, e, f) {
                var g = [b, d, e].map(function(a) {
                        return c(a)
                    }),
                    f = c(f);
                return new a.Color(g, f)
            },
            hsl: function(a, b, c) {
                return this.hsla(a, b, c, 1)
            },
            hsla: function(a, b, d, e) {
                function h(a) {
                    return a = a < 0 ? a + 1 : a > 1 ? a - 1 : a, a * 6 < 1 ? g + (f - g) * a * 6 : a * 2 < 1 ? f : a * 3 < 2 ? g + (f - g) * (2 / 3 - a) * 6 : g
                }
                a = c(a) % 360 / 360, b = c(b), d = c(d), e = c(e);
                var f = d <= .5 ? d * (b + 1) : d + b - d * b,
                    g = d * 2 - f;
                return this.rgba(h(a + 1 / 3) * 255, h(a) * 255, h(a - 1 / 3) * 255, e)
            },
            hue: function(b) {
                return new a.Dimension(Math.round(b.toHSL().h))
            },
            saturation: function(b) {
                return new a.Dimension(Math.round(b.toHSL().s * 100), "%")
            },
            lightness: function(b) {
                return new a.Dimension(Math.round(b.toHSL().l * 100), "%")
            },
            alpha: function(b) {
                return new a.Dimension(b.toHSL().a)
            },
            saturate: function(a, c) {
                var e = a.toHSL();
                return e.s += c.value / 100, e.s = d(e.s), b(e)
            },
            desaturate: function(a, c) {
                var e = a.toHSL();
                return e.s -= c.value / 100, e.s = d(e.s), b(e)
            },
            lighten: function(a, c) {
                var e = a.toHSL();
                return e.l += c.value / 100, e.l = d(e.l), b(e)
            },
            darken: function(a, c) {
                var e = a.toHSL();
                return e.l -= c.value / 100, e.l = d(e.l), b(e)
            },
            fadein: function(a, c) {
                var e = a.toHSL();
                return e.a += c.value / 100, e.a = d(e.a), b(e)
            },
            fadeout: function(a, c) {
                var e = a.toHSL();
                return e.a -= c.value / 100, e.a = d(e.a), b(e)
            },
            fade: function(a, c) {
                var e = a.toHSL();
                return e.a = c.value / 100, e.a = d(e.a), b(e)
            },
            spin: function(a, c) {
                var d = a.toHSL(),
                    e = (d.h + c.value) % 360;
                return d.h = e < 0 ? 360 + e : e, b(d)
            },
            mix: function(b, c, d) {
                var e = d.value / 100,
                    f = e * 2 - 1,
                    g = b.toHSL().a - c.toHSL().a,
                    h = ((f * g == -1 ? f : (f + g) / (1 + f * g)) + 1) / 2,
                    i = 1 - h,
                    j = [b.rgb[0] * h + c.rgb[0] * i, b.rgb[1] * h + c.rgb[1] * i, b.rgb[2] * h + c.rgb[2] * i],
                    k = b.alpha * e + c.alpha * (1 - e);
                return new a.Color(j, k)
            },
            greyscale: function(b) {
                return this.desaturate(b, new a.Dimension(100))
            },
            e: function(b) {
                return new a.Anonymous(b instanceof a.JavaScript ? b.evaluated : b)
            },
            escape: function(b) {
                return new a.Anonymous(encodeURI(b.value).replace(/=/g, "%3D").replace(/:/g, "%3A").replace(/#/g, "%23").replace(/;/g, "%3B").replace(/\(/g, "%28").replace(/\)/g, "%29"))
            },
            "%": function(b) {
                var c = Array.prototype.slice.call(arguments, 1),
                    d = b.value;
                for (var e = 0; e < c.length; e++) d = d.replace(/%[sda]/i, function(a) {
                    var b = a.match(/s/i) ? c[e].value : c[e].toCSS();
                    return a.match(/[A-Z]$/) ? encodeURIComponent(b) : b
                });
                return d = d.replace(/%%/g, "%"), new a.Quoted('"' + d + '"', d)
            },
            round: function(a) {
                return this._math("round", a)
            },
            ceil: function(a) {
                return this._math("ceil", a)
            },
            floor: function(a) {
                return this._math("floor", a)
            },
            _math: function(b, d) {
                if (d instanceof a.Dimension) return new a.Dimension(Math[b](c(d)), d.unit);
                if (typeof d == "number") return Math[b](d);
                throw {
                    type: "Argument",
                    message: "argument must be a number"
                }
            },
            argb: function(b) {
                return new a.Anonymous(b.toARGB())
            },
            percentage: function(b) {
                return new a.Dimension(b.value * 100, "%")
            },
            color: function(b) {
                if (b instanceof a.Quoted) return new a.Color(b.value.slice(1));
                throw {
                    type: "Argument",
                    message: "argument must be a string"
                }
            },
            iscolor: function(b) {
                return this._isa(b, a.Color)
            },
            isnumber: function(b) {
                return this._isa(b, a.Dimension)
            },
            isstring: function(b) {
                return this._isa(b, a.Quoted)
            },
            iskeyword: function(b) {
                return this._isa(b, a.Keyword)
            },
            isurl: function(b) {
                return this._isa(b, a.URL)
            },
            ispixel: function(b) {
                return b instanceof a.Dimension && b.unit === "px" ? a.True : a.False
            },
            ispercentage: function(b) {
                return b instanceof a.Dimension && b.unit === "%" ? a.True : a.False
            },
            isem: function(b) {
                return b instanceof a.Dimension && b.unit === "em" ? a.True : a.False
            },
            _isa: function(b, c) {
                return b instanceof c ? a.True : a.False
            }
        }
    })(c("./tree")),
    function(a) {
        a.colors = {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgrey: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkslategrey: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            grey: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        }
    }(c("./tree")),
    function(a) {
        a.Alpha = function(a) {
            this.value = a
        }, a.Alpha.prototype = {
            toCSS: function() {
                return "alpha(opacity=" + (this.value.toCSS ? this.value.toCSS() : this.value) + ")"
            },
            eval: function(a) {
                return this.value.eval && (this.value = this.value.eval(a)), this
            }
        }
    }(c("../tree")),
    function(a) {
        a.Anonymous = function(a) {
            this.value = a.value || a
        }, a.Anonymous.prototype = {
            toCSS: function() {
                return this.value
            },
            eval: function() {
                return this
            }
        }
    }(c("../tree")),
    function(a) {
        a.Assignment = function(a, b) {
            this.key = a, this.value = b
        }, a.Assignment.prototype = {
            toCSS: function() {
                return this.key + "=" + (this.value.toCSS ? this.value.toCSS() : this.value)
            },
            eval: function(a) {
                return this.value.eval && (this.value = this.value.eval(a)), this
            }
        }
    }(c("../tree")),
    function(a) {
        a.Call = function(a, b, c, d) {
            this.name = a, this.args = b, this.index = c, this.filename = d
        }, a.Call.prototype = {
            eval: function(b) {
                var c = this.args.map(function(a) {
                    return a.eval(b)
                });
                if (!(this.name in a.functions)) return new a.Anonymous(this.name + "(" + c.map(function(a) {
                    return a.toCSS()
                }).join(", ") + ")");
                try {
                    return a.functions[this.name].apply(a.functions, c)
                } catch (d) {
                    throw {
                        type: d.type || "Runtime",
                        message: "error evaluating function `" + this.name + "`" + (d.message ? ": " + d.message : ""),
                        index: this.index,
                        filename: this.filename
                    }
                }
            },
            toCSS: function(a) {
                return this.eval(a).toCSS()
            }
        }
    }(c("../tree")),
    function(a) {
        a.Color = function(a, b) {
            Array.isArray(a) ? this.rgb = a : a.length == 6 ? this.rgb = a.match(/.{2}/g).map(function(a) {
                return parseInt(a, 16)
            }) : this.rgb = a.split("").map(function(a) {
                return parseInt(a + a, 16)
            }), this.alpha = typeof b == "number" ? b : 1
        }, a.Color.prototype = {
            eval: function() {
                return this
            },
            toCSS: function() {
                return this.alpha < 1 ? "rgba(" + this.rgb.map(function(a) {
                    return Math.round(a)
                }).concat(this.alpha).join(", ") + ")" : "#" + this.rgb.map(function(a) {
                    return a = Math.round(a), a = (a > 255 ? 255 : a < 0 ? 0 : a).toString(16), a.length === 1 ? "0" + a : a
                }).join("")
            },
            operate: function(b, c) {
                var d = [];
                c instanceof a.Color || (c = c.toColor());
                for (var e = 0; e < 3; e++) d[e] = a.operate(b, this.rgb[e], c.rgb[e]);
                return new a.Color(d, this.alpha + c.alpha)
            },
            toHSL: function() {
                var a = this.rgb[0] / 255,
                    b = this.rgb[1] / 255,
                    c = this.rgb[2] / 255,
                    d = this.alpha,
                    e = Math.max(a, b, c),
                    f = Math.min(a, b, c),
                    g, h, i = (e + f) / 2,
                    j = e - f;
                if (e === f) g = h = 0;
                else {
                    h = i > .5 ? j / (2 - e - f) : j / (e + f);
                    switch (e) {
                        case a:
                            g = (b - c) / j + (b < c ? 6 : 0);
                            break;
                        case b:
                            g = (c - a) / j + 2;
                            break;
                        case c:
                            g = (a - b) / j + 4
                    }
                    g /= 6
                }
                return {
                    h: g * 360,
                    s: h,
                    l: i,
                    a: d
                }
            },
            toARGB: function() {
                var a = [Math.round(this.alpha * 255)].concat(this.rgb);
                return "#" + a.map(function(a) {
                    return a = Math.round(a), a = (a > 255 ? 255 : a < 0 ? 0 : a).toString(16), a.length === 1 ? "0" + a : a
                }).join("")
            }
        }
    }(c("../tree")),
    function(a) {
        a.Comment = function(a, b) {
            this.value = a, this.silent = !!b
        }, a.Comment.prototype = {
            toCSS: function(a) {
                return a.compress ? "" : this.value
            },
            eval: function() {
                return this
            }
        }
    }(c("../tree")),
    function(a) {
        a.Condition = function(a, b, c, d, e) {
            this.op = a.trim(), this.lvalue = b, this.rvalue = c, this.index = d, this.negate = e
        }, a.Condition.prototype.eval = function(a) {
            var b = this.lvalue.eval(a),
                c = this.rvalue.eval(a),
                d = this.index,
                e, e = function(a) {
                    switch (a) {
                        case "and":
                            return b && c;
                        case "or":
                            return b || c;
                        default:
                            if (b.compare) e = b.compare(c);
                            else {
                                if (!c.compare) throw {
                                    type: "Type",
                                    message: "Unable to perform comparison",
                                    index: d
                                };
                                e = c.compare(b)
                            }
                            switch (e) {
                                case -1:
                                    return a === "<" || a === "=<";
                                case 0:
                                    return a === "=" || a === ">=" || a === "=<";
                                case 1:
                                    return a === ">" || a === ">="
                            }
                    }
                }(this.op);
            return this.negate ? !e : e
        }
    }(c("../tree")),
    function(a) {
        a.Dimension = function(a, b) {
            this.value = parseFloat(a), this.unit = b || null
        }, a.Dimension.prototype = {
            eval: function() {
                return this
            },
            toColor: function() {
                return new a.Color([this.value, this.value, this.value])
            },
            toCSS: function() {
                var a = this.value + this.unit;
                return a
            },
            operate: function(b, c) {
                return new a.Dimension(a.operate(b, this.value, c.value), this.unit || c.unit)
            },
            compare: function(b) {
                return b instanceof a.Dimension ? b.value > this.value ? -1 : b.value < this.value ? 1 : 0 : -1
            }
        }
    }(c("../tree")),
    function(a) {
        a.Directive = function(b, c, d) {
            this.name = b, this.features = d && new a.Value(d), Array.isArray(c) ? (this.ruleset = new a.Ruleset([], c), this.ruleset.allowImports = !0) : this.value = c
        }, a.Directive.prototype = {
            toCSS: function(a, b) {
                var c = this.features ? " " + this.features.toCSS(b) : "";
                return this.ruleset ? (this.ruleset.root = !0, this.name + c + (b.compress ? "{" : " {\n  ") + this.ruleset.toCSS(a, b).trim().replace(/\n/g, "\n  ") + (b.compress ? "}" : "\n}\n")) : this.name + " " + this.value.toCSS() + ";\n"
            },
            eval: function(a) {
                return this.features = this.features && this.features.eval(a), a.frames.unshift(this), this.ruleset = this.ruleset && this.ruleset.eval(a), a.frames.shift(), this
            },
            variable: function(b) {
                return a.Ruleset.prototype.variable.call(this.ruleset, b)
            },
            find: function() {
                return a.Ruleset.prototype.find.apply(this.ruleset, arguments)
            },
            rulesets: function() {
                return a.Ruleset.prototype.rulesets.apply(this.ruleset)
            }
        }
    }(c("../tree")),
    function(a) {
        a.Element = function(b, c, d) {
            this.combinator = b instanceof a.Combinator ? b : new a.Combinator(b), typeof c == "string" ? this.value = c.trim() : c ? this.value = c : this.value = "", this.index = d
        }, a.Element.prototype.eval = function(b) {
            return new a.Element(this.combinator, this.value.eval ? this.value.eval(b) : this.value, this.index)
        }, a.Element.prototype.toCSS = function(a) {
            return this.combinator.toCSS(a || {}) + (this.value.toCSS ? this.value.toCSS(a) : this.value)
        }, a.Combinator = function(a) {
            a === " " ? this.value = " " : a === "& " ? this.value = "& " : this.value = a ? a.trim() : ""
        }, a.Combinator.prototype.toCSS = function(a) {
            return {
                "": "",
                " ": " ",
                "&": "",
                "& ": " ",
                ":": " :",
                "::": "::",
                "+": a.compress ? "+" : " + ",
                "~": a.compress ? "~" : " ~ ",
                ">": a.compress ? ">" : " > "
            }[this.value]
        }
    }(c("../tree")),
    function(a) {
        a.Expression = function(a) {
            this.value = a
        }, a.Expression.prototype = {
            eval: function(b) {
                return this.value.length > 1 ? new a.Expression(this.value.map(function(a) {
                    return a.eval(b)
                })) : this.value.length === 1 ? this.value[0].eval(b) : this
            },
            toCSS: function(a) {
                return this.value.map(function(b) {
                    return b.toCSS ? b.toCSS(a) : ""
                }).join(" ")
            }
        }
    }(c("../tree")),
    function(a) {
        a.Import = function(b, c, d, e) {
            var f = this;
            this.index = e, this._path = b, this.features = d && new a.Value(d), b instanceof a.Quoted ? this.path = /\.(le?|c)ss(\?.*)?$/.test(b.value) ? b.value : b.value + ".less" : this.path = b.value.value || b.value, this.css = /css(\?.*)?$/.test(this.path), this.css || c.push(this.path, function(b, c) {
                b && (b.index = e), f.root = c || new a.Ruleset([], [])
            })
        }, a.Import.prototype = {
            toCSS: function(a) {
                var b = this.features ? " " + this.features.toCSS(a) : "";
                return this.css ? "@import " + this._path.toCSS() + b + ";\n" : ""
            },
            eval: function(b) {
                var c, d = this.features && this.features.eval(b);
                if (this.css) return this;
                c = new a.Ruleset([], this.root.rules.slice(0));
                for (var e = 0; e < c.rules.length; e++) c.rules[e] instanceof a.Import && Array.prototype.splice.apply(c.rules, [e, 1].concat(c.rules[e].eval(b)));
                return this.features ? new a.Directive("@media", c.rules, this.features.value) : c.rules
            }
        }
    }(c("../tree")),
    function(a) {
        a.JavaScript = function(a, b, c) {
            this.escaped = c, this.expression = a, this.index = b
        }, a.JavaScript.prototype = {
            eval: function(b) {
                var c, d = this,
                    e = {},
                    f = this.expression.replace(/@\{([\w-]+)\}/g, function(c, e) {
                        return a.jsify((new a.Variable("@" + e, d.index)).eval(b))
                    });
                try {
                    f = new Function("return (" + f + ")")
                } catch (g) {
                    throw {
                        message: "JavaScript evaluation error: `" +
                            f + "`",
                        index: this.index
                    }
                }
                for (var h in b.frames[0].variables()) e[h.slice(1)] = {
                    value: b.frames[0].variables()[h].value,
                    toJS: function() {
                        return this.value.eval(b).toCSS()
                    }
                };
                try {
                    c = f.call(e)
                } catch (g) {
                    throw {
                        message: "JavaScript evaluation error: '" + g.name + ": " + g.message + "'",
                        index: this.index
                    }
                }
                return typeof c == "string" ? new a.Quoted('"' + c + '"', c, this.escaped, this.index) : Array.isArray(c) ? new a.Anonymous(c.join(", ")) : new a.Anonymous(c)
            }
        }
    }(c("../tree")),
    function(a) {
        a.Keyword = function(a) {
            this.value = a
        }, a.Keyword.prototype = {
            eval: function() {
                return this
            },
            toCSS: function() {
                return this.value
            },
            compare: function(b) {
                return b instanceof a.Keyword ? b.value === this.value ? 0 : 1 : -1
            }
        }, a.True = new a.Keyword("true"), a.False = new a.Keyword("false")
    }(c("../tree")),
    function(a) {
        a.mixin = {}, a.mixin.Call = function(b, c, d, e, f) {
            this.selector = new a.Selector(b), this.arguments = c, this.index = d, this.filename = e, this.important = f
        }, a.mixin.Call.prototype = {
            eval: function(a) {
                var b, c, d = [],
                    e = !1;
                for (var f = 0; f < a.frames.length; f++)
                    if ((b = a.frames[f].find(this.selector)).length > 0) {
                        c = this.arguments && this.arguments.map(function(b) {
                            return b.eval(a)
                        });
                        for (var g = 0; g < b.length; g++)
                            if (b[g].match(c, a)) try {
                                Array.prototype.push.apply(d, b[g].eval(a, this.arguments, this.important).rules), e = !0
                            } catch (h) {
                                throw {
                                    message: h.message,
                                    index: h.index,
                                    filename: this.filename,
                                    stack: h.stack,
                                    call: this.index
                                }
                            }
                            if (e) return d;
                        throw {
                            type: "Runtime",
                            message: "No matching definition was found for `" + this.selector.toCSS().trim() + "(" + this.arguments.map(function(a) {
                                return a.toCSS()
                            }).join(", ") + ")`",
                            index: this.index,
                            filename: this.filename
                        }
                    }
                throw {
                    type: "Name",
                    message: this.selector.toCSS().trim() + " is undefined",
                    index: this.index,
                    filename: this.filename
                }
            }
        }, a.mixin.Definition = function(b, c, d, e) {
            this.name = b, this.selectors = [new a.Selector([new a.Element(null, b)])], this.params = c, this.condition = e, this.arity = c.length, this.rules = d, this._lookups = {}, this.required = c.reduce(function(a, b) {
                return !b.name || b.name && !b.value ? a + 1 : a
            }, 0), this.parent = a.Ruleset.prototype, this.frames = []
        }, a.mixin.Definition.prototype = {
            toCSS: function() {
                return ""
            },
            variable: function(a) {
                return this.parent.variable.call(this, a)
            },
            variables: function() {
                return this.parent.variables.call(this)
            },
            find: function() {
                return this.parent.find.apply(this, arguments)
            },
            rulesets: function() {
                return this.parent.rulesets.apply(this)
            },
            evalParams: function(b, c) {
                var d = new a.Ruleset(null, []);
                for (var e = 0, f; e < this.params.length; e++)
                    if (this.params[e].name) {
                        if (!(f = c && c[e] || this.params[e].value)) throw {
                            type: "Runtime",
                            message: "wrong number of arguments for " + this.name + " (" + c.length + " for " + this.arity + ")"
                        };
                        d.rules.unshift(new a.Rule(this.params[e].name, f.eval(b)))
                    }
                return d
            },
            eval: function(b, c, d) {
                var e = this.evalParams(b, c),
                    f, g = [],
                    h;
                for (var i = 0; i < Math.max(this.params.length, c && c.length); i++) g.push(c[i] || this.params[i].value);
                return e.rules.unshift(new a.Rule("@arguments", (new a.Expression(g)).eval(b))), h = d ? this.rules.map(function(b) {
                    return new a.Rule(b.name, b.value, "!important", b.index)
                }) : this.rules.slice(0), (new a.Ruleset(null, h)).eval({
                    frames: [this, e].concat(this.frames, b.frames)
                })
            },
            match: function(a, b) {
                var c = a && a.length || 0,
                    d, e;
                if (c < this.required) return !1;
                if (this.required > 0 && c > this.params.length) return !1;
                if (this.condition && !this.condition.eval({
                        frames: [this.evalParams(b, a)].concat(b.frames)
                    })) return !1;
                d = Math.min(c, this.arity);
                for (var f = 0; f < d; f++)
                    if (!this.params[f].name && a[f].eval(b).toCSS() != this.params[f].value.eval(b).toCSS()) return !1;
                return !0
            }
        }
    }(c("../tree")),
    function(a) {
        a.Operation = function(a, b) {
            this.op = a.trim(), this.operands = b
        }, a.Operation.prototype.eval = function(b) {
            var c = this.operands[0].eval(b),
                d = this.operands[1].eval(b),
                e;
            if (c instanceof a.Dimension && d instanceof a.Color) {
                if (this.op !== "*" && this.op !== "+") throw {
                    name: "OperationError",
                    message: "Can't substract or divide a color from a number"
                };
                e = d, d = c, c = e
            }
            return c.operate(this.op, d)
        }, a.operate = function(a, b, c) {
            switch (a) {
                case "+":
                    return b + c;
                case "-":
                    return b - c;
                case "*":
                    return b * c;
                case "/":
                    return b / c
            }
        }
    }(c("../tree")),
    function(a) {
        a.Paren = function(a) {
            this.value = a
        }, a.Paren.prototype = {
            toCSS: function(a) {
                return "(" + this.value.toCSS(a) + ")"
            },
            eval: function(b) {
                return new a.Paren(this.value.eval(b))
            }
        }
    }(c("../tree")),
    function(a) {
        a.Quoted = function(a, b, c, d) {
            this.escaped = c, this.value = b || "", this.quote = a.charAt(0), this.index = d
        }, a.Quoted.prototype = {
            toCSS: function() {
                return this.escaped ? this.value : this.quote + this.value + this.quote
            },
            eval: function(b) {
                var c = this,
                    d = this.value.replace(/`([^`]+)`/g, function(d, e) {
                        return (new a.JavaScript(e, c.index, !0)).eval(b).value
                    }).replace(/@\{([\w-]+)\}/g, function(d, e) {
                        var f = (new a.Variable("@" + e, c.index)).eval(b);
                        return "value" in f ? f.value : f.toCSS()
                    });
                return new a.Quoted(this.quote + d + this.quote, d, this.escaped, this.index)
            }
        }
    }(c("../tree")),
    function(a) {
        a.Rule = function(b, c, d, e, f) {
            this.name = b, this.value = c instanceof a.Value ? c : new a.Value([c]), this.important = d ? " " + d.trim() : "", this.index = e, this.inline = f || !1, b.charAt(0) === "@" ? this.variable = !0 : this.variable = !1
        }, a.Rule.prototype.toCSS = function(a) {
            return this.variable ? "" : this.name + (a.compress ? ":" : ": ") + this.value.toCSS(a) + this.important + (this.inline ? "" : ";")
        }, a.Rule.prototype.eval = function(b) {
            return new a.Rule(this.name, this.value.eval(b), this.important, this.index, this.inline)
        }, a.Shorthand = function(a, b) {
            this.a = a, this.b = b
        }, a.Shorthand.prototype = {
            toCSS: function(a) {
                return this.a.toCSS(a) + "/" + this.b.toCSS(a)
            },
            eval: function() {
                return this
            }
        }
    }(c("../tree")),
    function(a) {
        a.Ruleset = function(a, b) {
            this.selectors = a, this.rules = b, this._lookups = {}
        }, a.Ruleset.prototype = {
            eval: function(b) {
                var c = this.selectors && this.selectors.map(function(a) {
                        return a.eval(b)
                    }),
                    d = new a.Ruleset(c, this.rules.slice(0));
                d.root = this.root, d.allowImports = this.allowImports, b.frames.unshift(d);
                if (d.root || d.allowImports)
                    for (var e = 0; e < d.rules.length; e++) d.rules[e] instanceof a.Import && Array.prototype.splice.apply(d.rules, [e, 1].concat(d.rules[e].eval(b)));
                for (var e = 0; e < d.rules.length; e++) d.rules[e] instanceof a.mixin.Definition && (d.rules[e].frames = b.frames.slice(0));
                for (var e = 0; e < d.rules.length; e++) d.rules[e] instanceof a.mixin.Call && Array.prototype.splice.apply(d.rules, [e, 1].concat(d.rules[e].eval(b)));
                for (var e = 0, f; e < d.rules.length; e++) f = d.rules[e], f instanceof a.mixin.Definition || (d.rules[e] = f.eval ? f.eval(b) : f);
                return b.frames.shift(), d
            },
            match: function(a) {
                return !a || a.length === 0
            },
            variables: function() {
                return this._variables ? this._variables : this._variables = this.rules.reduce(function(b, c) {
                    return c instanceof a.Rule && c.variable === !0 && (b[c.name] = c), b
                }, {})
            },
            variable: function(a) {
                return this.variables()[a]
            },
            rulesets: function() {
                return this._rulesets ? this._rulesets : this._rulesets = this.rules.filter(function(b) {
                    return b instanceof a.Ruleset || b instanceof a.mixin.Definition
                })
            },
            find: function(b, c) {
                c = c || this;
                var d = [],
                    e, f, g = b.toCSS();
                return g in this._lookups ? this._lookups[g] : (this.rulesets().forEach(function(e) {
                    if (e !== c)
                        for (var g = 0; g < e.selectors.length; g++)
                            if (f = b.match(e.selectors[g])) {
                                b.elements.length > e.selectors[g].elements.length ? Array.prototype.push.apply(d, e.find(new a.Selector(b.elements.slice(1)), c)) : d.push(e);
                                break
                            }
                }), this._lookups[g] = d)
            },
            toCSS: function(b, c) {
                var d = [],
                    e = [],
                    f = [],
                    g = [],
                    h, i;
                this.root || (b.length === 0 ? g = this.selectors.map(function(a) {
                    return [a]
                }) : this.joinSelectors(g, b, this.selectors));
                for (var j = 0; j < this.rules.length; j++) i = this.rules[j], i.rules || i instanceof a.Directive ? f.push(i.toCSS(g, c)) : i instanceof a.Comment ? i.silent || (this.root ? f.push(i.toCSS(c)) : e.push(i.toCSS(c))) : i.toCSS && !i.variable ? e.push(i.toCSS(c)) : i.value && !i.variable && e.push(i.value.toString());
                return f = f.join(""), this.root ? d.push(e.join(c.compress ? "" : "\n")) : e.length > 0 && (h = g.map(function(a) {
                    return a.map(function(a) {
                        return a.toCSS(c)
                    }).join("").trim()
                }).join(c.compress ? "," : g.length > 3 ? ",\n" : ", "), d.push(h, (c.compress ? "{" : " {\n  ") + e.join(c.compress ? "" : "\n  ") + (c.compress ? "}" : "\n}\n"))), d.push(f), d.join("") + (c.compress ? "\n" : "")
            },
            joinSelectors: function(a, b, c) {
                for (var d = 0; d < c.length; d++) this.joinSelector(a, b, c[d])
            },
            joinSelector: function(b, c, d) {
                var e = [],
                    f = [],
                    g = [],
                    h = [],
                    i = !1,
                    j;
                for (var k = 0; k < d.elements.length; k++) j = d.elements[k], j.combinator.value.charAt(0) === "&" && (i = !0), i ? h.push(j) : g.push(j);
                i || (h = g, g = []), g.length > 0 && e.push(new a.Selector(g)), h.length > 0 && f.push(new a.Selector(h));
                for (var l = 0; l < c.length; l++) b.push(e.concat(c[l]).concat(f))
            }
        }
    }(c("../tree")),
    function(a) {
        a.Selector = function(a) {
            this.elements = a, this.elements[0].combinator.value === "" && (this.elements[0].combinator.value = " ")
        }, a.Selector.prototype.match = function(a) {
            var b = this.elements.length,
                c = a.elements.length,
                d = Math.min(b, c);
            if (b < c) return !1;
            for (var e = 0; e < d; e++)
                if (this.elements[e].value !== a.elements[e].value) return !1;
            return !0
        }, a.Selector.prototype.eval = function(b) {
            return new a.Selector(this.elements.map(function(a) {
                return a.eval(b)
            }))
        }, a.Selector.prototype.toCSS = function(a) {
            return this._css ? this._css : this._css = this.elements.map(function(b) {
                return typeof b == "string" ? " " + b.trim() : b.toCSS(a)
            }).join("")
        }
    }(c("../tree")),
    function(b) {
        b.URL = function(b, c) {
            b.data ? this.attrs = b : (typeof a != "undefined" && !/^(?:https?:\/\/|file:\/\/|data:|\/)/.test(b.value) && c.length > 0 && (b.value = c[0] + (b.value.charAt(0) === "/" ? b.value.slice(1) : b.value)), this.value = b, this.paths = c)
        }, b.URL.prototype = {
            toCSS: function() {
                return "url(" + (this.attrs ? "data:" + this.attrs.mime + this.attrs.charset + this.attrs.base64 + this.attrs.data : this.value.toCSS()) + ")"
            },
            eval: function(a) {
                return this.attrs ? this : new b.URL(this.value.eval(a), this.paths)
            }
        }
    }(c("../tree")),
    function(a) {
        a.Value = function(a) {
            this.value = a, this.is = "value"
        }, a.Value.prototype = {
            eval: function(b) {
                return this.value.length === 1 ? this.value[0].eval(b) : new a.Value(this.value.map(function(a) {
                    return a.eval(b)
                }))
            },
            toCSS: function(a) {
                return this.value.map(function(b) {
                    return b.toCSS(a)
                }).join(a.compress ? "," : ", ")
            }
        }
    }(c("../tree")),
    function(a) {
        a.Variable = function(a, b, c) {
            this.name = a, this.index = b, this.file = c
        }, a.Variable.prototype = {
            eval: function(b) {
                var c, d, e = this.name;
                e.indexOf("@@") == 0 && (e = "@" + (new a.Variable(e.slice(1))).eval(b).value);
                if (c = a.find(b.frames, function(a) {
                        if (d = a.variable(e)) return d.value.eval(b)
                    })) return c;
                throw {
                    type: "Name",
                    message: "variable " + e + " is undefined",
                    filename: this.file,
                    index: this.index
                }
            }
        }
    }(c("../tree")),
    function(a) {
        a.find = function(a, b) {
            for (var c = 0, d; c < a.length; c++)
                if (d = b.call(a, a[c])) return d;
            return null
        }, a.jsify = function(a) {
            return Array.isArray(a.value) && a.value.length > 1 ? "[" + a.value.map(function(a) {
                return a.toCSS(!1)
            }).join(", ") + "]" : a.toCSS(!1)
        }
    }(c("./tree"));
    var g = location.protocol === "file:" || location.protocol === "chrome:" || location.protocol === "chrome-extension:" || location.protocol === "resource:";
    d.env = d.env || (location.hostname == "127.0.0.1" || location.hostname == "0.0.0.0" || location.hostname == "localhost" || location.port.length > 0 || g ? "development" : "production"), d.async = !1, d.poll = d.poll || (g ? 1e3 : 1500), d.watch = function() {
        return this.watchMode = !0
    }, d.unwatch = function() {
        return this.watchMode = !1
    }, d.env === "development" ? (d.optimization = 0, /!watch/.test(location.hash) && d.watch(), d.watchTimer = setInterval(function() {
        d.watchMode && n(function(a, b, c, d, e) {
            b && r(b.toCSS(), d, e.lastModified)
        })
    }, d.poll)) : d.optimization = 3;
    var h;
    try {
        h = typeof a.localStorage == "undefined" ? null : a.localStorage
    } catch (i) {
        h = null
    }
    var j = document.getElementsByTagName("link"),
        k = /^text\/(x-)?less$/;
    d.sheets = [];
    for (var l = 0; l < j.length; l++)(j[l].rel === "stylesheet/less" || j[l].rel.match(/stylesheet/) && j[l].type.match(k)) && d.sheets.push(j[l]);
    d.refresh = function(a) {
        var b, c;
        b = c = new Date, n(function(a, d, e, f, g) {
            g.local ? v("loading " + f.href + " from cache.") : (v("parsed " + f.href + " successfully."), r(d.toCSS(), f, g.lastModified)), v("css for " + f.href + " generated in " + (new Date - c) + "ms"), g.remaining === 0 && v("css generated in " + (new Date - b) + "ms"), c = new Date
        }, a), m()
    }, d.refreshStyles = m, d.refresh(d.env === "development")
})(window);