'use client';

import { SettingsLayout, useSettingsLayout } from "@/components/custom/settings/SettingsLayout";
import RolesSettings from "./components/roleSettings";

function SettingsContent() {
  const { activeSection } = useSettingsLayout();

  const renderActiveSection = () => {
    switch (activeSection) {
      case "roles":
        return <RolesSettings />;
      default:
        return <div>Settings page</div>;
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