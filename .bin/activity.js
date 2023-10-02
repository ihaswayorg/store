!(function () {
    var e,
        t,
        n = function (e) {
            return ("; " + document.cookie)
                .split("; ".concat(e, "="))
                .pop()
                .split(";")[0];
        },
        a = "userActTraSerBrowId",
        o = "userActTraSerSessId";
    !(function () {
        var e = n(a).trim();
        "" === e && (e = crypto.randomUUID());
        var t = new Date(new Date().getTime() + 10368e6).toUTCString();
        document.cookie = ""
            .concat(a, "=")
            .concat(e, "; expires=")
            .concat(t, "; path=/");
    })(),
        (function () {
            var e = n(o).trim();
            "" === e && (e = crypto.randomUUID());
            var t = new Date(new Date().getTime() + 18e5).toUTCString();
            document.cookie = ""
                .concat(o, "=")
                .concat(e, "; expires=")
                .concat(t, "; path=/");
        })();
    var i,
        s,
        r = function (i, s, r) {
            switch (i) {
                case "init":
                    (e = s), (t = r);
                    break;
                case "send":
                    var c = new XMLHttpRequest();
                    c.open("POST", "https://activity.rokomari.io/api/v1/activities", !0),
                        c.setRequestHeader("Content-Type", "application/json"),
                        c.send(
                            JSON.stringify({
                                browserOrDeviceId: n(a),
                                sessionId: n(o),
                                siteId: e,
                                userId: t,
                                deviceType:
                                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                        navigator.userAgent
                                    )
                                        ? "MOBILE"
                                        : "DESKTOP",
                                activityType: s,
                                contentId: r,
                            })
                        );
            }
        },
        c = document.querySelector('meta[name="user-id"]');
    c && (i = c.content),
        r("init", 1, i),
        "/book" === (s = new URL(window.location.href)).pathname
            ? r("send", "HOME_PAGE_VISIT")
            : /\/(book|product|electronics|giftvoucher)\/\d+\/.*/.test(s.pathname)
                ? r("send", "DETAILS_PAGE_VISIT", s.pathname.split("/")[2])
                : /\/book\/author\/\d+\/.*/.test(s.pathname)
                    ? r("send", "AUTHOR_PAGE_VISIT", s.pathname.split("/")[3])
                    : /\/book\/publisher\/\d+\/.*/.test(s.pathname)
                        ? r("send", "PUBLISHER_PAGE_VISIT", s.pathname.split("/")[3])
                        : /\/brand\/\d+\/.*/.test(s.pathname)
                            ? r("send", "BRAND_PAGE_VISIT", s.pathname.split("/")[2])
                            : /\/(book|product|electronics)\/category\/\d+\/.*/.test(s.pathname)
                                ? r("send", "BROWSE_PAGE_VISIT", s.pathname.split("/")[3])
                                : "/cart" === s.pathname
                                    ? r("send", "CART_PAGE_VISIT")
                                    : "/shipping" === s.pathname
                                        ? r("send", "SHIPPING_PAYMENT_PAGE_VISIT")
                                        : /\/(order-place-success|confirmation)\/\d+/.test(s.pathname)
                                            ? r("send", "ORDER_PLACE", s.pathname.split("/")[2])
                                            : /\/payment\/nagad\/\d+/.test(s.pathname)
                                                ? r("send", "ORDER_PLACE", s.pathname.split("/")[3])
                                                : "/payment/sslcommerz-payment" === s.pathname
                                                    ? r("send", "ORDER_PLACE", s.searchParams.get("order"))
                                                    : "/payment/bkashpayment" === s.pathname &&
                                                    r("send", "ORDER_PLACE", s.searchParams.get("orderid")),
        document.addEventListener("DOMContentLoaded", function (e) {
            for (
                var t = document.getElementsByClassName("js--look-inside"), n = 0;
                n < t.length;
                n++
            )
                t[n].addEventListener("click", function (e) {
                    return r(
                        "send",
                        "LOOK_INSIDER_CLICK",
                        window.location.pathname.split("/")[2]
                    );
                });
        });
})();

