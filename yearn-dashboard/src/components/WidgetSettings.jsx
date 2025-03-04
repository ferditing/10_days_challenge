// /src/components/WidgetSettings.jsx
import React from 'react';

const WidgetSettings = ({ settings, updateSettings }) => {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    const newSettings = { ...settings, [name]: checked };
    updateSettings(newSettings);
    localStorage.setItem('widgetSettings', JSON.stringify(newSettings));
  };

  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">Widget Settings</h2>
      {Object.keys(settings).map((widgetKey) => (
        <div key={widgetKey} className="flex items-center mb-1">
          <input
            type="checkbox"
            name={widgetKey}
            checked={settings[widgetKey]}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="capitalize">
            {widgetKey.replace(/([A-Z])/g, ' $1')}
          </label>
        </div>
      ))}
    </div>
  );
};

export default WidgetSettings;
