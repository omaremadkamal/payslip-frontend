export default function CreateNewOrganization() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[1440px] flex flex-col items-center">
        <div className="w-full max-w-[560px] bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create New Organization
          </h1>
          <p className="text-gray-500 mb-6">
            Enter your company details to set up a new payroll workspace.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commercial Reg. Number{" "}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 12345678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax ID Number <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 987-654-321"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Currency
                </label>
                <input
                  type="text"
                  defaultValue="Egyptian Pound (EGP)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency exchange rate (egp)
                </label>
                <input
                  type="number"
                  defaultValue="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold cursor-pointer py-2 px-8 rounded-md transition-colors">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