///////////////////////////////////////
const ecomEventEmit = (e, n, t, m, i) => {
    gtag("event", e, {
        currency: "BDT",
        value: i,
        content_type: n,
        items: [{ item_id: "rok_" + t, item_category: m }],
    });
};

////////////////////////////////////////
/*
 * Copyright (c), Onnorokom Web Services Ltd (OWSL) and/or its affiliates. All rights reserved.
 * OWSL PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

// while importing this script into html you should set the script tag type to "module"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
    getMessaging,
    getToken,
    onMessage,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js";

const CSRF = $("meta[name=csrf-token]").attr("content");

const FIREBASE_COOKIE_NAME = "fbse";
const FIREBASE_COOKIE_TTL_DAYS = 10;
const NOTIFICATION_PERMISSION_COOKIE_NAME = "nt_perm";
const NOTIFICATION_PERMISSION_COOKIE_TTL_DAYS = 365;
const VAPID_KEY =
    "BLUp6FeEzjo8lEA2QFhkOkTFxsiiGmz3o9ctSS37N-q0OqQ5D_LYGEVvRJmOr6f5A0l_1GxTUae_GlnFjbJCVdQ";

// add your credentials here from firebase project console
const firebaseConfig = {
    apiKey: "AIzaSyBiyajtWLiFEhmCtlGMjMpzlmL9Q-_hW-E",
    authDomain: "rokomari-app-cross.firebaseapp.com",
    projectId: "rokomari-app-cross",
    storageBucket: "rokomari-app-cross.appspot.com",
    messagingSenderId: "248662726591",
    appId: "1:248662726591:web:bc96f74e4a3f4f7803730a",
};

if (Notification.permission === "granted") {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    let cookieToken = getCookie(FIREBASE_COOKIE_NAME);

    handleGetFcmToken();

    // handling notification when user is in foreground
    onMessage(messaging, (payload) => {
        generateNotification(payload);
    });

    function handleGetFcmToken() {
        getToken(messaging, {
            vapidKey: VAPID_KEY,
        }).then((currentFcmToken) => {
            if (!currentFcmToken) {
                console.log("Current fcm token is null");
            }

            if (cookieToken !== currentFcmToken) {
                saveFcmToken(currentFcmToken);
            }
        });
    }
}

$(document).on("NOTIFY::GRANTED", () => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    let cookieToken = getCookie(FIREBASE_COOKIE_NAME);

    getToken(messaging, {
        vapidKey: VAPID_KEY,
    }).then(async (currentFcmToken) => {
        if (cookieToken !== currentFcmToken) {
            const { result } = await saveFcmToken(currentFcmToken);
            if (result) {
                $(document).trigger({ type: "fcm", fcmToken: currentFcmToken });
            }
        }
    });
});

function saveFcmToken(fcmToken) {
    if (!CSRF) return;

    return $.ajax({
        method: "POST",
        url: "/fcm/tokens?_tk=" + CSRF,
        contentType: "application/json",
        data: JSON.stringify({ token: fcmToken }),
        success: (res) => {
            if (fcmToken) {
                setCookie(FIREBASE_COOKIE_NAME, fcmToken, FIREBASE_COOKIE_TTL_DAYS);
                setCookie(NOTIFICATION_PERMISSION_COOKIE_NAME, "", -1);
            } else {
                setCookie(FIREBASE_COOKIE_NAME, fcmToken, -1);
                setCookie(
                    NOTIFICATION_PERMISSION_COOKIE_NAME,
                    "denied",
                    NOTIFICATION_PERMISSION_COOKIE_TTL_DAYS
                );
            }
        },
        error: (err) => {
            console.log("Error during fcm save operation");
        },
    });
}

function generateNotification(payload) {
    if (Notification.permission === "granted") {
        // we can send an os level notification here or it is better to show an in web view
        // pop up notification
        const notificationOptions = {
            body: payload.notification.body,
            image: payload.notification.image,
            icon: "/favicon.ico",
        };

        const notification = new Notification(
            payload.notification.title,
            notificationOptions,
            null
        );
        notification.addEventListener("click", () => {
            handleRedirect(payload);
        });
    }
}

function setCookie(name, value, expireDays) {
    var d = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    return ("; " + document.cookie).split(`; ${cookieName}=`).pop().split(";")[0];
}

function handleRedirect(payload) {
    if (!payload.data) {
        return;
    }

    const redirectId = payload.data.redirectId;
    const redirectType = payload.data.redirectType;

    switch (redirectType) {
        case "home":
            location.replace("/book");
            break;
        case "product_details":
            location.replace(`/book/${redirectId}`);
            break;
        case "ebook":
            location.replace(`/book/${redirectId}`);
            break;
        case "author":
            location.replace(`/book/author/${redirectId}`);
            break;
        case "category":
            location.replace(`/book/category/${redirectId}`);
            break;
        case "popular":
            location.replace(`/book/category/${redirectId}`);
            break;
        case "publisher":
            location.replace(`/book/publisher/${redirectId}`);
            break;
        case "list":
            location.replace(`/list/${redirectId}`);
            break;
        case "offer":
            if (redirectId === undefined || redirectId === "" || isNaN(redirectId)) {
                location.replace("/offer");
            } else {
                location.replace(`/offer/details/${redirectId}`);
            }
            break;
        case "order_details":
            location.replace(`/my-section/orders?id=${redirectId}`);
            break;
    }
}

// handling push notification redirects
if ("serviceWorker" in window.navigator) {
    window.navigator.serviceWorker.addEventListener("message", (event) => {
        if (
            event.isTrusted &&
            event.data &&
            event.data.action === "PUSH_NOTIFICATION_REDIRECT"
        ) {
            window.location.href = event.data.url;
        }
    });
}

function deleteNotificationCookies() {
    document.cookie =
        "nt_pop_perm_denied=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
        "nt_pop_shown=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
        "nt_req_con_indx=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
        "nt_subscribed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "fbse=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

$(".js--logout-button").on("click", (event) => {
    event.preventDefault();
    deleteNotificationCookies();
    sessionStorage.removeItem("subscribedApiCalled");
    unregisterFcmServiceWorker().finally(() => (location.href = "/logout"));
});

function unregisterFcmServiceWorker() {
    if ("serviceWorker" in navigator) {
        return navigator.serviceWorker
            .getRegistrations()
            .then((regs) =>
                regs
                    .filter(
                        (reg) => reg.active.scriptURL.indexOf("firebase-messaging-sw.js") >= 0
                    )
                    .forEach((reg) => reg.unregister())
            )
            .catch((err) =>
                console.log("Fcm Service worker un-registration failed", err)
            );
    }

    return Promise.reject("Service Worker not found!");
}

/////////////////////////////

// const ADS_SERVER_BASE_URL = 'http://192.168.10.89:4000';
const ADS_SERVER_BASE_URL = "https://boostbackend.rokomari.dev";

let bannerZoneOnCurrentPage = $(".rok-adservx-zone");

if (bannerZoneOnCurrentPage) {
    function getBanner(ele) {
        let zone = $(ele).attr("zone-id") || "";
        let page = $(ele).attr("page-name") || "";
        let ext = $(ele).data("ext") || "";
        let href = location.href;

        $.get(
            `${ADS_SERVER_BASE_URL}/content-delivery/get-banner-by-zone?id=${zone}${ext}&page=${page}&href=${href}`
        ).done((res) => {
            $(ele).html(res);
        });
    }

    function calcAndShowBanner(zone, minHeight = 0) {
        const $this = $(zone);
        const windowTop = $(window).scrollTop();
        const windowBottom = windowTop + $(window).height();
        const elementTop = $this.offset().top;

        if (!$this.attr("loaded") && elementTop <= windowBottom + minHeight) {
            $this.attr("loaded", true);
            getBanner($this);
            return;
        }
    }

    $(".rok-adservx-zone").each(function (i) {
        calcAndShowBanner(this);
    });

    $(window).on("scroll", function () {
        if (
            $(".rok-adservx-zone").length != $(".rok-adservx-zone[loaded=true]").length
        ) {
            $(".rok-adservx-zone").each(function (i) {
                if ($(this).attr("loaded")) return;
                calcAndShowBanner(this, 150);
            });
        }
    });
}

// Count product ad impression
const adProductIds = [];
const productAdElements = $(".badge-ads.d-block");

/**
 * The function checks if an element is hidden by checking its display and visibility styles.
 * @param el - The `el` parameter is the element that you want to check if it is hidden or not.
 * @returns The function isHidden returns a boolean value indicating whether the element passed as an
 * argument is hidden or not.
 */
