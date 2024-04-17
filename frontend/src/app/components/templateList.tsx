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

function generateRows(sampleData: any) {
  let rows = [];
  for (let i = 0; i < sampleData.templates.length; i++) {
    rows.push(
      <TableRow key={i}>
        <TableCell>{sampleData.templates[i].name}</TableCell>
        <TableCell>{sampleData.templates[i].date}</TableCell>
      </TableRow>
    );
  }
  return rows;
}

export default function templatesView() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Namn</TableColumn>
        <TableColumn>Datum</TableColumn>
      </TableHeader>
      <TableBody>{generateRows(sampleData)}</TableBody>
    </Table>
  );
}
