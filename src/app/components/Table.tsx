'use client';

import React from 'react';
import {
  SVGCheck,
  SVGCross,
  SVGEdit,
  SVGTrash,
  SVGDelete,
  SVGRestore,
} from '@/svg';

interface Column {
  label: string;
  key: string;
  render?: (row: Record<string, any>) => React.ReactNode;
  is_binary?: boolean;
  hidden?: boolean;
}

interface DataTableProps {
  data: Record<string, any>[];
  columns: Column[];
}

export default function DataTable({ data, columns }: DataTableProps) {
  const visibleColumns = columns.filter((col) => !col.hidden);

  const renderCell = (col: Column, row: Record<string, any>): React.ReactNode => {
    if (typeof col.render === 'function') {
      return (
        <button onClick={() => col.render?.(row)}>
          {col.key === 'edit' && <SVGEdit />}
          {col.key === 'trash' && <SVGTrash />}
          {col.key === 'delete' && <SVGDelete />}
          {col.key === 'restore' && <SVGRestore />}
        </button>
      );
    }

    if (col.is_binary) {
      const value = row[col.key];
      return value === 1 ? <SVGCheck /> : value === 0 ? <SVGCross /> : '-';
    }

    return row[col.key] ?? '-';
  };

  const renderRows = (rows: Record<string, any>[], depth = 0): React.ReactNode =>
    rows.map((row) => (
      <React.Fragment key={row.id}>
        <tr>
          {visibleColumns.map((col, index) => (
            <td key={`${row.id}-${index}`} style={index === 0 ? { paddingRight: `${depth * 20}px` } : undefined}>
              {renderCell(col, row)}
            </td>
          ))}
        </tr>
        {row.children && renderRows(row.children, depth + 1)}
      </React.Fragment>
    ));

  if (!data || data.length === 0) {
    return <div className="p-4 text-center text-gray-500">هنوز چیزی وجود ندارد</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-right text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            {visibleColumns.map((col, index) => (
              <th key={index} className="px-4 py-2">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows(data)}</tbody>
      </table>
    </div>
  );
}
