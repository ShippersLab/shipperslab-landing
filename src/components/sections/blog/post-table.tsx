type BlogPostTableProps = {
  table: {
    caption: string;
    columns: readonly string[];
    rows: readonly { label: string; cells: readonly string[] }[];
  };
};

const CELL_CLASS = "w-1/2 px-4 align-top sm:px-5";

export function BlogPostTable({ table }: BlogPostTableProps) {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full table-fixed border-collapse text-left text-sm leading-relaxed sm:text-base">
        <caption className="sr-only">{table.caption}</caption>
        <thead>
          <tr className="border-b border-border">
            {table.columns.map((column) => (
              <th key={column} scope="col" className={`${CELL_CLASS} py-3 font-medium text-ink`}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        {table.rows.map((row) => (
          <tbody key={row.label} className="border-b border-border last:border-b-0">
            <tr>
              <th
                scope="rowgroup"
                colSpan={table.columns.length}
                className="px-4 pt-4 text-sm font-medium text-accent sm:px-5"
              >
                {row.label}
              </th>
            </tr>
            <tr>
              {row.cells.map((cell) => (
                <td key={cell} className={`${CELL_CLASS} pt-1 pb-4 text-muted`}>
                  {cell}
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
