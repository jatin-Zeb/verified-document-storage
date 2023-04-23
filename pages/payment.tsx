import type { NextPage } from "next";
import React from "react";

const myHTML = `<!DOCTYPE html>

<html lang="en">

  <head>

    <title>EddaVerse</title>

    <script src="https://stg.platform.onmeta.in/onmeta-sdk.js"></script>

  </head>

  <body>

    <noscript>You need to enable JavaScript to run this app.</noscript>

    <div id="root"></div>

    <div id="widget"></div>

    <script>

      let createWidget = new onMetaWidget({

        elementId: "widget",

        apiKey: "fa777c74-23f9-4202-a94c-b968e264dd89",

        walletAddress: "0xa23089d1A72D7bB15dA3D823098870d3eE1cc91e"

      });

      createWidget.init();

      createWidget.on("ALL_EVENTS", (status) => console.log(status));

    </script>

  </body>

</html>`;

// @ts-nocheck
const Payment: NextPage = () => {
  return <div dangerouslySetInnerHTML={{ __html: myHTML }} />
}

export default Payment;