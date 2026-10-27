type BlogPostTableProps = {
  table: {
    caption: string;
    columns: readonly string[];
    rows: readonly { label: string; cells: readonly string[] }[];
  };
};

export function BlogPostTable({ table }: BlogPostTableProps) {
  return (
    <div className="scroll-hint-scope relative my-8">
      <div className="scroll-hint-source overflow-x-auto">
        <table className="w-full min-w-xl table-fixed">
          <caption className="sr-only">{table.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/4 text-left">
                <span className="sr-only">{table.caption}</span>
              </th>
              {table.columns.map((column) => (
                <th key={column} scope="col" className="text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="align-top">
                  {row.label}
                </th>
                {row.cells.map((cell) => (
                  <td key={cell} className="align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        aria-hidden="true"
        className="scroll-hint-fade pointer-events-none absolute inset-y-px right-px w-12 rounded-r-lg bg-linear-to-l from-paper to-transparent"
      />
    </div>
  );
}
