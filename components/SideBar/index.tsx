/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import {
  MenuOutlined,
  SettingFilled,
  FileTextOutlined,
  SettingOutlined,
  FileTextFilled,
  RobotOutlined,
  RobotFilled,
} from "@ant-design/icons";
import { SideBarProps } from "./typings";
import { Button, FloatButton } from "antd";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { StoreState } from "../../reducers";

import { useSelector } from "react-redux";
import { LoginData } from "../../typings/login";

const SideBar: React.FC<SideBarProps> = ({
  expand,
  toggleExpand,
  selected,
}) => {
  const router = useRouter();

  const sideBarTabs = useCallback(() => {
    return [
      { content: "Profile", id: "profile" },
      {
        content: "My Docs",
        id: "docs",
      },
      { content: "Setting", id: "setting", isDisabled: true },
    ];
  }, []);
  return (
    <div css={styles.sideBar(expand)}>
      <div css={styles.iconSpace}>
        <MenuOutlined
          css={[styles.optionIcon, styles.gap]}
          onClick={toggleExpand}
        />
        <div css={styles.optionSpace}>
          {/* <UserOutlined css={styles.optionIcon} /> */}
          {router.pathname === "/profile" ? (
            <RobotFilled css={styles.optionIcon} />
          ) : (
            <RobotOutlined css={styles.optionIcon} />
          )}
          {router.pathname === "/docs" ? (
            <FileTextFilled css={styles.optionIcon} />
          ) : (
            <FileTextOutlined css={styles.optionIcon} />
          )}

          {router.pathname === "/setting" ? (
            <SettingFilled css={styles.optionIcon} />
          ) : (
            <SettingOutlined css={styles.optionIcon} />
          )}
        </div>
      </div>

      <div css={[styles.expandMenu, !expand && styles.hide]}>
        <FloatButton
          icon={<FileTextOutlined />}
          description="HELP"
          shape="square"
          style={{ left: "calc(100%)", top: "150px" }}
        />
        {sideBarTabs().map((buttonData) => {
          const isSelected = selected === buttonData.id;
          return (
            <Button
              type={"text"}
              css={[{ marginBottom: "44px" }, isSelected && styles.selected]}
              key={buttonData.id}
              onClick={() => {
                router.push(buttonData.id);
              }}
              disabled={!!buttonData.isDisabled}
            >
              {buttonData.content}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;
