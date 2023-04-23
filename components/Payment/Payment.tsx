import React from "react";

const myHTML = `<!DOCTYPE html>

<html lang="en">

  <head>

    <script src="https://stg.platform.onmeta.in/onmeta-sdk.js"></script>

  </head>

  <body>

    <noscript>You need to enable JavaScript to run this app.</noscript>

    <div id="root"></div>

    <div id="widget"></div>

    <script>

      let createWidget = new onMetaWidget({

        elementId: "widget",

        apiKey: "b911cb3f-3e53-4faa-a4ad-43509c19baf2",

        walletAddress: "0xFFc39eab0fb83Es0c536c35C44D578F450FDBB6E"

      });

      createWidget.init();

      createWidget.on("ALL_EVENTS", (status) => console.log(status));

    </script>

  </body>

</html>`;

// @ts-nocheck
const Payment: React.FC = () => {
  return <div dangerouslySetInnerHTML={{ __html: myHTML }} />
}

export default Payment;