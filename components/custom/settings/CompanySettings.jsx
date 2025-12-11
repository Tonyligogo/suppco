import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import Header from "../Header";
import { useCompanyInfo, useUpdateCompanyInfo } from "@/hooks/(company)/useCompanyManagement";

const CURRENCIES = ["USD", "KES"];

const filterCompanyInfo = (data) => {
  if (!data) return {};

  const vatComplianceStatus = typeof data.vat_compliance === 'boolean' 
    ? data.vat_compliance 
    : false;
  
  const { 
    address,
    currency, 
    email, 
    fiscal_year,
    name,
    phone,
    registration_number,
    kra_pin,
    vat_number
  } = data;
  
  return { 
    address, currency, email, fiscal_year, name, phone, 
    registration_number, kra_pin, vat_compliance: vatComplianceStatus, vat_number
  };
};

export function CompanySettings() {
  const { data: companyInfo } = useCompanyInfo();
  const [formData, setFormData] = useState(filterCompanyInfo(companyInfo));
  const [validationErrors, setValidationErrors] = useState({});

  // Update formData when companyInfo is fetched
  useEffect(() => {
    if (companyInfo) {
      setFormData(filterCompanyInfo(companyInfo));
    }
  }, [companyInfo]);

  const { 
    mutate: updateCompany, 
    isPending: isSaving
  } = useUpdateCompanyInfo();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleVatComplianceChange = (stringValue) => {
    const booleanValue = stringValue === 'Yes'; // Converts "Yes" to true, "No" to false
    handleInputChange('vat_compliance', booleanValue);
  };

  const handleSelectChange = (value) => {
    handleInputChange('currency', value);
  };
  
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Company Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid Email is required.";
    if (!formData.address.trim()) errors.address = "Business Address is required.";
    if (!formData.fiscal_year.trim()) errors.fiscal_year = "Fiscal Year is required.";
    if (!formData.kra_pin.trim()) errors.kra_pin = "KRA pin is required.";
    if (!formData.registration_number.trim()) errors.registration_number = "Registration number is required.";
    if (!formData.vat_number.trim()) errors.vat_number = "VAT number is required.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSave = () => {
    if (!companyInfo?.identity) {
        toast.error("Cannot save: Company ID is missing.");
        return;
    }

    if (!validateForm()) {
        toast.error("Please fill in all required fields.");
        return;
    }

    updateCompany({identity:companyInfo.identity, formData:formData});
  };

  if (!companyInfo && !isSaving) {
    return <p>Loading company information...</p>;
  }

  return (
    <div className="space-y-6 mb-2">
      <Header 
        title='Company Settings' 
        description='Manage your company information and business details.'
      />

      {/* Basic & Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Core Details</CardTitle>
          <CardDescription>
            Your company's name, primary contact, and location.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="companyName"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    aria-invalid={!!validationErrors.name}
                  />
                  {validationErrors.name && <p className="text-sm text-red-500">{validationErrors.name}</p>}
                </div>

                {/* 2. Email */}
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    aria-invalid={!!validationErrors.email}
                  />
                  {validationErrors.email && <p className="text-sm text-red-500">{validationErrors.email}</p>}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3. Phone */}
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Phone</Label>
                  <Input
                    id="companyPhone"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
            </div>
            
            {/* 4. Address */}
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Business Address <span className="text-red-500">*</span></Label>
              <Textarea
                id="companyAddress"
                rows={3}
                value={formData.address || ''}
                onChange={(e) => handleInputChange("address", e.target.value)}
                aria-invalid={!!validationErrors.address}
                placeholder="Street Address, City, State/Region, Postal Code, Country"
              />
              {validationErrors.address && <p className="text-sm text-red-500">{validationErrors.address}</p>}
            </div>
        </CardContent>
      </Card>

      {/* Legal & Financial Details */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Financial Details</CardTitle>
          <CardDescription>
            Tax identification and regulatory information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 5. Registration Number */}
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number <span className="text-red-500">*</span></Label>
              <Input
                id="registrationNumber"
                value={formData.registration_number || ''}
                onChange={(e) => handleInputChange("registration_number", e.target.value)}
              />
              {validationErrors.registration_number && <p className="text-sm text-red-500">{validationErrors.registration_number}</p>}
            </div>

            {/* 6. KRA PIN */}
            <div className="space-y-2">
              <Label htmlFor="kraPin">KRA PIN / Local Tax ID <span className="text-red-500">*</span></Label>
              <Input
                id="kraPin"
                value={formData.kra_pin || ''}
                onChange={(e) => handleInputChange("kra_pin", e.target.value)}
              />
              {validationErrors.kra_pin && <p className="text-sm text-red-500">{validationErrors.kra_pin}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 7. VAT Compliance */}
            <div className="space-y-2">
              <Label htmlFor="vatCompliance">VAT Registered?</Label>
              <Select 
                value={formData.vat_compliance ? 'Yes' : 'No'}
                onValueChange={handleVatComplianceChange}
              >
                <SelectTrigger id="vatCompliance">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* 8. VAT Number */}
            <div className="space-y-2">
              <Label htmlFor="vatNumber">VAT Number <span className="text-red-500">*</span></Label>
              <Input
                id="vatNumber"
                value={formData.vat_number || ''}
                onChange={(e) => handleInputChange("vat_number", e.target.value)}
                disabled={!formData.vat_compliance}
              />
              {validationErrors.vat_number && <p className="text-sm text-red-500">{validationErrors.vat_number}</p>}
            </div>

            {/* 9. Currency */}
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select 
                value={formData.currency || ''}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* 10. Fiscal Year */}
          <div className="space-y-2 w-full md:w-1/3">
            <Label htmlFor="fiscalYear">Current Fiscal Year <span className="text-red-500">*</span></Label>
            <Input
              id="fiscalYear"
              value={formData.fiscal_year || ''}
              onChange={(e) => handleInputChange("fiscal_year", e.target.value)}
              placeholder="e.g., 2024"
              aria-invalid={!!validationErrors.fiscal_year}
            />
            {validationErrors.fiscal_year && <p className="text-sm text-red-500">{validationErrors.fiscal_year}</p>}
          </div>
          
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Company Information"}
      </Button>
    </div>
  );
}