webpackJsonp([2], {
	0: function(e, t, n) {
		var i, s;
		i = [n("shim/jquery"), n("require/backbone"), n("splunkjs/mvc/headerview"), n(190), n(189), n(118)], s = function(e, t, i, s, a, o) {
			var c = a.generatePublicPath,
				l = o.configManager,
				r = function() {
					var t = l.unifiedConfig.meta.name;
					n.p = c(t), new i({
						id: "header",
						section: "dashboards",
						el: e(".preload"),
						acceleratedAppNav: !0
					}).render(), document.title = "Inputs";
					var a = new s;
					a.render(), e(".addonContainer").html(a.el)
				};
			l.init(r)
		}.apply(t, i), !(void 0 !== s && (e.exports = s))
	},
	190: function(e, t, n) {
		function i(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		var s, a, o = n(118),
			c = n(144),
			l = n(123),
			r = n(191),
			p = n(147),
			h = i(p);
		s = [n("shim/jquery"), n(119), n("require/backbone"), n(146), n(192), n("views/shared/tablecaption/Master"), n(193), n(195), n(177), n(174)], a = function(e, t, n, i, s, a, p, u, d, g) {
			return n.View.extend({
				className: "inputsContainer",
				initialize: function(e) {
					var i = this;
					this.unifiedConfig = o.configManager.unifiedConfig, this.inputsPageTemplateData = {}, this.inputsPageTemplateData.title = this.unifiedConfig.pages.inputs.title, this.inputsPageTemplateData.description = this.unifiedConfig.pages.inputs.description, this.inputsPageTemplateData.singleInput = 1 === this.unifiedConfig.pages.inputs.services.length, this.inputsPageTemplateData.buttonText = (0, l.getFormattedMessage)(100), this.addonName = this.unifiedConfig.meta.name, this.stateModel = new n.Model, this.stateModel.set({
						sortKey: "name",
						sortDirection: "asc",
						count: 10,
						offset: 0,
						fetching: !0
					}), this.services = this.unifiedConfig.pages.inputs.services, this.filterKey = [], t.each(this.services, function(e) {
						return t.each(e.entity, function(e) {
							i.filterKey.indexOf(e.field) < 0 && i.filterKey.push(e.field)
						})
					}), t.each(this.services, function(e) {
						h.default[e.name] ? i[e.name] = (0, c.generateCollection)("", {
							endpointUrl: h.default[e.name]
						}) : i[e.name] = (0, c.generateCollection)(e.name)
					}), this.dispatcher = t.extend({}, n.Events), this.listenTo(this.dispatcher, "filter-change", function(e) {
						i.filterChange(e, i.stateModel)
					}), this.listenTo(this.dispatcher, "delete-input", function() {
						var e = i.fetchAllCollection();
						e.done(function() {
							var e, n = i.stateModel.get("offset"),
								s = i.stateModel.get("count");
							i.cachedInputs = i.combineCollection(), i.cachedSearchInputs = i.combineCollection(), i.inputs.paging.set("offset", n), i.inputs.paging.set("perPage", s), i.inputs.paging.set("total", i.cachedSearchInputs.length), e = i.cachedSearchInputs.models.slice(n, n + s), t.each(e, function(e) {
								e.paging.set("offset", n), e.paging.set("perPage", s), e.paging.set("total", i.cachedSearchInputs.length)
							}), i.inputs.reset(e), i.inputs._url = void 0
						})
					}), this.listenTo(this.dispatcher, "add-input", function() {
						var e = i.fetchAllCollection();
						e.done(function() {
							var e, n = i.stateModel.get("offset"),
								s = i.stateModel.get("count");
							i.cachedInputs = i.combineCollection(), i.cachedSearchInputs = i.combineCollection(), i.inputs.paging.set("offset", n), i.inputs.paging.set("perPage", s), i.inputs.paging.set("total", i.cachedSearchInputs.length), e = i.cachedSearchInputs.models.slice(n, n + s), t.each(e, function(e) {
								e.paging.set("offset", n), e.paging.set("perPage", s), e.paging.set("total", i.cachedSearchInputs.length)
							}), i.inputs.reset(e), i.inputs._url = void 0
						})
					}), this.listenTo(this.stateModel, "change:sortDirection change:sortKey", t.debounce(function() {
						void 0 === this.inputs._url ? this.sortCollection(this.stateModel) : this.fetchListCollection(this.inputs, this.stateModel)
					}.bind(this), 0)), this.listenTo(this.stateModel, "change:search", t.debounce(function() {
						void 0 === this.inputs._url ? this.searchCollection(this.stateModel) : this.fetchListCollection(this.inputs, this.stateModel)
					}.bind(this), 0)), this.listenTo(this.stateModel, "change:offset", t.debounce(function() {
						void 0 === this.inputs._url ? this.pageCollection(this.stateModel) : this.fetchListCollection(this.inputs, this.stateModel)
					}.bind(this), 0)), this.deferred = this.fetchAllCollection(), this.filter = new p({
						dispatcher: this.dispatcher,
						services: this.services
					}), this.emptySearchString = this.filterKey.map(function(e) {
						return e + "=*"
					}).join(" OR ")
				},
				filterChange: function(e, n) {
					var i = this;
					n.set("offset", 0, {
						silent: !0
					});
					var s, a, o, l = this.stateModel.get("search");
					"all" === e ? void 0 !== l && l !== this.emptySearchString ? (this.searchCollection(this.stateModel), this.inputs._url = void 0) : (s = this.fetchAllCollection(), s.done(function() {
						var e = i.stateModel.get("offset"),
							n = i.stateModel.get("count");
						i.cachedInputs = i.combineCollection(), i.cachedSearchInputs = i.combineCollection(), i.inputs.paging.set("offset", e), i.inputs.paging.set("perPage", n), i.inputs.paging.set("total", i.cachedSearchInputs.length), a = i.cachedSearchInputs.models.slice(e, e + n), t.each(a, function(t) {
							t.paging.set("offset", e), t.paging.set("perPage", n), t.paging.set("total", i.cachedSearchInputs.length)
						}), i.inputs.reset(a), i.inputs._url = void 0
					})) : (o = this.fetchListCollection(this[e], this.stateModel), o.done(function() {
						var n = t.find(i.services, function(t) {
							return t.name === e
						});
						h.default[n.name] ? i.inputs.model = (0, c.generateModel)("", {
							endpointUrl: h.default[n.name]
						}) : i.inputs.model = (0, c.generateModel)(n.name), i.inputs._url = i[e]._url, i.inputs.reset(i[e].models);
						var s = i.stateModel.get("offset"),
							a = i.stateModel.get("count");
						i.inputs.paging.set("offset", s), i.inputs.paging.set("perPage", a), i.inputs.paging.set("total", i[e].paging.get("total"))
					}))
				},
				render: function() {
					var n = this;
					this.$el.html('<div class="loading-msg-icon">' + (0, l.getFormattedMessage)(115) + "</div>"), this.deferred.done(function() {
						n.$el.html(""), n.stateModel.set("fetching", !1), n.cachedInputs = n.combineCollection(), n.cachedSearchInputs = n.combineCollection(), n.inputs = n.combineCollection(), n.inputs.models = n.cachedInputs.models.slice(0, n.stateModel.get("count")), 0 !== n.inputs.length && t.each(n.inputs.models, function(e) {
							return e.paging.set("total", n.inputs.length)
						}), n.inputs.paging.set("total", n.inputs.length), n.caption = new a({
							countLabel: t(n.unifiedConfig.pages.inputs.title).t(),
							model: {
								state: n.stateModel
							},
							collection: n.inputs,
							noFilterButtons: !0,
							filterKey: n.filterKey
						}), n.inputTable = new g({
							stateModel: n.stateModel,
							collection: n.inputs,
							dispatcher: n.dispatcher,
							enableBulkActions: !1,
							showActions: !0,
							enableMoreInfo: !0,
							component: n.unifiedConfig.pages.inputs
						}), n.$el.append(t.template(s)(n.inputsPageTemplateData)), n.$el.append(n.caption.render().$el), n.inputsPageTemplateData.singleInput || e(".table-caption-inner").append(n.filter.render().$el), n.$el.append(n.inputTable.render().$el), n.inputsPageTemplateData.singleInput ? n.$("#addInputBtn").on("click", function() {
							var t = new d({
								el: e(".dialog-placeholder"),
								collection: n.inputs,
								component: n.unifiedConfig.pages.inputs.services[0],
								isInput: !0
							}).render();
							t.modal()
						}) : n.$("#addInputBtn").on("click", function(t) {
							var i = e(t.currentTarget);
							return n.editmenu && n.editmenu.shown ? (n.editmenu.hide(), void t.preventDefault()) : (n.editmenu = new u({
								collection: n.inputs,
								dispatcher: n.dispatcher,
								services: n.unifiedConfig.pages.inputs.services
							}), e("body").append(n.editmenu.render().el), void n.editmenu.show(i))
						})
					})
				},
				fetchAllCollection: function() {
					var i = this,
						s = new n.Model({
							sortKey: "name",
							sortDirection: "asc",
							count: 0,
							offset: 0,
							fetching: !0
						}),
						a = t.map(this.services, function(e) {
							return i.fetchListCollection(i[e.name], s)
						});
					return e.when.apply(this, a)
				},
				combineCollection: function() {
					var e = this,
						n = (0, c.generateCollection)();
					return t.each(this.services, function(t) {
						n.add(e[t.name].models, {
							silent: !0
						})
					}), n
				},
				fetchListCollection: function(e, t) {
					var n = "",
						i = "";
					return t.get("search") && (i = t.get("search"), n = this.getRawSearch(i), "disabled".indexOf(n) > -1 ? i += ' OR (disabled="*1*")' : "enabled".indexOf(n) > -1 && (i += ' OR (disabled="*0*")')), t.set("fetching", !0), e.fetch({
						data: {
							sort_dir: t.get("sortDirection"),
							sort_key: t.get("sortKey"),
							search: i,
							count: t.get("count"),
							offset: t.get("offset")
						},
						success: function() {
							t.set("fetching", !1)
						}
					})
				},
				searchCollection: function(e) {
					var i, s, a = this,
						o = e.get("search"),
						c = [],
						l = (e.get("search"), this.stateModel.get("offset")),
						r = this.stateModel.get("count");
					if (o !== this.emptySearchString) {
						o = this.getRawSearch(o), c = this.cachedInputs.models.filter(function(e) {
							return a.filterKey.some(function(t) {
								var n = e.entry.get(t) && e.entry.get(t).toLowerCase() || void 0,
									i = e.entry.content.get(t) && e.entry.content.get(t).toLowerCase() || void 0;
								return n && n.indexOf(o) > -1 || i && i.indexOf(o) > -1
							})
						}), "disabled".indexOf(o) > -1 ? c = c.concat(this.cachedInputs.models.filter(function(e) {
							return e.entry.content.get("disabled") === !0
						})) : "enabled".indexOf(o) > -1 && (c = c.concat(this.cachedInputs.models.filter(function(e) {
							return e.entry.content.get("disabled") === !1
						}))), this.inputs.paging.set("offset", l), this.inputs.paging.set("perPage", r), this.inputs.paging.set("total", c.length), t.each(c, function(e) {
							e.paging.set("offset", l), e.paging.set("perPage", r), e.paging.set("total", c.length)
						}), this.cachedSearchInputs.reset(c);
						var p = new n.Model({
							sortKey: "name",
							sortDirection: "asc",
							count: 10,
							offset: 0,
							fetching: !0
						});
						this.pageCollection(p)
					} else i = this.fetchAllCollection(), i.done(function() {
						a.cachedInputs = a.combineCollection(), a.cachedSearchInputs = a.combineCollection(), a.inputs.paging.set("offset", l), a.inputs.paging.set("perPage", r), a.inputs.paging.set("total", a.cachedSearchInputs.length), s = a.cachedSearchInputs.models.slice(l, l + r), t.each(s, function(e) {
							e.paging.set("offset", l), e.paging.set("perPage", r), e.paging.set("total", a.cachedSearchInputs.length)
						}), a.inputs.reset(s), a.inputs._url = void 0, a.stateModel.get("search") !== a.emptySearchString && a.searchCollection(a.stateModel)
					})
				},
				pageCollection: function(e) {
					var n, i = this,
						s = e.get("offset"),
						a = e.get("count");
					this.inputs.paging.set("offset", s), this.inputs.paging.set("perPage", a), this.inputs.paging.set("total", this.cachedSearchInputs.length), n = this.cachedSearchInputs.models.slice(s, s + a), t.each(n, function(e) {
						e.paging.set("offset", s), e.paging.set("perPage", a), e.paging.set("total", i.cachedSearchInputs.length)
					}), this.inputs.reset(n)
				},
				sortCollection: function(e) {
					var n = this,
						i = e.get("sortDirection"),
						s = e.get("sortKey"),
						a = this.fetchAllCollection(),
						o = e.get("offset"),
						c = e.get("count"),
						l = function(e, t) {
							return (0, r.sortAlphabetical)(e.entry.get(s) || e.entry.content.get(s), t.entry.get(s) || t.entry.content.get(s), i)
						};
					a.done(function() {
						n.cachedInputs = n.combineCollection(), n.cachedSearchInputs = n.combineCollection(), n.inputs.paging.set("offset", o), n.inputs.paging.set("perPage", c), n.inputs.paging.set("total", n.cachedSearchInputs.length), n.cachedSearchInputs.models.sort(l);
						var e = n.cachedSearchInputs.models.slice(o, o + c);
						t.each(e, function(e) {
							e.paging.set("offset", o), e.paging.set("perPage", c), e.paging.set("total", n.cachedSearchInputs.length)
						}), n.inputs.reset(e), n.inputs._url = void 0
					})
				},
				getRawSearch: function(e) {
					return e ? e.substring(e.indexOf("*") + 1, e.indexOf("*", e.indexOf("*") + 1)).toLowerCase() : ""
				}
			})
		}.apply(t, s), !(void 0 !== a && (e.exports = a))
	},
	191: function(e, t) {
		"use strict";
		Object.defineProperty(t, "__esModule", {
			value: !0
		});
		t.sortAlphabetical = function(e, t, n) {
			e = e ? e : "", t = t ? t : "";
			var i = e < t ? -1 : e > t ? 1 : 0;
			return "asc" === n ? i : -i
		}, t.sortNumerical = function(e, t, n) {
			e = e ? e : 0, t = t ? t : 0;
			var i = e < t ? -1 : e > t ? 1 : 0;
			return "asc" === n ? i : -i
		}
	},
	192: function(e, t) {
		e.exports = '<div class ="tool-bar">\n    <div class ="tool-title"><%- _(title).t() %></div>\n    <div class = "tool-button">\n        <div class="dropdown add-button">\n            <button id="addInputBtn" class="btn btn-primary" type="button">\n                <%- _(buttonText).t() %>\n                <% if (!singleInput) { %>\n                    <span class="caret"></span>\n                <% } %>\n            </button>\n        </div>\n    </div>\n    <div class= "tool-description">\n        <%- _(description).t() %>\n    </div>\n</div>\n<hr>\n'
	},
	193: function(e, t, n) {
		var i, s, a = n(123);
		i = [n("shim/jquery"), n(119), n("require/backbone"), n(194)], s = function(e, t, n, i) {
			return n.View.extend({
				className: "type-filter",
				events: {
					"mousedown a.dropdown-toggle": function(e) {
						this.filter(e)
					},
					"keydown a.dropdown-toggle": function(e) {
						13 === e.which && (this.filter(e), e.preventDefault())
					},
					"click a.dropdown-toggle": function(e) {
						e.preventDefault()
					}
				},
				initialize: function(e) {
					this.dispatcher = e.dispatcher, this.services = e.services, this.dispatcher.on("filter-change", function(e) {
						this.changeType(e)
					}.bind(this)), this.inputFilterLabel = (0, a.getFormattedMessage)(106)
				},
				render: function() {
					return this.$el.html(t.template(this.template)({
						inputFilterLabel: this.inputFilterLabel
					})), this
				},
				changeType: function(n) {
					var i = t.find(this.services, function(e) {
						return e.name === n
					});
					this.$("a.dropdown-toggle").empty(), "all" === n ? this.$("a.dropdown-toggle").append(t.template('<%- _("All").t() %>')) : this.$("a.dropdown-toggle").append(t.template(t(i.title).t())), this.$("a.dropdown-toggle").append(e('<span class="caret"></span>'))
				},
				filter: function(t) {
					var n = e(t.currentTarget);
					return this.inputFilter && this.inputFilter.shown ? (this.inputFilter.hide(), void t.preventDefault()) : (this.inputFilter = new i({
						dispatcher: this.dispatcher,
						services: this.services
					}), e("body").append(this.inputFilter.render().el), void this.inputFilter.show(n))
				},
				template: '\n            <%- inputFilterLabel %> :\n            <a class="dropdown-toggle" href="#">\n                <%- _("All").t() %><span class="caret"></span>\n            </a>\n        '
			})
		}.apply(t, i), !(void 0 !== s && (e.exports = s))
	},
	194: function(e, t, n) {
		var i, s;
		i = [n("shim/jquery"), n(119), n("views/shared/PopTart")], s = function(e, t, n) {
			return n.extend({
				className: "dropdown-menu",
				events: {
					"click a": "changeFilter"
				},
				initialize: function(e) {
					n.prototype.initialize.apply(this, arguments), this.dispatcher = e.dispatcher, this.services = e.services
				},
				render: function() {
					var e = '<ul class="first-group"><li><a href="#" class="all"><%- _("All").t() %></a></li></ul><ul class="second-group">';
					return t.each(this.services, function(n) {
						e += '<li><a href="#" class="' + n.name + '">' + t(n.title).t() + "</a></li>"
					}), e += "</ul>", this.el.innerHTML = n.prototype.template_menu, this.$el.append(t.template(e)), this.$el.addClass("dropdown-menu-narrow"), this
				},
				changeFilter: function(t) {
					this.hide();
					var n = e(t.target).attr("class");
					this.dispatcher.trigger("filter-change", n)
				}
			})
		}.apply(t, i), !(void 0 !== s && (e.exports = s))
	},
	195: function(e, t, n) {
		var i, s;
		i = [n(119), n("shim/jquery"), n(146), n("views/shared/PopTart"), n(177)], s = function(e, t, n, i, s) {
			return i.extend({
				className: "dropdown-menu",
				initialize: function(t) {
					e.bindAll(this, "create"), i.prototype.initialize.apply(this, arguments), this.collection = t.collection, this.dispatcher = t.dispatcher, this.services = t.services
				},
				events: {
					"click a": "create"
				},
				render: function() {
					var t, n = '<ul class="first-group">';
					for (t in this.services) this.services.hasOwnProperty(t) && (n += '<li><a href="#" class="' + t + '">' + e(this.services[t].title).t() + "</a></li>");
					return n += "</ul>", this.el.innerHTML = i.prototype.template_menu, this.$el.append(n), this.$el.addClass("dropdown-menu-narrow"), this
				},
				create: function(e) {
					this.serviceType = t(e.target).attr("class");
					var n = new s({
						el: t(".dialog-placeholder"),
						collection: this.collection,
						component: this.services[this.serviceType],
						isInput: !0
					}).render();
					n.modal(), this.hide()
				}
			})
		}.apply(t, i), !(void 0 !== s && (e.exports = s))
	}
});
