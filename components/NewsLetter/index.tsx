/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Input } from "antd";
import * as styles from "./styles";

export interface NewsLetterProps {}

const NewsLetter: React.FC<NewsLetterProps> = () => {
  return (
    <div css={styles.subscribe}>
      <p css={styles.benefitHeading}> Subscribe to Newsletter</p>
      <p css={styles.featureSubHeading}>
        Enter your email address to register to our newsletter subscription!
      </p>
      <Input
        css={css({
          width: "50%",
          marginRight: "30px",
        })}
      />
      <Button type="primary" size="large">
        SEND
      </Button>
    </div>
  );
};

export default NewsLetter;
