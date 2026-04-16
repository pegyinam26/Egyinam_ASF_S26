import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageHero from "../components/PageHero.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import {Container, Row, Col, Form, FormGroup,
    Label, Input, Button, FormFeedback} from "reactstrap";
import {useEffect, useState} from "react";
import CustomDropdown from "../components/CustomDropdown.jsx";

export default function ReservationsPage({onReserve}) {
    const emptyValues = {
        name: " ",
        email: " ",
        party: " ",
        date: " ",
        time: " ",
        seating: " ",
        notes: " ",
        newsletter: false
    };
    //Building reservation form with Yup schema validation
    const validationSchema = yup.object({
        name: yup.string().required("Name required").max(20,"No more than 20 characters"),
        email: yup.string().email("Invalid email").required("Email required"),
        party: yup.number().required("Party size required").min(1).max(8),
        date: yup.string().required("Date required"),
        time: yup.string().required("Time required"),
        seating: yup.string().required("Seating preference required"),
        notes: yup.string().max(30, "Max 30 characters")
    });

    const [modal, setModal] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors}
    } = useForm({
        mode: "onBlur",//provides error messaging while form is filled
        resolver: yupResolver(validationSchema),
        defaultValues: {emptyValues},
        shouldUnregister: false
    });
    const onSubmit =(data) =>{
        onReserve && onReserve(data);
        setModal(true);
        // console.log(data);
        // reset({emptyValues}, {
        // //     keepValues: false,
        // //     keepDirty: false,
        // //     keepTouched: false,
        // //     keepErrors: false,
        // //     keepDefaultValues: false
        // });
        reset(undefined);

        // console.log(data);
        // data.preventDefault();
    }
    const handleChange = (event) => {
        setValue(event.target.name, event.target.value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    useEffect(() => {
        if (modal) {
            const timer = setTimeout(() => {
                setModal(false);
                reset(undefined);  //  reset form
            }, 1000); // 2.5 seconds

            return () => clearTimeout(timer);
        }
    }, [modal]);

    return (
        <>
            <PageHero title="Reserve a Table" className="reservation-hero" />
        <Container className="mt-4">

            <div className="reservation-container">
                <p id="request-only">
                    Please note that reservations are accepted on a <strong>request-only</strong> basis and are not
                    guaranteed until confirmed by our staff. While we make every effort to accommodate all requests,
                    availability may vary depending on seating capacity and demand. A member of our G & G Bulldog team
                    will contact you to confirm your reservation once your request has been reviewed. We appreciate your
                    understanding and look forward to providing you a fine dining experience.
                </p>
            </div>
            <Form className="reservation-form" onSubmit={handleSubmit(onSubmit, () => setModal(false))}>

                <Row className="g-3">

                    {/* NAME */}
                    <Col md={6}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                placeholder="Enter your name"
                                {...register("name")}
                                value={watch("name") ?? ""}
                                onChange={handleChange}
                                invalid={!!errors.name}

                            />
                            <FormFeedback>{errors.name?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* EMAIL */}
                    <Col md={6}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                placeholder="Enter your email as username@example.com"
                                {...register("email")}
                                value={watch("email") ?? ""}
                                onChange={handleChange}
                                invalid={!!errors.email}

                            />

                            <FormFeedback>{errors.email?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* PARTY */}
                    <Col md={4}>
                        <FormGroup>
                            <Label>Party Size</Label>
                            <Input
                                type="select"
                                {...register("party")}
                                value={watch("party") ?? ""}
                                onChange={handleChange}
                                invalid={!!errors.party}
                            >
                            {/*REPLACING SELECT DROPDOWN WITH CUSTOM DROPDOWN*/}
                            {/*<CustomDropdown*/}
                            {/*    value={watch("party") || "Select Party Size"}*/}
                            {/*    onChange={(val) => {*/}
                            {/*        setValue("party", val, {*/}
                            {/*            shouldValidate: true,*/}
                            {/*            shouldDirty: true,*/}
                            {/*            shouldTouch: true*/}
                            {/*        });*/}
                            {/*    }}*/}
                            {/*    options={[1, 2, 3, 4, 5, 6, 7, 8]}*/}
                            {/*/>*/}

                            {/*{errors.party && (*/}
                            {/*    <div className="text-danger mt-1">*/}
                            {/*        {errors.party.message}*/}
                            {/*    </div>*/}
                            {/*)}*/}
                                <option value="">Select</option>
                                {[1,2,3,4,5,6,7,8].map(n => (
                                    <option key={n}>{n}</option>
                                ))}
                            </Input>
                            <FormFeedback>{errors.party?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* DATE */}
                    <Col md={4}>
                        <FormGroup>
                            <Label>Date</Label>
                            <Input
                                type="date"
                                {...register("date")}
                                value={watch("date") ?? ""}
                                onChange={handleChange}
                                invalid={!!errors.date}

                            />
                            <FormFeedback>{errors.date?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* TIME */}
                    <Col md={4}>
                        <FormGroup>
                            <Label>Time</Label>
                            <Input
                                type="time"
                                {...register("time")}
                                value={watch("time") ?? ""}
                                onChange={handleChange}
                                invalid={!!errors.time}
                            />
                            <FormFeedback>{errors.time?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* SEATING */}
                    <Col md={12}>
                        <Label>Seating Preference</Label>
                        <div className="d-flex gap-3">
                            <FormGroup check>
                                <Input
                                    type="radio"
                                    value="Indoor"
                                    {...register("seating")}
                                    checked={watch("seating") === "Indoor"}
                                    onChange={handleChange}
                                    invalid={!!errors.seating}
                                />
                                <Label check>Indoor</Label>
                                <FormFeedback>{errors.seating?.message}</FormFeedback>
                            </FormGroup>

                            <FormGroup check>
                                <Input
                                    type="radio"
                                    value="Outdoor"
                                    {...register("seating")}
                                    checked={watch("seating") === "Outdoor"}
                                    onChange={handleChange}
                                    invalid={!!errors.seating}
                                />
                                <Label check>Outdoor</Label>
                                <FormFeedback>{errors.seating?.message}</FormFeedback>
                            </FormGroup>

                            <FormGroup check>
                                <Input
                                    type="radio"
                                    value="Bar"
                                    {...register("seating")}
                                    checked={watch("seating") === "Bar"}
                                    onChange={handleChange}
                                    invalid={!!errors.seating}
                                />
                                <Label check>Bar Seating</Label>
                                <FormFeedback>{errors.seating?.message}</FormFeedback>
                            </FormGroup>

                            {/*<p className="text-danger">{errors.seating?.message}</p>*/}
                        </div>

                    </Col>

                    {/* NOTES */}
                    <Col md={12}>
                        <FormGroup>
                            <Label>Dietary Notes</Label>
                            <Input
                                type="textarea"
                                placeholder="Any dietary restrictions or special requests...max 30 characters"
                                {...register("notes")}
                                value={watch("notes") ?? ""}
                                onChange={handleChange}
                                invalid={!!errors.notes}/>
                            <FormFeedback>{errors.notes?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* NEWSLETTER */}
                    <Col md={12}>
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                {...register("newsletter")}
                                checked={watch("newsletter") ?? false}
                                onChange={handleChange}
                            />
                            <Label check>Subscribe for special offers</Label>
                        </FormGroup>
                    </Col>

                    {/* BUTTONS */}
                    <Col md={12} className="text-center mt-3">
                        <Button color="warning" className="me-2"
                                // onChange={handleChange}
                                // onClick={() => reset({emptyValues})}
                        >Submit</Button>
                        <Button
                            type="button"
                            color="secondary"
                            onChange={handleChange}
                            onClick={()=>reset(undefined)}
                            // onClick={() => reset({emptyValues}, {
                            //     keepValues: false,
                            //     keepDirty: false,
                            //     keepTouched: false,
                            //     keepErrors: false,
                            //     keepDefaultValues: false
                            // })}

                        >
                            Reset
                        </Button>
                    </Col>

                </Row>

            </Form>
            {/* SUCCESS MODAL */}
            {/*<ConfirmModal*/}
            {/*    isOpen={modal}*/}
            {/*    toggle={() => setModal(false)}*/}
            {/*    confirm={() => setModal(false)}*/}
            <ConfirmModal
                isOpen={modal}
                showActions={false}
                toggle={() => {
                    setModal(false);
                    reset(undefined);
                    // reset({emptyValues}, {
                    //     keepValues: false,
                    //     keepDirty: false,
                    //     keepTouched: false,
                    //     keepErrors: false,
                    //     keepDefaultValues: false
                    // });
                }}
                confirm={() => {
                    setModal(false);
                    reset(undefined);
                    // reset({emptyValues}, {
                    //     keepValues: false,
                    //     keepDirty: false,
                    //     keepTouched: false,
                    //     keepErrors: false,
                    //     keepDefaultValues: false
                    // });
                }}
                title="Reservation Submitted"
                message="Your reservation request has been received!"

            />
        </Container>
        </>
    );
}