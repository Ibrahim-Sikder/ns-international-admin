"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";
import AddTeamModal from "../_components/AddTeamModal";
import Image from "next/image";

function createData(
  id: number,
  name: string,
  role: string,
  email: string,
  image: string
) {
  return { id, name, role, email, image };
}

const rows = [
  createData(1, "John Doe", "CEO", "john.doe@example.com", "/images/john.png"),
  createData(
    2,
    "Jane Smith",
    "CTO",
    "jane.smith@example.com",
    "/images/jane.png"
  ),
  createData(
    3,
    "Emily Davis",
    "CMO",
    "emily.davis@example.com",
    "/images/emily.png"
  ),
  createData(
    4,
    "Michael Johnson",
    "CFO",
    "michael.johnson@example.com",
    "/images/michael.png"
  ),
  createData(
    5,
    "Sarah Wilson",
    "COO",
    "sarah.wilson@example.com",
    "/images/sarah.png"
  ),
];

const TeamPage = () => {
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<any>(undefined);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <PageContainer title="Our Team" description="Manage our team members">
      <DashboardCard title="Our Team">
        <Box>
          <div className="flex justify-end w-full flex-end">
            <Button
              onClick={handleOpen}
              sx={{ marginTop: "20px" }}
              startIcon={<AddCircleOutlineIcon />}
            >
              Add Team Member
            </Button>
          </div>
          <Box bgcolor="white" padding={3} marginTop="20px">
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
              <Table aria-label="team table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Role</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.role}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        <Image
                          src={row.image}
                          alt={row.name}
                          width={50}
                          height={50}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
                          <IconButton
                            onClick={() => {
                              setInitialValues(row);
                              setOpen(true);
                            }}
                            title="Edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton title="Delete">
                            <DeleteIcon className="text-red-600" />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {open && (
            <AddTeamModal
              open={open}
              setOpen={handleClose}
              initialValues={initialValues}
            />
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default TeamPage;
