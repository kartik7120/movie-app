import { Container, Title } from "@mantine/core";
import { collection, doc, DocumentData, getDocs, limit, orderBy, query, QuerySnapshot, startAt } from "firebase/firestore";
import { GetServerSideProps } from "next";
import MoreTitle from "../../../components/MoreTitle";
import ReviewComment from "../../../components/ReviewComment";
import { db } from "../../../firebase";

interface Props {
    id: number,
    title: string,
    data: { rating: number, review: string, spolier: boolean, title: string, id: string, upvotes: number, downvotes: number }[]
    // data: QuerySnapshot<DocumentData>
}

export default function Reviews(props: Props) {
    return <>
        <MoreTitle sourceMedia="TV" id={props.id} title={`${props.title || "Movie Title"}`} />
        <Container fluid p={100} pt={0} pb={0}>
            <Title order={2} size="h1">User Reviews</Title>
            {props.data.map((ele) => {
                return <ReviewComment spolier={ele.spolier} downvotes={ele.upvotes} review={ele.review} title={ele.title} key={ele.id} />
            })}
        </Container>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    if (params && (params.id === null || params.id === undefined)) {
        return {
            notFound: true
        }
    }

    const docRef = collection(db, "movies", `${params && params.id}`, "reviews");
    const q = query(docRef, orderBy("rating"), startAt(params && params.startAt ? params.startAt : 0), limit(10));
    try {
        const documentSnapshots = await getDocs(q);
        if (documentSnapshots.empty) {
            console.log('document is empty');
        }

        documentSnapshots.forEach((docs) => {
            console.log(docs.data());
        });

        const data = documentSnapshots.docs.map((d) => {
            return {
                id: d.id,
                ...d.data(),
            }
        })

        return {
            props: {
                data
            }
        }

    } catch (error) {
        console.log(`error occured while fetching reviews from the database = ${error}`);
    }

    return {
        notFound: true
    }
}