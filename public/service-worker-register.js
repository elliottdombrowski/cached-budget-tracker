if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js").then(reg => {
            console.log("found service worker file", reg);
        });
    });
};