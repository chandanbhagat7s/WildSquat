import React from "react";

const DataTable = ({ data, additon }) => {
  // Group data by name
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = [];
    }
    acc[item.name].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        {Object.entries(groupedData).map(([category, items]) => (
          <div key={category} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              {category}
            </h2>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={item._id}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    value={item.label}
                    onChange={() => additon(item._id)}
                  />
                  <label
                    htmlFor={item._id}
                    className="ml-2 text-gray-700 cursor-pointer"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
