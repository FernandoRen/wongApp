if (navigator.serviceWorker) {
    console.log("Podemos utilizar sw");
    navigator.serviceWorker.register("sw.js");
}