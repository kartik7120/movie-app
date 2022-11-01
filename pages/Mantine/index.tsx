import { TextInput } from '@mantine/core';

export default function MantineIndex({ Mantine }: any) {
    return <>
        <h1>I am Mantine index route</h1>
        <TextInput placeholder='Your name' dir='ltr' label="Full name" withAsterisk />
    </>
}

export function getServerSideProps() {
    return {
        props: {
            Mantine: []
        }
    }
}