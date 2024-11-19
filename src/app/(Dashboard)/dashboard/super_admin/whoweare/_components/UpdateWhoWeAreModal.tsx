"use client";

import ADForm from "@/components/Forms/Form";
import { Box, Button, Grid, styled, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import NSIRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import ADImageUpload from "@/components/Forms/FileUpload";
import NSIInput from "@/components/Forms/Input";
import NSIEditor from "@/components/Forms/JodiEditor"; import { useGetSingleWhoweareQuery, useUpdateWhoweareMutation } from "@/redux/api/whoweareApi";
;


const FormContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
}));
const FormSection = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));


type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    initialValues?: FieldValues;
    id: string | null,
};


const UpdateWhoWeAreModal = ({ open, setOpen, id }: TProps) => {
    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);


    const [updateWhoWeAre] = useUpdateWhoweareMutation()
    const { data, isLoading } = useGetSingleWhoweareQuery(id)

    const handleSubmit = async (data: FieldValues) => {
        data.images = images;


        try {
            const res = await updateWhoWeAre({ ...data, id }).unwrap();

            toast.success(res?.message);

            setOpen(false);
        } catch (err: any) {

            toast.error(err?.message);
        }
    };

    const singleData = data?.data;

    useEffect(() => {
        if (singleData) {
            setImages(singleData?.images || []);
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        title: singleData?.title || "",
        client: singleData?.client || "",
        visited_conference: singleData?.visited_conference || "",
        experience: singleData?.experience || "",
        shipment: singleData?.shipment || "",
        compliance_factories: singleData?.compliance_factories || "",
        production: singleData?.production || "",
        images: singleData?.images || [],
        description: singleData?.description || "",



    };



    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <NSIRightSideModal open={open} setOpen={setOpen} title="Update Who We Are">
                        <FormContainer>
                            <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                                <FormSection>
                                    <Grid container spacing={2}>
                                        <Grid item md={12} sm={12}>
                                            <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                                <ADImageUpload
                                                    name="images"
                                                    setImageUrls={setImages}
                                                    imageUrls={images}
                                                    label="Select Images"
                                                    onClick={() => setImageOpen(true)}
                                                />
                                            </Box>
                                        </Grid>


                                        <Grid item md={12} sm={12}>
                                            <NSIInput
                                                fullWidth
                                                name="title"
                                                label="Title"
                                                autoFocus={true}
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <NSIInput
                                                fullWidth
                                                name="client"
                                                label="Client"

                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <NSIInput
                                                fullWidth
                                                name="shipment"
                                                label="Shipment"

                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <NSIInput
                                                fullWidth
                                                name="experience"
                                                label="Experience"

                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <NSIInput
                                                fullWidth
                                                name=" visited_conference "
                                                label="Visited Conference"

                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <NSIInput
                                                fullWidth
                                                name="compliance_factories"
                                                label="Compliance Factories"

                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <NSIInput
                                                fullWidth
                                                name="production"
                                                label="Production"

                                            />
                                        </Grid>

                                        <Grid item md={12} sm={12}>
                                            <NSIEditor
                                                name="description"
                                                label="Description"
                                            />
                                        </Grid>
                                    </Grid>


                                    <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Update Who We Are </Button></Box>
                                </FormSection>
                            </ADForm>
                        </FormContainer>
                        <GlobalImageSelector
                            open={imageOpen}
                            onClose={() => setImageOpen(false)}
                            setSelectedImage={setImages}
                            mode="multiple"
                            selectedImage={images}
                        />
                    </NSIRightSideModal>
                )
            }

        </>
    );
};

export default UpdateWhoWeAreModal;
