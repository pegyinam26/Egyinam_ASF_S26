import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageHero from "../components/PageHero.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import {Container, Row, Col, Form, FormGroup,
    Label, Input, Button, FormFeedback} from "reactstrap";
import {useState} from "react";

//Building reservation form with Yup schema validation
const schema = yup.object({
    name: yup.string().required("Name required").max(20),
    email: yup.string().email("Invalid email").required("Email required"),
    party: yup.number().required("Party size required").min(1).max(8),
    date: yup.string().required("Date required"),
    time: yup.string().required("Time required"),
    seating: yup.string().required("Select seating"),
    notes: yup.string().max(30, "Max 30 characters"),
});

export default function ReservationsPage() {
    const [modal, setModal] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            seating: "Indoor"
        }
    });
    const onSubmit = (data) => {
        alert("Reservation submitted!");
        reset();
    };

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
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Row className="g-3">

                    {/* NAME */}
                    <Col md={6}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input  placeholder="Enter your name" {...register("name")} invalid={!!errors.name}/>
                            <FormFeedback>{errors.name?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* EMAIL */}
                    <Col md={6}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="Enter your email" {...register("email")} invalid={!!errors.email}/>
                            <FormFeedback>{errors.email?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* PARTY */}
                    <Col md={4}>
                        <FormGroup>
                            <Label>Party Size</Label>
                            <Input type="select" {...register("party")} invalid={!!errors.party}>
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
                            <Input type="date" {...register("date")} invalid={!!errors.date}/>
                            <FormFeedback>{errors.date?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* TIME */}
                    <Col md={4}>
                        <FormGroup>
                            <Label>Time</Label>
                            <Input type="time" {...register("time")} invalid={!!errors.time}/>
                            <FormFeedback>{errors.time?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* SEATING */}
                    <Col md={12}>
                        <Label>Seating Preference</Label>
                        <div className="d-flex gap-3">
                            <FormGroup check>
                                <Input type="radio" value="Indoor" {...register("seating")} />
                                <Label check>Indoor</Label>
                            </FormGroup>

                            <FormGroup check>
                                <Input type="radio" value="Outdoor" {...register("seating")} />
                                <Label check>Outdoor</Label>
                            </FormGroup>

                            <FormGroup check>
                                <Input type="radio" value="Bar" {...register("seating")} />
                                <Label check>Bar Seating</Label>
                            </FormGroup>
                        </div>
                        <p className="text-danger">{errors.seating?.message}</p>
                    </Col>

                    {/* NOTES */}
                    <Col md={12}>
                        <FormGroup>
                            <Label>Dietary Notes</Label>
                            <Input type="textarea" placeholder="Any dietary restrictions or special requests..." {...register("notes")} invalid={!!errors.notes}/>
                            <FormFeedback>{errors.notes?.message}</FormFeedback>
                        </FormGroup>
                    </Col>

                    {/* NEWSLETTER */}
                    <Col md={12}>
                        <FormGroup check>
                            <Input type="checkbox" {...register("newsletter")} />
                            <Label check>Subscribe for special offers</Label>
                        </FormGroup>
                    </Col>

                    {/* BUTTONS */}
                    <Col md={12} className="text-center mt-3">
                        <Button color="warning" className="me-2">Submit</Button>
                        <Button type="reset" color="secondary">Reset</Button>
                    </Col>

                </Row>
            </Form>
            {/* SUCCESS MODAL */}
            <ConfirmModal
                isOpen={modal}
                toggle={() => setModal(false)}
                confirm={() => setModal(false)}
                title="Reservation Submitted"
                message="Your reservation request has been received!"
            />
        </Container>
        </>
    );
}