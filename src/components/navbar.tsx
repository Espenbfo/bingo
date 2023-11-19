import { Container, Navbar, Nav, Button } from "react-bootstrap"
import { createSearchParams, useSearchParams } from "react-router-dom";
import "./navbar.css"

type Props = {
    title: string
    onNewTiles?: () => void
}

export const BingoNavBar = ({title, onNewTiles} : Props) => {
    const [searchParams] = useSearchParams();
    const formSearchParams = createSearchParams(searchParams).toString()
    return (
        <Navbar expand="lg" className="navbar">
            <Container>
                <Navbar.Brand>{title.length>0 ? title : "Bingo creator"}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {onNewTiles !== undefined && <Nav.Link onClick={onNewTiles}>New Tiles</Nav.Link>}
                        <Nav.Link href="/">Create your own bingo board</Nav.Link>
                        {formSearchParams && <Nav.Link href={`/?${formSearchParams}`}>Edit current Bingo board</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}