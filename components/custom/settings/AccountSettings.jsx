'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useUpdateUserInfo, useUserInfo } from "@/hooks/(user)/useUserManagement";
import { useParams } from "next/navigation";
import LoadingComponent from "../loading-component";

//function to extract only the necessary fields
const filterUserInfo = (data) => {
  if (!data) return {};
  
  // Extracting only the required fields
  const { 
    email, 
    first_name, 
    last_name, 
    phone,
    kra_pin,
    location 
  } = data;
  
  return { 
    email, 
    first_name, 
    last_name, 
    phone,
    kra_pin,
    location 
  };
};

export function AccountSettings() {
  const {userId} = useParams();
  const {data:userInfo} = useUserInfo(userId);
  const [formData, setFormData] = useState(filterUserInfo(userInfo));
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(()=>{
    if(userInfo){
      setFormData(filterUserInfo(userInfo));
    }
  },[userInfo]);
  const { 
    mutate: updateProfile, 
    isPending: isSaving 
  } = useUpdateUserInfo();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    const newformData = new FormData();
    newformData.append('first_name', formData.first_name);
    newformData.append('last_name', formData.last_name);
    newformData.append('email', formData.email);
    newformData.append('phone', formData.phone);
    newformData.append('kra_pin', formData.kra_pin);
    newformData.append('location', formData.location);
    updateProfile({
      id: userId,
      formData: newformData
  });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast('New passwords do not match')
      return;
    }
    
    toast('Password changed');
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal details and profile picture.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar Section */}
          <div className="flex items-center space-x-4">
              {formData?.first_name && formData?.last_name ? 
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">
                {getInitials(formData?.first_name, formData?.last_name)}
              </AvatarFallback> 
            </Avatar>
              : null}
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData?.first_name ?? ''}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData?.last_name ?? ''}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData?.email ?? ''}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type='tel'
              value={formData?.phone ?? ''}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
              <Label htmlFor="kra_pin">KRA pin</Label>
              <Input
                id="kra_pin"
                value={formData?.kra_pin ?? ''}
                onChange={(e) => handleInputChange("kra_pin", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData?.location ?? ''}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

          <Button onClick={handleSaveProfile} disabled={isSaving}>{isSaving ? <LoadingComponent/> : 'Save Profile'}</Button>
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button onClick={handleChangePassword} disabled={isSaving}>Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}