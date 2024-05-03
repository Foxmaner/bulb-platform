"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Meeting } from "index";


function generateRows(meetings: Meeting[]) {
  let rows = [];
  for (let i = 0; i < meetings.length; i++) {
    rows.push(
      <TableRow key={i}>
        <TableCell>{meetings[i].name}</TableCell>
        <TableCell>{meetings[i].date}</TableCell>
      </TableRow>
    );
  }
  return rows;
}

interface MeetingsViewProps {
	meetings: Meeting[];

}

export default function meetingsView({ meetings }: MeetingsViewProps) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Namn</TableColumn>
        <TableColumn>Datum</TableColumn>
        <TableColumn>Skapare</TableColumn>
        <TableColumn>Medlemmar</TableColumn>
      </TableHeader>
      <TableBody>{generateRows(meetings)}</TableBody>
    </Table>
  );
}
