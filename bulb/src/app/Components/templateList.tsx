"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { useState } from "react";

let sampleData = {
  templates: [
    {
      name: "BULB template",
      date: "2021-10-10",
    },
    {
      name: "Template 2",
      date: "2021-10-10",
    },
  ],
};

export default function templatesView() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(sampleData.templates.length / rowsPerPage);

  const generateRows = () => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    let rows = [];
    for (let i = 0; i < sampleData.templates.length; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCell>{sampleData.templates[i].name}</TableCell>
          <TableCell>{sampleData.templates[i].date}</TableCell>
        </TableRow>
      );
    }

    return rows.slice(start, end);
  };

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn>Namn</TableColumn>
        <TableColumn>Datum</TableColumn>
      </TableHeader>
      <TableBody>{generateRows()}</TableBody>
    </Table>
  );
}
