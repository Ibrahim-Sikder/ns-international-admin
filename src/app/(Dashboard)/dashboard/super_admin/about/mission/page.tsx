"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import EditIcon from "@mui/icons-material/Edit";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Image from "next/image";
import { TAbout } from "@/types";
import CreateMissionModal from "../_components/CreateMissionModal";
import UpdateMissionModal from "../_components/UpdateMissionModal";
import { useDeleteMissionMutation, useGetAllMissionQuery } from "@/redux/api/missionApi";



const ServicePage = () => {
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedTortureId, setSelectedTortureId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: missionData, isLoading } = useGetAllMissionQuery({ page: currentPage, limit: 5 });
  const [deleteMission] = useDeleteMissionMutation();
  const handleOpen = () => setOpen(true);

  const hanldeOpenUpdateModal = (id: string) => {
    setSelectedTortureId(id);
    setOpenUpdateModal(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  if (isLoading) {
    return <p>Loading...........</p>;
  }


  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {

      if (result.isConfirmed) {
        try {
          await deleteMission(id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "Your team has been deleted.",
            icon: "success"
          });
        } catch (err: any) {
          toast.error(err.message);
        }
      }
    });
  };

  const { meta, } = missionData?.data || { meta: {}, oppresses: [] };
  const { totalPage = 5 } = meta || {};

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <p>Loading.......</p>
  }

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const iconButtonStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '100%',
    padding: '0px',
    color: 'white',
    background: 'red',
    marginLeft: '2px',
    marginRight: '2px',
    '&:hover': {
      background: 'black',
      color: 'white',
    },
  };
  const iconStyle = { fontSize: '20px' }


  return (
    <PageContainer title="Services" >
      <DashboardCard>
        <Box>

          <Box display='flex' justifyContent='space-between'>
            <Typography variant="h5" fontWeight='bold'>Mission List </Typography>

            <Button
              onClick={handleOpen}
              startIcon={<AddCircleOutlineIcon />}>
              Create Mission
            </Button>

          </Box>
          <Box bgcolor="white" padding={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {missionData?.data?.missions?.map((data: TAbout, index: number) => (
                    <TableRow
                      key={data._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >

                      <TableCell align="center">

                        {
                          data?.images?.slice(0, 1).map((img) => (
                            <>
                              <Image width={50} height={50} className="w-20" src={img} alt='' />
                            </>
                          ))
                        }
                      </TableCell>
                      <TableCell align="center">{data.description.slice(0, 50)}...</TableCell>



                      <TableCell align="center">
                        <div className="flex justify-center gap-2 ">

                          <IconButton
                            sx={{ ...iconButtonStyle, background: '#00579A' }}
                            title="Edit"
                            onClick={() => hanldeOpenUpdateModal(data._id)}
                          >
                            <EditIcon sx={iconStyle} />
                          </IconButton>

                          <IconButton
                            sx={iconButtonStyle}
                            onClick={() => handleDelete(data._id)}
                            title="Delete"
                          >
                            <DeleteIcon sx={iconStyle} className="text-red-600" />
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
            <CreateMissionModal
              open={open}
              setOpen={handleClose}

            />
          )}
          {openUpdateModal && (
            <UpdateMissionModal
              open={openUpdateModal}
              setOpen={handleCloseUpdateModal}
              id={selectedTortureId}
            />
          )}
        </Box>
      </DashboardCard>
      <Stack spacing={2} display='flex' justifyItems='center' alignItems='center' marginTop='20px'>
        <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="primary" />
      </Stack>
    </PageContainer>
  );
};

export default ServicePage;