import {Row, Col, Input} from "reactstrap";

export default function MenuFilter({setCategory, setSearch}) {
    return (
        <div className="filter-bar p-3 mb-4">
            <Row className="justify-content-evenly g-3">
                {/* SEARCH INPUT */}
                <Col md="5">
                    <Input
                        type="text"
                        placeholder="Menu Search Bar"
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                </Col>

                {/* CATEGORY DROPDOWN */}
                <Col md="5">
                    <Input
                        type="select"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Menu Category Filter</option>
                        <option value="All">All</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </Input>
                </Col>

            </Row>

        </div>
    );
}
