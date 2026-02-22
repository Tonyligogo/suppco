export default function TableSkeleton({
  rows = 5,
  columns = 5,
}) {
  return (
    <div className="w-full animate-pulse">
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-muted/40">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <div className="h-4 w-24 rounded bg-muted" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-4">
                    <div className="h-4 w-full max-w-[160px] rounded bg-muted" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}