import { cn } from "@/lib/utils";

type BlogPostTableProps = {
  table: {
    caption: string;
    columns: readonly string[];
    rows: readonly { label: string; cells: readonly string[] }[];
  };
};

const CELL_CLASS = "px-4 align-top sm:px-5";
const LABEL_CLASS = "font-mono text-label font-normal uppercase tracking-label text-muted";

export function BlogPostTable({ table }: BlogPostTableProps) {
  const stacked = table.columns.length > 2;

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border bg-paper">
      <table
        className={cn(
          "w-full table-fixed border-collapse text-left text-sm leading-relaxed sm:text-base",
          stacked && "max-sm:block",
        )}
      >
        <caption className="sr-only">{table.caption}</caption>
        <thead className={cn(stacked && "max-sm:sr-only")}>
          <tr className={cn("border-b border-border", stacked && "max-sm:block")}>
            {table.columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={cn(CELL_CLASS, "py-3", LABEL_CLASS, stacked && "max-sm:block")}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        {table.rows.map((row) => (
          <tbody
            key={row.label}
            className={cn("border-b border-border last:border-b-0", stacked && "max-sm:block")}
          >
            <tr className={cn(stacked && "max-sm:block")}>
              <th
                scope="rowgroup"
                colSpan={table.columns.length}
                className={cn(
                  "px-4 pt-4 text-sm font-medium text-ink sm:px-5",
                  stacked && "max-sm:block",
                )}
              >
                {row.label}
              </th>
            </tr>
            <tr className={cn(stacked && "max-sm:block max-sm:pb-4")}>
              {row.cells.map((cell, index) => (
                <td
                  key={cell}
                  className={cn(
                    CELL_CLASS,
                    "pt-1 pb-4 text-muted",
                    stacked && "max-sm:block max-sm:pt-3 max-sm:pb-0",
                  )}
                >
                  {stacked && (
                    <span className={cn(LABEL_CLASS, "mb-1 block sm:hidden")}>
                      {table.columns[index]}
                    </span>
                  )}
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
