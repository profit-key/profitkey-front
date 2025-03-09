/**
 * Table
 *
 * 선택적으로 열과 헤더를 고정할 수 있는 테이블 컴포넌트입니다.
 * 가로 스크롤 시 지정된 열이 고정되고, 세로 스크롤 시 헤더가 고정됩니다.
 * 기본적으로는 아무것도 고정되지 않습니다.
 *
 * @example
 * ```tsx
 * <Table
 *   columns={columns}
 *   data={data}
 *   stickyColumnId="name"  // 특정 열 고정
 *   stickyHeader={true}    // 헤더 고정
 * />
 * ```
 */

import { type ReactElement } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
  type Cell,
  type Header,
  type Table,
} from '@tanstack/react-table';

// ===== Types =====

/**
 * Props for the Table component
 */
export interface TableProps<
  TData extends object,
  TValue = string | number | boolean,
> {
  /** Column definitions for the table */
  columns: ColumnDef<TData, TValue>[];
  /** Data to be displayed in the table */
  data: TData[];
  /** ID of the column to be sticky (기본값: 고정 없음) */
  stickyColumnId?: string;
  /** Whether to make the header sticky (기본값: 고정 없음) */
  stickyHeader?: boolean;
  /** Additional class names for the table element */
  tableClassName?: string;
  /** Additional class names for the container div */
  containerClassName?: string;
  /** Accessibility label for the table */
  ariaLabel?: string;
  /** Maximum height of the table container (enables vertical scrolling) */
  maxHeight?: string;
}

// ===== Constants =====

const DEFAULT_ARIA_LABEL = '테이블';
const STICKY_COLUMN_CLASSES = 'sticky left-0 z-10 border-r border-gray-300';
const STICKY_HEADER_CLASSES = 'sticky top-0 z-20';
const STICKY_HEADER_AND_COLUMN_CLASSES = 'sticky left-0 top-0 z-30';
const HEADER_BASE_CLASSES =
  'bg-[#f3f3f3] border-b border-gray-300 font-bold p-2.5 text-center whitespace-nowrap overflow-hidden text-ellipsis';
const CELL_BASE_CLASSES = 'p-3 whitespace-nowrap overflow-hidden text-ellipsis';
const CONTAINER_CLASSES =
  'w-full max-h-full overflow-auto border-t-[5px] border-b border-black';
const TABLE_CLASSES = 'w-full table-auto';

// ===== Utility Functions =====

/**
 * 숫자 또는 숫자 형식의 문자열인지 확인 (소수점, 콤마, 퍼센트 등 포함)
 */
function isNumeric(val: unknown): boolean {
  if (typeof val === 'number') return true;
  if (typeof val !== 'string') return false;

  // 날짜 형식 확인 (YYYY.MM.DD, YYYY-MM-DD, YYYY/MM/DD 등)
  const dateRegex = /^\d{4}([./-])\d{2}\1\d{2}$/;
  if (dateRegex.test(val)) return false;

  // 콤마, 공백, 통화 기호, % 등을 제거
  const cleanedValue = val.replace(/[,\s₩$€£¥%]/g, '');

  // 숫자, 소수점, 부호만 남긴 문자열이 유효한 숫자인지 확인
  return !isNaN(parseFloat(cleanedValue)) && isFinite(Number(cleanedValue));
}

// ===== Helper Components =====

/**
 * Renders a table header cell with sticky functionality if needed
 */
function HeaderCell<TData extends object, TValue>({
  header,
  stickyColumnId,
  stickyHeader,
}: {
  header: Header<TData, TValue>;
  stickyColumnId: string;
  stickyHeader: boolean;
}): ReactElement {
  const isColumnSticky = stickyColumnId && header.column.id === stickyColumnId;

  // 스타일 클래스 결정
  let stickyClass = '';
  if (isColumnSticky && stickyHeader) {
    // 헤더와 컬럼이 모두 sticky (코너)
    stickyClass = STICKY_HEADER_AND_COLUMN_CLASSES;
  } else if (isColumnSticky) {
    // 컬럼만 sticky
    stickyClass = STICKY_COLUMN_CLASSES;
  } else if (stickyHeader) {
    // 헤더만 sticky
    stickyClass = STICKY_HEADER_CLASSES;
  }

  return (
    <th
      className={`${HEADER_BASE_CLASSES} ${stickyClass} ${isColumnSticky ? 'bg-[#f3f3f3]' : ''}`}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  );
}

/**
 * Renders a table data cell with sticky functionality if needed
 */
function DataCell<TData extends object, TValue>({
  cell,
  stickyColumnId,
}: {
  cell: Cell<TData, TValue>;
  stickyColumnId: string;
}): ReactElement {
  const isSticky = stickyColumnId && cell.column.id === stickyColumnId;
  const value = cell.getValue();

  // 숫자인 경우 오른쪽 정렬, 그 외에는 가운데 정렬
  const textAlignment = isNumeric(value) ? 'text-right' : 'text-center';

  return (
    <td
      className={`${CELL_BASE_CLASSES} ${textAlignment} ${isSticky ? `${STICKY_COLUMN_CLASSES} bg-[#f3f3f3]` : ''}`}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}

/**
 * Renders the table header rows
 */
function TableHeader<TData extends object, TValue>({
  table,
  stickyColumnId,
  stickyHeader,
}: {
  table: Table<TData>;
  stickyColumnId: string;
  stickyHeader: boolean;
}): ReactElement {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <HeaderCell<TData, TValue>
              key={header.id}
              header={header as Header<TData, TValue>}
              stickyColumnId={stickyColumnId}
              stickyHeader={stickyHeader}
            />
          ))}
        </tr>
      ))}
    </thead>
  );
}

/**
 * Renders the table body rows
 */
function TableBody<TData extends object, TValue>({
  table,
  stickyColumnId,
}: {
  table: Table<TData>;
  stickyColumnId: string;
}): ReactElement {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <DataCell<TData, TValue>
              key={cell.id}
              cell={cell as Cell<TData, TValue>}
              stickyColumnId={stickyColumnId}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
}

// ===== Main Component =====

/**
 * A table component with optional sticky header and/or column
 */
export function Table<
  TData extends object,
  TValue = string | number | boolean,
>({
  columns,
  data,
  stickyColumnId = '',
  stickyHeader = false,
  tableClassName = '',
  containerClassName = '',
  ariaLabel = DEFAULT_ARIA_LABEL,
  maxHeight,
}: TableProps<TData, TValue>): ReactElement {
  // Create table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 컨테이너 스타일 (maxHeight가 있으면 세로 스크롤 활성화)
  const containerStyle = maxHeight ? { maxHeight } : undefined;

  return (
    <div
      className={`${CONTAINER_CLASSES} ${containerClassName}`}
      style={containerStyle}
    >
      <table
        className={`${TABLE_CLASSES} ${tableClassName}`}
        aria-label={ariaLabel}
      >
        <TableHeader<TData, TValue>
          table={table}
          stickyColumnId={stickyColumnId}
          stickyHeader={stickyHeader}
        />
        <TableBody<TData, TValue>
          table={table}
          stickyColumnId={stickyColumnId}
        />
      </table>
    </div>
  );
}
