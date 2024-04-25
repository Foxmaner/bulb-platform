"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

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
  ],
};

function generateRows(sampleData: any) {
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
  return rows;
}

export default function meetingsView() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Namn</TableColumn>
        <TableColumn>Datum</TableColumn>
        <TableColumn>Skapare</TableColumn>
        <TableColumn>Medlemmar</TableColumn>
      </TableHeader>
      <TableBody>{generateRows(sampleData)}</TableBody>
    </Table>
  );
}
