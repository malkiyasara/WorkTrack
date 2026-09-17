import { useState, useEffect } from "react";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";
import {
  fetchProfileThunk,
  updateProfileInfoThunk,
  updatePasswordThunk,
} from "../store/thunks/profileThunk";
import Alert from "../utils/alert";
import { useSession } from "next-auth/react";

export const useProfileData = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const authUser = session?.user;
  const {
    personalInfo: storedInfo,
    accountInfo,
    userMetrics,
    loadingProfile,
    updatingInfo,
    updatingPassword,
  } = useAppSelector((state) => state.profile);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const userId = (authUser as any)?._id || (authUser as any)?.id;
    if (userId) {
      dispatch(fetchProfileThunk(userId));
    }
  }, [dispatch, authUser]);

  useEffect(() => {
    if (storedInfo) {
      setPersonalInfo(storedInfo);
    }
  }, [storedInfo]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDiscardInfo = () => {
    if (storedInfo) {
      setPersonalInfo(storedInfo);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const payload = {
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      name: `${personalInfo.firstName} ${personalInfo.lastName}`.trim(),
      email: personalInfo.email,
    };

    await dispatch(updateProfileInfoThunk(payload));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      return Alert.error("Password Mismatch", "New passwords do not match.");
    }

    try {
      const payload = {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };

      await dispatch(updatePasswordThunk(payload));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Password update rejected inside hook handler:", error);
    }
  };

  return {
    authUser,
    personalInfo,
    passwordData,
    showPasswords,
    accountInfo,
    userMetrics,
    loadingProfile,
    updatingInfo,
    updatingPassword,
    handleInfoChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleDiscardInfo,
    handleSaveProfile,
    handleUpdatePassword,
  };
};
