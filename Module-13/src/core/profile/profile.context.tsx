import React from "react";
interface Context {
  userName: string;
  setUserProfile: (userName: string) => void;
}

const noUserLogin = "No user login";

const ProfileContext = React.createContext<Context>({
  userName: noUserLogin,
  setUserProfile: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [userProfile, setUserProfile] = React.useState<string>("");

  return (
    <ProfileContext.Provider value={{ userName: userProfile, setUserProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfileContext = () => React.useContext(ProfileContext);
