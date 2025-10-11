import React from "react";
import styles from "./ProfileContent.module.scss";
import { TabId } from "../side-bar/SideBar";

interface ProfileMainProps {
  activeTab?: TabId;
  renderContent: () => React.ReactNode;
}

const ProfileContent: React.FC<ProfileMainProps> = ({ renderContent }) => {
  return (
    <main className={styles.main}>
      <h2 className={styles.greeting}>Здравствуйте, Федор</h2>
      {renderContent()}

      <div className={styles.botSection}>
        <p>
          <strong>Наш бот в Telegram</strong>
        </p>
        <p className={styles.success}>Вы успешно авторизованы!</p>
      </div>
    </main>
  );
};

export default ProfileContent;
