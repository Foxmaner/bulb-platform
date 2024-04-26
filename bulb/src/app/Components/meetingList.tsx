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
  meetings: [
    {
      name: "Meeting 1",
      date: "2021-10-10",
      creator: "AL",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 2",
      date: "2021-10-10",
      creator: "EB",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 1",
      date: "2021-10-10",
      creator: "AL",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 2",
      date: "2021-10-10",
      creator: "EB",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 1",
      date: "2021-10-10",
      creator: "AL",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 2",
      date: "2021-10-10",
      creator: "EB",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 1",
      date: "2021-10-10",
      creator: "AL",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 2",
      date: "2021-10-10",
      creator: "EB",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 1",
      date: "2021-10-10",
      creator: "AL",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 2",
      date: "2021-10-10",
      creator: "EB",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 1",
      date: "2021-10-10",
      creator: "AL",
      members: ["AL", "EB"],
    },
    {
      name: "Meeting 2",
      date: "2021-10-10",
      creator: "EB",
      members: ["AL", "EB"],
    },
  ],
};

export default function meetingsView() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(sampleData.meetings.length / rowsPerPage);

  const generateRows = () => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    let rows = [];
    for (let i = 0; i < sampleData.meetings.length; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCell>{sampleData.meetings[i].name}</TableCell>
          <TableCell>{sampleData.meetings[i].date}</TableCell>
          <TableCell>{sampleData.meetings[i].creator}</TableCell>
          <TableCell>{sampleData.meetings[i].members.join(", ")}</TableCell>
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
        <TableColumn>Skapare</TableColumn>
        <TableColumn>Medlemmar</TableColumn>
      </TableHeader>
      <TableBody>{generateRows()}</TableBody>
    </Table>
  );
}
