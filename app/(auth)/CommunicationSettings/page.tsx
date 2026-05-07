import React from "react";

const CommunicationSettings = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Communication Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Configure email settings for system notifications and
            communications.
          </p>
        </header>

        <form className="space-y-8">
          {/* Sender Information */}
          <h2 className="text-sm font-semibold text-gray-900 mb-4  tracking-wider">
            Sender Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Sender Name" placeholder="e.g. HR Team" />
            <InputField label="Sender Title" placeholder="e.g. HR Manager" />
            <div className="col-span-2">
              <InputField
                label="Sender Department"
                placeholder="e.g. Human Resources"
              />
            </div>
          </div>

          {/* SMTP Configuration */}

          <h2 className="text-sm font-semibold text-gray-900 mb-4  tracking-wider">
            SMTP Configuration
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Host" placeholder="e.g. smtp.office365.com" />
            <InputField label="Port Number" placeholder="e.g. 587" />
            <div className="col-span-2">
              <InputField label="Security" placeholder="TLS" />
            </div>
          </div>

          {/* Email Authentication */}

          <h2 className="text-sm font-semibold  text-gray-900 mb-4  tracking-wider">
            Email Authentication
          </h2>
          <div className="space-y-4">
            <InputField
              label="Sender Email"
              type="email"
              placeholder="e.g. hr@cairotech.com"
            />
            <InputField
              label="Sender's Email Password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Sub-component for inputs to keep the code DRY
const InputField = ({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-200 outline-none transition-all placeholder:text-gray-400"
    />
  </div>
);

export default CommunicationSettings;
