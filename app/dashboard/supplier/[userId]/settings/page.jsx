'use client';

import { SettingsLayout, useSettingsLayout } from "@/components/custom/settings/SettingsLayout";
import { AccountSettings } from "@/components/custom/settings/AccountSettings";
import { CompanySettings } from "@/components/custom/settings/CompanySettings";
import { RolesSettings } from "@/components/custom/settings/RolesSettings";

function SettingsContent() {
  const { activeSection } = useSettingsLayout();

  const renderActiveSection = () => {
    switch (activeSection) {
      case "account":
        return <AccountSettings />;
      case "company":
        return <CompanySettings />;
      case "roles":
        return <RolesSettings />;
      default:
        return <AccountSettings />;
    }
  };

  return renderActiveSection();
}

export default function Settings() {
  return (
    <SettingsLayout>
      <SettingsContent />
    </SettingsLayout>
  );
}