function isHidden(el) {
    const style = window.getComputedStyle(el);
    return style.display === "none" || style.visibility === "hidden";
}

/**
 * The function `getProductImpression` sends a GET request to a server to count the impressions of a
 * list of product IDs.
 * @param productIds - An array of product IDs for which you want to track impressions.
 */
function getProductImpression(productIds) {
    $.ajax({
        type: "GET",
        url: `${ADS_SERVER_BASE_URL}/browse-product-ads/get-product-impressions?productIds=${productIds}`,
        success: function (response) {
            console.log("Impression counted successfully!");
        },
        error: function (error) { },
        complete: function () { },
    });
}

/**
 * The code block is iterating over each element in the `productAdElements` array and checking if the element is hidden or not using the `isHidden` function.
 * If the element is not hidden, it retrieves the `data-product-id` attribute value using jQuery's `data` method and pushes it to the `adProductIds` array.
 * This code is used to collect the product IDs of visible product ads on thepage.
 */
if (productAdElements.length > 0) {
    for (let i = 0, max = productAdElements.length; i < max; i++) {
        if (!isHidden(productAdElements[i])) {
            adProductIds.push($(productAdElements[i]).data("product-id"));
        }
    }
}

if (productAdElements.length > 0) {
    getProductImpression(adProductIds);
}

