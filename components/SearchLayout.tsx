import { Text } from "@mantine/core";
import Link from "next/link";
import styles from "../styles/search.module.css";
import { useRouter } from "next/router";

interface Props {
    page: React.ReactElement,
    title: string,
    list: string[],
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export default function SearchLayout({ children }: { children: React.ReactElement<any, string | React.JSXElementConstructor<any>> }) {

    const router = useRouter();

    return <div className={styles.wrapper}>
        <div >
            <Text variant="text" p="1em" size="xl" style={{ backgroundColor: "red", borderRadius: "10px" }}>Search Results</Text>
            <ul className={styles.category}>
                {/* {props.list.map((ele, index: number) => {
                    return <Link href={`#`} key={Math.random() * index * 7}>
                        <Text size="md">{ele}</Text>
                    </Link>
                })} */}
                <li><Link href={`/search/movie?query=${router.query.query}`}>Movies</Link></li>
                <li><Link href={`/search/tv?query=${router.query.query}`}>Tv</Link></li>
                <li><Link href={`/search/people?query=${router.query.query}`}>People</Link></li>
                <li><Link href={`/search/companies?query=${router.query.query}`}>Companies</Link></li>
                <li><Link href={`/search/keywords?query=${router.query.query}`}>Keywords</Link></li>
            </ul>
        </div>
        <div>
            {children}
        </div>
    </div>
}