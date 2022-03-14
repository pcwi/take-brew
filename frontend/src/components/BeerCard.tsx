import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg, Col } from 'reactstrap'

export interface CardItem {
    id: string,
    title: string,
    description: string,
    imageSrc: string
}

export function BeerCard(props: CardItem) {

    return (
        <Card>
            <div className='row g-0'>
                <div className='col-md-5'>
                    <CardImg className="img-fluid rounded-start" src={props.imageSrc} alt={props.title}></CardImg>
                </div>
                <CardBody className='col-md-4'>
                    <CardTitle tag="h3">
                        {props.title}
                    </CardTitle>
                    <CardText
                        className="mb-2"
                        tag="h5">
                        {props.description}
                    </CardText>
                </CardBody>
            </div>
        </Card>
    )
}