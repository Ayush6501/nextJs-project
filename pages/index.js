import MeetupList from "../components/meetups/MeetupList";
import {useEffect, useState} from "react";
import {MongoClient} from 'mongodb';
import Head from 'next/head';

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'Meetup 1',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Bandra_Worli_Sea-Link_%28cropped%29.jpg/1024px-Bandra_Worli_Sea-Link_%28cropped%29.jpg',
//         address: 'Some Address 5, 524, XYZ',
//         description: "Our first meetup",
//     },
//     {
//         id: 'm2',
//         title: 'Meetup 2',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Bandra_Worli_Sea-Link_%28cropped%29.jpg/1024px-Bandra_Worli_Sea-Link_%28cropped%29.jpg',
//         address: 'Some Address 8, 2514, ABC',
//         description: "Our second meetup",
//     },
// ];

const HomePage = (props) => {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of highly active React Meetups!'
                />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </>
    );
};

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://Ayush:abcd4321@cluster0.wuc75.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString()
            })),
        },
        revalidate: 5
    };
};

// export async function getServerSideProps (context) {
//     const req = context.request;
//     const res = context.response;
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         }
//     };
// };

export default HomePage;