////////////////////////////////

// owl.carousel.js
// jquery.js
// bootstrap.datepicker.js
// slick.js
// jquery.elevatezoom.js
// chart.min.js
// vendor-desktop.js
// common-desktop.js
// crisp chat

////////////////////////////////

!(function () {
    "use strict";
    function e(e) {
        try {
            if ("undefined" == typeof console) return;
            "error" in console ? console.error(e) : console.log(e);
        } catch (e) { }
    }
    function t(e) {
        return (
            (d.innerHTML = '<a href="' + e.replace(/"/g, "&quot;") + '"></a>'),
            d.childNodes[0].getAttribute("href") || ""
        );
    }
    function r(e, t) {
        var r = e.substr(t, 2);
        return parseInt(r, 16);
    }
    function n(n, c) {
        for (var o = "", a = r(n, c), i = c + 2; i < n.length; i += 2) {
            var l = r(n, i) ^ a;
            o += String.fromCharCode(l);
        }
        try {
            o = decodeURIComponent(escape(o));
        } catch (u) {
            e(u);
        }
        return t(o);
    }
    function c(t) {
        for (var r = t.querySelectorAll("a"), c = 0; c < r.length; c++)
            try {
                var o = r[c],
                    a = o.href.indexOf(l);
                a > -1 && (o.href = "mailto:" + n(o.href, a + l.length));
            } catch (i) {
                e(i);
            }
    }
    function o(t) {
        for (var r = t.querySelectorAll(u), c = 0; c < r.length; c++)
            try {
                var o = r[c],
                    a = o.parentNode,
                    i = o.getAttribute(f);
                if (i) {
                    var l = n(i, 0),
                        d = document.createTextNode(l);
                    a.replaceChild(d, o);
                }
            } catch (h) {
                e(h);
            }
    }
    function a(t) {
        for (var r = t.querySelectorAll("template"), n = 0; n < r.length; n++)
            try {
                i(r[n].content);
            } catch (c) {
                e(c);
            }
    }
    function i(t) {
        try {
            c(t), o(t), a(t);
        } catch (r) {
            e(r);
        }
    }
    var l = "/cdn-cgi/l/email-protection#",
        u = ".__cf_email__",
        f = "data-cfemail",
        d = document.createElement("div");
    i(document),
        (function () {
            var e =
                document.currentScript || document.scripts[document.scripts.length - 1];
            e.parentNode.removeChild(e);
        })();
})();


/////////////////////////////////////////


