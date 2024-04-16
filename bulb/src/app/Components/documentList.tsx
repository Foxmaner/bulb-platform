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
  documents: [
    {
      name: "Document 1",
      date: "2021-10-10",
      creator: "Tony Reichert",
      members: ["Tony Reichert", "Zoey Lang", "Jane Fisher"],
    },
    {
      name: "Document 1",
      date: "2021-10-10",
      creator: "Tony Reichert",
      members: ["Tony Reichert", "Zoey Lang", "Jane Fisher"],
    },
    {
      name: "Document 1",
      date: "2021-10-10",
      creator: "Tony Reichert",
      members: ["Tony Reichert", "Zoey Lang", "Jane Fisher"],
    },
    {
      name: "Document 1",
      date: "2021-10-10",
      creator: "Tony Reichert",
      members: ["Tony Reichert", "Zoey Lang", "Jane Fisher"],
    },
    {
      name: "Document 1",
      date: "2021-10-10",
      creator: "Tony Reichert",
      members: ["Tony Reichert", "Zoey Lang", "Jane Fisher"],
    },
    {
      name: "Document 1",
      date: "2021-10-10",
      creator: "Tony Reichert",
      members: ["Tony Reichert", "Zoey Lang", "Jane Fisher"],
    },
  ],
};

function generateRows(sampleData: any) {
  let rows = [];
  for (let i = 0; i < sampleData.documents.length; i++) {
    rows.push(
      <TableRow key={i}>
        <TableCell>{sampleData.documents[i].name}</TableCell>
        <TableCell>{sampleData.documents[i].date}</TableCell>
        <TableCell>{sampleData.documents[i].creator}</TableCell>
        <TableCell>{sampleData.documents[i].members.join(", ")}</TableCell>
      </TableRow>
    );
  }
  return rows;
}

export default function DocumentsView() {
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
