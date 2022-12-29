import { Text } from "@mantine/core";
import Link from "next/link";
import styles from "../styles/search.module.css";

interface Props {
    page: React.ReactElement,
    title: string,
    list: string[],
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export default function SearchLayout({ children }: { children: React.ReactElement<any, string | React.JSXElementConstructor<any>> }) {
    return <div className={styles.wrapper}>
        <div>
            <Text variant="text" p="1em" size="xl" style={{ backgroundColor: "red", borderRadius: "10px" }}>Search Results</Text>
            {/*<ul>
                {props.list.map((ele, index: number) => {
                    return <Link href={`#`} key={Math.random() * index * 7}>
                        <Text size="md">{ele}</Text>
                    </Link>
                })}
            </ul> */}
        </div>
        <div>
            {children}
        </div>
    </div>
}