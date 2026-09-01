//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
};
//#endregion
//#region src/components/tabs.js
function n(e) {
	let t = Array.from(e.querySelectorAll("[role=\"tab\"]"));
	t.forEach((e) => {
		e.addEventListener("click", (n) => i(t, e)), e.addEventListener("keydown", (n) => {
			[" ", "Enter"].includes(n.key) ? (n.preventDefault(), n.stopPropagation(), i(t, e)) : [
				"ArrowRight",
				"ArrowLeft",
				"Home",
				"End"
			].includes(n.key) && r(n, t, e);
		});
	});
}
function r(e, t, n) {
	let r = t.indexOf(n);
	if (r === -1) return;
	let i = 0;
	switch (e.key) {
		case "ArrowRight":
			i = (r + 1) % t.length;
			break;
		case "ArrowLeft":
			i = (r - 1 + t.length) % t.length;
			break;
		case "Home":
			i = 0;
			break;
		case "End":
			i = t.length - 1;
			break;
		default: return;
	}
	t[i].focus(), e.preventDefault(), e.stopPropagation();
}
function i(e, t) {
	for (let n of e) n === t ? (n.setAttribute("aria-selected", !0), n.tabIndex = 0) : (n.setAttribute("aria-selected", !1), n.tabIndex = -1);
	let n = document.getElementById(t.getAttribute("aria-controls")), r = n.parentNode.children;
	for (let e of r) e.hidden = e !== n;
}
//#endregion
//#region src/utils/match-container.js
function a(e, t, n) {
	let r = null, i = new ResizeObserver((e) => {
		let i = t * parseFloat(window.getComputedStyle(document.documentElement).fontSize);
		for (let t of e) {
			let e = (t.contentBoxSize[0] ? t.contentBoxSize[0].inlineSize : t.contentRect.width) <= i;
			e !== r && (r = e, n({
				matches: e,
				currentPixelThreshold: i
			}));
		}
	});
	return i.observe(e), () => i.unobserve(e);
}
//#endregion
//#region src/components/enclosure.js
function o(e) {
	let t = document.body;
	a(t, e.dataset.media, (t) => {
		e.querySelectorAll("[data-is=\"base-enclosure-button\"]").forEach((e) => {
			let n = e.dataset.for, r = document.getElementById(n);
			if (!r) return;
			let i = {
				role: "button",
				tabindex: 0,
				"aria-controls": n,
				"aria-expanded": e.dataset.expanded.trim().toLowerCase() === "true"
			};
			t.matches ? (r.hidden = !i["aria-expanded"], Object.keys(i).forEach((t) => {
				e.setAttribute(t, i[t]);
			}), e.addEventListener("click", s), e.addEventListener("keydown", s)) : (Object.keys(i).forEach((t) => {
				e.removeAttribute(t);
			}), e.removeEventListener("click", s), e.removeEventListener("keyboard", s), r.hidden = !1);
		});
	});
}
function s(e) {
	if (e.type === "keydown" && ![" ", "Enter"].includes(e.key)) return;
	e.key === " " && e.preventDefault();
	let t = e.currentTarget, n = t.dataset.for, r = document.querySelector(`#${n}:not([hidden] *)`);
	r && (t.getAttribute("aria-expanded") === "false" ? (r.hidden = !1, t.setAttribute("aria-expanded", !0)) : (r.hidden = !0, t.setAttribute("aria-expanded", !1)));
}
//#endregion
//#region src/utils.js
var c = /* @__PURE__ */ t({ matchContainer: () => a }), l = {
	"data-base-tabs": n,
	"data-base-enclosure": o
}, u = {
	utils: c,
	init_all(e = document) {
		Object.entries(l).forEach(([t, n]) => {
			e.querySelectorAll(`[${t}]`).forEach((e) => {
				if (e.dataset.baseEnhanced !== "true") try {
					n(e), e.dataset.baseEnhanced = "true";
				} catch (e) {
					console.error(e);
				}
			});
		});
	}
};
typeof window < "u" && (window.base = u);
//#endregion
export { u as base };

//# sourceMappingURL=base.js.map