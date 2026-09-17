"use client";

import { Loader2 } from "lucide-react";
import { useProfileData } from "@/hooks/useProfileData";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import AccountInfoCard from "@/components/profile/AccountInfoCard";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import PasswordForm from "@/components/profile/PasswordForm";

const Profile = () => {
  const {
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
    handleUpdatePassword
  } = useProfileData();

  if (loadingProfile) {
    return (
      <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-2 text-slate-500">
        <Loader2 className="animate-spin text-purple-600" size={32} />
        <p className="text-xs font-bold tracking-wide uppercase">Loading Profile Settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-200">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="space-y-6">
          <ProfileCard 
            personalInfo={personalInfo} 
            authUser={authUser} 
            userMetrics={userMetrics} 
          />
          <AccountInfoCard accountInfo={accountInfo} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoForm 
            personalInfo={personalInfo}
            updatingInfo={updatingInfo}
            onChange={handleInfoChange}
            onSubmit={handleSaveProfile}
            onDiscard={handleDiscardInfo} 
          />
          
          <PasswordForm 
            passwordData={passwordData}
            showPasswords={showPasswords}
            updatingPassword={updatingPassword}
            onChange={handlePasswordChange}
            onToggleVisibility={togglePasswordVisibility}
            onSubmit={handleUpdatePassword}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;