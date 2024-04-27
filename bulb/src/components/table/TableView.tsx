'use client';

import { useMemo, useState, useCallback, Key, ChangeEvent, ReactNode } from "react";
import {

	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	Pagination,
	Selection,
	ChipProps,
	SortDescriptor
} from "@nextui-org/react";
import { VerticalDotsIcon } from "components/btn/VerticalDotBtn";


interface TableViewProps<T> {
	name: string;
	data: T[];
	defaultVisibleColumns?: string[];
	columns: {
		name: string;
		uid: string;
		sortable?: boolean;
	}[];
	searchFilter?: string;
	specificComponents?: { [key: string]: (value: T, cellValue: string) => JSX.Element };
	externalFilters?: {
		[key: string]: {
			name: string;
			setFilter: (keys: Selection) => void,
			filterValue: Selection,
			values: {
				name: string;
				uid: string;
				sortable?: boolean;
			}[]
		}
	} 
}

export default function TableView<T extends { _id: number }>(
	{ data, columns, searchFilter, specificComponents, defaultVisibleColumns, externalFilters, name }: 
TableViewProps<T>) {
	
	const [filterValue, setFilterValue] = useState("");
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

	const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(defaultVisibleColumns || Object.values(columns).map((column) => column.uid)));
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: columns[0].uid,
		direction: "ascending",
	});

	const [page, setPage] = useState(1);
	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [columns, visibleColumns]);

	const filteredItems = useMemo(() => {
		let filteredData = [...data];

		if (hasSearchFilter) {
			filteredData = filteredData.filter((value: any) => {
				if (searchFilter) {
					if (!Object.keys(value).includes(searchFilter)) {
						throw new EvalError(`Invalid search filter: ${searchFilter}`);
					}
					return value[searchFilter].toString().toLowerCase().includes(filterValue.toLowerCase());
				} else {
					for (const key in data) {
						if (typeof data[key] === 'string' && data[key]?.toString().toLowerCase().includes(filterValue.toLowerCase())) {
							return true;
						}
					}
					return false;
				}
			});
		}

		for (const key in externalFilters) {
			if (externalFilters[key].filterValue !== "all" && Array.from(externalFilters[key].filterValue).length !== externalFilters[key].values.length) {
				filteredData = filteredData.filter((value: any) =>{
					return Array.from(externalFilters[key].filterValue).includes(value[key])
				})
			}
		}

		return filteredData;
	}, [data, hasSearchFilter, searchFilter, filterValue, externalFilters]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = useMemo(() => {
		return [...items].sort((a: T, b: T) => {
			const first = a[sortDescriptor.column as keyof T] as number;
			const second = b[sortDescriptor.column as keyof T] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = useCallback((item: T, columnKey: Key) => {
		const cellValue = item[columnKey as keyof T] as string;

		if (specificComponents) {
			if (specificComponents[(columnKey as keyof T) as string]) {
				return specificComponents[(columnKey as keyof T) as string](item, cellValue);
			}
		}

		if (columnKey === "actions") {
			return (
				<div className="relative flex justify-end items-center gap-2">
					<Dropdown>
						<DropdownTrigger>
							<Button isIconOnly size="sm" variant="light">
								<VerticalDotsIcon className="text-default-300" />
							</Button>
						</DropdownTrigger>
						<DropdownMenu>
							<DropdownItem>View</DropdownItem>
							<DropdownItem>Edit</DropdownItem>
							<DropdownItem>Delete</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			);
		}

		return (<p>{cellValue}</p>);
	}, [specificComponents]);

	const onNextPage = useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = useCallback(() => {
		setFilterValue("")
		setPage(1)
	}, [])

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4 p-4 pb-0">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						{
							externalFilters && Object.keys(externalFilters).map((key, index) => (
								<Dropdown key={index}>
									<DropdownTrigger className="hidden sm:flex">
										<Button variant="flat">
											{externalFilters[key].name}
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										disallowEmptySelection
										aria-label="Table Columns"
										closeOnSelect={false}
										selectedKeys={externalFilters[key].filterValue}
										selectionMode="multiple"
										onSelectionChange={externalFilters[key].setFilter}
									>
										{externalFilters[key].values.map((value) => (
											<DropdownItem key={value.uid} className="capitalize">
												{value.name}
											</DropdownItem>
										))}
									</DropdownMenu>
								</Dropdown>
							))
						}
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button variant="flat" >
									Columns
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={setVisibleColumns}
							>
								{columns.filter((column) => column.name !== "ACTIONS").map((column) => (
									<DropdownItem key={column.uid} className="capitalize">
										{column.name}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-primaryText text-small">Total {data.length} users</span>
					<label className="flex items-center text-primaryText text-small">
						Rows per page:
						<select
							className="bg-transparent outline-none text-primaryText text-small"
							onChange={onRowsPerPageChange}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, externalFilters, visibleColumns, columns, data.length, onRowsPerPageChange, onClear]);

	const bottomContent = useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<span className="w-[30%] text-small text-default-400">
					{selectedKeys === "all"
						? "All items selected"
						: `${selectedKeys.size} of ${filteredItems.length} selected`}
				</span>
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
						Previous
					</Button>
					<Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
						Next
					</Button>
				</div>
			</div>
		);
	}, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage]);

	const classNames = useMemo(
		() => ({
			wrapper: "h-[48vh] overflow-y-scroll border-none shadow-none bg-none m-0 p-0 rounded-none",
			th: ["bg-primaryGrey", "rounded-none", "text-textTitle", "-mt-0", "mb-4", "border-y", "border-edge"],
			td: [
				"border-t cursor-pointer",
			],
		}),
		[],
	);


	return (
		<Table
			aria-label="Table"
			isHeaderSticky
			bottomContent={bottomContent}
			bottomContentPlacement="outside"
			classNames={classNames}
			selectedKeys={selectedKeys}
			selectionMode="multiple"
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement="outside"
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}
					>
						{column.name === "ACTIONS" ? '' : column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={`No ${name} found`} items={sortedItems}>
				{(item: T) => (
					<TableRow key={item._id}>
						{
							(columnKey) => (
								<TableCell>
									{(renderCell(item, columnKey) as ReactNode)}
								</TableCell>
							)
						}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
