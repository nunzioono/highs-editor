import { useEditing } from '../hooks/editing';
import { useZoom } from '../hooks/zoom';

const BASE_FONT_SIZE_REM = 0.875;

type VariableValue = { [key: string]: any } | string | number;

export const ResultTable = () => {
  const { output } = useEditing();
  const { zoomLevel } = useZoom();

  const dynamicFontSize = `${BASE_FONT_SIZE_REM * zoomLevel}rem`;

  const parseEntry = (entry: string) => {
    try {
      return JSON.parse(entry);
    } catch {
      return null;
    }
  };

  const renderStatusSection = (data: any) => {
    if (!data?.Status) return null;

    return (
      <div className="flex items-center gap-2 p-4 border-b border-gray-300">
        <div className={`w-3 h-3 rounded-full ${data.Status === 'Optimal' ? 'bg-green-500' : 'bg-gray-400'}`} />
        <span className="font-medium">Status: {data.Status}</span>
      </div>
    );
  };

  const renderObjectiveValue = (data: any) => {
    if (data?.Status !== 'Optimal' || !data?.ObjectiveValue) return null;

    return (
      <div className="p-4 border-b border-gray-300">
        <span className="font-medium">Objective Value: </span>
        <span className="font-mono">{data.ObjectiveValue}</span>
      </div>
    );
  };

  const renderVariablesTable = (data: any) => {
    if (!data?.Columns || typeof data.Columns !== 'object') return null;

    const variables = Object.entries(data.Columns) as [string, VariableValue][];
    if (variables.length === 0) return null;

    // Get all unique keys from all variable objects
    const columnKeys = new Set<string>();
    variables.forEach(([_, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(key => columnKeys.add(key));
      }
    });

    // Convert to array and ensure 'name' is the first column if it exists
    const columns = Array.from(columnKeys);
    if (columns.includes('name')) {
      columns.splice(columns.indexOf('name'), 1);
      columns.unshift('name');
    }

    return (
      <div className="p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Variable</th>
              {columns.map(column => (
                <th key={column} className="border border-gray-300 px-4 py-2 text-left font-mono">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variables.map(([name, value], index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-mono">{name}</td>
                {columns.map(column => {
                  const cellValue = typeof value === 'object' && value !== null
                    ? column in value
                      ? String(value[column])
                      : '-'
                    : column === 'name'
                      ? name
                      : String(value);

                  const isHighlightedColumn = column === 'Primal' || column === 'Type';
                  return (
                    <td
                      key={column}
                      className={`border border-gray-300 px-4 py-2 font-mono ${
                        isHighlightedColumn
                          ? 'font-bold bg-gray-300 border-gray-400'
                          : ''
                      }`}
                    >
                      {cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full" style={{ fontSize: dynamicFontSize }}>
      {output.map((entry, index) => {
        const parsedData = parseEntry(entry);
        if (!parsedData) {
          return (
            <div key={index} className="p-4 font-mono border-b border-gray-300">
              {entry}
            </div>
          );
        }
        return (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden mb-4">
            {renderStatusSection(parsedData)}
            {renderObjectiveValue(parsedData)}
            {renderVariablesTable(parsedData)}
          </div>
        );
      })}
    </div>
  );
};
