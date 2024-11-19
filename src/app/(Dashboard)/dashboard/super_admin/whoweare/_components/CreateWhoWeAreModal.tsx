"use client";

import ADForm from "@/components/Forms/Form";
import { Box, Button, Grid, styled, } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import ADImageUpload from "@/components/Forms/FileUpload";
import NSIRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useCreatlBannerMutation } from "@/redux/api/bannerApi";
import NSISelect from "@/components/Forms/Select";
import NSIInput from "@/components/Forms/Input";
import { serviceCategory } from "@/constant/service";
import NSIEditor from "@/components/Forms/JodiEditor";
import { useCreatServiceMutation } from "@/redux/api/serviceApi";
import { useCreateWhoWeAreMutation } from "@/redux/api/whoweareApi";

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
};


const CreateWhoWeAreModal = ({ open, setOpen }: TProps) => {
    const [createWhowWeAre] = useCreateWhoWeAreMutation()
    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);




    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            images

        };

        try {
            const res = await createWhowWeAre(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {

            toast.error(err?.data?.message);
        }
    };




    return (
        <>
            <NSIRightSideModal sx={{ width: '500px' }} open={open} setOpen={setOpen} title="Create Who We Are ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
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

                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add Who We Are </Button></Box>
                        </FormSection>
                    </ADForm>
                </FormContainer>

            </NSIRightSideModal>
            <GlobalImageSelector
                open={imageOpen}
                onClose={() => setImageOpen(false)}
                setSelectedImage={setImages}
                mode="multiple"
                selectedImage={images}
            />

        </>
    );
};

export default CreateWhoWeAreModal;
