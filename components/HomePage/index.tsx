/** @jsxImportSource @emotion/react */
import React from "react";

import blockchain from "../../public/images/blockchain.png";
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <div>
      <Image src={blockchain} alt="" />
    </div>
  );
};

export default HomePage;
